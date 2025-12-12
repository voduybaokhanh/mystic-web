import React from 'react';
import TarotCard from './TarotCard';
import { POSITION_NAMES_CELTIC } from '../../constants/tarotConstants.js';

const CelticCrossLayout = ({ cards, flippedIndices, onCardClick }) => {
  // Helper để render lá bài gọn gàng hơn
  const renderCard = (index, customClass = "") => {
    const card = cards[index];
    if (!card) return null;
    
    return (
      <div className={`flex flex-col items-center ${customClass}`} key={index}>
        <div className="relative transform hover:scale-105 transition-transform duration-300">
          {/* Label vị trí nhỏ phía trên lá bài */}
          <span className="absolute -top-6 left-0 w-full text-center text-[10px] text-mystic-gold uppercase tracking-wider opacity-70">
            {POSITION_NAMES_CELTIC[index]}
          </span>
          
          <TarotCard
            image={card.image}
            name={card.name}
            isFlipped={flippedIndices.includes(index)}
            isReversed={card.isReversed}
            onClick={() => onCardClick(index)}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col xl:flex-row gap-12 items-center justify-center animate-fade-in w-full max-w-7xl mx-auto">
      
      {/* KHU VỰC 1: VÒNG TRÒN & THẬP TỰ (BÊN TRÁI) */}
      {/* Sử dụng Grid 3x3 để căn chỉnh */}
      <div className="grid grid-cols-3 grid-rows-3 gap-4 w-full max-w-[600px] aspect-square">
        
        {/* Hàng 1 */}
        <div></div>
        <div className="flex justify-center items-end">{renderCard(4)} {/* Lá 5: Nhận thức (Above) - Index mảng là 4 */}</div>
        <div></div>

        {/* Hàng 2 */}
        <div className="flex justify-end items-center pr-4">{renderCard(2)} {/* Lá 3: Quá khứ - Index 2 */}</div>
        
        {/* TÂM ĐIỂM (Lá 1 & 2) */}
        <div className="relative flex items-center justify-center">
           {/* Lá 1: Hiện tại - Nằm dưới */}
           <div className="absolute z-10">
             {renderCard(0)}
           </div>
           {/* Lá 2: Thử thách - Nằm đè lên và xoay 90 độ */}
           <div className="absolute z-20 rotate-90 opacity-90 hover:opacity-100 hover:rotate-0 transition-all duration-500">
             {renderCard(1)}
           </div>
        </div>

        <div className="flex justify-start items-center pl-4">{renderCard(3)} {/* Lá 4: Tương lai - Index 3 */}</div>

        {/* Hàng 3 */}
        <div></div>
        <div className="flex justify-center items-start">{renderCard(5)} {/* Lá 6: Tiềm thức (Below) - Index 5 */}</div>
        <div></div>
      </div>

      {/* KHU VỰC 2: THANH GẬY (BÊN PHẢI) */}
      <div className="flex flex-col-reverse gap-4 mt-8 xl:mt-0">
        {renderCard(6)} {/* Lá 7: Lời khuyên (Dưới cùng) */}
        {renderCard(7)} {/* Lá 8: Bên ngoài */}
        {renderCard(8)} {/* Lá 9: Hy vọng/Sợ hãi */}
        {renderCard(9)} {/* Lá 10: Kết quả (Trên cùng) */}
      </div>

    </div>
  );
};

export default CelticCrossLayout;