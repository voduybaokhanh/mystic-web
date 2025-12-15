import { useState } from "react";
import { motion } from "framer-motion";
import zodiacData from '../../data/zodiac.json';
import { getZodiacCompatibility } from "../../services/aiService.js";

const ZodiacMatch = () => {
  const [person1, setPerson1] = useState(null);
  const [person2, setPerson2] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!person1 || !person2) return;
    setLoading(true);
    setResult("");

    try {
      const aiResponse = await getZodiacCompatibility(person1, person2);
      setResult(aiResponse);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 animate-fade-in mt-10">
      <h2 className="text-3xl text-center font-bold text-pink-500 mb-2 uppercase tracking-widest">
        💘 Bói Tình Duyên
      </h2>
      <p className="text-center text-gray-400 mb-10">
        Xem độ hòa hợp giữa hai chòm sao
      </p>

      {/* KHU VỰC CHỌN CUNG */}
      <div className="flex flex-col md:flex-row gap-8 items-center justify-center mb-10">
        {/* NGƯỜI 1 */}
        <div className="w-full md:w-1/3">
          <label className="block text-center text-mystic-gold mb-2 font-bold">
            Bạn là ai?
          </label>
          <select
            className="w-full p-3 bg-white/10 border border-mystic-gold/30 rounded-xl text-white outline-none focus:border-pink-500 transition-colors cursor-pointer"
            onChange={(e) =>
              setPerson1(zodiacData.find((z) => z.id === e.target.value))
            }
          >
            <option value="">-- Chọn cung --</option>
            {zodiacData.map((z) => (
              <option key={z.id} value={z.id}>
                {z.icon} {z.name} ({z.dates})
              </option>
            ))}
          </select>
          {person1 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-center mt-4"
            >
              <div className="text-6xl">{person1.icon}</div>
              <p className="text-black text-sm mt-2">{person1.element}</p>
            </motion.div>
          )}
        </div>

        {/* TRÁI TIM Ở GIỮA */}
        <div className="text-5xl text-pink-600 animate-pulse">
          {loading ? "💓" : "❤️"}
        </div>

        {/* NGƯỜI 2 */}
        <div className="w-full md:w-1/3">
          <label className="block text-center text-mystic-gold mb-2 font-bold">
            Người ấy?
          </label>
          <select
            className="w-full p-3 bg-white/10 border border-mystic-gold/30 rounded-xl text-white outline-none focus:border-pink-500 transition-colors cursor-pointer"
            onChange={(e) =>
              setPerson2(zodiacData.find((z) => z.id === e.target.value))
            }
          >
            <option value="">-- Chọn cung --</option>
            {zodiacData.map((z) => (
              <option key={z.id} value={z.id}>
                {z.icon} {z.name} ({z.dates})
              </option>
            ))}
          </select>
          {person2 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-center mt-4"
            >
              <div className="text-6xl">{person2.icon}</div>
              <p className="text-black text-sm mt-2">{person2.element}</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* NÚT KẾT DUYÊN */}
      <div className="text-center">
        <button
          onClick={handleAnalyze}
          disabled={!person1 || !person2 || loading}
          className={`px-10 py-3 rounded-full font-bold text-lg transition-all ${
            !person1 || !person2
              ? "bg-gray-700 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-[0_0_20px_rgba(219,39,119,0.5)] hover:scale-105"
          }`}
        >
          {loading
            ? "AI đang phân tích tín hiệu vũ trụ..."
            : "🔮 Xem Kết Quả Tình Yêu"}
        </button>
      </div>

      {/* KẾT QUẢ TỪ AI */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-10 bg-white/5 border border-pink-500/30 p-6 rounded-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500"></div>
          <h3 className="text-xl font-bold text-pink-400 mb-4 flex items-center gap-2">
            💌 Lời nhắn từ các vì sao:
          </h3>
          <div className="prose prose-invert max-w-none text-gray-200 whitespace-pre-line leading-relaxed">
            {result}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ZodiacMatch;
