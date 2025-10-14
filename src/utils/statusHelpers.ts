// Utility functions for handling contract status
export type ApiStatus = 'da_thanh_toan' | 'thanh_toan_mot_phan' | 'chua_thanh_toan' | 'tra_xong_lai' | 'den_han_tra_lai' | 'qua_han_tra_lai' | 'da_tat_toan';

/**
 * Get display text for status from API
 */
export const getStatusText = (status: string): string => {
  switch (status) {
    case 'da_thanh_toan':
      return 'Đóng đủ';
    case 'thanh_toan_mot_phan':
      return 'Thanh toán một phần';
    case 'tra_xong_lai':
      return 'Trả xong lãi';
    case 'den_han_tra_lai':
      return 'Đến hạn';
    case 'qua_han_tra_lai':
      return 'Nợ quá hạn';
    case 'da_tat_toan':
      return 'Hoàn thành';
    case 'chua_thanh_toan':
    default:
      return 'Chưa thanh toán';
  }
};

/**
 * Get CSS classes for status styling (text color + background color)
 */
export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'da_thanh_toan':
      return 'text-green-600 bg-green-100';  // Đóng đủ
    case 'thanh_toan_mot_phan':
      return 'text-amber-600 bg-amber-100';
    case 'tra_xong_lai':
      return 'text-blue-600 bg-blue-100';
    case 'den_han_tra_lai':
      return 'text-blue-600 bg-blue-100';    // Đến hạn
    case 'qua_han_tra_lai':
      return 'text-red-600 bg-red-100';      // Nợ quá hạn
    case 'da_tat_toan':
      return 'text-emerald-600 bg-emerald-100'; // Hoàn thành
    case 'chua_thanh_toan':
    default:
      return 'text-red-600 bg-red-100';
  }
};

/**
 * Check if contract is considered active (not fully paid)
 */
export const isActiveContract = (status: string): boolean => {
  return status === 'chua_thanh_toan' || status === 'thanh_toan_mot_phan' || status === 'tra_xong_lai' || status === 'den_han_tra_lai' || status === 'qua_han_tra_lai';
};

/**
 * Get display text for multiple statuses
 */
export const getMultipleStatusText = (statusList: string[]): string => {
  if (!statusList || statusList.length === 0) return 'Chưa thanh toán';
  if (statusList.length === 1) return getStatusText(statusList[0]);
  
  // Ưu tiên hiển thị trạng thái quan trọng nhất
  const priorityOrder = ['qua_han_tra_lai', 'den_han_tra_lai', 'tra_xong_lai', 'thanh_toan_mot_phan', 'chua_thanh_toan'];
  
  for (const priority of priorityOrder) {
    if (statusList.indexOf(priority) !== -1) {
      return getStatusText(priority);
    }
  }
  
  return getStatusText(statusList[0]);
};

/**
 * Get CSS classes for multiple statuses (ưu tiên trạng thái quan trọng nhất)
 */
export const getMultipleStatusColor = (statusList: string[]): string => {
  if (!statusList || statusList.length === 0) return 'text-red-600 bg-red-100';
  if (statusList.length === 1) return getStatusColor(statusList[0]);
  
  // Ưu tiên màu sắc theo mức độ quan trọng
  const priorityOrder = ['qua_han_tra_lai', 'den_han_tra_lai', 'tra_xong_lai', 'thanh_toan_mot_phan', 'chua_thanh_toan'];
  
  for (const priority of priorityOrder) {
    if (statusList.indexOf(priority) !== -1) {
      return getStatusColor(priority);
    }
  }
  
  return getStatusColor(statusList[0]);
};

export const getLoaiHopDong = (loai_hop_dong: string): string => {
  switch (loai_hop_dong) {
    case 'hop_dong_thuong':
      return 'Hợp đồng thường';
    case 'tra_goc_lai':
      return 'Trả gốc lãi';
    default:
      return 'Hợp đồng thường';
  }
};

export const getKieuLaiSuat = (kieu_lai_suat: string): string => {
  switch (kieu_lai_suat) {
    case 'ngay':
      return 'Ngày';
    case 'tuan':
      return 'Tuần';
    case 'thang':
      return 'Tháng';
    default:
      return 'Ngày';
  }
};