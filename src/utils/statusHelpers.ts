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