const GuideModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-mystic-dark border border-mystic-gold rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 relative shadow-2xl shadow-mystic-gold/20">
        
        {/* Nút đóng */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl">&times;</button>

        {/* Nội dung bạn gửi - Đã format lại */}
        <div className="prose prose-invert max-w-none text-gray-300">
          <h2 className="text-2xl font-bold text-mystic-gold mb-4 text-center">Luật chơi & Trải bài Celtic Cross</h2>
          
          <h3 className="text-xl text-white mt-6 mb-2">1. Chuẩn bị</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Tập trung tinh thần vào câu hỏi hoặc vấn đề cần giải đáp.</li>
            <li>Nên thiền định hoặc hít thở sâu để đầu óc thư thái.</li>
          </ul>

          <h3 className="text-xl text-white mt-6 mb-2">2. Ý nghĩa các vị trí (Celtic Cross)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-white/5 rounded border border-white/10">
              <strong className="text-mystic-gold">Lá 1 - Hiện tại:</strong> Vấn đề cốt lõi đang diễn ra.
            </div>
            <div className="p-3 bg-white/5 rounded border border-white/10">
              <strong className="text-mystic-gold">Lá 2 - Thử thách:</strong> Vật cản hoặc vấn đề cần đối mặt.
            </div>
            <div className="p-3 bg-white/5 rounded border border-white/10">
              <strong className="text-mystic-gold">Lá 3 - Quá khứ:</strong> Sự kiện dẫn đến tình huống này.
            </div>
            <div className="p-3 bg-white/5 rounded border border-white/10">
              <strong className="text-mystic-gold">Lá 4 - Tương lai:</strong> Xu hướng sắp xảy ra.
            </div>
            <div className="p-3 bg-white/5 rounded border border-white/10">
              <strong className="text-mystic-gold">Lá 5 - Nhận thức:</strong> Mục tiêu, ý định của bạn.
            </div>
            <div className="p-3 bg-white/5 rounded border border-white/10">
              <strong className="text-mystic-gold">Lá 6 - Tiềm thức:</strong> Nỗi sợ hoặc động lực ẩn giấu.
            </div>
          </div>

          <h3 className="text-xl text-white mt-6 mb-2">3. Lưu ý quan trọng</h3>
          <blockquote className="border-l-4 border-mystic-gold pl-4 italic bg-white/5 p-2">
            "Tarot là công cụ định hướng, không phải dự đoán tương lai tuyệt đối. Kết quả bài nằm trong ý chí tự do của bạn để thay đổi."
          </blockquote>
        </div>
        
        <div className="mt-8 text-center">
          <button onClick={onClose} className="px-6 py-2 bg-mystic-gold text-mystic-dark font-bold rounded hover:bg-white transition">
            Đã hiểu, bắt đầu trải bài
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuideModal;