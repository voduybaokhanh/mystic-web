import {
  POSITION_NAMES_THREE_CARD,
  POSITION_NAMES_CELTIC,
} from "../constants/tarotConstants.js";
import tarotData from "../data/tarot.json";
import promptConfig from "../data/prompt.json";

// ⚠️ QUAN TRỌNG: Nếu đưa lên mạng (deploy), không được để lộ Key ở đây.
// Nhưng chạy Localhost demo cho khách thì thoải mái.
const GEMINI_API_KEY = import.meta.env.VITE_GOOGLE_AI_API_KEY;

// Chỉ dùng model gemini-1.5-flash (hỗ trợ free tier)
const GEMINI_MODEL = "gemini-2.5-flash";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1/models/${GEMINI_MODEL}:generateContent`;

/**
 * Validate API key trước khi sử dụng
 * @returns {{isValid: boolean, message?: string}} - Kết quả validation
 */
const validateApiKey = () => {
  if (!GEMINI_API_KEY) {
    return {
      isValid: false,
      message:
        "API key chưa được cấu hình. Vui lòng tạo file .env với VITE_GOOGLE_AI_API_KEY",
    };
  }

  if (
    typeof GEMINI_API_KEY !== "string" ||
    GEMINI_API_KEY.trim().length === 0
  ) {
    return {
      isValid: false,
      message: "API key không hợp lệ. Vui lòng kiểm tra lại file .env",
    };
  }

  if (
    GEMINI_API_KEY === "your_api_key_here" ||
    GEMINI_API_KEY.includes("example")
  ) {
    return {
      isValid: false,
      message: "Vui lòng thay thế API key mẫu bằng API key thật của bạn",
    };
  }

  return { isValid: true };
};

/**
 * Lấy bài đọc Tarot từ AI
 * @param {Array} cards - Mảng các lá bài đã chọn
 * @param {Object} spreadType - Loại trải bài
 * @returns {Promise<string>} - Lời giải từ AI hoặc thông báo lỗi
 */
export const getTarotReading = async (cards, spreadType) => {
  // Validate API key
  const apiKeyValidation = validateApiKey();
  if (!apiKeyValidation.isValid) {
    return `⚠️ ${apiKeyValidation.message}\n\nHướng dẫn:\n1. Tạo file .env trong thư mục gốc\n2. Thêm dòng: VITE_GOOGLE_AI_API_KEY=your_actual_api_key\n3. Lấy API key tại: https://aistudio.google.com/app/apikey\n\nHãy tự chiêm nghiệm các lá bài nhé.`;
  }

  // Validate input
  if (!cards || cards.length === 0) {
    return "Không có lá bài nào để phân tích. Vui lòng rút bài trước.";
  }

  try {
    // 1. Chuẩn bị dữ liệu để gửi cho AI
    const positionNames =
      spreadType.id === "three"
        ? POSITION_NAMES_THREE_CARD
        : POSITION_NAMES_CELTIC;

    // Tạo mô tả chi tiết từng lá bài với thông tin đầy đủ từ tarot.json
    const cardDescriptions = cards.map((card, index) => {
      const positionName = positionNames[index] || `Vị trí số ${index + 1}`;
      const status = card.isReversed ? "Ngược" : "Xuôi";

      // Tìm thông tin đầy đủ từ tarotData nếu có
      const fullCardData = tarotData.find(
        (c) => c.id === card.id || c.name === card.name
      );
      const meaning = card.isReversed
        ? card.meaning_reversed ||
          fullCardData?.meaning_reversed ||
          card.meaning_upright ||
          fullCardData?.meaning_upright ||
          "Ý nghĩa đang được cập nhật"
        : card.meaning_upright ||
          fullCardData?.meaning_upright ||
          "Ý nghĩa đang được cập nhật";

      return {
        position: positionName,
        name: card.name,
        status: status,
        meaning: meaning,
        id: card.id,
      };
    });

    // 2. Tạo prompt chi tiết với context về Tarot
    const cardDetailsText = cardDescriptions
      .map(
        (card) =>
          `- ${card.position}: Lá "${card.name}" (${card.status})\n  Ý nghĩa: ${card.meaning}`
      )
      .join("\n\n");

    const prompt = `${JSON.stringify(promptConfig, null, 2)}

CONTEXT:
- Trải bài: ${spreadType.name}
- Các lá bài: ${cardDetailsText}

Hãy giải bài theo hệ thống trên.`;

    // 3. Gửi yêu cầu qua REST API
    const parts = [{ text: prompt }];

    const geminiResp = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
        },
      }),
    });

    if (!geminiResp.ok) {
      const errorData = await geminiResp.json().catch(() => ({}));
      const errorMsg =
        errorData.error?.message ||
        errorData.message ||
        `HTTP ${geminiResp.status}: ${geminiResp.statusText}`;

      // Log chi tiết trong dev mode để debug
      if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.error("API Error Details:", {
          status: geminiResp.status,
          statusText: geminiResp.statusText,
          error: errorData,
          url: GEMINI_API_URL,
          model: GEMINI_MODEL,
        });
      }

      throw new Error(errorMsg);
    }

    const data = await geminiResp.json();

    // Extract text từ response
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!responseText) {
      throw new Error("Không nhận được phản hồi từ AI");
    }

    return responseText;
  } catch (error) {
    // Không dùng console.error, trả về thông báo lỗi thân thiện
    const errorMessage = error?.message || "Lỗi không xác định";

    // Trong development, có thể log để debug
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.error("Lỗi khi lấy bài đọc Tarot từ AI:", errorMessage);
    }

    // Thông báo lỗi chi tiết hơn nếu là lỗi API
    if (
      errorMessage.includes("API_KEY") ||
      errorMessage.includes("401") ||
      errorMessage.includes("403")
    ) {
      return "⚠️ API key không hợp lệ hoặc đã hết hạn. Vui lòng kiểm tra lại API key trong file .env\n\nHãy tự chiêm nghiệm các lá bài nhé.";
    }

    if (
      errorMessage.includes("429") ||
      errorMessage.includes("quota") ||
      errorMessage.includes("exceeded")
    ) {
      return "⚠️ Đã vượt quá giới hạn sử dụng API.\n\nVui lòng:\n- Kiểm tra quota tại: https://ai.dev/usage?tab=rate-limit\n- Hoặc đợi một chút rồi thử lại\n\nHãy tự chiêm nghiệm các lá bài nhé.";
    }

    return `Vũ trụ đang bị nhiễu sóng (Lỗi: ${errorMessage}). Hãy thử lại sau giây lát hoặc tự chiêm nghiệm các lá bài nhé.`;
  }
};
export const getZodiacCompatibility = async (sign1, sign2) => {
  try {
    // Validate API key
    const apiKeyValidation = validateApiKey();
    if (!apiKeyValidation.isValid) {
      return `⚠️ ${apiKeyValidation.message}`;
    }

    const prompt = `
      Hãy đóng vai một chuyên gia chiêm tinh học vui tính và sâu sắc.
      Hãy phân tích độ hòa hợp trong tình yêu giữa cung ${sign1.name} (${sign1.element}) và cung ${sign2.name} (${sign2.element}).
      
      Yêu cầu:
      1. Chấm điểm độ hợp nhau trên thang 100 (Ví dụ: 85/100).
      2. Nêu 1 điểm mạnh khi hai người bên nhau.
      3. Nêu 1 điểm xung đột cần khắc phục (cực kỳ quan trọng).
      4. Đưa ra một lời khuyên ngắn gọn để giữ lửa tình yêu.
      5. Giọng văn trẻ trung, gen Z một chút nhưng vẫn nghiêm túc về mặt chiêm tinh.
      6. Trình bày ngắn gọn, dùng emoji.
    `;

    // Gửi yêu cầu qua REST API (tương tự getTarotReading)
    const parts = [{ text: prompt }];

    const geminiResp = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
        },
      }),
    });

    if (!geminiResp.ok) {
      const errorData = await geminiResp.json().catch(() => ({}));
      const errorMsg =
        errorData.error?.message ||
        errorData.message ||
        `HTTP ${geminiResp.status}: ${geminiResp.statusText}`;
      throw new Error(errorMsg);
    }

    const data = await geminiResp.json();
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!responseText) {
      throw new Error("Không nhận được phản hồi từ AI");
    }

    return responseText;
  } catch (error) {
    // Không dùng console.error, trả về thông báo lỗi thân thiện
    const errorMessage = error?.message || "Lỗi không xác định";
    return `Vũ trụ đang bận se duyên nơi khác (Lỗi: ${errorMessage}). Thử lại sau nhé!`;
  }
};
