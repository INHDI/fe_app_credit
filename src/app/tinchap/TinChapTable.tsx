import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Eye, Trash2, DollarSign } from 'lucide-react';
import { formatCurrency } from "@/utils/formatters";
import { CreditContract } from "@/hooks/useTinChap";
import DeleteConfirmModal from "@/components/ui/DeleteConfirmModal";
import { getStatusText, getStatusColor } from "@/utils/statusHelpers";
import TinChapSettleModal from "./TinChapSettleModal";

interface TinChapTableProps {
  contracts: CreditContract[];
  startIndex: number;
  itemsPerPage: number;
  onViewDetails: (contract: CreditContract) => void;
  onSettled?: () => void;
  onDelete?: (maHopDong: string) => void | Promise<void>;
  onSettleContract?: (maHopDong: string) => void | Promise<void>;
}

export default function TinChapTable({ contracts, startIndex, onViewDetails, onSettled, onDelete, onSettleContract }: TinChapTableProps) {
  // Generate unique instance ID for this component instance
  const instanceId = useMemo(() => Math.random().toString(36).substr(2, 9), []);
  
  const [showDelete, setShowDelete] = useState(false);
  const [selectedForDelete, setSelectedForDelete] = useState<CreditContract | null>(null);
  const [showSettle, setShowSettle] = useState(false);
  const [selectedForSettle, setSelectedForSettle] = useState<CreditContract | null>(null);

  const handleOpenSettle = (contract: CreditContract) => {
    setSelectedForSettle(contract);
    setShowSettle(true);
  };

  const handleCloseSettle = () => {
    setShowSettle(false);
    setSelectedForSettle(null);
  };


  return (
    <TooltipProvider>
      <div className="mb-6">
      {/* Desktop/Table view */}
      <div className="overflow-x-auto hidden md:block">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-200">
            <tr>
              <th className="text-left p-4 font-semibold text-slate-700 text-sm">STT</th>
              <th className="text-left p-4 font-semibold text-slate-700 text-sm">Mã hợp đồng</th>
              <th className="text-left p-4 font-semibold text-slate-700 text-sm">Khách hàng</th>
              <th className="text-left p-4 font-semibold text-slate-700 text-sm">Tín chấp</th>
              <th className="text-right p-4 font-semibold text-slate-700 text-sm">Gốc vay</th>
              <th className="text-right p-4 font-semibold text-slate-700 text-sm">Lãi đã trả</th>
              <th className="text-right p-4 font-semibold text-slate-700 text-sm">Còn phải thu</th>
              
              <th className="text-center p-4 font-semibold text-slate-700 text-sm">Trạng thái</th>
              <th className="text-center p-4 font-semibold text-slate-700 text-sm">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map((contract, index) => (
              <tr key={`tinchap-table-${instanceId}-${startIndex}-${index}-${contract.id}`} className="border-b border-slate-100 hover:bg-gradient-to-r hover:from-slate-50/50 hover:to-blue-50/30 transition-all duration-200">
                <td className="p-4 text-slate-600 font-medium">{startIndex + index + 1}</td>
                <td className="p-4">
                  <div className="space-y-1">
                    <div className="font-semibold text-slate-800 text-sm">{contract.ma_hop_dong}</div>
                    <div className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-md inline-block">
                      {contract.customerInfo}
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="font-medium text-slate-800">{contract.ten_khach_hang}</div>
                </td>
                <td className="p-4">
                  <Badge className="bg-emerald-100 text-emerald-700 border-0 font-medium px-3 py-1 rounded-full">
                    Tín chấp
                  </Badge>
                </td>
                <td className="p-4 text-right">
                  <div className="space-y-1">
                    <div className="font-bold text-slate-800 text-sm">{formatCurrency(contract.tong_tien_vay)}</div>
                    <div className="text-xs text-slate-500">{contract.lai_suat}/{contract.kieu_lai_suat}</div>
                  </div>
                </td>
                <td className="p-4 text-right">
                  <div className="font-bold text-green-600 text-sm">{formatCurrency(contract.total_interest_paid || 0)}</div>
                </td>
                <td className="p-4 text-right">
                  <div className="font-bold text-red-600 text-sm">{formatCurrency(contract.unpaid_amount || 0)}</div>
                </td>
                
                <td className="p-4 text-center">
                  <div className="flex flex-col gap-1 items-center">
                    {/* Hiển thị tất cả trạng thái với màu sắc riêng */}
                    {contract.statusList && contract.statusList.length > 1 ? (
                      contract.statusList.map((status, index) => (
                        <Badge 
                          key={`desktop-${contract.ma_hop_dong}-${index}`}
                          className={`${getStatusColor(status)} border-0 font-medium px-2 py-1 rounded-full text-xs`}
                        >
                          {getStatusText(status)}
                        </Badge>
                      ))
                    ) : (
                      <Badge className={`${contract.statusColor} border-0 font-medium px-3 py-1 rounded-full shadow-sm`}>
                        {contract.status}
                      </Badge>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-center gap-1">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-9 w-9 p-0 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:shadow-sm" 
                          aria-label="Xem chi tiết"
                          onClick={() => onViewDetails(contract)}
                        >
                          <Eye className="h-4 w-4 text-blue-600" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Xem chi tiết hợp đồng</p>
                      </TooltipContent>
                    </Tooltip>
                    
                    {/* <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-9 w-9 p-0 hover:bg-green-50 rounded-lg transition-all duration-200 hover:shadow-sm" aria-label="Chỉnh sửa">
                          <Edit className="h-4 w-4 text-green-600" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Chỉnh sửa hợp đồng</p>
                      </TooltipContent>
                    </Tooltip> */}
                    
                    {/* Chỉ hiển thị nút tất toán khi chưa tất toán */}
                    {contract.status !== 'da_thanh_toan' && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-9 w-9 p-0 hover:bg-emerald-50 rounded-lg transition-all duration-200 hover:shadow-sm" 
                            aria-label="Tất toán"
                            onClick={() => handleOpenSettle(contract)}
                          >
                            <DollarSign className="h-4 w-4 text-emerald-600" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Tất toán</p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                    
                    {onDelete && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-9 w-9 p-0 hover:bg-red-50 rounded-lg transition-all duration-200 hover:shadow-sm" 
                            aria-label="Xóa hợp đồng"
                            onClick={() => { setSelectedForDelete(contract); setShowDelete(true); }}
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Xóa hợp đồng</p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile/Card view */}
      <div className="space-y-3 md:hidden">
        {contracts.map((contract, index) => (
          <div key={`tinchap-mobile-${instanceId}-${startIndex}-${index}-${contract.id}`} className="rounded-xl border border-slate-200 bg-white shadow-sm p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xs text-slate-500">#{startIndex + index + 1} • {contract.ma_hop_dong}</div>
                <div className="font-semibold text-slate-800">{contract.ten_khach_hang}</div>
                <div className="text-xs text-slate-500 mt-1">{contract.customerInfo}</div>
              </div>
              <div className="flex flex-col gap-1 items-center">
                {/* Hiển thị tất cả trạng thái với màu sắc riêng */}
                {contract.statusList && contract.statusList.length > 1 ? (
                  contract.statusList.map((status, index) => (
                    <Badge 
                      key={`mobile-${contract.ma_hop_dong}-${index}`}
                      className={`${getStatusColor(status)} border-0 font-medium px-2 py-0.5 rounded-full text-xs`}
                    >
                      {getStatusText(status)}
                    </Badge>
                  ))
                ) : (
                  <Badge className={`${contract.statusColor} border-0 font-medium px-2 py-0.5 rounded-full`}>
                    {contract.status}
                  </Badge>
                )}
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div>
                <div className="text-xs text-slate-500">{contract.lai_suat}/{contract.kieu_lai_suat}</div>
                <div className="text-sm font-medium text-slate-800">Tín chấp</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-500">Gốc vay</div>
                <div className="text-sm font-bold text-slate-800">{formatCurrency(contract.tong_tien_vay)}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Tổng lãi (đến hiện tại)</div>
                <div className="text-sm font-bold text-amber-600">{formatCurrency(contract.amount_to_collect || 0)}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Lãi đã trả</div>
                <div className="text-sm font-bold text-green-600">{formatCurrency(contract.total_interest_paid || 0)}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Còn phải thu</div>
                <div className="text-sm font-bold text-red-600">{formatCurrency(contract.unpaid_amount || 0)}</div>
              </div>
            </div>
            
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-end gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="default" size="sm" className="rounded-lg flex-1" onClick={() => onViewDetails(contract)}>
                      <Eye className="h-4 w-4 mr-1" /> Chi tiết
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Xem chi tiết hợp đồng</p>
                  </TooltipContent>
                </Tooltip>
                {/* Chỉ hiển thị nút tất toán khi chưa tất toán */}
                {contract.status !== 'da_thanh_toan' && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="rounded-lg border-emerald-200 text-emerald-700 hover:bg-emerald-50 flex-1" 
                        onClick={() => handleOpenSettle(contract)}
                      >
                        <DollarSign className="h-4 w-4 mr-1" /> Tất toán
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Tất toán</p>
                    </TooltipContent>
                  </Tooltip>
                )}
                {onDelete && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="destructive" size="sm" className="rounded-lg flex-1" onClick={() => { setSelectedForDelete(contract); setShowDelete(true); }}>
                        <Trash2 className="h-4 w-4 mr-1" /> Xóa
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Xóa hợp đồng</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    

    {/* Settle Modal */}
    <TinChapSettleModal
      isOpen={showSettle}
      onClose={handleCloseSettle}
      contract={selectedForSettle}
      onRefresh={onSettled}
    />

    {onDelete && (
      <DeleteConfirmModal
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        maHopDong={selectedForDelete?.ma_hop_dong}
        tenKhachHang={selectedForDelete?.ten_khach_hang}
        onConfirm={async () => {
          if (selectedForDelete) {
            await onDelete(selectedForDelete.ma_hop_dong);
          }
        }}
      />
    )}
    </TooltipProvider>
  );
}
