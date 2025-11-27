import { motion as Motion } from "framer-motion";

// Component này nhận vào: ảnh mặt trước, tên lá bài, và trạng thái lật (isFlipped)
const TarotCard = ({ image, name, isFlipped, isReversed, onClick }) => {
  return (
    <div
      className="relative w-48 h-80 cursor-pointer perspective-1000" // perspective tạo độ sâu 3D
      onClick={onClick}
    >
      <Motion.div
        className="w-full h-full relative preserve-3d"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }} // Nếu lật thì xoay 180 độ
        transition={{ duration: 0.6, animationDirection: "normal" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* MẶT SAU (Úp) - Hiển thị khi chưa lật */}
        <div className="absolute w-full h-full backface-hidden rounded-xl border-2 border-mystic-gold shadow-lg overflow-hidden">
          {/* Thay đường dẫn ảnh mặt sau của bạn vào đây */}
          <img
            src="/tarot-deck/card-back.jpg"
            alt="Card Back"
            className="w-full h-full object-cover"
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
            alt={name}
            //xu ly xoay nguoc lai neu la reversed
            className={`w-full h-full object-cover transition-transform duration-500 ${
              isReversed ? "rotate-180" : ""
            }`}
          />
          {/* Tên lá bài (Luôn nằm xuôi để dễ đọc, hoặc đảo ngược tùy bạn) */}
          <span className="text-mystic-gold text-sm font-bold uppercase tracking-widest">
            {name} {isReversed && "(Ngược)"}
          </span>
        </div>
      </Motion.div>
    </div>
  );
};

export default TarotCard;
