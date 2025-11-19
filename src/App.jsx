import { useState } from 'react'
import TarotCard from './components/TarotCard'

// Giả lập dữ liệu 1 lá bài (sau này sẽ lấy từ file JSON)
const DEMO_CARD = {
  name: "The Fool",
  image: "https://upload.wikimedia.org/wikipedia/commons/9/90/RWS_Tarot_00_Fool.jpg" // Ảnh test tạm
}

function App() {
  const [isFlipped, setIsFlipped] = useState(false); // Trạng thái: false là úp, true là ngửa

  return (
    <div className="min-h-screen bg-mystic-dark flex flex-col items-center justify-center p-4 gap-8">
      
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-mystic-gold uppercase tracking-widest">
          Tarot Reader
        </h1>
        <p className="text-gray-400">Bấm vào lá bài để lật mở vận mệnh</p>
      </div>

      {/* Hiển thị lá bài */}
      <TarotCard 
        image={DEMO_CARD.image}
        name={DEMO_CARD.name}
        isFlipped={isFlipped}
        onClick={() => setIsFlipped(!isFlipped)} // Bấm vào thì đổi trạng thái
      />

      {/* Hiện nghĩa lá bài khi đã lật */}
      {isFlipped && (
        <div className="max-w-md text-center text-gray-200 animate-pulse">
          <h3 className="text-xl font-bold text-mystic-gold mb-2">The Fool - Sự Khởi Đầu</h3>
          <p>Bạn đang đứng trước một hành trình mới đầy hứa hẹn nhưng cũng nhiều rủi ro. Hãy cứ bước đi với niềm tin ngây thơ!</p>
        </div>
      )}
    </div>
  )
}

export default App