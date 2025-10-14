import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface TinChapFilterProps {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  selectedStatus: string;
  setSelectedStatus: (v: string) => void;
  selectedTimeRange: string;
  setSelectedTimeRange: (v: string) => void;
}

export default function TinChapFilter({
  searchTerm,
  setSearchTerm,
  selectedStatus,
  setSelectedStatus,
  selectedTimeRange,
  setSelectedTimeRange,
}: TinChapFilterProps) {
  return (
    <div className="my-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Trạng thái</label>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="h-11 rounded-xl border-slate-200 bg-white shadow-sm">
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="chua_thanh_toan">Chưa thanh toán</SelectItem>
                <SelectItem value="da_thanh_toan">Đã tất toán</SelectItem>
                <SelectItem value="thanh_toan_mot_phan">Thanh toán một phần</SelectItem>
                <SelectItem value="tra_xong_lai">Trả xong lãi</SelectItem>
                <SelectItem value="den_han_tra_lai">Đến hạn trả lãi</SelectItem>
                <SelectItem value="qua_han_tra_lai">Quá hạn trả lãi</SelectItem>
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
                <SelectItem value="all">Tất cả thời gian</SelectItem>
                <SelectItem value="hom_nay">Ngày hôm nay</SelectItem>
                <SelectItem value="thang_nay">Tháng này</SelectItem>
                <SelectItem value="quy_nay">Quý này</SelectItem>
                <SelectItem value="nam_nay">Năm này</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
