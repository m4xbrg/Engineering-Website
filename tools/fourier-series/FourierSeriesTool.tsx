"use client";

import { useEffect, useMemo, useState } from "react";

import { LineChart } from "@/components/charts/LineChart";
import { SpectrumChart } from "@/components/charts/SpectrumChart";
import { ControlPanel } from "@/components/tools/ControlPanel";
import { InsightPanel } from "@/components/tools/InsightPanel";
import { ModeSwitch } from "@/components/tools/ModeSwitch";
import { ParameterSlider } from "@/components/tools/ParameterSlider";
import { ResultsStrip } from "@/components/tools/ResultsStrip";
import { ToolWorkspace } from "@/components/tools/ToolWorkspace";
import {
  computeFourierCoefficients,
  createFourierTimeSeries,
  waveformLabel,
  type FourierWaveform,
} from "@/lib/math";
import { formatEngineeringNumber } from "@/lib/utils/format";

export default function FourierSeriesTool() {
  const [waveform, setWaveform] = useState<FourierWaveform>("square");
  const [harmonics, setHarmonics] = useState(9);
  const [view, setView] = useState<"time" | "spectrum">("time");
  const [animate, setAnimate] = useState(false);
  const [displayedHarmonics, setDisplayedHarmonics] = useState(harmonics);

  useEffect(() => {
    if (!animate) {
      return;
    }

    const interval = window.setInterval(() => {
      setDisplayedHarmonics((current) => {
        if (current >= harmonics) {
          window.clearInterval(interval);
          return harmonics;
        }

        return current + 1;
      });
    }, 120);

    return () => window.clearInterval(interval);
  }, [animate, harmonics]);

  const coefficients = useMemo(
    () => computeFourierCoefficients(waveform, harmonics),
    [waveform, harmonics],
  );
  const timeSeries = useMemo(
    () =>
      createFourierTimeSeries(
        waveform,
        coefficients,
        animate ? Math.min(displayedHarmonics, harmonics) : harmonics,
      ),
    [waveform, coefficients, displayedHarmonics, animate, harmonics],
  );

  return (
    <ToolWorkspace
      controls={
        <ControlPanel description="Choose a periodic waveform, then watch how the Fourier series builds it back up harmonic by harmonic.">
          <ModeSwitch
            label="Waveform"
            value={waveform}
            onChange={setWaveform}
            options={[
              { value: "square", label: "Square" },
              { value: "sawtooth", label: "Sawtooth" },
              { value: "triangle", label: "Triangle" },
              { value: "half-wave-rectified", label: "Half-wave sine" },
            ]}
          />
          <ModeSwitch
            label="Primary view"
            value={view}
            onChange={setView}
            options={[
              { value: "time", label: "Time domain" },
              { value: "spectrum", label: "Spectrum" },
            ]}
          />
          <ParameterSlider
            label="Harmonics"
            value={harmonics}
            min={1}
            max={40}
            step={1}
            onChange={(value) => {
              setHarmonics(value);
              if (animate) {
                setDisplayedHarmonics(1);
              }
            }}
          />
          <button
            type="button"
            onClick={() => {
              setAnimate((current) => {
                const next = !current;

                if (next) {
                  setDisplayedHarmonics(1);
                }

                return next;
              });
            }}
            className={`rounded-2xl border px-4 py-3 text-sm font-medium transition-colors ${
              animate
                ? "border-transparent bg-foreground text-white"
                : "border-border bg-white/80 text-foreground"
            }`}
          >
            {animate ? "Animation on" : "Animate harmonic buildup"}
          </button>
        </ControlPanel>
      }
      results={
        <ResultsStrip
          items={[
            {
              label: "Waveform",
              value: waveformLabel(waveform),
            },
            {
              label: "Displayed N",
              value: String(animate ? Math.min(displayedHarmonics, harmonics) : harmonics),
              detail: animate ? "Animated partial sum" : "Static partial sum",
            },
            {
              label: "RMS error",
              value: formatEngineeringNumber(timeSeries.rmsError),
              detail: "Approximation error over one period.",
            },
            {
              label: "Visible Gibbs",
              value:
                waveform === "square" || waveform === "half-wave-rectified"
                  ? "Yes"
                  : "Milder",
            },
          ]}
        />
      }
      output={
        <div className="space-y-6">
          {view === "time" ? (
            <LineChart
              data={timeSeries.points}
              xKey="angle"
              xLabel="angle (rad)"
              yLabel="amplitude"
              series={[
                { key: "target", label: "Target waveform", color: "#1b5f7f" },
                { key: "approximation", label: "Fourier sum", color: "#c46c1e" },
                { key: "h1", label: "1st harmonic", color: "#5c7c5a", strokeDasharray: "4 4" },
                { key: "h2", label: "2nd harmonic", color: "#7f5a72", strokeDasharray: "4 4" },
              ]}
            />
          ) : (
            <SpectrumChart
              data={coefficients.coefficients.map((coefficient) => ({
                harmonic: coefficient.harmonic,
                magnitude: coefficient.magnitude,
                a: coefficient.a,
                b: coefficient.b,
              }))}
            />
          )}

          <div className="rounded-[1.75rem] border border-border bg-white/90 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Convergence note
            </p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Discontinuities converge slowly. That is why square-like shapes keep a visible ripple near sharp edges even as the overall approximation improves.
            </p>
          </div>
        </div>
      }
      insights={
        <InsightPanel
          insights={[
            {
              label: "Most shapes are sums",
              text: "Periodic signals that look simple in time can hide a rich frequency structure. The spectrum tells you which harmonics the waveform needs.",
            },
            {
              label: "Sharp edges cost bandwidth",
              text: "Waveforms with abrupt changes need many higher harmonics. Smoother waveforms decay faster in the spectrum.",
            },
            {
              label: "The Gibbs ripple is normal",
              text: "Near a discontinuity, finite partial sums overshoot. That artifact does not disappear entirely, but it gets squeezed closer to the jump as more terms are added.",
            },
          ]}
        />
      }
    />
  );
}
