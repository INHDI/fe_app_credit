## Cấu trúc thư mục `src`

Dưới đây là mô tả ngắn gọn, dễ tra cứu cho từng thư mục trong `src/`.

### Danh mục nhanh

| Thư mục | Mục đích | Ví dụ nội dung |
|---|---|---|
| `app/` | Next.js App Router (routes, layouts, server actions) | `app/page.tsx`, `app/api/*` |
| `components/` | UI components tái sử dụng | `Button.tsx`, `Modal.tsx` |
| `features/` | Tổ chức theo tính năng/domain | `auth/`, `dashboard/` |
| `lib/` | Thư viện cấp app, clients/SDK/adapters | `axiosClient.ts`, `queryClient.ts` |
| `utils/` | Hàm tiện ích thuần (pure), dễ test | `formatCurrency.ts` |
| `hooks/` | Custom React hooks dùng chung | `useDebounce.ts`, `useAuth.ts` |
| `services/` | Giao tiếp bên ngoài: API, storage, analytics | `userService.ts` |
| `store/` | State management (Zustand/Redux), selectors | `useUserStore.ts`, `slices/` |
| `context/` | React Context và Providers liên quan | `ThemeContext.tsx` |
| `providers/` | App-level providers (Theme, Query, i18n) | `AppProviders.tsx` |
| `styles/` | Global styles, theme tokens, Tailwind layers | `globals.css` |
| `types/` | TypeScript types/interfaces, DTOs | `api.d.ts`, `entities.ts` |
| `constants/` | Hằng số, enums, route names, keys | `routes.ts`, `env.ts` |
| `config/` | Cấu hình app, env helpers, runtime config | `config.ts` |
| `api/` | Client API layer: request builders, schemas | `endpoints.ts`, `schemas.ts` |
| `assets/` | Tài nguyên tĩnh | `images/`, `icons/`, `fonts/` |
| `tests/` | Unit/Integration/E2E (nếu đặt trong `src/`) | `__tests__/`, `fixtures/` |
| `mocks/` | Mock data, MSW handlers | `handlers.ts`, `data/*.json` |

### Ghi chú

- Route Handlers chuẩn Next.js nên đặt trong `app/api/*` (App Router).
- Ưu tiên tổ chức theo `features/` cho phần business, dùng `components/` cho phần UI tái sử dụng đa nơi.
- `services/` chỉ nên trả về dữ liệu đã chuẩn hóa; logic trình bày để ở `features/`/`components/`.
