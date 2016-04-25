# Schema Information

## groups
column name  | data type | details
-------------|-----------|-----------------------
id           | integer   | not null, primary key
title        | string    | not null, unique
lat          | float     | not null
lng          | float     | not null
description  | text      | not null
creator_id   | integer   | not null, foreign key (references users), indexed

## images (Polymorphism)
column name      | data type | details
-----------------|-----------|-----------------------
id               | integer   | not null, primary key
imageable_id     | integer   | not null
imageable_type   | string    | not null
image_url        | string    | not null
description      | string    | not null

## events
column name      | data type | details
-----------------|-----------|-----------------------
id               | integer   | not null, primary key
dateTime         | dateTime  | not null
lat              | float     | not null
lng              | float     | not null
title            | string    | not null
description      | text      | not null
group_id         | integer   | not null, foreign key (references group)

## eventUsers
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
event_id    | integer   | not null, foreign key (references events)
user_id     | integer   | not null, foreign key (references users)

## tags
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null

## taggings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null
event_id    | integer   | not null, foreign key (references event), indexed, unique event_id
tag_id      | integer   | not null, foreign key (references tags), indexed

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
name            | string    | not null
lat             | float     | not null
lng             | float     | not null
username        | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique

## groupUsers
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
group_id        | string    | not null, indexed, unique user_id
user_id         | string    | not null, indexed

## userInterests - bonus
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
user_id         | integer   | not null, indexed
interest_id     | integer   | not null, indexed

## interests - bonus
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
type            | integer   | not null

