import { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import TarotCard from './TarotCard'; // Component lá bài bạn đã làm
import tarotData from "../../data/tarot.json"; // Import dữ liệu

const TarotBoard = () => {
    // State quản lý trạng thái
    const [step, setStep] = useState('intro'); // 'intro' | 'shuffling' | 'reading'
    const [selectedCards, setSelectedCards] = useState([]);
    const [flippedIndices, setFlippedIndices] = useState([]); // Lưu index những lá đã lật

    // Hàm xào bài (Đã nâng cấp tỷ lệ bài ngược)
    const shuffleDeck = () => {
        setStep('shuffling');

        setTimeout(() => {
            const deck = [...tarotData];
            // Thuật toán Fisher-Yates để tráo bài
            for (let i = deck.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [deck[i], deck[j]] = [deck[j], deck[i]];
            }

            // Lấy 3 lá đầu tiên và gán trạng thái Ngược/Xuôi
            const picked = deck.slice(0, 3).map(card => ({
                ...card,
                // Logic: Sinh số ngẫu nhiên từ 0-1. Nếu nhỏ hơn 0.3 (30%) thì là ngược
                isReversed: Math.random() < 0.3
            }));

            setSelectedCards(picked);
            setFlippedIndices([]);
            setStep('reading');
        }, 1500);
    };

    // Hàm xử lý khi bấm vào lá bài
    const handleCardClick = (index) => {
        if (!flippedIndices.includes(index)) {
            setFlippedIndices([...flippedIndices, index]);
        }
    };

    // Hàm reset để chơi lại
    const resetReading = () => {
        setStep('intro');
        setSelectedCards([]);
        setFlippedIndices([]);
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-4">

            {/* PHẦN 1: Màn hình chào & Nút xào bài */}
            {step === 'intro' && (
                <div className="text-center mt-10">
                    <div className="w-48 h-80 bg-mystic-gold/20 rounded-xl border-2 border-dashed border-mystic-gold mx-auto mb-6 flex items-center justify-center">
                        <span className="text-mystic-gold text-4xl">?</span>
                    </div>
                    <button
                        onClick={shuffleDeck}
                        className="px-8 py-3 bg-mystic-gold text-mystic-dark font-bold rounded-full hover:bg-white transition-all shadow-[0_0_20px_rgba(196,162,72,0.5)]"
                    >
                        🔮 Tráo bài & Rút 3 lá
                    </button>
                </div>
            )}

            {/* PHẦN 2: Hiệu ứng đang xào bài */}
            {step === 'shuffling' && (
                <div className="flex flex-col items-center justify-center h-96">
                    <div className="animate-spin text-5xl mb-4">💫</div>
                    <p className="text-mystic-gold animate-pulse">Vũ trụ đang kết nối...</p>
                </div>
            )}

            {/* PHẦN 3: Khu vực trải bài (Kết quả) */}
            {step === 'reading' && (

                <div className="animate-fade-in">

                    {/* Khu vực hiển thị 3 lá bài */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center mb-10">
                        {selectedCards.map((card, index) => {
                            const isFlipped = flippedIndices.includes(index);
                            const positionTitle = ["Quá Khứ", "Hiện Tại", "Tương Lai"][index];

                            return (
                                <div key={card.id || index} className="flex flex-col items-center gap-4">
                                    <h3 className="text-gray-400 text-sm uppercase tracking-widest">{positionTitle}</h3>

                                    <TarotCard
                                        image={card.image}
                                        name={card.name}
                                        isFlipped={isFlipped}
                                        isReversed={card.isReversed}
                                        onClick={() => handleCardClick(index)}
                                    />

                                    {/* Chỉ hiện ý nghĩa khi đã lật */}
                                    <Motion.div className={`text-center transition-opacity duration-500 ${isFlipped ? 'opacity-100' : 'opacity-0'}`}>
                                        <h4 className="text-xl font-bold text-mystic-gold">
                                            {card.name} <span className="text-sm text-gray-400">{card.isReversed ? '(Ngược)' : '(Xuôi)'}</span>
                                        </h4>
                                        <p className="text-sm text-gray-300 mt-2 text-justify bg-black/30 p-3 rounded border border-mystic-gold/30">
                                            {card.isReversed
                                                ? (card.meaning_reversed || "Chưa có dữ liệu ngược")
                                                : (card.meaning_upright || "Chưa có dữ liệu xuôi")
                                            }
                                        </p>
                                    </Motion.div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Nút làm lại */}
                    <div className="text-center pb-10">
                        <button
                            onClick={resetReading}
                            className="text-gray-400 hover:text-white underline decoration-mystic-gold underline-offset-4"
                        >Thực hiện trải bài khác
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TarotBoard;