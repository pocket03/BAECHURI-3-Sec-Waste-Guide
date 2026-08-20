-- building_settings에 자유 배너(공지/주의사항) 문구 추가
alter table building_settings add column if not exists banner_ko text;
alter table building_settings add column if not exists banner_en text;
alter table building_settings add column if not exists banner_zh text;
alter table building_settings add column if not exists banner_vi text;
