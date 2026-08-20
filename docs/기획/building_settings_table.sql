-- 건물별 배출 요일 설정 (오늘의 배출 신호등에 사용)
create table if not exists building_settings (
  landlord_id uuid primary key references auth.users(id),
  recycling_days int[] not null default '{2,5}', -- 0=일 1=월 2=화 3=수 4=목 5=금 6=토
  updated_at timestamptz not null default now()
);

alter table building_settings enable row level security;

drop policy if exists "public can read building_settings" on building_settings;
drop policy if exists "landlord can insert own settings" on building_settings;
drop policy if exists "landlord can update own settings" on building_settings;

-- 세입자가 로그인 없이 읽어야 하므로 공개
create policy "public can read building_settings"
  on building_settings for select
  using (true);

create policy "landlord can insert own settings"
  on building_settings for insert
  with check (auth.uid() = landlord_id);

create policy "landlord can update own settings"
  on building_settings for update
  using (auth.uid() = landlord_id);
