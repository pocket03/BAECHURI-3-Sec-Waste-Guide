import { MessageTemplate } from "@/lib/types";

// 템플릿은 5개(쓰레기 2 + 퇴실 1 + 공지사항 2)로 상한이 고정되어 있습니다 (PRD 3.4절, 5절).
// 집주인은 이 화이트리스트 안에서만 선택할 수 있고 자유 작문은 지원하지 않습니다.
export const TEMPLATES: MessageTemplate[] = [
  {
    id: "trash-recycling",
    group: "trash",
    title: {
      ko: "재활용 배출 안내",
      en: "Recycling notice",
      zh: "可回收物投放通知",
      vi: "Thông báo tái chế",
    },
    body: {
      ko: "[분리배출 안내] 재활용 쓰레기는 매주 화요일, 금요일 저녁 7시 이후에 배출해 주세요. 페트병·캔·유리병·종이·비닐은 헹궈서 배출 부탁드립니다.",
      en: "[Recycling Notice] Please put out recyclables every Tuesday and Friday after 7 PM. Rinse plastic bottles, cans, glass, paper, and vinyl before disposal.",
      zh: "[可回收物投放通知] 请于每周二、周五晚上7点后投放可回收物。塑料瓶、罐类、玻璃瓶、纸类、塑料袋请冲洗干净后投放。",
      vi: "[Thông báo tái chế] Vui lòng bỏ rác tái chế vào mỗi thứ Ba và thứ Sáu sau 7 giờ tối. Hãy rửa sạch chai nhựa, lon, chai thủy tinh, giấy và túi ni lông trước khi vứt.",
    },
  },
  {
    id: "trash-general",
    group: "trash",
    title: {
      ko: "일반쓰레기 배출 안내",
      en: "General waste notice",
      zh: "一般垃圾通知",
      vi: "Thông báo rác thông thường",
    },
    body: {
      ko: "[일반쓰레기 안내] 재활용이 안 되는 쓰레기는 반드시 익산시 종량제 봉투에 담아 저녁 7시 이후에 배출해 주세요. 종량제 봉투는 편의점·마트에서 구매 가능합니다.",
      en: "[General Waste Notice] Non-recyclable waste must go in an official Iksan pay-as-you-throw bag, put out after 7 PM. These bags are sold at convenience stores and marts.",
      zh: "[一般垃圾通知] 不可回收垃圾必须装入益山市指定收费垃圾袋，于晚上7点后投放。垃圾袋可在便利店、超市购买。",
      vi: "[Thông báo rác thông thường] Rác không tái chế được phải cho vào túi rác trả phí chính thức của thành phố Iksan và bỏ ra sau 7 giờ tối. Túi này được bán tại cửa hàng tiện lợi và siêu thị.",
    },
  },
  {
    id: "moveout-cleaning",
    group: "moveout",
    legalNotice: true,
    title: {
      ko: "퇴실 청소 안내",
      en: "Move-out cleaning notice",
      zh: "退房清洁通知",
      vi: "Thông báo dọn dẹp khi trả phòng",
    },
    body: {
      ko: "[퇴실 안내] 퇴실 전 방·화장실·주방을 청소해 주시고, 개인 쓰레기와 짐은 전부 가지고 나가주세요. 청소 상태에 따라 보증금 정산 시 참고될 수 있습니다.",
      en: "[Move-out Notice] Please clean the room, bathroom, and kitchen before moving out, and take all personal trash and belongings with you. The cleaning condition may be referenced when settling the deposit.",
      zh: "[退房通知] 退房前请打扫房间、卫生间和厨房，并带走所有个人垃圾和物品。清洁状态可能会在结算押金时作为参考。",
      vi: "[Thông báo dọn ra] Vui lòng dọn dẹp phòng, nhà vệ sinh và bếp trước khi dọn ra, và mang theo toàn bộ rác và đồ đạc cá nhân. Tình trạng vệ sinh có thể được tham khảo khi hoàn tất tiền đặt cọc.",
    },
  },
  {
    id: "notice-house-rules",
    group: "notice",
    title: {
      ko: "입주 생활수칙 안내",
      en: "House rules notice",
      zh: "入住生活守则",
      vi: "Thông báo quy tắc sinh hoạt",
    },
    body: {
      ko: "[입주 생활수칙 안내] 밤 10시 이후에는 소음(세탁기·음악 등)을 줄여주시고, 공용 공간은 사용 후 정리 부탁드립니다. 방문객은 사전에 알려주세요.",
      en: "[House Rules Notice] Please keep noise down (washing machine, music, etc.) after 10 PM, and tidy up shared spaces after use. Please let us know in advance about visitors.",
      zh: "[入住生活守则] 晚上10点后请降低噪音（洗衣机、音乐等），使用公共空间后请整理。有访客请提前告知。",
      vi: "[Thông báo quy tắc sinh hoạt] Vui lòng giảm tiếng ồn (máy giặt, nhạc, v.v.) sau 10 giờ tối, và dọn dẹp khu vực chung sau khi sử dụng. Vui lòng báo trước nếu có khách đến thăm.",
    },
  },
  {
    id: "notice-disinfection",
    group: "notice",
    title: {
      ko: "방역/소독 안내",
      en: "Disinfection notice",
      zh: "消毒通知",
      vi: "Thông báo khử trùng",
    },
    body: {
      ko: "[방역 안내] 이번 주 건물 공동 소독(방역)이 진행됩니다. 소독 시간에는 창문을 닫아주시고, 반려동물이나 식품은 미리 치워주세요.",
      en: "[Disinfection Notice] Building-wide pest control/disinfection will take place this week. Please keep windows closed during the treatment and put away pets or food beforehand.",
      zh: "[消毒通知] 本周将进行楼栋公共消毒。消毒期间请关好窗户，并提前收好宠物和食品。",
      vi: "[Thông báo khử trùng] Tuần này tòa nhà sẽ tiến hành khử trùng chung. Vui lòng đóng cửa sổ trong thời gian khử trùng và cất vật nuôi, thực phẩm trước.",
    },
  },
];

export const LEGAL_NOTICE_TEXT = {
  ko: "※ 본 안내는 참고용 정보이며 법적 효력이 있는 통지가 아닙니다.",
  en: "※ This is informational guidance only and is not a legally binding notice.",
  zh: "※ 本通知仅供参考，不具有法律效力。",
  vi: "※ Đây chỉ là thông tin tham khảo, không phải thông báo có hiệu lực pháp lý.",
};
