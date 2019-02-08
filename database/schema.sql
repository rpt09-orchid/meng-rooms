DROP SCHEMA IF EXISTS public CASCADE;

CREATE SCHEMA public;

CREATE TABLE rooms (
  id SERIAL PRIMARY KEY,
  descriptions JSON,
  amenities JSON,
  "sleepingArrangements" JSON,
  "user" text,
  avatar text,
  title text,
  type text,
  city text,
  "selfCheckin" boolean,
  superhost boolean
);
