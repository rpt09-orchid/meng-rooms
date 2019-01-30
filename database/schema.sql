DROP SCHEMA IF EXISTS public CASCADE;

CREATE SCHEMA public;

CREATE TABLE rooms (
  photo_id SERIAL PRIMARY KEY,
  trail_id integer,
  user_id integer,
  upload_date timestamptz,
  photo_url text,
  caption text,
  is_hero_photo boolean
);

INSERT INTO rooms(trail_id, user_id, upload_date, photo_url, caption, is_hero_photo) VALUES(1, 77, '2018-11-29T03:17:52.894Z', 'https://images.unsplash.com/photo-1533412992015-1ddf680fe6dd?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=700&h=520&fit=crop&ixid=eyJhcHBfaWQiOjF9', 'eius eos id', true);
