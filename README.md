# abc-store

Mạnh + Phúc + Vũ

Hướng dẫn cách làm việc với github:

-   Khi bắt đầu làm dự án, gõ lệnh này để luôn cập nhật code mới nhất: git pull origin main --rebase
-   Các bước push code mới lên github:

*   Kiếm tra nhánh đang làm (dự án mình làm nhánh main, nếu không phải nhánh main, dùng lệnh: git switch main)
*   Thêm các file đã chỉnh sửa: git add .
*   Tạo commit: git commit -m "Mô tả thay đổi, ví dụ: cập nhật chức năng login"
*   Push code lên GitHub: git push origin main
    \*\*\* LƯU Ý QUAN TRỌNG:
    Khi lấy code về, github không lấy được file node module, nếu chạy dự án sẽ xảy ra lỗi, nên cần cập nhật lại các package đã tải:
    cd /admin (di chuyển thư mục đến vị trí mong muốn)
    npm i (cài đặt và cập nhật lại tất cả các gói package)
