"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart as RechartsLineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type LineSeries = {
  key: string;
  label: string;
  color: string;
  strokeDasharray?: string;
};

type LineAnnotation = {
  x: number;
  label: string;
  color?: string;
};

type LineChartProps = {
  data: Record<string, number>[];
  series: LineSeries[];
  xKey: string;
  xLabel: string;
  yLabel: string;
  xScale?: "linear" | "log";
  height?: number;
  annotations?: LineAnnotation[];
};

export function LineChart({
  data,
  series,
  xKey,
  xLabel,
  yLabel,
  xScale = "linear",
  height = 320,
  annotations = [],
}: LineChartProps) {
  return (
    <div className="rounded-[1.5rem] border border-border bg-white/80 p-4">
      <div style={{ width: "100%", height }}>
        <ResponsiveContainer>
          <RechartsLineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey={xKey}
              type="number"
              scale={xScale}
              domain={["dataMin", "dataMax"]}
              tick={{ fontSize: 12 }}
              label={{ value: xLabel, position: "insideBottom", offset: -8 }}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              label={{
                value: yLabel,
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 16,
                border: "1px solid #dbe3ea",
                background: "#ffffff",
              }}
            />
            <Legend />
            {annotations.map((annotation) => (
              <ReferenceLine
                key={`${annotation.label}-${annotation.x}`}
                x={annotation.x}
                label={annotation.label}
                stroke={annotation.color ?? "#1b5f7f"}
                strokeDasharray="4 4"
              />
            ))}
            {series.map((entry) => (
              <Line
                key={entry.key}
                type="monotone"
                dataKey={entry.key}
                name={entry.label}
                stroke={entry.color}
                dot={false}
                strokeWidth={3}
                strokeDasharray={entry.strokeDasharray}
              />
            ))}
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

