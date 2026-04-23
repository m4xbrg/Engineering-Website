"use client";

import { useMemo, useState } from "react";

import { ControlPanel } from "@/components/tools/ControlPanel";
import { InsightPanel } from "@/components/tools/InsightPanel";
import { ResultsStrip } from "@/components/tools/ResultsStrip";
import { ToolWorkspace } from "@/components/tools/ToolWorkspace";
import { convertValue, getQuantity, quantities, type QuantityId } from "@/lib/math";
import { formatEngineeringNumber } from "@/lib/utils/format";

export default function UnitConverterTool() {
  const [quantityId, setQuantityId] = useState<QuantityId>("length");
  const [fromUnitId, setFromUnitId] = useState("m");
  const [toUnitId, setToUnitId] = useState("ft");
  const [inputValue, setInputValue] = useState("1");

  const quantity = getQuantity(quantityId);
  const numericValue = Number(inputValue || "0");

  const conversion = useMemo(
    () =>
      convertValue({
        quantityId,
        value: numericValue,
        fromUnitId,
        toUnitId,
      }),
    [quantityId, numericValue, fromUnitId, toUnitId],
  );

  const allUnitsTable = useMemo(() => {
    return quantity.units.map((unit) => {
      const result = convertValue({
        quantityId,
        value: numericValue,
        fromUnitId,
        toUnitId: unit.id,
      });

      return {
        ...unit,
        converted: result?.convertedValue ?? Number.NaN,
      };
    });
  }, [quantity, quantityId, numericValue, fromUnitId]);

  const results = [
    {
      label: "Converted",
      value: conversion
        ? `${formatEngineeringNumber(conversion.convertedValue)} ${
            quantity.units.find((unit) => unit.id === toUnitId)?.symbol ?? ""
          }`
        : "—",
      detail: `${formatEngineeringNumber(numericValue)} ${
        quantity.units.find((unit) => unit.id === fromUnitId)?.symbol ?? ""
      } input`,
    },
    {
      label: "Factor",
      value: conversion ? `${formatEngineeringNumber(conversion.factor)}×` : "—",
      detail: `Multiply ${fromUnitId} by this factor to get ${toUnitId}.`,
    },
    {
      label: "Quantity",
      value: quantity.label,
      detail: `${quantity.units.length} units currently available in this group.`,
    },
  ];

  return (
    <ToolWorkspace
      controls={
        <ControlPanel
          description="Choose a physical quantity, then move between SI and engineering-friendly units without leaving the curriculum context."
        >
          <label className="space-y-2">
            <span className="text-sm font-medium">Physical quantity</span>
            <select
              value={quantityId}
              onChange={(event) => {
                const nextQuantityId = event.target.value as QuantityId;
                const nextQuantity = getQuantity(nextQuantityId);
                setQuantityId(nextQuantityId);
                setFromUnitId(nextQuantity.units[0].id);
                setToUnitId(nextQuantity.units[Math.min(1, nextQuantity.units.length - 1)].id);
              }}
              className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-foreground"
            >
              {quantities.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium">Input value</span>
            <input
              type="number"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-foreground"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium">From unit</span>
            <select
              value={fromUnitId}
              onChange={(event) => setFromUnitId(event.target.value)}
              className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-foreground"
            >
              {quantity.units.map((unit) => (
                <option key={unit.id} value={unit.id}>
                  {unit.label} ({unit.symbol})
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium">To unit</span>
            <select
              value={toUnitId}
              onChange={(event) => setToUnitId(event.target.value)}
              className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-foreground"
            >
              {quantity.units.map((unit) => (
                <option key={unit.id} value={unit.id}>
                  {unit.label} ({unit.symbol})
                </option>
              ))}
            </select>
          </label>
        </ControlPanel>
      }
      results={<ResultsStrip items={results} />}
      output={
        <div className="space-y-6">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr),20rem]">
            <div className="rounded-[1.75rem] border border-border bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(229,241,244,0.9))] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Conversion output
              </p>
              <p className="mt-4 text-3xl font-semibold">
                {formatEngineeringNumber(numericValue)}{" "}
                {quantity.units.find((unit) => unit.id === fromUnitId)?.symbol}
              </p>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">equals</p>
              <p className="mt-2 text-4xl font-semibold text-accent">
                {conversion ? formatEngineeringNumber(conversion.convertedValue) : "—"}{" "}
                {quantity.units.find((unit) => unit.id === toUnitId)?.symbol}
              </p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                Conversion factor: {conversion ? formatEngineeringNumber(conversion.factor) : "—"}.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-border bg-white/85 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Common engineering units
              </p>
              <div className="mt-4 space-y-3 text-sm">
                {allUnitsTable.slice(0, 5).map((unit) => (
                  <div key={unit.id} className="flex items-center justify-between gap-4">
                    <span>{unit.label}</span>
                    <span className="font-medium">
                      {formatEngineeringNumber(unit.converted)} {unit.symbol}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[1.75rem] border border-border bg-white/90">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-muted/80">
                <tr>
                  <th className="px-4 py-3 font-medium">Unit</th>
                  <th className="px-4 py-3 font-medium">Symbol</th>
                  <th className="px-4 py-3 font-medium">Converted value</th>
                </tr>
              </thead>
              <tbody>
                {allUnitsTable.map((unit) => (
                  <tr key={unit.id} className="border-t border-border">
                    <td className="px-4 py-3">{unit.label}</td>
                    <td className="px-4 py-3 text-muted-foreground">{unit.symbol}</td>
                    <td className="px-4 py-3 font-medium">
                      {formatEngineeringNumber(unit.converted)} {unit.symbol}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      }
      insights={
        <InsightPanel
          insights={[
            {
              label: "Dimensional checks",
              text: "A converter is most useful when it helps you verify scale. If the number changes wildly, check whether you switched quantity families or prefixes.",
            },
            {
              label: "SI anchors",
              text: "Most engineering formulas assume SI base units, so a clean workflow is often convert to SI, solve, then convert the final answer back into the context users expect.",
            },
            {
              label: "Temperature trap",
              text: "Temperature conversions are not simple scale factors. Offsets matter, which is why Celsius, Fahrenheit, and Kelvin behave differently from length or pressure.",
            },
          ]}
        />
      }
    />
  );
}
