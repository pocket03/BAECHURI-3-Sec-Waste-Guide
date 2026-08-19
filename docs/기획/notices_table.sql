-- 공지사항 테이블 (집주인이 작성, 세입자는 읽기만 가능)
create table if not exists notices (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body_ko text not null,
  body_en text,
  body_zh text,
  body_vi text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table notices enable row level security;

drop policy if exists "public can read notices" on notices;
drop policy if exists "authenticated can insert notices" on notices;
drop policy if exists "authenticated can update notices" on notices;
drop policy if exists "authenticated can delete notices" on notices;
drop policy if exists "authenticated users can manage notices" on notices;

-- 세입자(로그인 없음)도 공지를 읽을 수 있어야 함
create policy "public can read notices"
  on notices for select
  using (true);

-- 쓰기(작성/수정/삭제)는 로그인한 집주인만
create policy "authenticated can insert notices"
  on notices for insert
  with check (auth.role() = 'authenticated');

create policy "authenticated can update notices"
  on notices for update
  using (auth.role() = 'authenticated');

create policy "authenticated can delete notices"
  on notices for delete
  using (auth.role() = 'authenticated');
