# Bình Minh Kết Nối – bản demo

Bản demo đề xuất do Learn to Leap xây dựng để trao đổi với xã Bình Minh (tỉnh Nghệ An):

- **Trang thông tin điện tử Ủy ban MTTQ xã** (trang đầu `/`): tin tức (gồm các hội xã hội, Dân vận – Tuyên giáo, Dân tộc – Tôn giáo, dẫn tin Mặt trận Trung ương và tỉnh), phản ánh – kiến nghị có mã tra cứu, công khai Quỹ "Vì người nghèo", lấy ý kiến Nhân dân, Ban công tác Mặt trận 20 xóm.
- **Chợ OCOP Bình Minh** (`/ocop/`): gian hàng, truy xuất nguồn gốc bằng QR, đặt hàng, thanh toán VietQR.
- **Trang tổng** (`/admin/`): tổng quan đề xuất, trang quản trị, giao diện điện thoại.

> **Đây KHÔNG phải trang chính thức của cơ quan nhà nước.** Tin bài, số liệu, sản phẩm, tên người là dữ liệu minh họa. Ảnh minh họa có giấy phép mở (Creative Commons/Public domain) từ Wikimedia Commons và Flickr — danh sách tác giả ở trang "Nguồn ảnh".

Trang tĩnh, không cần build. Ba trang dùng chung mã nguồn ở thư mục gốc; `index.html`, `ocop/index.html`, `admin/index.html` chỉ khai báo trang nào (`window.BM_SITE`). Địa chỉ cũ `/mttq/` tự chuyển về trang đầu.
