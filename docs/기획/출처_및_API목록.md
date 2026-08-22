# 출처 및 사용 API·서비스 목록

발표 자료(참고 슬라이드) 또는 보고서 부록용으로 정리한 문서입니다.

---

## 1. 출처 (References)

PRD 작성 시 근거로 사용한 자료입니다 (원문: [PRD 12절](배추리매니저-PRD_20260812.md#출처-references)).

| # | 제목 | 출처 | 링크 |
|---|---|---|---|
| 1 | 대학교 근처 원룸가의 쓰레기 무단투기 및 혼합배출 해결: 공통 쓰레기 분리수거함 설치와 홍보 | 민주주의 서울(서울시 시민제안) | http://democracy.seoul.go.kr/front/suggest/view.do?sn=181398&tr_code=sug |
| 2 | 외국인 1만명 넘는 서대문구…'쓰레기 처리 이렇게' 무단투기 금지 홍보 | 뉴시스 | https://www.newsis.com/view/NISX20250502_0003162821 |
| 3 | 여기저기 널린 쓰레기, 무단투기 심한 법대후문 원룸촌 | 고대신문 | http://www.kunews.ac.kr/news/articleView.html?idxno=20350 |
| 4 | 서울 외국인 원룸 구하기: 전세·월세·계약 절차 가이드 | 위브링 | https://mywebring.com/seoul-foreigners-rent-room-guide/ |
| 5 | [법률칼럼] 외국인 유학생 등쳐먹기 – 억울한 임대차 피해 | 재외동포신문 | https://www.dongponews.net/news/articleView.html?idxno=47427 |
| 6 | 한국에 사는 외국인, 집주인이 보증금을 안 돌려줍니다 | 법무법인 슈가스퀘어 | https://blog.sugar.legal/한국에-사는-외국인-집주인이-보증금을-안-돌려줍니다-외국인-임차인-보증금-분쟁-대응-가이드-149103 |
| 7 | 폐기물관리법 제68조(과태료) 및 부과기준 | 서초구청 | https://www.seocho.go.kr/site/seocho/04/10408030105002015070706.jsp |
| 8 | 신고제 기반 부과 절차 — 익산시 폐기물 관리 조례 | 국가법령정보센터 | https://law.go.kr/LSW/ordinInfoP.do?ordinSeq=1801341 |
| 9 | 중국 판매 안드로이드폰의 구글 플레이스토어 미탑재 관련 | 커뮤니티·기술 자료 종합 | — |
| 10 | 자리톡(Zaritalk) — 카톡 고지서 발송·월세 알림, 누적 이용 500만+ (경쟁사 비교용) | Zaritalk 공식 사이트 | https://zaritalk.com/ |

> 익산 신동 지역의 등록외국인 통계·시청 민원 자료는 아직 확보하지 못해 향후 보완이 필요한 항목입니다(PRD 1.2절).

---

## 2. 사용한 API·서비스 목록

| 서비스 | 용도 | 사용 위치 | 비고 |
|---|---|---|---|
| **Google Cloud Translation API** (v2, REST) | 공지사항·FAQ·문의 내용을 한/영/중/베 4개 언어로 자동 번역 | [lib/translate.ts](../../lib/translate.ts), [app/api/translate/route.ts](../../app/api/translate/route.ts) | 서버 전용 키(`GOOGLE_TRANSLATE_KEY`)로만 호출, 클라이언트 노출 없음 |
| **Solapi** (SMS 발송 API) | 집주인이 작성한 공지·답장을 세입자에게 실제 문자로 발송 | [lib/sms.ts](../../lib/sms.ts) (`solapi` npm SDK) | 환경변수(`SOLAPI_API_KEY`/`SOLAPI_API_SECRET`/`SOLAPI_SENDER_NUMBER`) 미설정 시 자동으로 Mock 모드로 전환 |
| **Supabase** (Auth + Postgres DB) | 집주인 로그인, 건물별 데이터(공지/FAQ/세입자/문의/건물설정) 저장 및 권한 분리(RLS) | `@supabase/supabase-js`, `@supabase/ssr` | anon key + Row Level Security만 사용, service role key 미사용 |
| **Vercel** | 웹 애플리케이션 배포·호스팅 | — | `baechuri-404.vercel.app` |
| **qrcode** (npm 라이브러리) | 건물별 접속 QR 코드 이미지 생성 | [components/QrCodeImage.tsx](../../components/QrCodeImage.tsx) | 외부 API 아닌 클라이언트 로컬 생성 라이브러리 |
| **Next.js 16 (App Router)** | 웹 프레임워크 | 전체 프로젝트 | React 19 기반 |
| **Tailwind CSS v4** | 스타일링 | 전체 프로젝트 | 별도 config 파일 없이 `@tailwindcss/postcss` 사용 |
