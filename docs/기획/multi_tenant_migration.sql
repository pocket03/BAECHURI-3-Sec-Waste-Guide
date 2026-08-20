-- 집주인마다 자기 건물 데이터를 갖도록 하는 마이그레이션
-- notices_table.sql, tenants_table.sql을 이미 실행했다는 전제로, 그 위에 추가로 실행합니다.

-- 1) notices에 소유자(landlord_id) 추가
-- SQL Editor는 로그인 세션이 아니라 관리자 권한으로 실행되기 때문에 auth.uid()가 NULL입니다.
-- 그래서 먼저 nullable로 컬럼을 추가하고, 기존 데이터는 지금 있는 유일한 계정으로 채운 뒤 NOT NULL로 바꿉니다.
alter table notices add column if not exists landlord_id uuid references auth.users(id);

update notices set landlord_id = (select id from auth.users order by created_at asc limit 1)
where landlord_id is null;

alter table notices alter column landlord_id set not null;
alter table notices alter column landlord_id set default auth.uid();

alter table notices enable row level security;

drop policy if exists "public can read notices" on notices;
drop policy if exists "authenticated can insert notices" on notices;
drop policy if exists "authenticated can update notices" on notices;
drop policy if exists "authenticated can delete notices" on notices;
drop policy if exists "authenticated users can manage notices" on notices;

-- 공지는 QR/링크로 들어오는 세입자가 로그인 없이 읽어야 하므로 계속 전체 공개
create policy "public can read notices"
  on notices for select
  using (true);

-- 쓰기는 본인 소유 데이터에만
create policy "landlord can insert own notices"
  on notices for insert
  with check (auth.uid() = landlord_id);

create policy "landlord can update own notices"
  on notices for update
  using (auth.uid() = landlord_id);

create policy "landlord can delete own notices"
  on notices for delete
  using (auth.uid() = landlord_id);

-- 2) tenants에 소유자(landlord_id) 추가 (notices와 동일한 이유로 순서대로 진행)
alter table tenants add column if not exists landlord_id uuid references auth.users(id);

update tenants set landlord_id = (select id from auth.users order by created_at asc limit 1)
where landlord_id is null;

alter table tenants alter column landlord_id set not null;
alter table tenants alter column landlord_id set default auth.uid();

alter table tenants enable row level security;

drop policy if exists "authenticated can manage tenants" on tenants;

create policy "landlord can manage own tenants"
  on tenants for all
  using (auth.uid() = landlord_id)
  with check (auth.uid() = landlord_id);

-- 3) FAQ 테이블 신규 생성 (집주인별로 자기 건물 FAQ 관리)
create table if not exists faqs (
  id uuid primary key default gen_random_uuid(),
  landlord_id uuid not null default auth.uid() references auth.users(id),
  question_ko text not null,
  question_en text,
  question_zh text,
  question_vi text,
  answer_ko text not null,
  answer_en text,
  answer_zh text,
  answer_vi text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table faqs enable row level security;

drop policy if exists "public can read faqs" on faqs;
drop policy if exists "landlord can insert own faqs" on faqs;
drop policy if exists "landlord can update own faqs" on faqs;
drop policy if exists "landlord can delete own faqs" on faqs;

-- FAQ도 세입자가 로그인 없이 읽어야 하므로 공개
create policy "public can read faqs"
  on faqs for select
  using (true);

create policy "landlord can insert own faqs"
  on faqs for insert
  with check (auth.uid() = landlord_id);

create policy "landlord can update own faqs"
  on faqs for update
  using (auth.uid() = landlord_id);

create policy "landlord can delete own faqs"
  on faqs for delete
  using (auth.uid() = landlord_id);
