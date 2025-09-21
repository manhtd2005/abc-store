import multer from "multer";

// Cấu hình cách lưu file
const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        // Đặt lại tên file: [timestamp]-[tên_gốc]
        callback(null, Date.now() + "-" + file.originalname);
    },
});

// Tạo middleware upload với cấu hình storage
const upload = multer({ storage });

export default upload;
