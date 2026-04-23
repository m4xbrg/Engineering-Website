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

type ChartSeries = {
  key: string;
  label: string;
  color: string;
  strokeDasharray?: string;
};

type Annotation = {
  x: number;
  label: string;
  color?: string;
};

type DualAxisChartProps = {
  data: Record<string, number>[];
  xKey: string;
  upperSeries: ChartSeries[];
  lowerSeries: ChartSeries[];
  upperLabel: string;
  lowerLabel: string;
  xLabel: string;
  xScale?: "linear" | "log";
  annotations?: Annotation[];
};

function SharedChart({
  data,
  xKey,
  series,
  yLabel,
  xLabel,
  xScale,
  annotations,
}: {
  data: Record<string, number>[];
  xKey: string;
  series: ChartSeries[];
  yLabel: string;
  xLabel: string;
  xScale: "linear" | "log";
  annotations: Annotation[];
}) {
  return (
    <div className="h-[270px] w-full">
      <ResponsiveContainer>
        <RechartsLineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey={xKey}
            type="number"
            scale={xScale}
            domain={["dataMin", "dataMax"]}
            tick={{ fontSize: 12 }}
            label={{ value: xLabel, position: "insideBottom", offset: -6 }}
          />
          <YAxis
            tick={{ fontSize: 12 }}
            label={{ value: yLabel, angle: -90, position: "insideLeft" }}
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
  );
}

export function DualAxisChart({
  data,
  xKey,
  upperSeries,
  lowerSeries,
  upperLabel,
  lowerLabel,
  xLabel,
  xScale = "linear",
  annotations = [],
}: DualAxisChartProps) {
  return (
    <div className="space-y-4 rounded-[1.5rem] border border-border bg-white/80 p-4">
      <SharedChart
        data={data}
        xKey={xKey}
        series={upperSeries}
        yLabel={upperLabel}
        xLabel={xLabel}
        xScale={xScale}
        annotations={annotations}
      />
      <SharedChart
        data={data}
        xKey={xKey}
        series={lowerSeries}
        yLabel={lowerLabel}
        xLabel={xLabel}
        xScale={xScale}
        annotations={annotations}
      />
    </div>
  );
}

