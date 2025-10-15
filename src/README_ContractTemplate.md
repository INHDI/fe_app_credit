# Contract Modal Template System

Hệ thống template modal hợp đồng linh hoạt cho phép tái sử dụng cho tất cả các loại hợp đồng.

## Cấu trúc Files

```
src/
├── types/
│   └── contract.ts                 # Định nghĩa types và interfaces
├── config/
│   └── contractConfigs.ts          # Cấu hình cho từng loại hợp đồng
├── components/ui/
│   ├── GenericContractModal.tsx    # Template chính
│   ├── AddCreditContractModal.tsx  # Modal tín chấp (đã refactor)
│   ├── AddTraGopModal.tsx         # Modal trả góp
│   ├── AddTheChapModal.tsx        # Modal thế chấp
│   └── ContractModalFactory.tsx   # Factory component
└── examples/
    └── ContractModalUsage.tsx     # Ví dụ sử dụng
```

## Cách sử dụng

### 1. Sử dụng Factory Pattern (Khuyến nghị)

```tsx
import { ContractType } from '@/types/contract';
import ContractModalFactory from '@/components/ui/ContractModalFactory';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [contractType, setContractType] = useState(ContractType.TIN_CHAP);

  return (
    <ContractModalFactory
      contractType={contractType}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onSave={(data) => console.log(data)}
    />
  );
}
```

### 2. Sử dụng Modal riêng lẻ

```tsx
import AddCreditContractModal from '@/components/ui/AddCreditContractModal';

function MyComponent() {
  return (
    <AddCreditContractModal
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
    />
  );
}
```

### 3. Tạo Modal mới cho loại hợp đồng khác

1. **Thêm type mới vào `contract.ts`:**
```tsx
export interface NewContractFormData extends BaseContractFormData {
  // Thêm fields mới
  newField: string;
}

export enum ContractType {
  // ... existing types
  NEW_CONTRACT = "new_contract"
}
```

2. **Thêm config vào `contractConfigs.ts`:**
```tsx
export const contractConfigs: Record<ContractType, ContractModalConfig> = {
  // ... existing configs
  [ContractType.NEW_CONTRACT]: {
    title: 'Thêm mới hợp đồng mới',
    fields: [
      // ... field configurations
    ],
    defaultValues: {
      // ... default values
    }
  }
};
```

3. **Tạo component modal:**
```tsx
// AddNewContractModal.tsx
import GenericContractModal from './GenericContractModal';
import { getContractConfig } from '@/config/contractConfigs';
import { ContractType } from '@/types/contract';

export default function AddNewContractModal(props) {
  const config = getContractConfig(ContractType.NEW_CONTRACT);
  return <GenericContractModal {...props} config={config} />;
}
```

## Field Types được hỗ trợ

- `text`: Input text thông thường
- `number`: Input số
- `currency`: Input tiền tệ (có format VN)
- `date`: Input ngày tháng
- `select`: Dropdown select
- `textarea`: Textarea
- `email`: Input email
- `phone`: Input số điện thoại

## Field Configuration

```tsx
interface FieldConfig {
  key: string;                    // Tên field
  label: string;                  // Label hiển thị
  type: FieldType;               // Loại field
  placeholder?: string;          // Placeholder
  required?: boolean;            // Bắt buộc
  icon?: React.ComponentType;    // Icon
  options?: SelectOption[];      // Options cho select
  gridCols?: number;            // Số cột grid
  validation?: {                 // Validation rules
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
  formatValue?: (value: any) => string;  // Format hiển thị
  parseValue?: (value: string) => any;  // Parse từ input
}
```

## Lợi ích

1. **Tái sử dụng**: Một template cho tất cả loại hợp đồng
2. **Linh hoạt**: Dễ dàng thêm loại hợp đồng mới
3. **Nhất quán**: UI/UX đồng nhất
4. **Dễ bảo trì**: Chỉ cần sửa ở một nơi
5. **Type Safety**: Full TypeScript support

## Migration từ Modal cũ

Modal cũ đã được refactor để sử dụng template mới:

```tsx
// Trước
<AddCreditContractModal 
  isOpen={isOpen}
  onClose={onClose}
  onSave={handleSave}
  loading={loading}
  error={error}
  success={success}
/>

// Sau (không thay đổi API)
<AddCreditContractModal 
  isOpen={isOpen}
  onClose={onClose}
  onSave={handleSave}
  loading={loading}
  error={error}
  success={success}
/>
```

API không thay đổi, chỉ implementation bên trong sử dụng template mới.
