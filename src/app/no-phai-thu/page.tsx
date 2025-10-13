import type { Metadata } from "next";
import NoPhaiThuPage from "@/pages/nophaithu/index";
import Navigation, { MobileBottomNav } from "@/components/layout/Navigation";

export const metadata: Metadata = {
  title: "Nợ phải thu - Conan",
  description: "Danh sách hợp đồng còn nợ phải thu",
};

export default function Page() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-4 p-4 pb-20 lg:pb-4">
      <div className="hidden lg:block">
        <Navigation currentPage="noPhaiThu" />
      </div>
      <div>
        <NoPhaiThuPage />
      </div>
      <MobileBottomNav />
    </div>
  )
}


