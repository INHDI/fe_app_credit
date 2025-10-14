"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { Plus } from "lucide-react";
import TraGopFilter from "./TraGopFilter";
import TraGopSummary from "./TraGopSummary";
import TraGopTable from "./TraGopTable";
import TraGopPagination from "./TraGopPagination";
import { useTraGop } from "@/hooks/useTraGop";

export default function Page() {
  const {
    breadcrumbItems,
    state,
    setSearchTerm,
    setSelectedloai_hop_dong,
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
  } = useTraGop();

  const headerActions = (
    <div className="flex items-center gap-3">
      <button type="button" onClick={() => {}} className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg rounded-xl px-4 py-2 flex items-center gap-2">
        <Plus className="h-4 w-4 mr-2" />
        Thêm hợp đồng trả góp
      </button>
    </div>
  );

  return (
    <div>
      <PageHeader
        title="Quản lý Trả góp"
        description="Theo dõi và quản lý các hợp đồng trả góp một cách hiệu quả"
        breadcrumbs={breadcrumbItems}
        actions={headerActions}
      />

      <TraGopFilter
        searchTerm={state.searchTerm}
        setSearchTerm={setSearchTerm}
        selectedloai_hop_dong={state.selectedloai_hop_dong}
        setSelectedloai_hop_dong={setSelectedloai_hop_dong}
        selectedStatus={state.selectedStatus}
        setSelectedStatus={setSelectedStatus}
        selectedTimeRange={state.selectedTimeRange}
        setSelectedTimeRange={setSelectedTimeRange}
      />

      <TraGopSummary summaryCards={summaryCards} />

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <TraGopTable
          contracts={paginatedContracts}
          startIndex={startIndex}
          itemsPerPage={itemsPerPage}
          onViewDetails={openDetailModal}
          onSettled={refreshContracts}
          onDelete={async (ma) => { await deleteContract(ma); await refreshContracts(); }}
        />
        <TraGopPagination
          currentPage={state.currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          startIndex={startIndex}
          itemsPerPage={itemsPerPage}
          countAllItems={countAllItems}
        />
      </div>
    </div>
  );
}


