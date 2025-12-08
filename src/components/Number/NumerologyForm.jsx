import { useState } from "react";
import { motion } from "framer-motion";
import numerologyData from "../../data/numerology.json";

/**
 * Component tính toán và hiển thị số chủ đạo theo Thần Số Học
 * Sử dụng ngày sinh để tính Life Path Number
 */

const NumerologyTool = () => {
  const [birthDate, setBirthDate] = useState("");
  const [fullName, setFullName] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /**
   * Rút gọn số về một chữ số (1-9) hoặc giữ Master Numbers (11, 22, 33)
   * @param {number} num - Số cần rút gọn
   * @returns {number} - Số đã rút gọn
   */
  const reduceNumber = (num) => {
    if (num === 11 || num === 22 || num === 33) return num;
    if (num < 10) return num;

    // Cộng dồn các chữ số
    let sum = 0;
    const digits = num.toString().split("").map(Number);
    digits.forEach((n) => (sum += n));

    // Đệ quy: Nếu cộng xong vẫn > 9 và không phải master thì cộng tiếp
    return reduceNumber(sum);
  };

  /**
   * Tính số chủ đạo từ ngày sinh
   * Cộng tổng ngày + tháng + năm, sau đó rút gọn
   */
  const calculateLifePath = () => {
    setError("");
    setResult(null);

    if (!birthDate) {
      setError("Vui lòng nhập ngày sinh");
      return;
    }

    const [year, month, day] = birthDate.split("-").map(Number);

    if (!year || !month || !day || isNaN(year) || isNaN(month) || isNaN(day)) {
      setError("Ngày sinh không hợp lệ");
      return;
    }

    if (year < 1900 || year > new Date().getFullYear()) {
      setError("Năm sinh không hợp lệ");
      return;
    }

    if (month < 1 || month > 12) {
      setError("Tháng sinh không hợp lệ");
      return;
    }

    if (day < 1 || day > 31) {
      setError("Ngày sinh không hợp lệ");
      return;
    }

    // Bước 1: Rút gọn từng thành phần
    const rDay = reduceNumber(day);
    const rMonth = reduceNumber(month);
    const rYear = reduceNumber(year);

    // Bước 2: Cộng tổng
    let total = rDay + rMonth + rYear;

    // Bước 3: Rút gọn kết quả cuối cùng
    const finalNumber = reduceNumber(total);

    setResult(finalNumber);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white/5 rounded-xl border border-mystic-gold/30 mt-10">
      <h2 className="text-3xl text-center font-bold text-mystic-gold mb-6 uppercase tracking-widest">
        Tra cứu Thần Số Học
      </h2>

      {/* FORM NHẬP LIỆU */}
      <div className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-gray-400 mb-1">
            Họ và Tên (Tùy chọn)
          </label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Nhập tên của bạn..."
            className="w-full p-3 bg-black/50 border border-gray-600 rounded text-white focus:border-mystic-gold focus:ring-2 focus:ring-mystic-gold outline-none"
            aria-label="Họ và tên"
          />
        </div>

        <div>
          <label htmlFor="birthDate" className="block text-mystic-gold font-bold mb-1">
            Ngày Sinh (Dương Lịch) *
          </label>
          <input
            id="birthDate"
            type="date"
            value={birthDate}
            onChange={(e) => {
              setBirthDate(e.target.value);
              setError("");
            }}
            max={new Date().toISOString().split('T')[0]}
            className="w-full p-3 bg-black/50 border border-gray-600 rounded text-white focus:border-mystic-gold focus:ring-2 focus:ring-mystic-gold outline-none"
            aria-label="Ngày sinh dương lịch"
            aria-required="true"
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? "birthDateError" : undefined}
          />
          {error && (
            <p id="birthDateError" className="text-red-400 text-sm mt-1" role="alert">
              {error}
            </p>
          )}
        </div>

        <button
          onClick={calculateLifePath}
          className="w-full py-3 mt-4 bg-mystic-gold text-mystic-dark font-bold text-lg rounded hover:bg-white transition-all shadow-[0_0_15px_rgba(196,162,72,0.4)] focus:outline-none focus:ring-2 focus:ring-mystic-gold focus:ring-offset-2 focus:ring-offset-mystic-dark"
          aria-label="Tính số chủ đạo từ ngày sinh"
        >
          Tính Số Chủ Đạo
        </button>
      </div>

      {/* KẾT QUẢ */}
      {result && numerologyData[result] && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-8 text-center border-t border-white/10 pt-6"
          role="region"
          aria-live="polite"
          aria-label="Kết quả thần số học"
        >
          <p className="text-gray-400">Số Chủ Đạo của bạn là:</p>

          <div className="w-24 h-24 mx-auto my-4 rounded-full border-4 border-mystic-gold flex items-center justify-center bg-mystic-gold/10 shadow-[0_0_30px_rgba(196,162,72,0.3)]">
            <span className="text-5xl font-bold text-white">{result}</span>
          </div>

          <h3 className="text-2xl font-bold text-mystic-gold mb-2">
            {numerologyData[result].title}
          </h3>

          <p className="text-gray-300 leading-relaxed text-justify bg-black/30 p-4 rounded-lg">
            {numerologyData[result].desc}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default NumerologyTool;
