import { useNavigation } from "@/hooks/useNavigation";
import { useMemo, useState } from "react";
import { FileText, DollarSign, TrendingUp, AlertCircle } from "lucide-react";
import { formatCurrency } from "@/utils/formatters";

export type ContractStatus =
  | "chua_thanh_toan"
  | "da_thanh_toan"
  | "thanh_toan_mot_phan"
  | "tra_xong_lai"
  | "den_han_tra_lai"
  | "qua_han_tra_lai";

export interface CreditContract {
  id: string;
  ma_hop_dong: string;
  ten_khach_hang: string;
  customerInfo: string;
  tong_tien_vay: number;
  lai_suat: string;
  kieu_lai_suat: string;
  total_interest_paid?: number;
  unpaid_amount?: number;
  amount_to_collect?: number;
  status: string;
  statusColor: string;
  statusList?: ContractStatus[];
}

export interface SummaryCard {
  title: string;
  value: string;
  subtitle: string;
  description: string;
  icon: any;
  gradient: string;
  iconBg: string;
  textColor: string;
}

export function useTinChap() {
  const { navigateTo } = useNavigation();
  const breadcrumbItems: Array<{
    label: string;
    onClick?: () => void;
    isActive?: boolean;
  }> = [
    {
      label: "Trang chủ",
      onClick: () => navigateTo("/"),
    },
    {
      label: "Tín chấp",
      isActive: true,
    },
  ];

  // Fake data
  const initialContracts: CreditContract[] = useMemo(
    () => [
      {
        id: "C001",
        ma_hop_dong: "HD-TC-0001",
        ten_khach_hang: "Nguyễn Văn A",
        customerInfo: "CCCD 012345678901",
        tong_tien_vay: 50000000,
        lai_suat: "3%",
        kieu_lai_suat: "thang",
        total_interest_paid: 3000000,
        unpaid_amount: 12000000,
        amount_to_collect: 1500000,
        status: "Chưa thanh toán",
        statusColor: "bg-amber-100 text-amber-700",
        statusList: ["chua_thanh_toan", "den_han_tra_lai"],
      },
      {
        id: "C002",
        ma_hop_dong: "HD-TC-0002",
        ten_khach_hang: "Trần Thị B",
        customerInfo: "CCCD 098765432109",
        tong_tien_vay: 30000000,
        lai_suat: "2.5%",
        kieu_lai_suat: "thang",
        total_interest_paid: 8000000,
        unpaid_amount: 0,
        amount_to_collect: 0,
        status: "Đã tất toán",
        statusColor: "bg-emerald-100 text-emerald-700",
        statusList: ["da_thanh_toan"],
      },
      {
        id: "C003",
        ma_hop_dong: "HD-TC-0003",
        ten_khach_hang: "Lê Văn C",
        customerInfo: "CCCD 034567890123",
        tong_tien_vay: 80000000,
        lai_suat: "3.2%",
        kieu_lai_suat: "thang",
        total_interest_paid: 5500000,
        unpaid_amount: 25000000,
        amount_to_collect: 2200000,
        status: "Thanh toán một phần",
        statusColor: "bg-blue-100 text-blue-700",
        statusList: ["thanh_toan_mot_phan"],
      },
    ],
    []
  );

  // UI state
  const [contracts, setContracts] = useState<CreditContract[]>(initialContracts);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>("all");

  const itemsPerPage = 10;

  // Derived data
  const filteredContracts = useMemo(() => {
    let list = contracts;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(
        (c) =>
          c.ma_hop_dong.toLowerCase().includes(q) ||
          c.ten_khach_hang.toLowerCase().includes(q) ||
          c.customerInfo.toLowerCase().includes(q)
      );
    }
    if (selectedStatus !== "all") {
      list = list.filter((c) =>
        (c.statusList || []).includes(selectedStatus as any)
      );
    }
    // selectedTimeRange is ignored in fake mode, kept for API parity
    return list;
  }, [contracts, searchTerm, selectedStatus]);

  const countAllItems = filteredContracts.length;
  const totalPages = Math.ceil(countAllItems / itemsPerPage) || 0;
  const safeCurrentPage = Math.min(Math.max(currentPage, 1), Math.max(totalPages, 1));
  const startIndex = (safeCurrentPage - 1) * itemsPerPage;
  const paginatedContracts = filteredContracts.slice(startIndex, startIndex + itemsPerPage);

  // Summary stats based on current filtered list
  const summaryStats = useMemo(() => {
    const totalContracts = filteredContracts.length;
    const activeContracts = filteredContracts.filter(c => !(c.statusList || []).includes("da_thanh_toan" as any)).length;
    const totaltong_tien_vay = filteredContracts.reduce((sum, c) => sum + (c.tong_tien_vay || 0), 0);
    const totaltien_da_tra = filteredContracts.reduce((sum, c) => sum + (c.total_interest_paid || 0), 0);
    const totaltong_tien_con_lai = filteredContracts.reduce((sum, c) => sum + (c.unpaid_amount || 0), 0);
    return { totalContracts, activeContracts, totaltong_tien_vay, totaltien_da_tra, totaltong_tien_con_lai };
  }, [filteredContracts]);

  const summaryCards: SummaryCard[] = [
    {
      title: "Tổng hợp đồng",
      value: summaryStats.totalContracts.toString(),
      subtitle: "Hợp đồng",
      description: `${summaryStats.activeContracts} đang hoạt động`,
      icon: FileText,
      gradient: "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200",
      iconBg: "bg-blue-100",
      textColor: "text-blue-700",
    },
    {
      title: "Tổng tiền cho vay",
      value: formatCurrency(summaryStats.totaltong_tien_vay),
      subtitle: "VNĐ",
      description: "Tổng giá trị cho vay",
      icon: DollarSign,
      gradient: "bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200",
      iconBg: "bg-emerald-100",
      textColor: "text-emerald-700",
    },
    {
      title: "Đã thu về",
      value: formatCurrency(summaryStats.totaltien_da_tra),
      subtitle: "VNĐ",
      description: `${((summaryStats.totaltien_da_tra / summaryStats.totaltong_tien_vay) * 100 || 0).toFixed(1)}%`,
      icon: TrendingUp,
      gradient: "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200",
      iconBg: "bg-green-100",
      textColor: "text-green-700",
    },
    {
      title: "Còn phải thu",
      value: formatCurrency(summaryStats.totaltong_tien_con_lai),
      subtitle: "VNĐ",
      description: "Số tiền chưa thu",
      icon: AlertCircle,
      gradient: "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200",
      iconBg: "bg-amber-100",
      textColor: "text-amber-700",
    }
  ];

  // Handlers
  const openDetailModal = (contract: CreditContract) => {
    console.log("open detail", contract);
  };

  const refreshContracts = () => {
    // no-op in fake mode
  };

  const deleteContract = async (maHopDong: string) => {
    setContracts((prev) => prev.filter((c) => c.ma_hop_dong !== maHopDong));
  };

  return {
    breadcrumbItems,
    // state and setters expected by page.tsx
    state: {
      currentPage: safeCurrentPage,
      searchTerm,
      selectedloai_hop_dong: "",
      selectedAsset: "",
      selectedTimeRange,
      selectedStatus,
      isAddModalOpen: false,
      isDetailModalOpen: false,
    },
    setSearchTerm,
    setSelectedStatus,
    setSelectedTimeRange,
    setCurrentPage,
    // data
    summaryCards,
    paginatedContracts,
    startIndex,
    itemsPerPage,
    totalPages,
    countAllItems,
    // actions
    openDetailModal,
    refreshContracts,
    deleteContract,
  };
}
