-- 세입자 → 집주인 문의 기능
-- 세입자는 로그인 없이 문의를 접수하고, 집주인은 본인 건물(landlord_id) 문의만 조회/답장합니다.

create table if not exists inquiries (
  id uuid primary key default gen_random_uuid(),
  landlord_id uuid not null references auth.users(id),
  phone text not null,
  lang text not null default 'ko',
  message text not null,
  message_ko text not null,
  status text not null default 'unread',
  reply text,
  created_at timestamptz not null default now(),
  replied_at timestamptz
);

alter table inquiries enable row level security;

drop policy if exists "public can insert inquiries" on inquiries;
drop policy if exists "landlord can read own inquiries" on inquiries;
drop policy if exists "landlord can update own inquiries" on inquiries;
drop policy if exists "landlord can delete own inquiries" on inquiries;

-- 세입자는 로그인이 없으므로, 문의 등록(insert)만은 누구나 가능해야 합니다.
create policy "public can insert inquiries"
  on inquiries for insert
  with check (true);

-- 조회/수정/삭제는 해당 건물의 집주인만
create policy "landlord can read own inquiries"
  on inquiries for select
  using (auth.uid() = landlord_id);

create policy "landlord can update own inquiries"
  on inquiries for update
  using (auth.uid() = landlord_id);

create policy "landlord can delete own inquiries"
  on inquiries for delete
  using (auth.uid() = landlord_id);
