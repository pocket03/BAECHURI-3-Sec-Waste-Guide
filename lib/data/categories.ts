import { CategoryInfo } from "@/lib/types";

// 화·금요일 재활용 배출 / 나머지 요일 일반쓰레기(종량제)만 가능 — 데모용 예시 규칙.
// 실제 익산시 신동 배출 요일은 익산시청 공고문으로 최종 확인이 필요합니다 (PRD 6절 참고).
export const RECYCLING_DAYS = [2, 5]; // 0=일 ... 2=화, 5=금

export const CATEGORIES: Record<string, CategoryInfo> = {
  plastic: {
    id: "plastic",
    recyclable: true,
    label: { ko: "플라스틱", en: "Plastic", zh: "塑料", vi: "Nhựa" },
    guide: {
      ko: "내용물을 비우고 물로 헹군 뒤, 라벨을 떼고 압착해서 배출하세요.",
      en: "Empty and rinse with water, remove the label, flatten, then dispose.",
      zh: "倒空并用水冲洗干净，撕掉标签后压扁再丢弃。",
      vi: "Đổ hết và rửa sạch bằng nước, bóc nhãn rồi ép dẹp trước khi vứt.",
    },
  },
  paper: {
    id: "paper",
    recyclable: true,
    label: { ko: "종이", en: "Paper", zh: "纸类", vi: "Giấy" },
    guide: {
      ko: "테이프·비닐 코팅 부분을 제거하고 물기 없이 펴서 배출하세요.",
      en: "Remove tape or plastic coating, keep it dry and flatten before disposal.",
      zh: "撕掉胶带或塑料涂层，保持干燥并压平后丢弃。",
      vi: "Bóc băng dính hoặc lớp bọc nhựa, giữ khô ráo và làm phẳng trước khi vứt.",
    },
  },
  glass: {
    id: "glass",
    recyclable: true,
    label: { ko: "유리병", en: "Glass", zh: "玻璃瓶", vi: "Chai thủy tinh" },
    guide: {
      ko: "내용물을 비우고 가볍게 헹궈서 뚜껑을 분리한 뒤 배출하세요. 깨진 유리는 일반쓰레기입니다.",
      en: "Empty, rinse lightly, remove the cap, then dispose. Broken glass goes in general waste.",
      zh: "倒空并简单冲洗，取下瓶盖后丢弃。破碎的玻璃属于一般垃圾。",
      vi: "Đổ hết, tráng qua nước, tháo nắp rồi vứt. Thủy tinh vỡ thuộc rác thông thường.",
    },
  },
  can: {
    id: "can",
    recyclable: true,
    label: { ko: "캔", en: "Can", zh: "罐类", vi: "Lon" },
    guide: {
      ko: "내용물을 비우고 헹군 뒤 가능하면 압착해서 배출하세요.",
      en: "Empty and rinse, flatten if possible, then dispose.",
      zh: "倒空并冲洗干净，尽量压扁后丢弃。",
      vi: "Đổ hết và rửa sạch, ép dẹp nếu có thể rồi vứt.",
    },
  },
  vinyl: {
    id: "vinyl",
    recyclable: true,
    label: { ko: "비닐", en: "Vinyl/Plastic film", zh: "塑料袋/薄膜", vi: "Túi/màng nhựa" },
    guide: {
      ko: "이물질을 털어내고 투명 비닐 전용 수거함에 배출하세요.",
      en: "Shake off any debris and dispose in the vinyl/film collection bin.",
      zh: "抖掉杂物后丢入塑料薄膜专用回收箱。",
      vi: "Giũ sạch bụi bẩn rồi bỏ vào thùng thu gom túi/màng nhựa.",
    },
  },
  styrofoam: {
    id: "styrofoam",
    recyclable: true,
    label: { ko: "스티로폼", en: "Styrofoam", zh: "泡沫塑料", vi: "Xốp" },
    guide: {
      ko: "이물질과 테이프를 제거하고 깨끗이 헹궈서 배출하세요. 오염이 심하면 일반쓰레기입니다.",
      en: "Remove tape and debris, rinse clean, then dispose. If heavily soiled, treat as general waste.",
      zh: "撕掉胶带并冲洗干净后丢弃。污渍严重时按一般垃圾处理。",
      vi: "Bóc băng dính, rửa sạch rồi vứt. Nếu bẩn nhiều thì bỏ vào rác thông thường.",
    },
  },
  general: {
    id: "general",
    recyclable: false,
    label: { ko: "일반쓰레기", en: "General waste", zh: "一般垃圾", vi: "Rác thông thường" },
    guide: {
      ko: "재활용이 되지 않는 품목입니다. 종량제 봉투에 담아 배출하세요.",
      en: "This item is not recyclable. Put it in a standard pay-as-you-throw bag.",
      zh: "该物品不可回收，请装入指定的收费垃圾袋后丢弃。",
      vi: "Vật phẩm này không tái chế được. Hãy cho vào túi rác trả phí theo quy định.",
    },
  },
};
