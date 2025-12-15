import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import runesData from "../../data/runes.json";

const RuneCasting = () => {
  const [rune, setRune] = useState(null);
  const [isShaking, setIsShaking] = useState(false);

  const castRune = () => {
    setIsShaking(true);
    setRune(null);

    // Hiệu ứng rung lắc 1.5 giây
    setTimeout(() => {
      const randomRune =
        runesData[Math.floor(Math.random() * runesData.length)];
      setRune(randomRune);
      setIsShaking(false);
    }, 1500);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 animate-fade-in mt-8 flex flex-col items-center min-h-[60vh]">
      <h2 className="text-3xl text-center font-bold text-stone-400 mb-2 uppercase tracking-widest font-serif">
        ᚱ Runes Casting ᚱ
      </h2>
      <p className="text-gray-500 mb-12 text-center">
        Tập trung vào vấn đề và chạm vào túi đá để xin chỉ dẫn
      </p>

      {/* KHU VỰC TÚI ĐÁ */}
      <div className="relative h-64 w-full flex justify-center items-center">
        {/* TÚI ĐỰNG (Dùng emoji hoặc vẽ css đơn giản) */}
        <motion.button
          onClick={castRune}
          disabled={isShaking}
          animate={
            isShaking
              ? {
                  rotate: [-5, 5, -5, 5, 0],
                  scale: [1, 1.05, 1],
                  y: [0, -10, 0],
                }
              : {}
          }
          transition={{ duration: 0.5, repeat: isShaking ? Infinity : 0 }}
          className="relative z-10 text-9xl filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] cursor-pointer hover:scale-110 transition-transform active:scale-95"
        >
          💰
          {/* Bạn có thể thay emoji túi tiền này bằng ảnh túi nhung nếu có, hoặc giữ emoji cho nhanh */}
        </motion.button>

        {/* VIÊN ĐÁ RƠI RA */}
        <AnimatePresence>
          {rune && !isShaking && (
            <motion.div
              initial={{ y: -50, opacity: 0, scale: 0.5, rotate: 180 }}
              animate={{ y: 120, opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="absolute z-20"
            >
              {/* VẼ VIÊN ĐÁ */}
              <div className="w-32 h-40 bg-gradient-to-br from-stone-700 to-stone-900 rounded-[2rem] border-4 border-stone-600 shadow-2xl flex items-center justify-center relative overflow-hidden group">
                {/* Vân đá */}
                <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')]"></div>

                {/* Ký tự Rune */}
                <span className="text-6xl text-cyan-200 drop-shadow-[0_0_10px_rgba(165,243,252,0.8)] font-serif">
                  {rune.symbol}
                </span>

                {/* Hiệu ứng sáng bóng */}
                <div className="absolute top-2 left-2 w-full h-full bg-gradient-to-br from-white/10 to-transparent rounded-[2rem] pointer-events-none"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* LỜI GIẢI */}
      <div className="h-48 mt-32 w-full max-w-md">
        {rune && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center bg-white/5 p-6 rounded-xl border border-stone-600"
          >
            <h3 className="text-2xl font-bold text-cyan-200 mb-2">
              {rune.name}
            </h3>
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto mb-4"></div>
            <p className="text-stone-300 text-lg leading-relaxed">
              {rune.meaning}
            </p>
          </motion.div>
        )}

        {!rune && !isShaking && (
          <p className="text-center text-stone-600 italic mt-4">
            "Hãy hỏi Odin, ngài sẽ trả lời..."
          </p>
        )}
      </div>
    </div>
  );
};

export default RuneCasting;
