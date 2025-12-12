/**
 * Utility functions cho Numerology calculations
 */

/**
 * Rút gọn số về một chữ số (1-9) hoặc giữ Master Numbers (11, 22, 33)
 * @param {number} num - Số cần rút gọn
 * @returns {number} - Số đã rút gọn
 */
export const reduceNumber = (num) => {
  if (num === 11 || num === 22 || num === 33) return num;
  if (num < 10) return num;

  // Sử dụng reduce thay vì forEach để tối ưu
  const sum = num
    .toString()
    .split("")
    .map(Number)
    .reduce((acc, digit) => acc + digit, 0);

  // Đệ quy: Nếu cộng xong vẫn > 9 và không phải master thì cộng tiếp
  return reduceNumber(sum);
};

/**
 * Tính số chủ đạo từ ngày sinh
 * @param {number} year - Năm sinh
 * @param {number} month - Tháng sinh
 * @param {number} day - Ngày sinh
 * @returns {number} - Số chủ đạo
 */
export const calculateLifePath = (year, month, day) => {
  // Bước 1: Rút gọn từng thành phần
  const rDay = reduceNumber(day);
  const rMonth = reduceNumber(month);
  const rYear = reduceNumber(year);

  // Bước 2: Cộng tổng
  const total = rDay + rMonth + rYear;

  // Bước 3: Rút gọn kết quả cuối cùng
  return reduceNumber(total);
};

