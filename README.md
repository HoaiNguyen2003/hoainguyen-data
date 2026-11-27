# Nguyễn Thanh Hoài — CV / Portfolio

Trang CV online (song ngữ VI/EN) của Nguyễn Thanh Hoài — Data Engineer.
Live: https://hoainguyen2003.github.io/hoainguyen-data/ · Bản tiếng Anh: thêm `?lang=en`

## Cấu trúc

| Đường dẫn | Vai trò |
|---|---|
| `index.html` | Toàn bộ nội dung. Mỗi đoạn có 2 bản `<span lang="vi">` / `<span lang="en">` |
| `assets/css/style.css` | Giao diện, responsive, bản in A4 |
| `assets/js/main.js` | Chuyển ngôn ngữ, lightbox ảnh, highlight menu |
| `assets/img/` | Ảnh đã tối ưu (WebP), `thumbs/` cho gallery |
| `assets/files/` | CV PDF để tải về |

Không có bước build — sửa file là xong, push lên là web tự cập nhật.

## Quy trình cập nhật (4 bước)

Mở PowerShell / Terminal trong VS Code tại thư mục dự án (`D:\Project DE\profile about me`).

### 1. Sửa và xem thử trên máy

```powershell
python -m http.server 8000      # rồi mở http://127.0.0.1:8000  (Ctrl+C để tắt)
```

Sửa file → lưu → F5 trình duyệt để xem. Nhớ thử cả nút **EN**.

### 2. Kiểm tra những gì đã thay đổi

```powershell
git status          # liệt kê file đã sửa / thêm
git diff            # xem chi tiết dòng nào thay đổi (phím q để thoát)
```

Chỉ được thấy file của web (`index.html`, `assets/...`). Nếu thấy `thong_tin.md`, `image/`, file PDF gốc… thì **dừng lại**, đừng commit.

### 3. Lưu thay đổi (commit)

```powershell
git add -A
git commit -m "Cập nhật: thêm dự án X"
```

Viết message ngắn mô tả đã sửa gì.

### 4. Đẩy lên GitHub (push)

```powershell
git push
```

Đợi ~1 phút → mở link Live, nhấn **Ctrl+F5** (tải lại không dùng cache). Tiến trình deploy xem ở tab **Actions** của repo.

## Các việc hay gặp

| Muốn… | Làm thế nào |
|---|---|
| Sửa chữ | Tìm đoạn trong `index.html` (Ctrl+F), sửa **cả** `<span lang="vi">` **và** `<span lang="en">` |
| Thêm dự án | Copy nguyên một khối `<article class="project">…</article>` trong mục `#projects`, sửa nội dung |
| Thêm thành tích | Copy một khối `<li class="award">…</li>` trong `#achievements` |
| Thay CV PDF | Chép file mới đè lên `assets/files/NguyenThanhHoai-DataEngineer-CV.pdf` (giữ nguyên tên) |
| Thêm ảnh minh chứng | Nén ảnh về WebP ≤ 300KB (vd. squoosh.app), lưu 2 bản: `assets/img/ten-anh.webp` (≤ 1600px) và `assets/img/thumbs/ten-anh.webp` (480px). Copy một khối `<li>` trong `#gallery`, sửa đường dẫn, kích thước `width/height` của thumb, `alt` và chú thích 2 ngôn ngữ |
| Đổi ngày "Cập nhật" | Footer cuối `index.html`: `Cập nhật 11/2026` / `Updated 11/2026` |

> **Che thông tin nhạy cảm trước khi đăng ảnh:** ngày sinh, số điện thoại, MSSV, số hiệu bằng, mã QR, điểm (nếu không muốn hiện). Tô **khối màu đặc**, không làm mờ.

## Gỡ rối

| Tình huống | Cách xử lý |
|---|---|
| Lỡ sửa hỏng, **chưa commit** | `git restore index.html` (bỏ thay đổi của file đó) — hoặc `git restore .` cho tất cả |
| Đã commit nhưng **chưa push**, muốn sửa lại message/nội dung | Sửa tiếp rồi `git add -A; git commit --amend -m "message mới"` |
| Đã push bản lỗi | `git revert HEAD` rồi `git push` (tạo commit đảo ngược, web quay về bản trước) |
| `git push` bị từ chối (rejected) | Có thay đổi trên GitHub chưa có ở máy: `git pull --rebase` rồi `git push` |
| Push đòi đăng nhập | Đăng nhập GitHub trong cửa sổ hiện ra (Git Credential Manager) |
| Web chưa đổi sau khi push | Đợi 1–2 phút, Ctrl+F5; xem tab **Actions** có lỗi không |
| Lỡ push file riêng tư | Báo ngay — cần xoá khỏi lịch sử git (xoá file thôi là chưa đủ) |

## Deploy

GitHub Pages: repo `HoaiNguyen2003/hoainguyen-data`, Settings → Pages → *Deploy from a branch* → `main` / `/ (root)`. Mỗi lần `git push` lên `main` là web tự cập nhật.

> Dữ liệu cá nhân gốc (ngày sinh, ảnh scan bằng gốc, ghi chú) và thư mục `scripts/`, `plans/` được loại khỏi repo bằng `.gitignore` — chúng **chỉ có trên máy này**, nên sao lưu riêng nếu đổi máy.
