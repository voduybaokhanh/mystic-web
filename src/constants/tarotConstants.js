/**
 * Constants cho Tarot components
 * Tập trung các giá trị dùng chung để tránh duplicate
 */

export const POSITION_NAMES_CELTIC = [
  "1. Hiện tại",
  "2. Thử thách",
  "3. Quá khứ",
  "4. Tương lai",
  "5. Nhận thức",
  "6. Tiềm thức",
  "7. Lời khuyên",
  "8. Ảnh hưởng bên ngoài",
  "9. Hy vọng/Sợ hãi",
  "10. Kết quả",
];

export const POSITION_NAMES_THREE_CARD = [
  "Quá Khứ",
  "Hiện Tại",
  "Tương Lai",
];

export const SPREAD_TYPES = {
  THREE_CARD: { id: "three", name: "Trải 3 lá (Thời gian)", count: 3 },
  CELTIC_CROSS: { id: "celtic", name: "Celtic Cross (Chi tiết)", count: 10 },
};

export const REVERSED_PROBABILITY = 0.3; // 30% tỷ lệ bài ngược
export const SHUFFLE_DELAY_MS = 1500;

