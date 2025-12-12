# mystic-web

Ứng dụng web Tarot và Thần Số Học với AI Reader

## 🚀 Cài đặt và Chạy

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build production
npm run build
```

## 🔑 Cấu hình AI Reader (Tùy chọn)

Để sử dụng tính năng AI Reader, bạn cần:

1. Lấy API key từ [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Tạo file `.env` trong thư mục gốc:
```env
VITE_GOOGLE_AI_API_KEY=your_actual_api_key_here
```
3. Restart development server

**Lưu ý:** Nếu không cấu hình API key, bạn vẫn có thể sử dụng ứng dụng để xem ý nghĩa các lá bài, chỉ không có tính năng AI tổng hợp lời giải.

## 📁 Cấu trúc Project

- `src/components/` - React components
- `src/services/` - API services (AI service)
- `src/utils/` - Utility functions
- `src/constants/` - Constants và configs
- `src/data/` - Dữ liệu Tarot và Numerology
- `dist/` - Build output (tự động tạo, không cần commit)

## 📖 Luật chơi bài Tarot

## Chuẩn bị:

- Tập trung tinh thần vào câu hỏi hoặc vấn đề cần giải đáp.
- Nhiều người khuyên nên thiền định hoặc hít thở sâu để đầu óc thư thái.

## Trộn và chia bài:

- Xáo bài và chia thành các phần theo quy tắc của cách trải bài đã chọn.
- Một số phương pháp phổ biến là trải 1 lá, 3 lá, hoặc trải theo kiểu Celtic Cross.

![Trải bài theo Celtic Cross](/public/Trai_Bai_Celtic_Cross.png)

## Ý nghĩa các vị trí lá bài:

### 
Lá 1: Hiện tại

Lá 2: Thử thách. Lá bài này thể hiện những thử thách hay vấn đề trước mắt mà người hỏi đang phải đối mặt. Khúc mắc này nếu được giải quyết sẽ giúp cuộc sống trở nên dễ dàng hơn nhiều. Thậm chí nếu bạn rút được một lá bài tích cực ở vị trí này, hãy xem xét nó cẩn thận vì nó vẫn thể hiện một thử thách.

Lá 3: Quá khứ. Lá bài này thể hiện những sự kiện dẫn tới tình huống hiện tại và có thể mang lại một vài dấu chỉ về cách mà thử thách đến.

Lá 4: Tương lai. Lá này thể hiện điều có thể xảy ra trong những tuần tiếp theo hay thậm chí là tháng tiếp theo. Đây không phải là kết quả cuối cùng, đơn giản nó là bước tiếp theo của cuộc hành trình.

Lá 5: Bên trên (Nhận thức). Lá này phản ánh mục tiêu, niềm đam mê hay kết quả tốt nhất theo tình huống của người hỏi. Đó là những gì người hỏi đang chủ đích hướng tới để giải quyết vấn đề.

Lá 6: Bên dưới (Tiềm thức). Lá bài này phản ánh những gì ẩn trong tiềm thức của người hỏi và đi sâu hơn vào nền tảng chính của vấn đề. Nó tượng trưng cho những cảm giác và thiên hướng tiềm ẩn gắn kết với tình huống và có thể chỉ thị cho những gì thực sự đang dẫn dắt người hỏi. Lá bài này có thể đem đến một thông điệp bất ngờ cho người hỏi, đặc biệt nếu họ không được kết nối sâu với những gì bên trong họ (nếu lá bài ngược nằm ở vị trí này, nó có thể hàm ý cho một “ẩn số” đối với người hỏi).

Lá 7: Lời khuyên. Lá tư vấn này chú ý đến mọi điều đang diễn ra trong cuộc sống của người hỏi và thể hiện một đề xuất cho phương pháp giải quyết những thử thách hiện tại.

Lá 8: Những ảnh hưởng bên ngoài. Lá bài này làm nổi bật những con người, nguồn năng lượng hay sự kiện sẽ ảnh hưởng đến kết quả của câu hỏi và nằm ngoài tầm kiểm soát của người hỏi.

Lá 9: Niềm hi vọng và/hoặc nỗi sợ hãi. Đây có lẽ là một trong những vị trí khó khăn nhất để giải nghĩa. Hãy luôn nghĩ rằng niềm hi vọng và những nỗi sợ hãi có mối quan hệ chặt chẽ nhau, do đó chúng là điều chúng ta đang hi vọng và/hay cũng có thể là cái cũng ta đang sợ hãi, và cũng có thể điều đó không xảy ra. Đôi khi thật hữu ích để rút thêm một lá thứ hai để làm rõ nghĩa hơn và đọc hai lá này cùng nhau.

Lá 10: Kết quả. Lá bài này đại diện cho mấu chốt của hoàn cảnh và liệu/cách thức vấn đề sẽ được giải quyết. Nó đưa ra kết quả dựa theo chuỗi hành động đang tiếp diễn ở thời điểm hiện tại của người hỏi. Và dĩ nhiên, nếu lá bài kết quả dẫn đến một kết quả không mong muốn, nó vẫn nằm trong ý chí tự do của người hỏi để tạo ra những thay đổi cần thiết cho hoàn cảnh của họ.

![Mối tương quan của trải bài Celtic Cross](/public/Moi_Tuong_Quan_Cua_Trai_Bai_Celtic_Cross.png)

## Phân tích chi tiết:

Đầu tiên, hãy hình dùng Celtic Cross được chia thành 2 phần chính – Phần hình vòng / chéo phía bên trái (Lá 1 đến 6) và phần hình đường thẳng phía bên phải (Lá 7 đến 10).

Phần hình vòng / chéo (Circle / Cross) thể hiện những gì đang diễn ra trong cuộc sống của người hỏi ở thời điểm trải bài. Phần này được tạo ra bởi hai đường chéo – một ở chính giữa (Lá 1 và 2) được lồng trong một đường chéo lớn hơn (Lá 3 đến 6). Đường chéo nhỏ thể hiện tâm điểm của vấn đề – điều quan trọng nhất về người hỏi ở thời điểm đọc bài. Đường chéo lớn hơn gồm 2 đường thẳng đè lên đường chéo nhỏ. Đường ngang (Lá 1, 3 và 4) thể hiện thời gian dịch chuyển từ quá khứ phía bên trái về tương lai ở phía bên phải. Đường dọc (Lá 1, 5 và 6) là nhận thức của người hỏi đi từ tiềm thức (không ý thức) bên dưới lên suy nghĩ nhận thức bên trên. Sáu lá bài tarot này kết hợp cùng nhau tạo ra môi trường bên trong và bề ngoài ở thời điểm đọc bài.

Phần đường thẳng (Staff) thể hiện mối quan hệ giữa người hỏi và môi trường mà ở đó họ hoạt động, và có thể đưa ra một dấu chỉ tốt hơn về điều đang xảy ra trong một ngữ cảnh rộng hơn.

Tiếp theo, hãy bắt đầu xem những sự kết hợp khác nhau của các lá bài để tạo nên một “câu truyện”:

So sánh hai lá Trên (Above, lá 5) và Dưới (Below, lá 6). Liệu có sự tương đồng giữa các mức bộ ý thức và tiềm thức? Liệu có sự liên kết giữa điều đang dẫn dắt người hỏi với điều mà người hỏi mong muốn? Nếu có sự liên kết thì thật tuyệt vời, vì sẽ dễ dàng hơn rất nhiều để giải quyết vấn đề. Nếu không, thì hỗ trợ người hỏi hiểu được điều gì đang xảy ra ở mức độ tiềm thức và cách thức điều này đang ảnh hưởng đến phản ứng của họ đối với vấn đề.

So sánh hai lá Trên (Above, lá 5) và Kết Quả (lá 10). Tương tự, liệu có sự liên kết giữa điều mà người hỏi mong muốn xảy ra và điều sẽ xảy ra? Liệu người hỏi đang “thuận” hay “nghịch” với hoàn cảnh? Nếu bạn nhận thấy rằng lá 5 và 10 đối lập nhau, thì người hỏi sẽ cần suy nghĩ thấu đáo về cách để tạo ra những kết quả mà họ mong muốn. Hay xem lá Lời Khuyên (Lá 7) để có thêm hướng dẫn.

So sánh hai lá Tương Lai (Lá 4) và Kết Quả (Lá 10). Làm cách nào những sự kiện trong tương lai gần góp phần hay ảnh hưởng đến kết quả cuối cùng? Liệu người hỏi có cần kiểm soát những sự kiện này theo một cách đặc biệt để tạo ra những kết quả phù hợp? Lần nữa, hãy tham khảo lá Lời Khuyên (Lá 7) để có thêm thông tin chi tiết.

So sánh hai lá Dưới (Below, lá 6) và Hi Vọng/Sợ Hãi (Lá 9). Nếu bạn đang gặp khó khăn trong việc giải nghĩa lá Hi Vọng/Sợ Hãi, hãy xem điều gì đang xảy ra ở mức độ tiềm thức bên trong người hỏi (Lá 6). Liệu có điều gì đó trong tiềm thức họ khiến họ sợ hãi hay hi vọng? Nếu bạn thấy lá bài ngược xuất hiện ở những vị trí này, thì dường như người hỏi chưa nhận thức được về những gì đang dẫn dắt tiềm thức họ và cách thức điều này đang ảnh hưởng lên họ ở “thế giới thực.”

So sánh hai lá Lời Khuyên (Lá 7) và Kết Quả (Lá 10). Liệu người hỏi có chấp nhận kết quả? Vâng, hãy tham chiếu lá Lời Khuyên để xem những hành động nào người hỏi có thể tiến hành để có kết quả tích cực hơn. Tương tự, hãy xem xét những sự kiện có thể xảy ra trong tương lai gần (Lá 4) để người hỏi có thể kiểm soát những việc này một cách hiệu quả.

Giải nghĩa bài:
Giải nghĩa từng lá bài dựa trên vị trí của nó trong kiểu trải.
Xem xét mối quan hệ và tương quan giữa các lá bài với nhau.
Kết hợp ý nghĩa của lá bài với trực giác cá nhân để đưa ra lời giải.
Lưu ý:
Tarot được xem là công cụ hỗ trợ để đưa ra định hướng, không phải là phương pháp dự đoán tương lai tuyệt đối.
Nên tránh đặt câu hỏi "có/không", câu hỏi về đời tư người khác, hoặc vấn đề chuyên môn (sức khỏe, pháp lý, tài chính).
