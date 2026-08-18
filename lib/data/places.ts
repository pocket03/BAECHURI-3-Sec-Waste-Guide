import { Place } from "@/lib/types";

// QR 시연용 가상 장소 (PRD 5절 Must-4). 실제 배포 시 건물별로 QR을 발급합니다.
export const PLACES: Place[] = [
  {
    id: "sindong-a",
    name: {
      ko: "익산 신동 A동 분리수거장",
      en: "Iksan Sindong Building A recycling area",
      zh: "益山新洞A栋回收站",
      vi: "Khu vực tái chế tòa A, Sindong, Iksan",
    },
    categories: ["plastic", "paper", "glass", "can", "vinyl", "styrofoam"],
    description: {
      ko: "이 분리수거장은 화·금요일 저녁 7시 이후에만 재활용품을 받습니다.",
      en: "This recycling area only accepts recyclables on Tuesday and Friday evenings after 7 PM.",
      zh: "该回收站仅在周二、周五晚上7点后接收可回收物。",
      vi: "Khu vực tái chế này chỉ nhận rác tái chế vào tối thứ Ba và thứ Sáu sau 7 giờ.",
    },
  },
];
