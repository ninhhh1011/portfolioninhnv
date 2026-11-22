# So sánh ba phương án nhân vật

## Mục tiêu

Tạo bản thử cục bộ để so sánh ba nhân vật trong cùng bố cục bàn làm việc và quỹ đạo dự án hiện có. Người dùng chọn một phương án trước khi đưa vào nhánh chính. Giữ khả năng tương tác với nhân vật, bố cục desktop/mobile và chế độ giảm chuyển động.

## Ba phương án

1. **Bán hiện thực:** Dùng mẫu minh họa bán hiện thực đã tạo, tối ưu kích thước tệp và áp dụng chuyển động nhẹ cho cảnh. Các bộ phận chỉ chuyển động độc lập nếu có lớp hình riêng; không mô tả ảnh tĩnh là animation khớp xương.
2. **Minh họa 2D rigged:** Chuẩn bị tài nguyên nhân vật tách lớp phù hợp rồi chuyển động đầu, mắt và tay độc lập; giữ bàn làm việc và các thành phần phía trước/sau đúng thứ tự. Nếu tài nguyên không đủ để làm chuyển động tự nhiên, báo rõ giới hạn thay vì dùng một ảnh nguyên khối và gọi là rigged.
3. **Nhân vật 3D rigged:** Sử dụng model 3D người đã rig, có quyền sử dụng và các animation phù hợp. Tải model khi chọn phương án này, cho phép chuyển động nghỉ và vẫy tay khi có animation tương ứng. Nếu model không có animation cụ thể, ghi rõ và không khẳng định tính năng đó đã hoạt động. Model hiện chưa có trong dự án.

## Cách so sánh

Trên nhánh thử, thêm một bộ chọn rõ ràng để đổi giữa ba phương án ngay tại khu vực nhân vật. Mỗi phương án hiển thị cùng khung cảnh, không điều hướng khỏi trang. Giữ phương án đang chọn trong phiên hiện tại. Bản chính và các thay đổi chưa commit ở workspace gốc không bị sửa; không gộp nhánh trước khi người dùng chọn.

## Hiệu năng và khả năng truy cập

Chỉ tải tài nguyên nặng của phương án được chọn, dừng animation khi ra ngoài màn hình hoặc ẩn tab, và hiển thị tư thế tĩnh khi người dùng bật giảm chuyển động. Bộ chọn dùng nút có nhãn và trạng thái được chọn, thao tác được bằng bàn phím. Khi WebGL không khả dụng hoặc model không tải được, hiển thị thông báo và ảnh dự phòng.

## Kiểm thử

Kiểm tra ba lựa chọn và các chuyển động thực sự có, chuyển đổi nhiều lần, khả năng tương tác nhân vật, bàn phím, mobile, giảm chuyển động, và dừng khi ngoài màn hình. Chạy kiểm tra TypeScript, kiểm tra tự động phù hợp và so sánh mức tải của từng phương án. Không coi ảnh concept là model 3D hay bộ rig 2D đã hoàn thiện.

## Tài nguyên còn thiếu

Cần một model 3D đã rig có quyền sử dụng phù hợp. Bộ lớp nhân vật 2D cũng cần được tạo hoặc cung cấp sao cho các bộ phận có thể chuyển động độc lập. Thông tin thiếu này ảnh hưởng chất lượng và khả năng hoàn thành hai phương án, không làm thay đổi các yêu cầu còn lại.
