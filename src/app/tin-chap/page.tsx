import type { Metadata } from "next";
import TinChapPage from "@/pages/tinchap/index";
import Navigation, { MobileBottomNav } from "@/components/layout/Navigation";

export const metadata: Metadata = {
  title: "Tín chấp - Conan",
  description: "Danh sách hợp đồng tín chấp",
};

export default function Page() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-4 p-4 pb-20 lg:pb-4">
      <div className="hidden lg:block">
        <Navigation currentPage="tinchap" />
      </div>
      <div>
        <TinChapPage />
      </div>
      <MobileBottomNav />
    </div>
  )
}


