import { useNavigation } from "@/hooks/useNavigation";
import { useMemo, useState } from "react";
import { FileText, DollarSign, TrendingUp, AlertCircle } from "lucide-react";
import { formatCurrency } from "@/utils/formatters";

export interface CreditContract {
  id: string;
  ma_hop_dong: string;
  ten_khach_hang: string;
  customerInfo: string;
  loai_hop_dong: string;
  tong_tien_can_tra: number;
  lai_suat: string;
  kieu_lai_suat: string;
  tien_da_tra: string; // string in table usage
  tong_tien_con_lai: string; // string in table usage
  tien_can_tra_theo_ky: number;
  status: string;
  statusColor: string;
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

export function useTraGop() {
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
      label: "Trả góp",
      isActive: true,
    },
  ];

  // Fake data
  const initialContracts: CreditContract[] = useMemo(
    () => [
      {
        id: "TG001",
        ma_hop_dong: "HD-TG-0001",
        ten_khach_hang: "Phạm Minh D",
        customerInfo: "CCCD 123456789000",
        loai_hop_dong: "Trả gốc lãi",
        tong_tien_can_tra: 60000000,
        lai_suat: "2.2%",
        kieu_lai_suat: "thang",
        tien_da_tra: String(18000000),
        tong_tien_con_lai: String(42000000),
        tien_can_tra_theo_ky: 3000000,
        status: "Đang trả góp",
        statusColor: "bg-blue-100 text-blue-700",
      },
      {
        id: "TG002",
        ma_hop_dong: "HD-TG-0002",
        ten_khach_hang: "Đỗ Thị E",
        customerInfo: "CCCD 222333444555",
        loai_hop_dong: "Hợp đồng thường",
        tong_tien_can_tra: 45000000,
        lai_suat: "1.8%",
        kieu_lai_suat: "thang",
        tien_da_tra: String(45000000),
        tong_tien_con_lai: String(0),
        tien_can_tra_theo_ky: 2500000,
        status: "Đã thanh toán",
        statusColor: "bg-emerald-100 text-emerald-700",
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
  const [selectedloai_hop_dong, setSelectedloai_hop_dong] = useState<string>("all");

  const itemsPerPage = 10;

  // Derived
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
      if (selectedStatus === "da_thanh_toan") {
        list = list.filter((c) => c.status === "Đã thanh toán");
      } else if (selectedStatus === "chua_thanh_toan") {
        list = list.filter((c) => c.status !== "Đã thanh toán");
      } else if (selectedStatus === "thanh_toan_mot_phan") {
        list = list.filter((c) => parseFloat(c.tong_tien_con_lai) > 0 && parseFloat(c.tien_da_tra) > 0);
      }
    }
    if (selectedloai_hop_dong !== "all") {
      list = list.filter((c) => c.loai_hop_dong === selectedloai_hop_dong);
    }
    // selectedTimeRange ignored in fake mode
    return list;
  }, [contracts, searchTerm, selectedStatus, selectedloai_hop_dong]);

  const countAllItems = filteredContracts.length;
  const totalPages = Math.ceil(countAllItems / itemsPerPage) || 0;
  const safeCurrentPage = Math.min(Math.max(currentPage, 1), Math.max(totalPages, 1));
  const startIndex = (safeCurrentPage - 1) * itemsPerPage;
  const paginatedContracts = filteredContracts.slice(startIndex, startIndex + itemsPerPage);

  // Summary
  const summaryStats = useMemo(() => {
    const totalContracts = filteredContracts.length;
    const activeContracts = filteredContracts.filter((c) => c.status !== "Đã thanh toán").length;
    const totaltong_tien_vay = filteredContracts.reduce((sum, c) => sum + (c.tong_tien_can_tra || 0), 0);
    const totaltien_da_tra = filteredContracts.reduce((sum, c) => sum + parseFloat(c.tien_da_tra || "0"), 0);
    const totaltong_tien_con_lai = filteredContracts.reduce((sum, c) => sum + parseFloat(c.tong_tien_con_lai || "0"), 0);
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
    },
  ];

  // Actions (fake)
  const openDetailModal = (contract: CreditContract) => {
    console.log("open detail", contract);
  };
  const refreshContracts = () => {};
  const deleteContract = async (maHopDong: string) => {
    setContracts((prev) => prev.filter((c) => c.ma_hop_dong !== maHopDong));
  };

  return {
    breadcrumbItems,
    state: {
      currentPage: safeCurrentPage,
      searchTerm,
      selectedloai_hop_dong,
      selectedAsset: "",
      selectedTimeRange,
      selectedStatus,
      isAddModalOpen: false,
      isDetailModalOpen: false,
    },
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
  };
}


