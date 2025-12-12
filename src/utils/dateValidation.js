/**
 * Utility functions cho validation ngày tháng
 */

/**
 * Kiểm tra số ngày hợp lệ trong tháng
 * @param {number} year - Năm
 * @param {number} month - Tháng (1-12)
 * @param {number} day - Ngày
 * @returns {boolean} - true nếu hợp lệ
 */
export const isValidDay = (year, month, day) => {
  if (day < 1 || day > 31) return false;
  
  const daysInMonth = new Date(year, month, 0).getDate();
  return day <= daysInMonth;
};

/**
 * Validate ngày sinh đầy đủ
 * @param {string} dateString - Chuỗi ngày tháng dạng YYYY-MM-DD
 * @returns {{isValid: boolean, error?: string, date?: {year: number, month: number, day: number}}}
 */
export const validateBirthDate = (dateString) => {
  if (!dateString) {
    return { isValid: false, error: "Vui lòng nhập ngày sinh" };
  }

  const [year, month, day] = dateString.split("-").map(Number);

  if (!year || !month || !day || isNaN(year) || isNaN(month) || isNaN(day)) {
    return { isValid: false, error: "Ngày sinh không hợp lệ" };
  }

  const currentYear = new Date().getFullYear();
  if (year < 1900 || year > currentYear) {
    return { isValid: false, error: "Năm sinh không hợp lệ" };
  }

  if (month < 1 || month > 12) {
    return { isValid: false, error: "Tháng sinh không hợp lệ" };
  }

  if (!isValidDay(year, month, day)) {
    return { isValid: false, error: "Ngày sinh không hợp lệ" };
  }

  return { isValid: true, date: { year, month, day } };
};

