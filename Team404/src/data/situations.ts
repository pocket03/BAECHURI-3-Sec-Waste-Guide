export type LanguageCode = "ko" | "en" | "zh" | "vi";

export const LANGUAGES: { code: LanguageCode; label: string }[] = [
  { code: "ko", label: "한국어" },
  { code: "en", label: "English" },
  { code: "zh", label: "中文" },
  { code: "vi", label: "Tiếng Việt" },
];

type Situation = {
  id: string;
  icon: string;
  label: string;
  templates: Record<LanguageCode, string>;
};

export const SITUATIONS: Situation[] = [
  {
    id: "trash",
    icon: "🗑️",
    label: "쓰레기 배출",
    templates: {
      ko: "{{building}}분리배출 안내\n일반쓰레기, 재활용품, 음식물쓰레기를 반드시 구분하여 배출해주세요.\n자세한 배출 방법과 요일은 아래 QR 코드를 확인해주세요.\n감사합니다.",
      en: "{{building}}Waste Separation Notice\nPlease separate general waste, recyclables, and food waste before disposal.\nScan the QR code below for detailed sorting rules and collection days.\nThank you.",
      zh: "{{building}}垃圾分类通知\n请务必将一般垃圾、可回收物和厨余垂圾分类投放。\n详细分类方法和收运日期请扫描下方二维码查看。\n谢谢。",
      vi: "{{building}}Thông báo phân loại rác\nVui lòng phân loại rác sinh hoạt, rác tái chế và rác thực phẩm trước khi vứt.\nQuét mã QR bên dưới để xem hướng dẫn phân loại chi tiết và ngày thu gom.\nCảm ơn.",
    },
  },
  {
    id: "moveout",
    icon: "🧹",
    label: "퇴실 청소",
    templates: {
      ko: "{{building}}퇴실 전 청소 안내\n퇴실 예정이신 분은 방 청소와 쓰레기 전량 배출을 완료해주셔야 보증금 반환이 원활합니다.\n배출 방법은 아래 QR 코드를 확인해주세요.\n감사합니다.",
      en: "{{building}}Move-out Cleaning Notice\nBefore moving out, please clean your room and dispose of all trash properly.\nThis is required for a smooth deposit refund. Scan the QR code below for disposal instructions.\nThank you.",
      zh: "{{building}}退房清洁通知\n退房前请打扫房间并处理好全部垃圾，这是顺利退还押金的前提条件。\n垃圾处理方法请扫描下方二维码查看。\n谢谢。",
      vi: "{{building}}Thông báo dọn dẹp khi trả phòng\nTrước khi trả phòng, vui lòng dọn dẹp phòng và xử lý toàn bộ rác đúng cách.\nĐây là điều kiện để hoàn trả tiền đặt cọc thuận lợi. Quét mã QR bên dưới để xem hướng dẫn xử lý rác.\nCảm ơn.",
    },
  },
  {
    id: "notice",
    icon: "📢",
    label: "공지사항",
    templates: {
      ko: "{{building}}안내 말씀\n안녕하세요, 건물 관리자입니다.\n[여기에 공지 내용을 입력해주세요]\n문의사항은 언제든 연락 주세요. 감사합니다.",
      en: "{{building}}Notice\nHello, this is the building manager.\n[Please enter the notice details here]\nFeel free to contact us with any questions. Thank you.",
      zh: "{{building}}公告\n您好，我是这栋楼的管理员。\n[请在此处输入公告内容]\n如有任何疑问请随时联系。谢谢。",
      vi: "{{building}}Thông báo\nXin chào, đây là quản lý tòa nhà.\n[Vui lòng nhập nội dung thông báo tại đây]\nNếu có thắc mắc, vui lòng liên hệ. Cảm ơn.",
    },
  },
];

export function renderMessage(template: string, buildingName: string): string {
  const name = buildingName.trim();
  return template.replace("{{building}}", name ? `[${name}] ` : "");
}
