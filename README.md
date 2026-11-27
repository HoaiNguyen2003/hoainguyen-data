# Nguyễn Thanh Hoài — CV / Portfolio

Trang CV online (song ngữ VI/EN) của Nguyễn Thanh Hoài — Data Engineer.
Live: https://hoainguyen2003.github.io

## Cấu trúc

| Đường dẫn | Vai trò |
|---|---|
| `index.html` | Toàn bộ nội dung. Mỗi đoạn có 2 bản `<span lang="vi">` / `<span lang="en">` |
| `assets/css/style.css` | Giao diện, responsive, bản in A4 |
| `assets/js/main.js` | Chuyển ngôn ngữ, lightbox ảnh, highlight menu |
| `assets/img/` | Ảnh đã tối ưu (WebP), `thumbs/` cho gallery |
| `assets/files/` | CV PDF để tải về |

Không có bước build. Mở `index.html` trực tiếp hoặc chạy `python -m http.server 8000`.

## Sửa nội dung

- Sửa text trong `index.html` — nhớ sửa **cả 2 ngôn ngữ**.
- `?lang=en` mở thẳng bản tiếng Anh (gửi cho nhà tuyển dụng nước ngoài).
- Thêm ảnh minh chứng: đặt ảnh gốc vào thư mục riêng (không push), tối ưu về ≤ 300KB WebP, thêm 1 khối `<li>` trong `#gallery`.

## Deploy

GitHub Pages: repo `HoaiNguyen2003.github.io`, Settings → Pages → *Deploy from a branch* → `main` / `/ (root)`.

> Dữ liệu cá nhân gốc (ngày sinh, ảnh scan bằng gốc, ghi chú) được loại khỏi repo bằng `.gitignore`.
