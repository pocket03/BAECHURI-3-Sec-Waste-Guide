-- 세입자 전화번호 목록 (집주인만 조회/관리 가능, 개인정보라 공개 읽기 없음)
create table if not exists tenants (
  id uuid primary key default gen_random_uuid(),
  phone text not null,
  lang text not null default 'en', -- 'ko' | 'en' | 'zh' | 'vi'
  memo text,
  created_at timestamptz not null default now()
);

alter table tenants enable row level security;

drop policy if exists "authenticated can manage tenants" on tenants;

create policy "authenticated can manage tenants"
  on tenants for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
