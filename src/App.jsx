import TarotBoard from './components/Tarot/TarotBoard.jsx';

function App() {
  return (
    <div className="min-h-screen bg-mystic-dark text-white font-sans">
      {/* Header đơn giản */}
      <header className="p-6 text-center border-b border-white/10">
        <h1 className="text-3xl md:text-5xl font-bold text-mystic-gold uppercase tracking-[0.2em]">
          Mystic Tarot
        </h1>
        <p className="text-gray-400 mt-2 text-sm">Lắng nghe thông điệp từ vũ trụ</p>
      </header>

      {/* Body chính chứa bàn trải bài */}
      <main className="container mx-auto px-4 py-8">
        <TarotBoard />
      </main>
      
      <footer className="text-center text-gray-600 text-xs py-4">
        © 2025 Mystic Project
      </footer>
    </div>
  );
}

export default App;