import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface TraGopFilterProps {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  selectedloai_hop_dong: string;
  setSelectedloai_hop_dong: (v: string) => void;
  selectedStatus: string;
  setSelectedStatus: (v: string) => void;
  selectedTimeRange: string;
  setSelectedTimeRange: (v: string) => void;
}

export default function TraGopFilter({
  searchTerm,
  setSearchTerm,
  selectedloai_hop_dong,
  setSelectedloai_hop_dong,
  selectedStatus,
  setSelectedStatus,
  selectedTimeRange,
  setSelectedTimeRange,
}: TraGopFilterProps) {
  return (
    <div className="my-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Tìm kiếm</label>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Tìm kiếm theo mã hợp đồng, tên khách hàng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-9 rounded-xl border-slate-200 bg-white shadow-sm focus:shadow-md transition-shadow"
            />
          </div>
        </div>
        {/* <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Loại hình vay</label>
          <Select value={selectedloai_hop_dong} onValueChange={setSelectedloai_hop_dong}>
            <SelectTrigger className="h-11 rounded-xl border-slate-200 bg-white shadow-sm">
              <SelectValue placeholder="Chọn loại hình" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả loại hình</SelectItem>
              <SelectItem value="hop_dong_thuong">Hợp đồng thường</SelectItem>
              <SelectItem value="tra_goc_lai">Trả gốc lãi</SelectItem>
            </SelectContent>
          </Select>
        </div> */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Trạng thái</label>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="h-11 rounded-xl border-slate-200 bg-white shadow-sm">
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
              <SelectItem value="chua_thanh_toan">Chưa thanh toán</SelectItem>
              <SelectItem value="da_thanh_toan">Đã thanh toán</SelectItem>
              <SelectItem value="thanh_toan_mot_phan">Thanh toán một phần</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Thời gian</label>
          <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
            <SelectTrigger className="h-11 rounded-xl border-slate-200 bg-white shadow-sm">
              <SelectValue placeholder="Chọn khoảng thời gian" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Hôm nay</SelectItem>
              <SelectItem value="yesterday">Hôm qua</SelectItem>
              <SelectItem value="tomorrow">Ngày mai</SelectItem>
              <SelectItem value="week">Tuần này</SelectItem>
              <SelectItem value="all">Tất cả thời gian</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}


