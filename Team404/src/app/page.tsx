import Link from "next/link";

export default function Home() {
  return (
    <div className="neu-surface flex min-h-screen flex-1 flex-col items-center justify-center px-4 py-16">
      <div className="flex w-full max-w-xl flex-col gap-8">
        <header className="text-center">
          <p className="text-sm font-medium text-[var(--neu-accent)]">
            익산 신동 원룸촌 · 팀 404
          </p>
          <h1 className="mt-1 text-3xl font-bold sm:text-4xl">배추리</h1>
          <p className="mt-3 text-sm leading-relaxed text-[var(--neu-text-muted)]">
            언어 장벽 때문에 분리배출·퇴실 규칙을 놓치는 외국인 유학생을 위해,
            건물 관리자가 4개 언어(한·영·중·베) 안내문과 QR을 만들어 전달하는
            서비스입니다.
          </p>
        </header>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/landlord"
            className="neu-raised flex flex-1 flex-col gap-2 p-6 text-left transition-transform hover:-translate-y-0.5"
          >
            <span className="text-2xl">🏠</span>
            <span className="text-base font-semibold">건물 관리자용</span>
            <span className="text-sm text-[var(--neu-text-muted)]">
              상황별 안내문 만들고 QR 발급하기
            </span>
          </Link>

          <Link
            href="/guide"
            className="neu-raised flex flex-1 flex-col gap-2 p-6 text-left transition-transform hover:-translate-y-0.5"
          >
            <span className="text-2xl">🌍</span>
            <span className="text-base font-semibold">입주자용</span>
            <span className="text-sm text-[var(--neu-text-muted)]">
              QR로 받은 안내문 확인하기
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
