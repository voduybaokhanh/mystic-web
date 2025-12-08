import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import TarotCard from './TarotCard';
import tarotData from "../../data/tarot.json";

/**
 * Component quản lý bảng trải bài Tarot
 * Hỗ trợ 3 bước: intro (giới thiệu), shuffling (đang xáo), reading (đọc bài)
 */

const TarotBoard = () => {
    const [step, setStep] = useState('intro');
    const [selectedCards, setSelectedCards] = useState([]);
    const [flippedIndices, setFlippedIndices] = useState([]);
    const shuffleTimeoutRef = useRef(null);

    useEffect(() => {
        return () => {
            if (shuffleTimeoutRef.current) {
                clearTimeout(shuffleTimeoutRef.current);
            }
        };
    }, []);

    const shuffleDeck = () => {
        setStep('shuffling');

        shuffleTimeoutRef.current = setTimeout(() => {
            const deck = [...tarotData];
            for (let i = deck.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [deck[i], deck[j]] = [deck[j], deck[i]];
            }

            const picked = deck.slice(0, 3).map(card => ({
                ...card,
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
                        className="px-8 py-3 bg-mystic-gold text-mystic-dark font-bold rounded-full hover:bg-white transition-all shadow-[0_0_20px_rgba(196,162,72,0.5)] focus:outline-none focus:ring-2 focus:ring-mystic-gold focus:ring-offset-2 focus:ring-offset-mystic-dark"
                        aria-label="Tráo bài và rút 3 lá bài Tarot"
                    >
                        🔮 Tráo bài & Rút 3 lá
                    </button>
                </div>
            )}

            {/* PHẦN 2: Hiệu ứng đang xào bài */}
            {step === 'shuffling' && (
                <div className="flex flex-col items-center justify-center h-96" role="status" aria-live="polite">
                    <div className="animate-spin text-5xl mb-4" aria-hidden="true">💫</div>
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
                                    <motion.div 
                                        className={`text-center transition-opacity duration-500 ${isFlipped ? 'opacity-100' : 'opacity-0'}`}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: isFlipped ? 1 : 0 }}
                                        transition={{ duration: 0.5 }}
                                        role="region"
                                        aria-live="polite"
                                    >
                                        <h4 className="text-xl font-bold text-mystic-gold">
                                            {card.name} <span className="text-sm text-gray-400">{card.isReversed ? '(Ngược)' : '(Xuôi)'}</span>
                                        </h4>
                                        <p className="text-sm text-gray-300 mt-2 text-justify bg-black/30 p-3 rounded border border-mystic-gold/30">
                                            {card.isReversed
                                                ? (card.meaning_reversed || "Chưa có dữ liệu ngược")
                                                : (card.meaning_upright || "Chưa có dữ liệu xuôi")
                                            }
                                        </p>
                                    </motion.div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Nút làm lại */}
                    <div className="text-center pb-10">
                        <button
                            onClick={resetReading}
                            className="text-gray-400 hover:text-white underline decoration-mystic-gold underline-offset-4 focus:outline-none focus:ring-2 focus:ring-mystic-gold focus:ring-offset-2 focus:ring-offset-mystic-dark rounded px-2"
                            aria-label="Thực hiện trải bài mới"
                        >
                            Thực hiện trải bài khác
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TarotBoard;