/* =========================================================================
   DỮ LIỆU MINH HỌA cho bản demo "Bình Minh Kết Nối".
   Thông tin hành chính (4 xã cũ, diện tích, dân số, số xóm, đảng bộ, đền Canh)
   tổng hợp từ báo chí; còn lại — tin bài, văn bản, sản phẩm, người bán, giá,
   số liệu quỹ, phản ánh, tên người — là dữ liệu giả lập để trình diễn.
   Ảnh: ảnh thật giấy phép mở (xem photos.js và trang Nguồn ảnh), dùng minh họa.
   ========================================================================= */

const VUNG = ['Đức Thành', 'Mã Thành', 'Tân Thành', 'Tiến Thành'];

const NEWS_CATS = [
  { id: 'hoat-dong', name: 'Hoạt động Mặt trận' },
  { id: 'hoi-nong-dan', name: 'Hội Nông dân' },
  { id: 'hoi-lhpn', name: 'Hội Liên hiệp Phụ nữ' },
  { id: 'doan-thanh-nien', name: 'Đoàn Thanh niên' },
  { id: 'hoi-ccb', name: 'Hội Cựu chiến binh' },
  { id: 'giam-sat', name: 'Giám sát – Phản biện xã hội' },
  { id: 'dai-doan-ket', name: 'Đại đoàn kết – An sinh xã hội' },
];
const ORG_CATS = ['hoi-nong-dan', 'hoi-lhpn', 'doan-thanh-nien', 'hoi-ccb'];

const NEWS = [
  { id: 'n1', cat: 'hoat-dong', date: '06/10/2026', time: '15:20', img: 'gathering', views: 1284, author: 'Ban Thường trực UBMTTQ xã', hot: true,
    title: 'Triển khai Ngày hội Đại đoàn kết toàn dân tộc năm 2026 tại 42 khu dân cư',
    sum: 'Ban Thường trực Ủy ban MTTQ xã hướng dẫn các Ban công tác Mặt trận tổ chức Ngày hội ở 42 xóm từ ngày 01 đến 18/11/2026, gắn với kỷ niệm 96 năm Ngày truyền thống Mặt trận Tổ quốc Việt Nam.',
    body: [
      'Chiều 06/10, Ban Thường trực Ủy ban MTTQ Việt Nam xã Bình Minh tổ chức hội nghị triển khai kế hoạch tổ chức Ngày hội Đại đoàn kết toàn dân tộc năm 2026 ở khu dân cư. Dự hội nghị có đại diện Thường trực Đảng ủy, lãnh đạo UBND xã, các tổ chức chính trị – xã hội và Trưởng ban công tác Mặt trận 42 xóm.',
      'Theo kế hoạch, Ngày hội được tổ chức đồng loạt từ ngày 01 đến 18/11/2026 với hai phần. Phần lễ ôn lại truyền thống 96 năm Mặt trận Tổ quốc Việt Nam (18/11/1930 – 18/11/2026), đánh giá kết quả cuộc vận động "Toàn dân đoàn kết xây dựng nông thôn mới, đô thị văn minh", biểu dương hộ gia đình, cá nhân tiêu biểu. Phần hội gồm các hoạt động văn hóa, văn nghệ, thể thao và trò chơi dân gian.',
      'Năm nay, Ủy ban MTTQ xã khuyến khích các xóm tổ chức "Phiên chợ quê" giới thiệu sản phẩm của hộ gia đình, tổ hợp tác, hợp tác xã trong xóm, đồng thời hướng dẫn bà con đăng ký gian hàng trên Chợ OCOP Bình Minh và theo dõi Zalo OA của xã.',
      'Ban Thường trực đề nghị các Ban công tác Mặt trận gửi kế hoạch trước ngày 25/10/2026, cập nhật hình ảnh hoạt động lên Cổng thông tin để tổng hợp, đánh giá và lựa chọn khu dân cư tiêu biểu báo cáo cấp trên.',
    ] },
  { id: 'n2', cat: 'dai-doan-ket', date: '02/10/2026', time: '10:05', img: 'house', views: 976, author: 'Hoàng Lan',
    title: 'Bàn giao nhà Đại đoàn kết cho hộ cận nghèo tại xóm 7',
    sum: 'Ngôi nhà rộng 60 m² được xây dựng từ Quỹ "Vì người nghèo" của xã, sự đóng góp của gia đình, họ tộc và ngày công của Hội Cựu chiến binh, Đoàn Thanh niên.',
    body: [
      'Ngôi nhà có tổng kinh phí 95 triệu đồng, trong đó Quỹ "Vì người nghèo" xã hỗ trợ 60 triệu đồng, gia đình và họ tộc đối ứng 35 triệu đồng; Hội Cựu chiến binh và Đoàn Thanh niên xã đóng góp 120 ngày công.',
      'Đây là căn nhà thứ hai trong chỉ tiêu xây dựng 5 nhà Đại đoàn kết năm 2026 của xã. Ba căn còn lại sẽ khởi công trong tháng 10 và hoàn thành trước Ngày hội Đại đoàn kết toàn dân tộc 18/11.',
      'Toàn bộ khoản thu, chi của chương trình được công khai tại mục Quỹ & An sinh trên Cổng thông tin điện tử, người dân có thể đối chiếu theo sao kê tài khoản của Quỹ.',
    ] },
  { id: 'n3', cat: 'hoi-nong-dan', date: '29/09/2026', time: '16:40', img: 'workshop2', views: 842, author: 'Hội Nông dân xã',
    title: 'Tập huấn bán hàng trên mạng cho 120 hội viên sản xuất nông sản',
    sum: 'Hội viên được hướng dẫn chụp ảnh sản phẩm bằng điện thoại, viết bài giới thiệu, livestream và nhận đơn qua Zalo.',
    body: [
      'Lớp tập huấn kéo dài hai buổi, chia theo bốn cụm dân cư (Đức Thành, Mã Thành, Tân Thành, Tiến Thành cũ) để bà con thuận tiện đi lại. Mỗi học viên thực hành đăng một sản phẩm thật của gia đình lên Chợ OCOP Bình Minh.',
      'Giảng viên hướng dẫn cách chụp ảnh dưới ánh sáng tự nhiên, cách kể câu chuyện sản phẩm, cách đóng gói khi gửi đi xa và lưu ý về an toàn thực phẩm, ghi nhãn hàng hóa.',
      'Sau tập huấn, Hội Nông dân xã duy trì nhóm Zalo hỗ trợ; Tổ công nghệ số cộng đồng các xóm tiếp tục đến tận nhà giúp những hộ còn lúng túng.',
    ] },
  { id: 'n4', cat: 'doan-thanh-nien', date: '25/09/2026', time: '09:15', img: 'workshop', views: 731, author: 'Đoàn Thanh niên xã',
    title: '"Bình dân học vụ số": đoàn viên hướng dẫn người dân sử dụng dịch vụ công trực tuyến',
    sum: '45 đoàn viên chia thành 12 tổ, hỗ trợ hơn 600 lượt người dân cài đặt, sử dụng ứng dụng định danh điện tử và nộp hồ sơ trực tuyến.',
    body: [
      'Các tổ tình nguyện túc trực tại nhà văn hóa xóm vào tối thứ Bảy, Chủ nhật; với người cao tuổi, người khuyết tật, đoàn viên đến tận nhà hỗ trợ.',
      'Nội dung hướng dẫn gồm: cài đặt và kích hoạt tài khoản định danh điện tử, nộp hồ sơ trên Cổng Dịch vụ công, thanh toán không dùng tiền mặt, nhận diện và phòng tránh lừa đảo qua mạng.',
      'Đoàn Thanh niên xã đặt mục tiêu đến hết năm 2026, mỗi hộ gia đình có ít nhất một thành viên sử dụng thành thạo dịch vụ công trực tuyến.',
    ] },
  { id: 'n5', cat: 'hoi-lhpn', date: '22/09/2026', time: '14:30', img: 'vendor', views: 655, author: 'Hội LHPN xã',
    title: 'Ra mắt mô hình "Phụ nữ khởi nghiệp với sản phẩm địa phương"',
    sum: '18 hội viên tham gia mô hình đầu tiên, được hỗ trợ thiết kế bao bì, tem QR và mở gian hàng trên Chợ OCOP Bình Minh.',
    body: [
      'Mô hình tập trung vào các sản phẩm chế biến quy mô hộ gia đình như tương nếp, kẹo lạc, bánh đa, nhút; hội viên được kết nối vốn vay ưu đãi qua Ngân hàng Chính sách xã hội.',
      'Hội LHPN xã phối hợp Hội Nông dân hướng dẫn hội viên hoàn thiện hồ sơ để đăng ký đánh giá, phân hạng sản phẩm OCOP.',
    ] },
  { id: 'n6', cat: 'hoi-ccb', date: '18/09/2026', time: '08:50', img: 'road_build', views: 590, author: 'Hội Cựu chiến binh xã',
    title: 'Giám sát thi công tuyến đường liên xóm 15 – 16',
    sum: 'Ban Giám sát đầu tư cộng đồng cùng Hội Cựu chiến binh kiểm tra độ dày mặt đường, rãnh thoát nước và việc hoàn trả mặt bằng.',
    body: [
      'Tuyến đường dài 1,2 km, kinh phí từ ngân sách và đóng góp của Nhân dân. Qua giám sát, đoàn kiến nghị đơn vị thi công bổ sung 2 cống ngang tại điểm trũng và lắp biển cảnh báo tại khúc cua gần trường học.',
      'Kết quả giám sát và ý kiến trả lời của chủ đầu tư được đăng công khai để bà con theo dõi.',
    ] },
  { id: 'n7', cat: 'giam-sat', date: '15/09/2026', time: '17:10', img: 'meeting1', views: 1105, author: 'Ban Thường trực UBMTTQ xã',
    title: 'Hội nghị đối thoại giữa người đứng đầu cấp ủy, chính quyền với Nhân dân',
    sum: '32 ý kiến được nêu tại hội nghị, tập trung vào đất đai, giao thông nội đồng, nước sạch và đầu ra cho nông sản.',
    body: [
      'Hội nghị do Ban Thường trực Ủy ban MTTQ xã phối hợp tổ chức, có sự tham dự của đại diện cử tri 42 xóm. Các ý kiến đã được trả lời trực tiếp tại hội nghị hoặc giao bộ phận chuyên môn trả lời bằng văn bản trong 15 ngày.',
      'Toàn bộ ý kiến và nội dung trả lời được cập nhật vào hệ thống Phản ánh – Kiến nghị; mỗi ý kiến có mã để người dân tra cứu tiến độ giải quyết.',
    ] },
  { id: 'n8', cat: 'dai-doan-ket', date: '10/09/2026', time: '11:20', img: 'award', views: 802, author: 'Hoàng Lan',
    title: 'Quỹ "Vì người nghèo" xã tiếp nhận hơn 180 triệu đồng ủng hộ xây nhà Đại đoàn kết',
    sum: 'Nhiều con em quê hương làm ăn xa, doanh nghiệp, hợp tác xã trên địa bàn chung tay cùng chương trình.',
    body: [
      'Các khoản ủng hộ được tiếp nhận qua tài khoản của Quỹ và tại trụ sở Ủy ban MTTQ xã; danh sách được cập nhật theo sao kê ngân hàng.',
      'Ban vận động đề nghị các Ban công tác Mặt trận tiếp tục rà soát, đề xuất hộ khó khăn về nhà ở để xét hỗ trợ đợt tiếp theo.',
    ] },
  { id: 'n9', cat: 'hoi-nong-dan', date: '05/09/2026', time: '07:45', img: 'rice_sign', views: 918, author: 'Hội Nông dân xã',
    title: 'HTX Bàu Canh bao tiêu 85 ha lúa thơm vụ Hè thu cho bà con',
    sum: 'Giá thu mua cao hơn thị trường 5–8%; hợp tác xã đóng gói, gắn tem QR và bán qua Chợ OCOP Bình Minh.',
    body: [
      '126 hộ tham gia chuỗi liên kết được cung ứng giống, phân bón trả chậm và hướng dẫn ghi nhật ký đồng ruộng trên điện thoại.',
      'Nhật ký này là cơ sở để in tem truy xuất nguồn gốc trên từng túi gạo, giúp người mua biết rõ ruộng nào, ai trồng, gặt ngày nào.',
    ] },
  { id: 'n10', cat: 'hoat-dong', date: '06/04/2026', time: '09:00', img: 'temple_gate', views: 2140, author: 'Hoàng Lan',
    title: 'Lễ hội đền Canh 2026: giữ gìn giá trị văn hóa, gắn với phát triển du lịch',
    sum: 'Lễ hội diễn ra từ ngày 17 đến 20 tháng Hai âm lịch với phần lễ trang nghiêm và nhiều hoạt động văn hóa, thể thao dân gian.',
    body: [
      'Đền Canh thờ Đức Thánh Canh – vị thủy thần phù trợ nghề nông, được UBND tỉnh công nhận di tích lịch sử – văn hóa cấp tỉnh năm 2017. Phần hội có bóng chuyền nam, kéo co, đẩy gậy, cờ thẻ và giao lưu văn nghệ.',
      'Ủy ban MTTQ xã vận động Nhân dân giữ gìn vệ sinh môi trường, an ninh trật tự, thực hiện nếp sống văn minh tại lễ hội.',
    ] },
  { id: 'n11', cat: 'hoi-lhpn', date: '12/09/2026', time: '15:00', img: 'woman_smile', views: 433, author: 'Hội LHPN xã',
    title: 'Chi hội Phụ nữ xóm 14 gây quỹ từ mô hình thu gom phế liệu',
    sum: 'Sau 6 tháng, chi hội gây quỹ được 2,4 triệu đồng, ủng hộ toàn bộ vào Quỹ "Vì người nghèo" của xã.',
    body: ['Mỗi gia đình hội viên phân loại giấy, nhựa, kim loại tại nhà; chi hội thu gom vào sáng Chủ nhật cuối tháng. Mô hình vừa góp phần bảo vệ môi trường, vừa lan tỏa tinh thần tương thân tương ái.'] },
  { id: 'n12', cat: 'doan-thanh-nien', date: '28/08/2026', time: '19:30', img: 'village', views: 512, author: 'Đoàn Thanh niên xã',
    title: 'Ra quân "Thắp sáng đường quê" tại 6 xóm vùng đồi',
    sum: 'Đoàn viên lắp 120 bóng đèn năng lượng mặt trời trên các tuyến đường chưa có điện chiếu sáng.',
    body: ['Kinh phí từ nguồn xã hội hóa và ngày công đoàn viên; mỗi tuyến đường có một chi đoàn nhận chăm sóc, bảo dưỡng.'] },
  { id: 'n13', cat: 'hoi-ccb', date: '20/08/2026', time: '10:10', img: 'elders', views: 388, author: 'Hội Cựu chiến binh xã',
    title: 'Cựu chiến binh tham gia hòa giải thành 9 vụ việc ở cơ sở',
    sum: 'Các vụ việc chủ yếu liên quan đến ranh giới đất, lối đi chung và mâu thuẫn trong sinh hoạt.',
    body: ['Hội Cựu chiến binh xã có 42 hội viên tham gia tổ hòa giải ở các xóm, phối hợp Ban công tác Mặt trận giải quyết ngay từ cơ sở.'] },
  { id: 'n14', cat: 'giam-sat', date: '07/10/2026', time: '17:45', img: 'old_reader', views: 364, author: 'Ban Thường trực UBMTTQ xã',
    title: 'Giám sát việc thực hiện chính sách bảo hiểm y tế đối với hộ cận nghèo',
    sum: 'Đoàn giám sát làm việc tại xóm 19, 20; đối chiếu danh sách, kiểm tra việc cấp thẻ và hướng dẫn người dân sử dụng thẻ BHYT trên ứng dụng.',
    body: ['Qua giám sát, đoàn đề nghị UBND xã rà soát 11 trường hợp chưa được cấp thẻ do thay đổi thông tin sau sắp xếp đơn vị hành chính, hoàn thành trước ngày 30/10/2026.'] },
  { id: 'n15', cat: 'giam-sat', date: '30/09/2026', time: '14:15', img: 'meeting2', views: 297, author: 'Ban Thường trực UBMTTQ xã',
    title: 'Lấy ý kiến Nhân dân vào dự thảo Quy ước nếp sống văn minh trong việc cưới, việc tang',
    sum: 'Dự thảo được gửi tới 42 xóm và đăng trên Cổng thông tin; người dân góp ý trực tuyến đến hết ngày 25/10/2026.',
    body: ['Ban Thường trực Ủy ban MTTQ xã sẽ tổng hợp ý kiến, phản biện và gửi UBND xã trước khi ban hành.'] },
  { id: 'n16', cat: 'dai-doan-ket', date: '05/09/2026', time: '08:00', img: 'kids', views: 621, author: 'Hoàng Lan',
    title: 'Trao 30 suất học bổng "Tiếp sức đến trường" năm học 2026 – 2027',
    sum: 'Mỗi suất học bổng trị giá 2 triệu đồng, trao cho học sinh có hoàn cảnh khó khăn, vượt khó học tốt.',
    body: ['Chương trình tiếp tục vận động để trao đủ 50 suất học bổng trước ngày 30/10/2026.'] },
  { id: 'n17', cat: 'dai-doan-ket', date: '26/08/2026', time: '16:20', img: 'flood', views: 455, author: 'Hoàng Lan',
    title: 'Thăm, tặng quà hộ nghèo, người có hoàn cảnh khó khăn tại 6 xóm vùng đồi',
    sum: '80 suất quà, mỗi suất 500.000 đồng, từ nguồn vận động của Ủy ban MTTQ xã và nhà hảo tâm.',
    body: ['Đoàn đã đến thăm, động viên các gia đình, đồng thời nắm bắt nguyện vọng để đề xuất hỗ trợ sinh kế phù hợp.'] },
  { id: 'n18', cat: 'hoi-nong-dan', date: '15/08/2026', time: '09:40', img: 'digital_farmer', views: 704, author: 'Hội Nông dân xã',
    title: 'Ghi nhật ký đồng ruộng trên điện thoại: bước đầu chuyển đổi số trong sản xuất lúa',
    sum: 'Hơn 300 hộ đã ghi nhật ký gieo cấy, bón phân, phun thuốc trên điện thoại, làm cơ sở in tem truy xuất nguồn gốc.',
    body: ['Hội Nông dân xã phối hợp HTX Bàu Canh hướng dẫn hội viên; dữ liệu được dùng để chứng minh quy trình sản xuất khi tham gia đánh giá OCOP.'] },
  { id: 'n19', cat: 'hoat-dong', date: '20/08/2026', time: '15:30', img: 'training', views: 566, author: 'Ban Thường trực UBMTTQ xã',
    title: 'Ra mắt Tổ công nghệ số cộng đồng tại 42 xóm',
    sum: 'Mỗi tổ gồm Trưởng ban công tác Mặt trận, đại diện Đoàn Thanh niên và Hội Phụ nữ, làm đầu mối hướng dẫn người dân sử dụng các nền tảng số.',
    body: ['Các tổ được tập huấn về dịch vụ công trực tuyến, thanh toán không dùng tiền mặt, an toàn trên không gian mạng và hướng dẫn bà con mở gian hàng trên Chợ OCOP Bình Minh.'] },
  { id: 'n20', cat: 'hoat-dong', date: '01/10/2026', time: '16:00', img: 'meeting2', views: 702, author: 'Ban Thường trực UBMTTQ xã',
    title: 'Hội nghị Ủy ban MTTQ Việt Nam xã sơ kết công tác quý III, triển khai nhiệm vụ quý IV/2026',
    sum: 'Hội nghị đánh giá kết quả thực hiện Chương trình phối hợp và thống nhất hành động, thống nhất các nhiệm vụ trọng tâm đến cuối năm.',
    body: ['Trong quý III, Ủy ban MTTQ xã chủ trì 3 cuộc giám sát, 1 hội nghị phản biện xã hội; tiếp nhận 64 ý kiến, kiến nghị của cử tri và Nhân dân; vận động Quỹ "Vì người nghèo" được hơn 210 triệu đồng.',
      'Nhiệm vụ quý IV tập trung tổ chức Ngày hội Đại đoàn kết toàn dân tộc ở 42 khu dân cư, hoàn thành 5 nhà Đại đoàn kết và đưa Cổng thông tin điện tử, Chợ OCOP Bình Minh vào vận hành.'] },
  { id: 'n21', cat: 'hoat-dong', date: '24/09/2026', time: '08:30', img: 'elders', views: 488, author: 'Ban Thường trực UBMTTQ xã',
    title: 'Hội nghị lấy ý kiến người có uy tín trong cộng đồng dân cư',
    sum: 'Đại biểu là trưởng họ, người cao tuổi, chức sắc tôn giáo, doanh nhân tiêu biểu góp ý vào hoạt động của chính quyền và Mặt trận sau sắp xếp.',
    body: ['Các ý kiến tập trung vào việc giữ gìn hương ước, quy ước của xóm; phát huy vai trò dòng họ trong vận động con cháu chấp hành pháp luật, xây dựng nếp sống văn minh.'] },
  { id: 'n22', cat: 'hoi-lhpn', date: '27/09/2026', time: '09:20', img: 'gio2', views: 402, author: 'Hội LHPN xã',
    title: 'Hội thi "Mâm cơm gia đình Việt" gắn với giới thiệu đặc sản địa phương',
    sum: '14 đội đến từ các chi hội tham gia; nhiều món ăn được chế biến từ gạo thơm, ốc bươu, tương nếp của bà con trong xã.',
    body: ['Hội thi nhằm tôn vinh giá trị bữa cơm gia đình, đồng thời giới thiệu sản phẩm của hội viên. Các đội đạt giải được hỗ trợ chụp ảnh, đưa sản phẩm lên Chợ OCOP Bình Minh.'] },
  { id: 'n23', cat: 'doan-thanh-nien', date: '10/09/2026', time: '06:45', img: 'harvest', views: 377, author: 'Đoàn Thanh niên xã',
    title: 'Đoàn viên ra quân giúp gia đình chính sách thu hoạch lúa vụ Hè thu',
    sum: '60 đoàn viên giúp 15 gia đình chính sách, người cao tuổi neo đơn gặt, phơi và vận chuyển lúa về nhà.',
    body: ['Hoạt động nằm trong chuỗi chương trình tình nguyện "Ngày thứ Bảy vì dân" do Đoàn Thanh niên xã tổ chức hằng tháng.'] },
  { id: 'n24', cat: 'hoi-ccb', date: '02/09/2026', time: '07:15', img: 'flag', views: 451, author: 'Hội Cựu chiến binh xã',
    title: 'Hội Cựu chiến binh trao tặng 500 lá cờ Tổ quốc, xây dựng "Tuyến đường cờ đỏ sao vàng"',
    sum: 'Nhân dịp Quốc khánh 2/9, Hội CCB xã phối hợp Đoàn Thanh niên hoàn thành 6 tuyến đường cờ tại các xóm vùng Mã Thành, Tiến Thành.',
    body: ['Công trình góp phần giáo dục truyền thống yêu nước, tạo cảnh quan sáng – xanh – sạch – đẹp ở khu dân cư.'] },
];

const DEEDS = [
  { name: 'Ông Hồ Văn Thân', where: 'Xóm 21', img: 'elders', title: 'Hiến 320 m² đất mở rộng đường liên xóm',
    text: 'Gia đình ông tự nguyện tháo dỡ tường rào, hiến đất để tuyến đường đủ rộng cho xe chở nông sản ra vào.' },
  { name: 'Chị Hồ Thị Mai Anh', where: 'Xóm 5', img: 'brittle', link: '#/cho/gian-hang/maianh', title: 'Khởi nghiệp kẹo lạc mật mía, tạo việc làm cho 8 lao động nữ',
    text: 'Từ mô hình của Hội LHPN, chị đưa sản phẩm lên Chợ OCOP Bình Minh và đang hoàn thiện hồ sơ đánh giá OCOP.' },
  { name: 'Em Trần Minh Đức', where: 'Xóm 33', img: 'workshop2', title: 'Đoàn viên tiêu biểu phong trào "Bình dân học vụ số"',
    text: 'Trong 3 tháng hè, Đức đã hướng dẫn hơn 90 người cao tuổi sử dụng dịch vụ công trực tuyến và thanh toán qua điện thoại.' },
];

const DOCS = [
  ['52/KH-MTTQ', '01/10/2026', 'Kế hoạch', 'Tổ chức Ngày hội Đại đoàn kết toàn dân tộc năm 2026 ở khu dân cư'],
  ['49/KH-MTTQ', '20/09/2026', 'Kế hoạch', 'Giám sát việc thực hiện chính sách bảo hiểm y tế đối với hộ cận nghèo năm 2026'],
  ['31/TB-MTTQ', '18/09/2026', 'Thông báo', 'Kết quả Hội nghị đối thoại giữa người đứng đầu cấp ủy, chính quyền với Nhân dân'],
  ['12/HD-MTTQ', '05/09/2026', 'Hướng dẫn', 'Vận động ủng hộ Quỹ "Vì người nghèo" năm 2026'],
  ['18/QĐ-MTTQ', '28/08/2026', 'Quyết định', 'Hỗ trợ xây dựng nhà Đại đoàn kết đợt 2 năm 2026'],
  ['64/CV-MTTQ', '20/08/2026', 'Công văn', 'Triển khai Tổ công nghệ số cộng đồng tại các khu dân cư'],
  ['40/BC-MTTQ', '30/06/2026', 'Báo cáo', 'Sơ kết công tác Mặt trận 6 tháng đầu năm, phương hướng nhiệm vụ 6 tháng cuối năm 2026'],
  ['02/CTr-MTTQ', '15/01/2026', 'Chương trình', 'Chương trình phối hợp và thống nhất hành động của Ủy ban MTTQ xã năm 2026'],
];

const SCHEDULE = [
  ['Thứ Hai, 05/10', '07:30', 'Giao ban Ban Thường trực Ủy ban MTTQ xã', 'Trụ sở UBMTTQ xã'],
  ['Thứ Tư, 07/10', '14:00', 'Giám sát chính sách BHYT hộ cận nghèo tại xóm 19, 20', 'Nhà văn hóa xóm 19'],
  ['Thứ Năm, 08/10', '08:00', 'Hội nghị triển khai Ngày hội Đại đoàn kết (cụm Tiến Thành)', 'Nhà văn hóa xóm 33'],
  ['Thứ Sáu, 09/10', '08:00', 'Làm việc về phương án Cổng thông tin MTTQ và Chợ OCOP xã', 'Hội trường UBND xã'],
  ['Thứ Bảy, 10/10', '07:00', 'Ra quân vệ sinh môi trường "Ngày thứ Bảy xanh"', '42 khu dân cư'],
];

const LINKS = [
  ['Cổng Dịch vụ công quốc gia', 'https://dichvucong.gov.vn'],
  ['Cổng Thông tin điện tử tỉnh Nghệ An', 'https://www.nghean.gov.vn'],
  ['Ủy ban Trung ương MTTQ Việt Nam', 'https://mattran.org.vn'],
];

const CATS = [
  { id: 'gao', name: 'Gạo & nông sản', img: 'rice_sacks' },
  { id: 'thuy-san', name: 'Thủy sản', img: 'snails2' },
  { id: 'gia-cam', name: 'Gia cầm & trứng', img: 'chickens' },
  { id: 'trai-cay', name: 'Trái cây', img: 'orange_tree' },
  { id: 'duoc-lieu', name: 'Chè, mật ong, dược liệu', img: 'tea_field2' },
  { id: 'che-bien', name: 'Đặc sản chế biến', img: 'jars' },
  { id: 'du-lich', name: 'Du lịch trải nghiệm', img: 'homestay' },
];

const SELLERS = [
  { id: 'baucanh', name: 'HTX Nông nghiệp Bàu Canh', short: 'HTX Bàu Canh', owner: 'Giám đốc: ông Hồ Văn Bình', xom: 'Xóm 10', vung: 'Đức Thành', color: '#2d6a35', joined: '04/2026', img: 'rice_sign',
    story: 'Liên kết 126 hộ xã viên trên 85 ha lúa thơm quanh bàu Canh, canh tác theo quy trình giảm phân bón hóa học, ghi nhật ký đồng ruộng trên điện thoại.' },
  { id: 'ocduc', name: 'Tổ hợp tác nuôi ốc bươu đen Đức Thành', short: 'THT ốc Đức Thành', owner: 'Tổ trưởng: anh Trần Đình Lực', xom: 'Xóm 12', vung: 'Đức Thành', color: '#4a3b2c', joined: '05/2026', img: 'field2',
    story: '11 hộ nuôi ốc bươu đen trong ao ruộng sạch, cho ăn rau, bèo, cám gạo; ốc được nhả bùn 24 giờ trước khi xuất bán.' },
  { id: 'haiyen', name: 'Trang trại gà đồi Hải Yến', short: 'Trang trại Hải Yến', owner: 'Chủ trang trại: chị Lê Thị Yến', xom: 'Xóm 31', vung: 'Tiến Thành', color: '#b5541c', joined: '04/2026', img: 'chickens2',
    story: 'Gà ri lai thả trên 3 ha đồi, nuôi 5–6 tháng mới xuất chuồng, ăn ngô, thóc và rau xanh trồng tại trại.' },
  { id: 'ongmt', name: 'Tổ hợp tác ong mật Mã Thành', short: 'Ong mật Mã Thành', owner: 'Tổ trưởng: ông Phan Văn Tình', xom: 'Xóm 18', vung: 'Mã Thành', color: '#c98a00', joined: '06/2026', img: 'beehives',
    story: '420 đàn ong nội đặt dưới tán rừng vùng bán sơn địa; chỉ quay mật khi đủ độ già, không pha đường.' },
  { id: 'chett', name: 'Tổ hợp tác chè Tiến Thành', short: 'Chè Tiến Thành', owner: 'Tổ trưởng: bà Nguyễn Thị Lan', xom: 'Xóm 35', vung: 'Tiến Thành', color: '#3f7d3a', joined: '07/2026', img: 'tea_field',
    story: 'Chè trồng trên đất đồi, hái một tôm hai lá vào buổi sáng, sao tay bằng chảo gang theo cách làm truyền thống.' },
  { id: 'camloi', name: 'Vườn cam nhà bác Lợi', short: 'Vườn cam bác Lợi', owner: 'Chủ vườn: ông Thái Văn Lợi', xom: 'Xóm 27', vung: 'Tân Thành', color: '#e07b10', joined: '09/2026', img: 'orange_tree',
    story: '2,5 ha cam trên đất đồi, bón phân chuồng ủ hoai; cam chỉ hái khi có đơn để giữ độ tươi.' },
  { id: 'tuonghien', name: 'Cơ sở tương nếp Bà Hiền', short: 'Tương Bà Hiền', owner: 'Chủ cơ sở: bà Võ Thị Hiền', xom: 'Xóm 22', vung: 'Tân Thành', color: '#7a4b22', joined: '04/2026', img: 'jars',
    story: 'Ba đời làm tương: nếp cái, đậu tương rang, muối biển và nước giếng khơi, ủ trong chum sành từ 3 đến 6 tháng.' },
  { id: 'thuytien', name: 'Cơ sở giò chả Thủy Tiên', short: 'Giò chả Thủy Tiên', owner: 'Chủ cơ sở: chị Đặng Thị Thủy', xom: 'Xóm 3', vung: 'Mã Thành', color: '#a33b3b', joined: '05/2026', img: 'gio2',
    story: 'Giò làm theo cách truyền thống, thịt mua của các hộ chăn nuôi trong xã, gói lá chuối, luộc trong ngày.' },
  { id: 'duoclieu', name: 'HTX Dược liệu Bình Minh', short: 'HTX Dược liệu', owner: 'Giám đốc: ông Hoàng Hữu Phúc', xom: 'Xóm 40', vung: 'Tiến Thành', color: '#556b2f', joined: '04/2026', img: 'chevang_leaf',
    story: 'Thu mua lá chè vằng của bà con vùng đồi, nấu cao bằng nồi hơi inox, gửi mẫu kiểm nghiệm định kỳ.' },
  { id: 'maianh', name: 'Cơ sở bánh kẹo Mai Anh', short: 'Bánh kẹo Mai Anh', owner: 'Chủ cơ sở: chị Hồ Thị Mai Anh', xom: 'Xóm 5', vung: 'Mã Thành', color: '#b07a2a', joined: '06/2026', img: 'brittle',
    story: 'Kẹo lạc nấu bằng mật mía, dùng lạc của bà con trong xã; khởi nghiệp từ mô hình "Phụ nữ khởi nghiệp" của Hội LHPN xã.' },
  { id: 'dulich', name: 'Tổ du lịch cộng đồng Bàu Canh', short: 'Du lịch Bàu Canh', owner: 'Phụ trách: anh Hoàng Văn Nam', xom: 'Xóm 10', vung: 'Đức Thành', color: '#9c2a2a', joined: '08/2026', img: 'temple_gate',
    story: 'Đoàn viên thanh niên đưa khách viếng đền Canh, kể chuyện bàu Canh, cùng bà con làm nông một ngày.' },
];

const PRODUCTS = [
  { id: 'gao-thom-bau-canh', name: 'Gạo thơm Bàu Canh', cat: 'gao', seller: 'baucanh', price: 125000, unit: 'túi 5 kg', ocop: 3, tag: 'OCOP 3 sao', img: 'rice', gallery: ['rice_sacks', 'harvest', 'rice_sign'], sold: 1240, rating: 4.8, reviews: 86,
    desc: 'Hạt gạo thon dài, trong; cơm dẻo mềm, thơm nhẹ. Lúa trồng trên cánh đồng ven bàu Canh, gặt đúng độ chín, xay xát trong ngày và đóng túi hút chân không.',
    specs: [['Quy cách', 'Túi 5 kg hút chân không'], ['Hạn sử dụng', '6 tháng kể từ ngày đóng gói'], ['Bảo quản', 'Nơi khô ráo, thoáng mát'], ['Vụ thu hoạch', 'Hè thu 2026']] },
  { id: 'nep-cai-hoa-vang', name: 'Gạo nếp cái hoa vàng', cat: 'gao', seller: 'baucanh', price: 48000, unit: 'kg', ocop: 0, tag: 'Tiềm năng OCOP', img: 'sticky', gallery: ['rice_sacks', 'harvest'], sold: 410, rating: 4.7, reviews: 32,
    desc: 'Nếp hạt tròn, đều, đồ xôi dẻo thơm; dùng gói bánh chưng, nấu chè, làm tương đều ngon.',
    specs: [['Quy cách', 'Túi 1 kg / 2 kg'], ['Hạn sử dụng', '6 tháng'], ['Vụ thu hoạch', 'Hè thu 2026']] },
  { id: 'oc-buou-den', name: 'Ốc bươu đen Đức Thành', cat: 'thuy-san', seller: 'ocduc', price: 90000, unit: 'kg', ocop: 0, tag: 'Đặc sản địa phương', img: 'snails', gallery: ['snails2', 'field2'], sold: 688, rating: 4.9, reviews: 54,
    desc: 'Ốc bươu đen nuôi ao ruộng, thịt giòn, ngọt; đã nhả bùn 24 giờ. Giao trong ngày tại xã và vùng lân cận; đi xa đóng thùng xốp có sục khí.',
    specs: [['Quy cách', 'Túi lưới 1 kg'], ['Kích cỡ', '25–35 con/kg'], ['Giao hàng', 'Trong ngày (bán kính 30 km)']] },
  { id: 'ga-doi', name: 'Gà đồi thả vườn', cat: 'gia-cam', seller: 'haiyen', price: 165000, unit: 'kg', ocop: 3, tag: 'OCOP 3 sao', img: 'chickens', gallery: ['chickens2', 'eggs'], sold: 932, rating: 4.8, reviews: 71,
    desc: 'Gà ri lai nuôi thả đồi 5–6 tháng, da vàng, thịt chắc. Làm sẵn theo yêu cầu, hút chân không, có tem truy xuất trên từng con.',
    specs: [['Trọng lượng', '1,6 – 2,2 kg/con'], ['Hình thức', 'Gà sống hoặc làm sẵn'], ['Bảo quản', 'Ngăn mát 2 ngày, ngăn đông 3 tháng']] },
  { id: 'trung-ga-ri', name: 'Trứng gà ri thả vườn', cat: 'gia-cam', seller: 'haiyen', price: 45000, unit: 'chục', ocop: 0, tag: 'Nông sản sạch', img: 'eggs', gallery: ['chickens'], sold: 1520, rating: 4.7, reviews: 40,
    desc: 'Trứng gà ri nhặt trong ngày, lòng đỏ đậm, đóng khay giấy 10 quả.',
    specs: [['Quy cách', 'Khay 10 quả'], ['Hạn dùng', '15 ngày']] },
  { id: 'mat-ong-hoa-rung', name: 'Mật ong hoa rừng', cat: 'duoc-lieu', seller: 'ongmt', price: 380000, unit: 'chai 1 lít', ocop: 3, tag: 'OCOP 3 sao', img: 'honey', gallery: ['beehives', 'honey2'], sold: 356, rating: 4.9, reviews: 63,
    desc: 'Mật ong nội quay từ đàn ong đặt dưới tán rừng vùng bán sơn địa; độ ẩm thấp, vị ngọt đậm, hậu thơm.',
    specs: [['Quy cách', 'Chai thủy tinh 1 lít / 500 ml'], ['Mùa mật', 'Xuân 2026'], ['Bảo quản', 'Nhiệt độ thường, tránh ánh nắng']] },
  { id: 'che-bup-sao-tay', name: 'Chè búp sao tay Tiến Thành', cat: 'duoc-lieu', seller: 'chett', price: 130000, unit: 'gói 500 g', ocop: 0, tag: 'Tiềm năng OCOP', img: 'tea_basket', gallery: ['tea_field', 'tea_field2'], sold: 274, rating: 4.6, reviews: 19,
    desc: 'Búp chè một tôm hai lá, sao tay bằng chảo gang; nước xanh, vị chát dịu, hậu ngọt.',
    specs: [['Quy cách', 'Gói 500 g / hộp 200 g'], ['Hạn dùng', '12 tháng']] },
  { id: 'cao-che-vang', name: 'Chè vằng sẻ & cao chè vằng', cat: 'duoc-lieu', seller: 'duoclieu', price: 95000, unit: 'gói 500 g', ocop: 4, tag: 'OCOP 4 sao', img: 'chevang', gallery: ['chevang_leaf'], sold: 518, rating: 4.8, reviews: 47,
    desc: 'Lá chè vằng vùng đồi phơi khô, nấu nước uống hằng ngày như một thức uống truyền thống của người xứ Nghệ; có dạng cao đóng bánh tiện pha.',
    specs: [['Quy cách', 'Gói lá khô 500 g; hộp cao 100 g'], ['Hạn dùng', '24 tháng'], ['Cách dùng', 'Đun sôi 15 phút với 2 lít nước']] },
  { id: 'cam-duong', name: 'Cam vườn đồi Tân Thành', cat: 'trai-cay', seller: 'camloi', price: 35000, unit: 'kg', ocop: 0, tag: 'Đang vào mùa', img: 'orange', gallery: ['orange_tree', 'orange_vendor'], sold: 2140, rating: 4.7, reviews: 98,
    desc: 'Cam vỏ mỏng, mọng nước, vị ngọt thanh; hái tại vườn khi có đơn.',
    specs: [['Mùa vụ', 'Tháng 10 – tháng 1'], ['Quy cách', 'Thùng 5 kg / 10 kg']] },
  { id: 'tuong-nep', name: 'Tương nếp truyền thống', cat: 'che-bien', seller: 'tuonghien', price: 45000, unit: 'chai 1 lít', ocop: 3, tag: 'OCOP 3 sao', img: 'jars2', gallery: ['jars', 'sticky'], sold: 860, rating: 4.9, reviews: 77,
    desc: 'Tương ủ chum sành từ nếp cái, đậu tương rang và muối biển; sánh, màu cánh gián, vị ngọt hậu.',
    specs: [['Quy cách', 'Chai 1 lít / 500 ml'], ['Hạn dùng', '12 tháng'], ['Thời gian ủ', '3 – 6 tháng']] },
  { id: 'gio-lua', name: 'Giò lụa gói lá chuối', cat: 'che-bien', seller: 'thuytien', price: 220000, unit: 'kg', ocop: 3, tag: 'OCOP 3 sao', img: 'gio', gallery: ['gio2', 'leaf_food'], sold: 640, rating: 4.8, reviews: 58,
    desc: 'Giò giã từ thịt nóng trong ngày, nước mắm ngon, gói lá chuối, luộc chín đều; dai, giòn, thơm.',
    specs: [['Quy cách', 'Cây 0,5 kg / 1 kg'], ['Bảo quản', 'Ngăn mát 5 ngày']] },
  { id: 'keo-lac', name: 'Kẹo lạc mật mía', cat: 'che-bien', seller: 'maianh', price: 35000, unit: 'hộp 300 g', ocop: 0, tag: 'Tiềm năng OCOP', img: 'brittle', gallery: [], sold: 1105, rating: 4.6, reviews: 36,
    desc: 'Lạc rang giòn quyện mật mía, cắt miếng vừa ăn; không dùng chất bảo quản.',
    specs: [['Quy cách', 'Hộp 300 g'], ['Hạn dùng', '3 tháng']] },
  { id: 'trai-nghiem-bau-canh', name: 'Một ngày làm nông & viếng đền Canh', cat: 'du-lich', seller: 'dulich', price: 250000, unit: 'người', ocop: 0, tag: 'Trải nghiệm', img: 'homestay', gallery: ['temple_gate', 'harvest', 'field2'], sold: 126, rating: 4.9, reviews: 22,
    desc: 'Viếng đền Canh, nghe chuyện bàu Canh; cấy lúa, bắt ốc, nấu cơm cùng bà con; bữa trưa với đặc sản quê. Nhận đoàn từ 10 người.',
    specs: [['Thời gian', '7h30 – 15h00'], ['Bao gồm', 'Hướng dẫn viên, bữa trưa, nước uống'], ['Đặt trước', 'Tối thiểu 3 ngày']] },
];

const SEASON = {
  'gao-thom-bau-canh': { on: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], peak: [6, 10] },
  'oc-buou-den': { on: [4, 5, 6, 7, 8, 9, 10, 11], peak: [6, 7, 8, 9] },
  'ga-doi': { on: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], peak: [12, 1] },
  'mat-ong-hoa-rung': { on: [3, 4, 5, 9, 10], peak: [4] },
  'che-bup-sao-tay': { on: [3, 4, 5, 6, 7, 8, 9, 10], peak: [4, 5, 6] },
  'cam-duong': { on: [10, 11, 12, 1], peak: [11, 12] },
  'tuong-nep': { on: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], peak: [] },
  'gio-lua': { on: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], peak: [1, 12] },
  'keo-lac': { on: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], peak: [12, 1] },
  'trai-nghiem-bau-canh': { on: [1, 2, 3, 4, 9, 10, 11], peak: [2, 3] },
};

const REPORT_FIELDS = ['Hạ tầng – giao thông', 'Môi trường', 'Nông nghiệp – thủy lợi', 'Thủ tục hành chính', 'An sinh xã hội', 'An ninh – trật tự', 'Khác'];
const STATUS = ['Đã tiếp nhận', 'Đã chuyển xử lý', 'Đang xử lý', 'Đã giải quyết'];

const REPORTS = [
  { code: 'PA-2026-0158', title: 'Tiếng ồn karaoke sau 22 giờ tại xóm 27', field: 'An ninh – trật tự', xom: 'Xóm 27', date: '07/10/2026', status: 0, by: 'Ẩn danh',
    steps: [['07/10', 'Tiếp nhận qua Zalo OA']], answer: '' },
  { code: 'PA-2026-0156', title: 'Rác thải tồn đọng tại điểm tập kết gần chợ', field: 'Môi trường', xom: 'Xóm 9', date: '03/10/2026', status: 1, by: 'Bà L.T.H',
    steps: [['03/10', 'Tiếp nhận qua Cổng thông tin'], ['04/10', 'Chuyển UBND xã (bộ phận Kinh tế) và tổ vệ sinh môi trường']], answer: '' },
  { code: 'PA-2026-0154', title: 'Đề nghị nạo vét kênh tưới tiêu cánh đồng xóm 5', field: 'Nông nghiệp – thủy lợi', xom: 'Xóm 5', date: '24/09/2026', status: 2, by: 'Ông P.V.S',
    steps: [['24/09', 'Tiếp nhận qua Ban CTMT xóm 5'], ['25/09', 'Chuyển UBND xã'], ['30/09', 'UBND xã khảo sát hiện trường, lập phương án nạo vét']], answer: '' },
  { code: 'PA-2026-0151', title: 'Đèn đường trục chính xóm 12 hỏng nhiều ngày', field: 'Hạ tầng – giao thông', xom: 'Xóm 12', date: '21/09/2026', status: 3, by: 'Ông N.V.H',
    steps: [['21/09', 'Tiếp nhận qua Zalo OA'], ['22/09', 'Chuyển UBND xã (bộ phận Kinh tế)'], ['25/09', 'Thay 4 bóng đèn LED, Ban CTMT xóm xác nhận']],
    answer: 'UBND xã đã thay thế 4 bóng đèn hỏng ngày 25/09/2026. Ban công tác Mặt trận xóm 12 đã kiểm tra, xác nhận kết quả với người phản ánh.' },
  { code: 'PA-2026-0149', title: 'Hỏi thủ tục cấp đổi giấy chứng nhận quyền sử dụng đất sau sắp xếp địa giới', field: 'Thủ tục hành chính', xom: 'Xóm 30', date: '18/09/2026', status: 3, by: 'Bà T.T.L',
    steps: [['18/09', 'Tiếp nhận qua Cổng thông tin'], ['19/09', 'Chuyển bộ phận Một cửa UBND xã'], ['20/09', 'Đã trả lời']],
    answer: 'Giấy chứng nhận đã cấp vẫn có giá trị pháp lý; người dân không bắt buộc cấp đổi chỉ vì thay đổi tên đơn vị hành chính. Khi có nhu cầu cấp đổi, bà liên hệ bộ phận Một cửa của UBND xã để được hướng dẫn.' },
  { code: 'PA-2026-0146', title: 'Đề nghị hỗ trợ hộ bà neo đơn sửa mái nhà dột', field: 'An sinh xã hội', xom: 'Xóm 19', date: '10/09/2026', status: 3, by: 'Ban CTMT xóm 19',
    steps: [['10/09', 'Tiếp nhận'], ['12/09', 'Khảo sát thực tế'], ['20/09', 'Hoàn thành sửa chữa']],
    answer: 'Ban Thường trực Ủy ban MTTQ xã phối hợp Hội Cựu chiến binh, Đoàn Thanh niên huy động 32 ngày công và 12 triệu đồng từ Quỹ "Vì người nghèo" để sửa mái nhà, hoàn thành ngày 20/09/2026.' },
];

const FUND = {
  year: 2026, open: 128400000, thu: 486500000, chi: 352000000,
  bank: 'Ngân hàng (minh họa)', accNo: '3700 0000 2026', accName: 'UB MTTQ XA BINH MINH – QUY VI NGUOI NGHEO',
  campaigns: [
    { id: 'c1', name: 'Xây 5 nhà Đại đoàn kết năm 2026', target: 300000000, raised: 214500000, donors: 386, end: '18/11/2026', img: 'house',
      desc: 'Hỗ trợ 5 hộ nghèo, cận nghèo có nhà ở xuống cấp; mỗi nhà 60 triệu đồng. Đã bàn giao 2/5 nhà.' },
    { id: 'c2', name: 'Tiếp sức đến trường năm học 2026 – 2027', target: 100000000, raised: 76200000, donors: 214, end: '30/10/2026', img: 'kids',
      desc: '50 suất học bổng, mỗi suất 2 triệu đồng cho học sinh có hoàn cảnh khó khăn.' },
    { id: 'c3', name: 'Tết vì người nghèo – Xuân Đinh Mùi 2027', target: 150000000, raised: 12500000, donors: 31, end: '20/01/2027', img: 'gio2',
      desc: 'Quà Tết cho hộ nghèo, gia đình chính sách, người cao tuổi neo đơn.' },
  ],
  thuList: [
    ['06/10/2026', 'Con em quê hương Bình Minh tại TP. Hồ Chí Minh', 20000000, 'Xây nhà Đại đoàn kết'],
    ['05/10/2026', 'Tập thể giáo viên một trường tiểu học trên địa bàn', 3500000, 'Tiếp sức đến trường'],
    ['04/10/2026', 'Ông N.V.H (xóm 12)', 500000, 'Ủng hộ Quỹ'],
    ['03/10/2026', 'Chi hội Phụ nữ xóm 14', 2400000, 'Từ mô hình thu gom phế liệu'],
    ['02/10/2026', 'HTX Nông nghiệp Bàu Canh', 10000000, 'Xây nhà Đại đoàn kết'],
    ['01/10/2026', 'Bà T.T.L (xóm 30)', 200000, 'Ủng hộ Quỹ'],
    ['29/09/2026', 'Cơ sở giò chả Thủy Tiên', 2000000, 'Tiếp sức đến trường'],
    ['27/09/2026', 'Đoàn viên thanh niên xã', 3150000, 'Gây quỹ từ "Phiên chợ quê"'],
  ],
  chiList: [
    ['02/10/2026', 'Bàn giao nhà Đại đoàn kết hộ bà P.T.T (xóm 7)', 60000000, 'Quyết định hỗ trợ, biên bản bàn giao'],
    ['20/09/2026', 'Sửa mái nhà hộ neo đơn (xóm 19)', 12000000, 'Biên bản nghiệm thu'],
    ['05/09/2026', 'Trao 30 suất học bổng đầu năm học', 60000000, 'Danh sách ký nhận'],
    ['15/08/2026', 'Hỗ trợ khám chữa bệnh hiểm nghèo (4 trường hợp)', 20000000, 'Đề nghị của Ban CTMT xóm'],
  ],
};

const POLLS = [
  { id: 'p1', title: 'Ông/bà đánh giá thế nào về việc giải quyết thủ tục hành chính tại xã sau sắp xếp?', note: 'Khảo sát sự hài lòng quý III/2026 · Ủy ban MTTQ xã thực hiện', end: '15/10/2026',
    opts: [['Rất hài lòng', 472], ['Hài lòng', 548], ['Chưa hài lòng', 162], ['Ý kiến khác', 64]] },
  { id: 'p2', title: 'Bà con mong Chợ OCOP Bình Minh hỗ trợ điều gì nhất?', note: 'Hội Nông dân xã lấy ý kiến hội viên', end: '31/10/2026',
    opts: [['Tìm đầu ra, bao tiêu sản phẩm', 356], ['Tập huấn bán hàng trên mạng, livestream', 198], ['Thiết kế bao bì, tem QR truy xuất', 164], ['Hỗ trợ hồ sơ đánh giá OCOP', 147]] },
];
const SIDE_POLL = { id: 'p0', title: 'Ông/bà biết đến Cổng thông tin qua kênh nào?', opts: [['Zalo OA của xã', 214], ['Ban công tác Mặt trận xóm', 167], ['Facebook, mạng xã hội', 96], ['Kênh khác', 31]] };

const DRAFT = {
  title: 'Dự thảo Quy ước nếp sống văn minh trong việc cưới, việc tang tại các xóm',
  end: '25/10/2026', comments: 87,
  points: [
    'Việc cưới: tổ chức gọn trong 1 ngày; khuyến khích tiệc trà, tiệc ngọt.',
    'Việc tang: không rải vàng mã trên đường; hạn chế phát nhạc tang lễ sau 22 giờ.',
    'Ban công tác Mặt trận xóm phối hợp chi hội Phụ nữ, Cựu chiến binh vận động, nhắc nhở thực hiện.',
  ],
};

/* Ban công tác Mặt trận 42 xóm — tên người là giả lập */
const XOM = (() => {
  const ho = ['Nguyễn', 'Trần', 'Hồ', 'Phan', 'Lê', 'Hoàng', 'Đặng', 'Võ', 'Thái', 'Phạm', 'Đinh', 'Cao'];
  const nam = ['Văn Hùng', 'Đình Thắng', 'Hữu Sơn', 'Văn Tuấn', 'Xuân Bình', 'Văn Cường', 'Đình Hải', 'Quang Long', 'Văn Nam', 'Bá Phúc', 'Sỹ Quý', 'Văn Thanh', 'Hữu Vinh', 'Đình Lâm'];
  const nu = ['Thị Hoa', 'Thị Lan', 'Thị Hương', 'Thị Tâm', 'Thị Châu', 'Thị Mai', 'Thị Hằng'];
  return Array.from({ length: 42 }, (_, i) => {
    const female = i % 4 === 2;
    const name = `${ho[(i * 5 + 3) % ho.length]} ${female ? nu[(i * 3) % nu.length] : nam[(i * 7 + 1) % nam.length]}`;
    return {
      n: i + 1,
      leader: (female ? 'Bà ' : 'Ông ') + name,
      phone: `09${(i * 7 + 3) % 10}${(i * 3 + 1) % 10} xxx ${String(100 + ((i * 137) % 900)).padStart(3, '0')}`,
      households: 160 + ((i * 53) % 150),
    };
  });
})();

const ADMIN = {
  months: ['T5', 'T6', 'T7', 'T8', 'T9', 'T10'],
  orders: [42, 88, 131, 176, 240, 318],
  byField: [['Hạ tầng – giao thông', 58], ['Môi trường', 37], ['Nông nghiệp – thủy lợi', 34], ['Thủ tục hành chính', 29], ['An sinh xã hội', 26], ['An ninh – trật tự', 18], ['Khác', 12]],
};

const ORDERS = [
  { code: 'DH-2610-0318', time: '08/10 09:42', buyer: 'Chị Lan · TP. Vinh', items: 'Gạo thơm Bàu Canh ×2, Tương nếp ×3', total: 385000, pay: 'VietQR', st: 'Đang giao' },
  { code: 'DH-2610-0317', time: '08/10 08:15', buyer: 'Anh Hùng · Hà Nội', items: 'Mật ong hoa rừng ×2', total: 790000, pay: 'VietQR', st: 'Chờ người bán xác nhận' },
  { code: 'DH-2610-0316', time: '07/10 20:31', buyer: 'Bếp ăn một trường tiểu học', items: 'Gạo thơm Bàu Canh ×20', total: 2500000, pay: 'Chuyển khoản', st: 'Đã giao' },
  { code: 'DH-2610-0315', time: '07/10 17:02', buyer: 'Chị Thảo · Vinh', items: 'Ốc bươu đen ×3, Cam vườn đồi ×5', total: 445000, pay: 'COD', st: 'Đã giao' },
  { code: 'DH-2610-0314', time: '07/10 11:48', buyer: 'Chị Ngọc · TP. Hồ Chí Minh', items: 'Chè vằng ×4, Kẹo lạc ×6', total: 590000, pay: 'VietQR', st: 'Đang giao' },
];

const PENDING = [
  { id: 'q1', name: 'Nhút mít muối xổi', who: 'Hộ bà Lê Thị Sen · Xóm 16', when: '07/10/2026', note: 'Cần bổ sung ảnh bao bì' },
  { id: 'q2', name: 'Cá trắm đầm Bàu Canh', who: 'Tổ hợp tác thủy sản · Xóm 11', when: '06/10/2026', note: 'Đủ thông tin' },
  { id: 'q3', name: 'Bánh đa vừng nướng than', who: 'Hộ anh Nguyễn Văn Kiên · Xóm 24', when: '05/10/2026', note: 'Cần giấy xác nhận kiến thức ATTP' },
];

const QA = [
  { k: ['phản ánh', 'kiến nghị', 'phan anh', 'kien nghi', 'khiếu nại', 'góp ý'], q: 'Gửi phản ánh, kiến nghị thế nào?', link: '#/mttq/phan-anh',
    a: 'Bà con vào mục <b>Phản ánh – Kiến nghị</b>, ghi nội dung (có thể kèm ảnh, có thể ẩn danh) rồi bấm Gửi. Hệ thống cấp <b>mã tra cứu</b>; Ban Thường trực Ủy ban MTTQ xã tiếp nhận trong 1 ngày làm việc và báo kết quả qua Zalo hoặc tin nhắn.' },
  { k: ['ủng hộ', 'quỹ', 'quyên góp', 'người nghèo', 'ung ho'], q: 'Tôi muốn ủng hộ Quỹ Vì người nghèo', link: '#/mttq/quy',
    a: 'Bà con quét mã VietQR ở mục <b>Quỹ "Vì người nghèo"</b> để chuyển khoản thẳng vào tài khoản của Quỹ. Mọi khoản thu – chi đều được công khai theo sao kê ngân hàng.' },
  { k: ['ocop', 'bán hàng', 'gian hàng', 'sản phẩm', 'lên chợ', 'lên sàn', 'ban hang'], q: 'Đưa sản phẩm nhà tôi lên Chợ OCOP?', link: '#/cho/dang-ky',
    a: 'Bà con đăng ký với chi hội Nông dân, chi hội Phụ nữ hoặc Ban công tác Mặt trận xóm. Tổ công nghệ số cộng đồng sẽ đến chụp ảnh, ghi thông tin và mở gian hàng <b>miễn phí</b>. Sản phẩm đủ điều kiện được hỗ trợ hồ sơ đăng ký đánh giá OCOP.' },
  { k: ['xóm', 'ban công tác', 'trưởng ban', 'xom'], q: 'Ban công tác Mặt trận xóm tôi là ai?', link: '#/mttq/xom',
    a: 'Danh bạ Ban công tác Mặt trận 42 xóm có ở mục <b>Ban CTMT 42 xóm</b>, kèm số điện thoại và nhóm Zalo của từng xóm.' },
  { k: ['đất', 'sổ đỏ', 'giấy tờ', 'sáp nhập', 'sắp xếp', 'cấp đổi'], q: 'Sau sáp nhập có phải đổi giấy tờ không?',
    a: 'Giấy tờ đã cấp vẫn có giá trị sử dụng; người dân không bắt buộc làm thủ tục cấp đổi chỉ vì thay đổi tên đơn vị hành chính. Khi có nhu cầu, bà con liên hệ bộ phận Một cửa của UBND xã.' },
];
