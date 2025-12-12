import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import TarotCard from "./TarotCard";
import CelticCrossLayout from "./CelticCrossLayout";
import CardMeaningDisplay from "./CardMeaningDisplay";
import tarotData from "../../data/tarot.json";
import { getTarotReading } from "../../services/aiService.js";
import { 
  SPREAD_TYPES, 
  POSITION_NAMES_CELTIC, 
  POSITION_NAMES_THREE_CARD,
  REVERSED_PROBABILITY,
  SHUFFLE_DELAY_MS 
} from "../../constants/tarotConstants.js";
import { fisherYatesShuffle } from "../../utils/shuffle.js";

const TarotBoard = () => {
  const [step, setStep] = useState("intro"); // 'intro' | 'shuffling' | 'reading'
  const [spreadType, setSpreadType] = useState(SPREAD_TYPES.THREE_CARD); // Mặc định 3 lá
  const [selectedCards, setSelectedCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const shuffleTimeoutRef = useRef(null);

  // Cleanup timeout khi unmount
  useEffect(() => {
    return () => {
      if (shuffleTimeoutRef.current) {
        clearTimeout(shuffleTimeoutRef.current);
      }
    };
  }, []);

  const shuffleDeck = () => {
    setStep("shuffling");

    shuffleTimeoutRef.current = setTimeout(() => {
      // Sử dụng utility function để shuffle
      const shuffledDeck = fisherYatesShuffle(tarotData);

      // Lấy số lượng lá tùy theo loại trải bài (3 hoặc 10)
      const count = spreadType.count;
      const picked = shuffledDeck.slice(0, count).map((card) => ({
        ...card,
        isReversed: Math.random() < REVERSED_PROBABILITY,
      }));

      setSelectedCards(picked);
      setFlippedIndices([]);
      setStep("reading");
    }, SHUFFLE_DELAY_MS);
  };

  const handleCardClick = (index) => {
    if (!flippedIndices.includes(index)) {
      setFlippedIndices([...flippedIndices, index]);
    }
  };

  const [aiReading, setAiReading] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);

  const resetReading = () => {
    setStep("intro");
    setSelectedCards([]);
    setFlippedIndices([]);
    setAiReading("");
  };

  const handleAskAI = async () => {
    setIsAiLoading(true);
    setAiReading(""); // Clear previous reading
    
    try {
      const result = await getTarotReading(selectedCards, spreadType);
      setAiReading(result);
    } catch {
      // Fallback error handling - error đã được xử lý trong getTarotReading
      setAiReading("Đã xảy ra lỗi khi kết nối với AI. Vui lòng thử lại sau hoặc tự chiêm nghiệm các lá bài.");
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 min-h-[80vh]">
      {/* --- PHẦN 1: Màn hình chào & Chọn loại trải bài --- */}
      {step === "intro" && (
        <div className="text-center mt-10 space-y-8 animate-fade-in">
          {/* Khu vực chọn loại trải bài */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            {Object.values(SPREAD_TYPES).map((type) => (
              <button
                key={type.id}
                onClick={() => setSpreadType(type)}
                className={`px-6 py-4 rounded-xl border transition-all flex flex-col items-center gap-2 ${
                  spreadType.id === type.id
                    ? "bg-mystic-gold/20 border-mystic-gold text-mystic-gold shadow-[0_0_15px_rgba(196,162,72,0.3)] scale-105"
                    : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                }`}
              >
                <span className="text-xl font-bold">{type.count} Lá</span>
                <span className="text-sm font-medium">{type.name}</span>
              </button>
            ))}
          </div>

          <div className="w-48 h-80 bg-mystic-gold/20 rounded-xl border-2 border-dashed border-mystic-gold mx-auto mb-6 flex items-center justify-center">
            <span className="text-mystic-gold text-4xl animate-pulse">?</span>
          </div>

          <button
            onClick={shuffleDeck}
            className="px-10 py-4 bg-mystic-gold text-mystic-dark font-bold text-lg rounded-full hover:bg-white transition-all shadow-[0_0_20px_rgba(196,162,72,0.5)] transform hover:scale-105"
          >
            🔮 Tráo bài & Rút {spreadType.count} lá
          </button>
        </div>
      )}

      {/* --- PHẦN 2: Hiệu ứng đang xào bài --- */}
      {step === "shuffling" && (
        <div
          className="flex flex-col items-center justify-center h-96"
          role="status"
        >
          <div className="animate-spin text-6xl mb-4 text-mystic-gold">۞</div>
          <p className="text-mystic-gold animate-pulse text-lg">
            Đang kết nối năng lượng vũ trụ...
          </p>
        </div>
      )}

      {/* --- PHẦN 3: Khu vực trải bài --- */}
      {step === "reading" && (
        <div className="animate-fade-in pb-20">
          {/* TRƯỜNG HỢP 1: CELTIC CROSS (10 LÁ) */}
          {spreadType.id === "celtic" && (
            <>
              {/* Gọi Component Layout riêng cho Celtic Cross */}
              <CelticCrossLayout
                cards={selectedCards}
                flippedIndices={flippedIndices}
                onCardClick={handleCardClick}
              />

              {/* Khu vực hiển thị lời giải (List bên dưới) */}
              <div className="mt-16 max-w-4xl mx-auto space-y-4">
                <h3 className="text-2xl text-center text-mystic-gold border-b border-white/10 pb-4 mb-6">
                  📜 Lời giải chi tiết
                </h3>
                {selectedCards.map((card, index) => {
                  if (!flippedIndices.includes(index)) return null;
                  return (
                    <CardMeaningDisplay
                      key={index}
                      card={card}
                      positionName={POSITION_NAMES_CELTIC[index]}
                      showPosition={true}
                    />
                  );
                })}
                {flippedIndices.length === 0 && (
                  <p className="text-center text-gray-500 italic">
                    Hãy lật các lá bài ở trên để xem lời giải...
                  </p>
                )}
              </div>
            </>
          )}

          {/* TRƯỜNG HỢP 2: TRẢI BÀI 3 LÁ */}
          {spreadType.id === "three" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center mb-10 mt-10">
              {selectedCards.map((card, index) => {
                const isFlipped = flippedIndices.includes(index);
                const positionTitle = POSITION_NAMES_THREE_CARD[index];

                return (
                  <div
                    key={card.id || index}
                    className="flex flex-col items-center gap-4"
                  >
                    <h3 className="text-gray-400 text-sm uppercase tracking-widest">
                      {positionTitle}
                    </h3>

                    <TarotCard
                      image={card.image}
                      name={card.name}
                      isFlipped={isFlipped}
                      isReversed={card.isReversed}
                      onClick={() => handleCardClick(index)}
                    />

                    {/* Hiển thị ý nghĩa ngay bên dưới lá bài (cho gọn với 3 lá) */}
                    {isFlipped && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-center w-full"
                      >
                        <CardMeaningDisplay
                          card={card}
                          positionName={positionTitle}
                          showPosition={false}
                          className="bg-black/30 border-mystic-gold/30 text-sm"
                        />
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
          {/* 4. CHÈN NÚT HỎI AI Ở ĐÂY (Ngay trên hoặc dưới phần Lời giải chi tiết) */}

          {/* Chỉ hiện nút khi đã lật hết bài (hoặc lật ít nhất 1 lá) */}
          {flippedIndices.length > 0 && (
            <div className="max-w-4xl mx-auto mt-12 mb-8">
              {!aiReading ? (
                <div className="text-center">
                  <button
                    onClick={handleAskAI}
                    disabled={isAiLoading}
                    className="group relative px-8 py-4 bg-gradient-to-r from-purple-900 to-mystic-dark border border-mystic-gold rounded-xl overflow-hidden shadow-[0_0_20px_rgba(196,162,72,0.3)] hover:shadow-[0_0_40px_rgba(196,162,72,0.6)] transition-all"
                  >
                    <span
                      className={`flex items-center gap-3 text-mystic-gold font-bold text-lg ${
                        isAiLoading ? "animate-pulse" : ""
                      }`}
                    >
                      {isAiLoading
                        ? "🔮 AI đang kết nối vũ trụ..."
                        : "✨ Nhờ AI tổng hợp lời giải"}
                    </span>
                    {/* Hiệu ứng sao bay nền */}
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </button>
                  <p className="text-gray-500 text-sm mt-3 italic">
                    AI sẽ xâu chuỗi các lá bài để đưa ra thông điệp tổng quan
                    nhất.
                  </p>
                </div>
              ) : (
                /* 5. KHUNG HIỂN THỊ LỜI GIẢI AI */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-br from-purple-900/40 to-black/80 p-8 rounded-2xl border border-mystic-gold/50 shadow-2xl relative overflow-hidden"
                >
                  {/* Icon trang trí */}
                  <div className="absolute top-0 right-0 p-4 opacity-20 text-6xl text-mystic-gold">
                    ❝
                  </div>

                  <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-mystic-gold to-white mb-6 flex items-center gap-2">
                    <span>🤖</span> Thông điệp từ Vũ Trụ (AI Reader)
                  </h3>

                  <div className={`prose prose-invert prose-p:text-gray-200 prose-strong:text-mystic-gold max-w-none text-justify leading-relaxed whitespace-pre-line font-serif text-lg ${
                    aiReading.startsWith('⚠️') ? 'text-yellow-400' : ''
                  }`}>
                    {/* Hiển thị text từ AI */}
                    {aiReading}
                  </div>

                  <div className="mt-6 text-center border-t border-white/10 pt-4">
                    <span className="text-xs text-gray-500 uppercase tracking-widest">
                      Powered by Gemini AI
                    </span>
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {/* Nút Reset chung cho cả 2 kiểu */}
          <div className="text-center pt-10 pb-10 border-t border-white/5 mt-10">
            <button
              onClick={resetReading}
              className="text-gray-400 hover:text-white underline decoration-mystic-gold underline-offset-4 focus:outline-none focus:ring-2 focus:ring-mystic-gold rounded px-4 py-2 hover:bg-white/5 transition-all"
            >
              ← Quay lại màn hình chính
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TarotBoard;
