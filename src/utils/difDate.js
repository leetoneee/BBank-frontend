export default function tinhChenhLechNgay(date1, date2) {
    const ngay1 = new Date(date1).getTime(); // Chuyển đổi ngày 1 sang đối tượng Date
    const ngay2 = new Date(date2).getTime(); // Chuyển đổi ngày 2 sang đối tượng Date

    // Tính toán chênh lệch thời gian (tính bằng mili-giây)
    const diff = (ngay2 - ngay1);

    // Chuyển đổi chênh lệch thời gian từ mili-giây sang ngày
    const ngayChenhLech = Math.floor(diff / (1000 * 60 * 60 * 24));
    // Trả về chuỗi kết quả
    return ngayChenhLech;
}