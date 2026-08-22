import { Lang, LocalizedText } from "@/lib/types";

export const STRINGS = {
  brand: {
    ko: "배추리 매니저",
    en: "BAECHURI Manager",
    zh: "BAECHURI Manager",
    vi: "BAECHURI Manager",
  },
  brandTagline: {
    ko: "언어장벽 없이, 3초 만에 확인하는 분리배출 가이드",
    en: "A disposal guide you can check in 3 seconds — no language barrier",
    zh: "无语言障碍，3秒确认垃圾分类的指南",
    vi: "Hướng dẫn phân loại rác kiểm tra trong 3 giây — không rào cản ngôn ngữ",
  },

  // 집주인 화면 (/)
  landlordTitle: {
    ko: "집주인 다국어 알림톡 생성기",
    en: "Multilingual notice generator for landlords",
    zh: "房东多语言通知生成器",
    vi: "Trình tạo thông báo đa ngôn ngữ cho chủ nhà",
  },
  landlordSubtitle: {
    ko: "아래 템플릿 중 하나를 선택하면 한국어와 3개 외국어 문장이 함께 만들어집니다. 그대로 복사해 카카오톡으로 보내주세요.",
    en: "Pick a template below to generate Korean plus three other languages at once. Copy it as-is and send it via KakaoTalk.",
    zh: "选择下方模板即可同时生成韩语和另外三种语言的内容，直接复制发送到KakaoTalk即可。",
    vi: "Chọn một mẫu bên dưới để tạo cùng lúc tiếng Hàn và ba ngôn ngữ khác. Sao chép nguyên văn và gửi qua KakaoTalk.",
  },
  groupTrash: {
    ko: "🗑️ 쓰레기 배출 안내",
    en: "🗑️ Waste disposal",
    zh: "🗑️ 垃圾投放通知",
    vi: "🗑️ Thông báo đổ rác",
  },
  groupMoveout: {
    ko: "🚪 퇴실 안내",
    en: "🚪 Move-out notice",
    zh: "🚪 退房通知",
    vi: "🚪 Thông báo dọn ra",
  },
  groupNotice: {
    ko: "📢 원룸 공지사항",
    en: "📢 Building notices",
    zh: "📢 房屋公告",
    vi: "📢 Thông báo chung của nhà trọ",
  },
  previewTitle: {
    ko: "미리보기 (카카오톡 발송용)",
    en: "Preview (for KakaoTalk)",
    zh: "预览（用于KakaoTalk发送）",
    vi: "Xem trước (để gửi qua KakaoTalk)",
  },
  copyAllButton: {
    ko: "전체 복사",
    en: "Copy all",
    zh: "复制全部",
    vi: "Sao chép tất cả",
  },
  copiedToast: {
    ko: "복사되었습니다",
    en: "Copied",
    zh: "已复制",
    vi: "Đã sao chép",
  },
  linkSectionTitle: {
    ko: "세입자에게 전달할 링크 · QR",
    en: "Link & QR code to share with tenants",
    zh: "分享给租户的链接和二维码",
    vi: "Liên kết & mã QR để gửi cho người thuê",
  },
  copyLinkButton: {
    ko: "링크 복사",
    en: "Copy link",
    zh: "复制链接",
    vi: "Sao chép liên kết",
  },
  downloadQrButton: {
    ko: "QR 이미지 다운로드",
    en: "Download QR image",
    zh: "下载二维码图片",
    vi: "Tải mã QR",
  },
  viewTenantDemoButton: {
    ko: "세입자 화면 데모 보기 →",
    en: "See the tenant-side demo →",
    zh: "查看租户端演示 →",
    vi: "Xem bản demo phía người thuê →",
  },
  legalNoticeInline: {
    ko: "※ 참고용 안내이며 법적 효력이 있는 통지가 아닙니다.",
    en: "※ Informational only — not a legally binding notice.",
    zh: "※ 仅供参考，不具有法律效力。",
    vi: "※ Chỉ mang tính tham khảo, không có hiệu lực pháp lý.",
  },
  siteQrSectionTitle: {
    ko: "분리수거장 현장 QR (시연용)",
    en: "On-site recycling area QR (demo)",
    zh: "现场回收站二维码（演示用）",
    vi: "Mã QR khu vực tái chế tại chỗ (demo)",
  },
  siteQrSectionDesc: {
    ko: "이 QR은 분리수거장에 붙여두는 용도입니다. 스캔하면 그 장소의 배출 안내로 바로 연결됩니다.",
    en: "This QR is meant to be posted at the recycling area. Scanning it links directly to that location's disposal guide.",
    zh: "此二维码用于张贴在回收站，扫描后可直接查看该地点的投放说明。",
    vi: "Mã QR này dùng để dán tại khu vực tái chế. Quét mã sẽ vào thẳng hướng dẫn đổ rác của địa điểm đó.",
  },
  demoModeNotice: {
    ko: "데모 버전: 실제 카카오톡 연동·문자 발송 없이 텍스트 복사로 시연합니다.",
    en: "Demo build: no real KakaoTalk integration — this simulates sending via copy & paste.",
    zh: "演示版本：未接入真实KakaoTalk，通过复制文本模拟发送。",
    vi: "Bản demo: chưa tích hợp KakaoTalk thật — mô phỏng gửi bằng cách sao chép văn bản.",
  },

  // 언어 선택 (/guide)
  chooseLanguageTitle: {
    ko: "사용할 언어를 선택하세요",
    en: "Choose your language",
    zh: "请选择您的语言",
    vi: "Chọn ngôn ngữ của bạn",
  },
  chooseLanguageSubtitle: {
    ko: "언제든지 화면 상단에서 언어를 다시 바꿀 수 있어요.",
    en: "You can change the language again anytime from the top of the screen.",
    zh: "您可以随时在屏幕顶部重新更改语言。",
    vi: "Bạn có thể đổi ngôn ngữ bất cứ lúc nào ở phía trên màn hình.",
  },

  // 검색 화면 (/search)
  searchTitle: {
    ko: "무엇을 버리시나요?",
    en: "What are you throwing away?",
    zh: "您要丢弃什么？",
    vi: "Bạn muốn vứt gì?",
  },
  todaySignalTitle: {
    ko: "오늘의 배출 신호등",
    en: "Today's disposal signal",
    zh: "今日投放信号灯",
    vi: "Đèn báo đổ rác hôm nay",
  },
  todayGreen: {
    ko: "재활용 배출 가능일입니다",
    en: "Recyclables can be put out today",
    zh: "今天可以投放可回收物",
    vi: "Hôm nay có thể bỏ rác tái chế",
  },
  todayRed: {
    ko: "재활용 배출 불가일입니다 (일반쓰레기만 가능)",
    en: "No recycling today (general waste only)",
    zh: "今天不可投放可回收物（仅限一般垃圾）",
    vi: "Hôm nay không đổ rác tái chế (chỉ rác thông thường)",
  },
  generalWasteNote: {
    ko: "일반쓰레기는 매일 저녁 7시 이후 종량제 봉투로 배출할 수 있어요.",
    en: "General waste can be put out every day after 7 PM using a pay-as-you-throw bag.",
    zh: "一般垃圾每天晚上7点后可用收费垃圾袋投放。",
    vi: "Rác thông thường có thể bỏ ra mỗi ngày sau 7 giờ tối bằng túi rác trả phí.",
  },
  faqTitle: {
    ko: "자주 묻는 질문",
    en: "Frequently asked questions",
    zh: "常见问题",
    vi: "Câu hỏi thường gặp",
  },
  itemGridTitle: {
    ko: "품목 아이콘을 눌러보세요",
    en: "Tap an item icon",
    zh: "点击物品图标",
    vi: "Nhấn vào biểu tượng vật phẩm",
  },
  itemDotLegend: {
    ko: "분리수거 가능",
    en: "Recyclable",
    zh: "可回收",
    vi: "Có thể tái chế",
  },
  changeLanguageButton: {
    ko: "언어 변경",
    en: "Change language",
    zh: "更改语言",
    vi: "Đổi ngôn ngữ",
  },

  // 결과 카드 (/result)
  backToSearchButton: {
    ko: "← 다시 검색하기",
    en: "← Back to search",
    zh: "← 返回搜索",
    vi: "← Quay lại tìm kiếm",
  },
  categoryLabel: {
    ko: "분리배출 종류",
    en: "Category",
    zh: "分类",
    vi: "Phân loại",
  },
  noteLabel: {
    ko: "⚠️ 주의",
    en: "⚠️ Note",
    zh: "⚠️ 注意",
    vi: "⚠️ Lưu ý",
  },
  recyclableYes: {
    ko: "재활용 가능",
    en: "Recyclable",
    zh: "可回收",
    vi: "Có thể tái chế",
  },
  recyclableNo: {
    ko: "재활용 불가",
    en: "Not recyclable",
    zh: "不可回收",
    vi: "Không thể tái chế",
  },
  disposalDaysLabel: {
    ko: "배출 가능 요일",
    en: "Disposal days",
    zh: "可投放日",
    vi: "Ngày được đổ rác",
  },
  disposalDaysRecyclable: {
    ko: "매주 화요일, 금요일 저녁 7시 이후",
    en: "Every Tuesday and Friday, after 7 PM",
    zh: "每周二、周五晚上7点后",
    vi: "Mỗi thứ Ba và thứ Sáu, sau 7 giờ tối",
  },
  disposalDaysGeneral: {
    ko: "매일 저녁 7시 이후 (종량제 봉투)",
    en: "Every day after 7 PM (pay-as-you-throw bag)",
    zh: "每天晚上7点后（收费垃圾袋）",
    vi: "Mỗi ngày sau 7 giờ tối (túi rác trả phí)",
  },
  placeCardTitle: {
    ko: "이 장소의 배출 안내",
    en: "Disposal guide for this location",
    zh: "该地点的投放说明",
    vi: "Hướng dẫn đổ rác tại địa điểm này",
  },
  placeAcceptedCategories: {
    ko: "이곳에서 받는 품목",
    en: "Accepted categories here",
    zh: "此处接收的分类",
    vi: "Các loại được chấp nhận tại đây",
  },
  notFoundTitle: {
    ko: "정보를 찾을 수 없습니다",
    en: "Information not found",
    zh: "未找到相关信息",
    vi: "Không tìm thấy thông tin",
  },

  // 문의하기 (/inquiry)
  inquiryButtonLabel: {
    ko: "📮 집주인에게 문의하기",
    en: "📮 Contact your landlord",
    zh: "📮 联系房东",
    vi: "📮 Liên hệ chủ nhà",
  },
  inquiryTitle: {
    ko: "집주인에게 문의하기",
    en: "Contact your landlord",
    zh: "联系房东",
    vi: "Liên hệ chủ nhà",
  },
  inquirySubtitle: {
    ko: "궁금한 점이나 요청 사항을 남기면 집주인이 문자로 답장을 보내드립니다.",
    en: "Leave a question or request and your landlord will reply by text message.",
    zh: "留下您的问题或请求，房东会通过短信回复您。",
    vi: "Để lại câu hỏi hoặc yêu cầu, chủ nhà sẽ trả lời bạn qua tin nhắn.",
  },
  inquiryPhoneLabel: {
    ko: "연락받을 전화번호",
    en: "Phone number for the reply",
    zh: "接收回复的电话号码",
    vi: "Số điện thoại để nhận trả lời",
  },
  inquiryPhonePlaceholder: {
    ko: "예: 01012345678",
    en: "e.g. 01012345678",
    zh: "例如：01012345678",
    vi: "vd: 01012345678",
  },
  inquiryMessageLabel: {
    ko: "문의 내용",
    en: "Your message",
    zh: "咨询内容",
    vi: "Nội dung liên hệ",
  },
  inquiryMessagePlaceholder: {
    ko: "예: 화장실 물이 잘 안 내려가요.",
    en: "e.g. The bathroom drain is clogged.",
    zh: "例如：厕所排水不畅。",
    vi: "vd: Nhà vệ sinh thoát nước kém.",
  },
  inquirySubmitButton: {
    ko: "문의 보내기",
    en: "Send inquiry",
    zh: "发送咨询",
    vi: "Gửi liên hệ",
  },
  inquirySubmitting: {
    ko: "보내는 중...",
    en: "Sending...",
    zh: "发送中...",
    vi: "Đang gửi...",
  },
  inquirySuccessTitle: {
    ko: "문의가 접수되었습니다",
    en: "Your inquiry has been sent",
    zh: "您的咨询已提交",
    vi: "Đã gửi liên hệ của bạn",
  },
  inquirySuccessDesc: {
    ko: "집주인이 확인 후 문자로 답장을 보내드릴 예정이에요.",
    en: "Your landlord will review it and reply by text message.",
    zh: "房东确认后会通过短信回复您。",
    vi: "Chủ nhà sẽ xem xét và trả lời bạn qua tin nhắn.",
  },
  inquiryErrorNoBuilding: {
    ko: "건물 정보를 확인할 수 없습니다. 집주인이 안내한 QR/링크로 다시 접속해 주세요.",
    en: "We couldn't identify your building. Please use the QR code or link your landlord shared.",
    zh: "无法确认建筑信息，请通过房东提供的二维码或链接重新访问。",
    vi: "Không xác định được tòa nhà. Vui lòng truy cập lại bằng mã QR hoặc liên kết chủ nhà đã cung cấp.",
  },
  inquiryErrorGeneric: {
    ko: "문의 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.",
    en: "Failed to send your inquiry. Please try again shortly.",
    zh: "咨询发送失败，请稍后重试。",
    vi: "Gửi liên hệ thất bại. Vui lòng thử lại sau.",
  },

  // 공통
  footerDisclaimer: {
    ko: "본 서비스의 배출 규정은 팀 404의 3주 MVP 데모용 예시이며, 익산시 공식 자료로 최종 확인이 필요합니다.",
    en: "The disposal rules in this demo are examples made for Team 404's 3-week MVP and should be verified against official Iksan city sources.",
    zh: "本服务中的投放规则为团队404三周MVP演示示例，最终请以益山市官方资料为准。",
    vi: "Quy định đổ rác trong bản demo này là ví dụ do Team 404 xây dựng cho MVP 3 tuần, cần đối chiếu với tài liệu chính thức của thành phố Iksan.",
  },
} satisfies Record<string, LocalizedText>;

export type StringKey = keyof typeof STRINGS;

export function t(lang: Lang, key: StringKey): string {
  return STRINGS[key][lang];
}
