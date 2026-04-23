"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type SpectrumChartProps = {
  data: { harmonic: number; magnitude: number; a: number; b: number }[];
};

export function SpectrumChart({ data }: SpectrumChartProps) {
  return (
    <div className="rounded-[1.5rem] border border-border bg-white/80 p-4">
      <div className="h-[320px] w-full">
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="harmonic" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                borderRadius: 16,
                border: "1px solid #dbe3ea",
                background: "#ffffff",
              }}
            />
            <Legend />
            <Bar dataKey="magnitude" name="|Cₙ|" fill="#1b5f7f" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

