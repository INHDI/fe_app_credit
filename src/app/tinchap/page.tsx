"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { useTinChap } from "@/hooks/useTinChap";
import { useEffect } from "react";
import { Plus } from "lucide-react";
import TinChapSummary from "./TinChapSummary";
import TinChapFilter from "./TinChapFilter";
import TinChapTable from "./TinChapTable";
import TinChapPagination from "./TinChapPagination";

export default function Page() {
  useEffect(() => {
    console.log("TinChapPage");
  }, []);

  const {
    breadcrumbItems,
    state,
    setSearchTerm,
    setSelectedStatus,
    setSelectedTimeRange,
    setCurrentPage,
    summaryCards,
    paginatedContracts,
    startIndex,
    itemsPerPage,
    totalPages,
    countAllItems,
    openDetailModal,
    refreshContracts,
    deleteContract,
  } = useTinChap();

  const headerActions = (
    <div className="flex items-center gap-3">
      <button type="button" onClick={() => {}} className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg rounded-xl px-4 py-2 flex items-center gap-2">
        <Plus className="h-4 w-4 mr-2" />
        Thêm hợp đồng mới
      </button>
    </div>
  );

  return (
    <div>
      <PageHeader
        title="Quản lý Tín chấp"
        description="Theo dõi và quản lý các hợp đồng tín chấp một cách hiệu quả"
        breadcrumbs={breadcrumbItems}
        actions={headerActions}
      />
      <TinChapFilter
        searchTerm={state.searchTerm}
        setSearchTerm={setSearchTerm}
        selectedStatus={state.selectedStatus}
        setSelectedStatus={setSelectedStatus}
        selectedTimeRange={state.selectedTimeRange}
        setSelectedTimeRange={setSelectedTimeRange}
      />
      <TinChapSummary summaryCards={summaryCards} />
      <TinChapTable
        contracts={paginatedContracts}
        startIndex={startIndex}
        itemsPerPage={itemsPerPage}
        onViewDetails={openDetailModal}
        onSettled={refreshContracts}
        onDelete={async (ma) => { await deleteContract(ma); await refreshContracts(); }}
      />
      <TinChapPagination
        currentPage={state.currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        startIndex={startIndex}
        itemsPerPage={itemsPerPage}
        countAllItems={countAllItems}
      />
    </div>
  );
}


