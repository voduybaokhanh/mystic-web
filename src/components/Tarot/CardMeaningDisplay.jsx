import { motion } from "framer-motion";

/**
 * Component hiển thị ý nghĩa lá bài Tarot
 * Tái sử dụng để tránh duplicate code
 * 
 * @param {Object} props
 * @param {Object} props.card - Thông tin lá bài
 * @param {string} props.positionName - Tên vị trí của lá bài
 * @param {boolean} props.showPosition - Có hiển thị tên vị trí không
 * @param {string} [props.className] - CSS class bổ sung
 */
const CardMeaningDisplay = ({ 
  card, 
  positionName, 
  showPosition = true,
  className = "" 
}) => {
  if (!card) return null;

  const meaning = card.isReversed
    ? card.meaning_reversed || "Đang cập nhật ý nghĩa ngược..."
    : card.meaning_upright || "Đang cập nhật ý nghĩa xuôi...";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white/5 p-6 rounded-lg border border-white/10 ${className}`}
    >
      {showPosition && positionName && (
        <div className="flex justify-between items-start mb-2">
          <h4 className="text-mystic-gold font-bold text-lg">
            {positionName}
          </h4>
          <span className="text-xs bg-black/50 px-2 py-1 rounded text-gray-400">
            {card.name} {card.isReversed ? "(Ngược)" : "(Xuôi)"}
          </span>
        </div>
      )}
      {!showPosition && (
        <>
          <h4 className="text-xl font-bold text-mystic-gold mb-2">
            {card.name}{" "}
            <span className="text-sm text-gray-400">
              {card.isReversed ? "(Ngược)" : "(Xuôi)"}
            </span>
          </h4>
        </>
      )}
      <p className={`text-justify leading-relaxed ${showPosition ? 'text-gray-300' : 'text-gray-300 text-sm mt-2'}`}>
        {meaning}
      </p>
    </motion.div>
  );
};

export default CardMeaningDisplay;

