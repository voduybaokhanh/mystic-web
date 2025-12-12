import { GoogleGenerativeAI } from "@google/generative-ai";

// ⚠️ QUAN TRỌNG: Nếu đưa lên mạng (deploy), không được để lộ Key ở đây.
// Nhưng chạy Localhost demo cho khách thì thoải mái.
const API_KEY = import.meta.env.VITE_GOOGLE_AI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export const getTarotReading = async (cards, spreadType) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // 1. Chuẩn bị dữ liệu để gửi cho AI
    const cardDescriptions = cards.map((card, index) => {
      const positionName = spreadType.id === 'three' 
        ? ["Quá Khứ", "Hiện Tại", "Tương Lai"][index]
        : `Vị trí số ${index + 1}`; // Với Celtic Cross
      
      const status = card.isReversed ? "Ngược" : "Xuôi";
      return `- ${positionName}: Lá ${card.name} (${status}). Ý nghĩa cơ bản: ${card.isReversed ? card.meaning_reversed : card.meaning_upright}`;
    }).join("\n");

    // 2. Viết câu lệnh (Prompt) ra lệnh cho AI
    const prompt = `
      Bạn là một Tarot Reader chuyên nghiệp, giọng văn huyền bí, nhẹ nhàng, sâu sắc và chữa lành (healing).
      Hãy tổng hợp và giải bài dựa trên các lá bài sau đây theo trải bài "${spreadType.name}":
      
      ${cardDescriptions}

      Yêu cầu:
      1. Đừng chỉ liệt kê lại ý nghĩa từng lá. Hãy xâu chuỗi chúng lại thành một câu chuyện hoặc một lời khuyên tổng thể.
      2. Tìm mối liên hệ giữa các lá bài (Ví dụ: Lá quá khứ ảnh hưởng gì đến hiện tại).
      3. Kết luận bằng một lời khuyên hành động cụ thể cho người xem (Querent).
      4. Dùng xưng hô "bạn" và "vũ trụ".
      5. Trả về kết quả ngắn gọn dưới 300 từ, chia đoạn rõ ràng.
    `;

    // 3. Gửi yêu cầu
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
    
  } catch (error) {
    console.error("Lỗi gọi AI:", error);
    return "Vũ trụ đang bị nhiễu sóng (Lỗi kết nối AI). Hãy thử lại sau giây lát hoặc tự chiêm nghiệm các lá bài nhé.";
  }
};