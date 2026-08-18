import { FaqEntry } from "@/lib/types";

export const FAQ: FaqEntry[] = [
  {
    id: "when-recycling",
    question: {
      ko: "재활용은 언제 배출하나요?",
      en: "When can I put out recyclables?",
      zh: "可回收物什么时候投放？",
      vi: "Khi nào tôi có thể bỏ rác tái chế?",
    },
    answer: {
      ko: "재활용품은 화요일과 금요일 저녁 7시 이후에 배출할 수 있습니다. 그 외 요일은 일반쓰레기만 가능합니다.",
      en: "Recyclables can be put out on Tuesday and Friday after 7 PM. On other days, only general waste is allowed.",
      zh: "可回收物可在周二和周五晚上7点后投放。其他日子只能投放一般垃圾。",
      vi: "Rác tái chế có thể bỏ ra vào thứ Ba và thứ Sáu sau 7 giờ tối. Các ngày khác chỉ được bỏ rác thông thường.",
    },
  },
  {
    id: "where-buy-bag",
    question: {
      ko: "종량제 봉투는 어디서 사나요?",
      en: "Where can I buy the pay-as-you-throw bags?",
      zh: "在哪里可以买到收费垃圾袋？",
      vi: "Tôi có thể mua túi rác trả phí ở đâu?",
    },
    answer: {
      ko: "동네 편의점이나 마트에서 '익산시 종량제 봉투'를 구매할 수 있습니다. 다른 봉투를 사용하면 과태료 대상이 될 수 있어요.",
      en: "You can buy official Iksan city pay-as-you-throw bags at nearby convenience stores or marts. Using any other bag may result in a fine.",
      zh: "可以在附近的便利店或超市购买'益山市指定收费垃圾袋'。使用其他袋子可能会被罚款。",
      vi: "Bạn có thể mua túi rác trả phí chính thức của thành phố Iksan tại cửa hàng tiện lợi hoặc siêu thị gần nhà. Dùng túi khác có thể bị phạt.",
    },
  },
  {
    id: "delivery-box",
    question: {
      ko: "택배 상자(종이박스)는 그냥 버려도 되나요?",
      en: "Can I just throw away delivery boxes?",
      zh: "快递纸箱可以直接丢弃吗？",
      vi: "Tôi có thể vứt thùng giấy giao hàng như bình thường không?",
    },
    answer: {
      ko: "테이프와 운송장 스티커를 떼어내고 펼쳐서 종이류로 배출하세요. 붙어 있으면 재활용이 안 될 수 있어요.",
      en: "Remove the tape and shipping label, flatten it, and recycle it as paper. Leaving them on may prevent recycling.",
      zh: "请撕掉胶带和运单贴纸，压平后作为纸类回收。不撕掉可能无法回收。",
      vi: "Hãy bóc băng dính và tem vận đơn, làm phẳng rồi bỏ vào rác giấy. Nếu không bóc có thể không được tái chế.",
    },
  },
  {
    id: "night-trash",
    question: {
      ko: "밤에 쓰레기를 버려도 되나요?",
      en: "Can I take out trash at night?",
      zh: "晚上可以扔垃圾吗？",
      vi: "Tôi có thể đổ rác vào ban đêm không?",
    },
    answer: {
      ko: "일반쓰레기는 저녁 7시 이후부터 다음날 새벽까지 배출하는 것이 일반적입니다. 정확한 시간은 건물 공지를 확인하세요.",
      en: "General waste is usually put out from 7 PM until early the next morning. Check your building's notice for the exact time.",
      zh: "一般垃圾通常在晚上7点后到次日凌晨投放。具体时间请查看楼栋公告。",
      vi: "Rác thông thường thường được bỏ ra từ 7 giờ tối đến sáng sớm hôm sau. Hãy kiểm tra thông báo của tòa nhà để biết giờ chính xác.",
    },
  },
];
