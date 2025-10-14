"use client";

import StatsCard from "@/components/ui/StatsCard";
import { SummaryCard } from "@/hooks/useTinChap";

export default function TinChapSummary({ summaryCards }: { summaryCards: SummaryCard[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
      {summaryCards.map((card, index) => (
        <StatsCard key={`tinchap-stats-${index}`} data={card as any} />
      ))}
    </div>
  );
}
