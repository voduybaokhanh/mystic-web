import { useState } from "react";
import TarotBoard from "./components/Tarot/TarotBoard";
import NumerologyTool from "./components/Number/NumerologyForm";
import GuideModal from "./components/GuideModal/Guide_Tarot";
import ZodiacMatch from "./components/Zodiac/ZodiacMatch";
import RuneCasting from "./components/Rune/RuneCasting";

function App() {
  const [activeTab, setActiveTab] = useState("tarot"); // 'tarot' hoặc 'numerology'
  const [showGuide, setShowGuide] = useState(false);

  return (
    <div className="min-h-screen bg-mystic-dark text-white font-sans overflow-x-hidden">
      {/* HEADER & NAV */}
      <header className="p-6 text-center border-b border-white/10 sticky top-0 bg-mystic-dark/95 backdrop-blur z-40">
        <h1 className="text-3xl md:text-5xl font-bold text-mystic-gold uppercase tracking-[0.2em] mb-4">
          Mystic Space
        </h1>

        {/* THANH MENU CHUYỂN TAB */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setActiveTab("tarot")}
            className={`px-6 py-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-mystic-gold focus:ring-offset-2 focus:ring-offset-mystic-dark ${
              activeTab === "tarot"
                ? "bg-mystic-gold text-mystic-dark font-bold shadow-lg"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            }`}
            aria-label="Chuyển sang tab Tarot"
            aria-pressed={activeTab === "tarot"}
          >
            🔮 Tarot
          </button>

          <button
            onClick={() => setActiveTab("numerology")}
            className={`px-6 py-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-mystic-gold focus:ring-offset-2 focus:ring-offset-mystic-dark ${
              activeTab === "numerology"
                ? "bg-mystic-gold text-mystic-dark font-bold shadow-lg"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            }`}
            aria-label="Chuyển sang tab Nhân số học"
            aria-pressed={activeTab === "numerology"}
          >
            🔢 Nhân số học
          </button>

          <button
            onClick={() => setActiveTab("zodiac")}
            className={`px-4 py-2 md:px-6 rounded-full transition-all border border-transparent ${
              activeTab === "zodiac"
                ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold shadow-lg shadow-pink-500/30"
                : "bg-white/5 text-gray-400 hover:bg-white/10 hover:border-white/20"
            }`}
          >
            💘 Bói Tình Duyên
          </button>

          <button
            onClick={() => setActiveTab("runes")}
            className={`px-4 py-2 md:px-6 rounded-full transition-all border border-transparent ${
              activeTab === "runes"
                ? "bg-stone-700 text-cyan-300 font-bold shadow-lg border-cyan-500/50"
                : "bg-white/5 text-gray-400 hover:bg-white/10 hover:border-white/20"
            }`}
          >
            🪨 Runes
          </button>
        </div>
      </header>

      {/* BODY */}
      <main className="container mx-auto px-4 py-8 pb-20">
        {/* TAB TAROT */}
        {activeTab === "tarot" && (
          <div className="animate-fade-in">
            {/* Nút xem hướng dẫn Tarot */}
            <div className="text-right mb-4">
              <button
                onClick={() => setShowGuide(true)}
                className="text-xs text-gray-400 hover:text-mystic-gold border-b border-dotted focus:outline-none focus:ring-2 focus:ring-mystic-gold rounded px-1"
                aria-label="Mở hướng dẫn trải bài Celtic Cross"
              >
                📖 Xem hướng dẫn Celtic Cross
              </button>
            </div>
            <TarotBoard />
          </div>
        )}

        {/* TAB Nhân số học */}
        {activeTab === "numerology" && (
          <div className="animate-fade-in">
            <NumerologyTool />
          </div>
        )}

        {activeTab === "zodiac" && (
          <div className="animate-fade-in">
            <ZodiacMatch />
          </div>
        )}

        {activeTab === "runes" && (
          <div className="animate-fade-in">
            <RuneCasting />
          </div>
        )}
      </main>

      {/* Modal Hướng dẫn */}
      <GuideModal isOpen={showGuide} onClose={() => setShowGuide(false)} />
    </div>
  );
}

export default App;
