import { memo } from "react";
import { motion } from "framer-motion";

/**
 * Component hiển thị lá bài Tarot với hiệu ứng lật 3D
 * @param {Object} props - Props của component
 * @param {string} props.image - Đường dẫn ảnh mặt trước lá bài
 * @param {string} props.name - Tên lá bài
 * @param {boolean} props.isFlipped - Trạng thái lật (true = đã lật)
 * @param {boolean} props.isReversed - Trạng thái ngược/xuôi
 * @param {Function} props.onClick - Hàm xử lý khi click vào lá bài
 * @param {string} [props.backImage="/tarot-deck/matsau.png"] - Đường dẫn ảnh mặt sau
 */
const TarotCard = memo(({
  image,
  name,
  isFlipped,
  isReversed,
  onClick,
  backImage = "/tarot-deck/matsau.png",
}) => {
  return (
    <div
      className="relative w-48 h-80 cursor-pointer perspective-1000"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={isFlipped ? `Lá bài ${name}` : 'Lá bài chưa lật, nhấn để lật'}
    >
      <motion.div
        className="w-full h-full relative preserve-3d"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* MẶT SAU (Úp) - Hiển thị khi chưa lật */}
        <div className="absolute w-full h-full backface-hidden rounded-xl border-2 border-mystic-gold shadow-lg overflow-hidden">
          <img
            src={backImage}
            alt="Mặt sau lá bài Tarot"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* Pattern trang trí đè lên (nếu ảnh đơn giản) */}
          <div className="absolute inset-0 bg-mystic-dark/20"></div>
        </div>

        {/* MẶT TRƯỚC (Ngửa) - Hiển thị khi lật 180 độ */}
        <div
          className="absolute w-full h-full backface-hidden rounded-xl border-2 border-mystic-gold shadow-xl overflow-hidden"
          style={{ transform: "rotateY(180deg)" }} // Xoay sẵn 180 độ để khi lật lại là vừa khớp
        >
          <img
            src={image}
            alt={`Lá bài ${name} ${isReversed ? 'ngược' : 'xuôi'}`}
            className={`w-full h-full object-cover transition-transform duration-500 ${
              isReversed ? "rotate-180" : ""
            }`}
            loading="lazy"
          />
          {/* Tên lá bài (Luôn nằm xuôi để dễ đọc, hoặc đảo ngược tùy bạn) */}
          <span className="text-mystic-gold text-sm font-bold uppercase tracking-widest">
            {name} {isReversed && "(Ngược)"}
          </span>
        </div>
      </motion.div>
    </div>
  );
});

TarotCard.displayName = 'TarotCard';

export default TarotCard;
