import {
  Home,
  TrendingDown,
  CreditCard,
  PieChart,
  PiggyBank,
} from "lucide-react"

export const NAVIGATION_SECTIONS = [
  {
    title: "Chính",
    items: [
      {
        id: "home",
        title: "Trang chủ",
        icon: Home,
        href: "/",
        iconBg: "bg-blue-100",
        hoverColor: "hover:bg-blue-50 hover:text-blue-700",
        badge: undefined,
        onClick: undefined,
      },
      {
        id: "no-phai-thu",
        title: "Nợ phải thu",
        icon: TrendingDown,
        href: "/no-phai-thu",
        badge: {
          count: 0,
          color: "bg-red-500 text-white",
          show: true
        },
        iconBg: "bg-red-100",
        hoverColor: "hover:bg-red-50 hover:text-red-700",
        onClick: undefined,
      },
    ],
  },
  {
    title: "Giao dịch",
    items: [
      {
        id: "credit",
        title: "Tín chấp",
        icon: CreditCard,
        href: "/tin-chap",
        iconBg: "bg-green-100",
        hoverColor: "hover:bg-green-50 hover:text-green-700",
        badge: undefined,
        onClick: undefined,
      },
      {
        id: "installment",
        title: "Trả góp",
        icon: PiggyBank,
        iconBg: "bg-purple-100",
        hoverColor: "hover:bg-purple-50 hover:text-purple-700",
        badge: undefined,
        href: "/tra-gop", 
        onClick: undefined,
      },
    ],
  },
  {
    title: "Quản lý",
    items: [  
      {
        id: "statistics",
        title: "Thống kê",
        icon: PieChart,
        iconBg: "bg-blue-100",
        hoverColor: "hover:bg-blue-50 hover:text-blue-700",
        badge: undefined,
        href: "/thong-ke",
        onClick: undefined,
      },
    ],
  },
]