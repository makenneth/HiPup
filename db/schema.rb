# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160505005356) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "event_users", force: :cascade do |t|
    t.integer  "event_id",   null: false
    t.integer  "user_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "group_events", force: :cascade do |t|
    t.datetime "event_time",                        null: false
    t.float    "lat",                               null: false
    t.float    "lng",                               null: false
    t.string   "city",                              null: false
    t.string   "state",                             null: false
    t.string   "title",                             null: false
    t.text     "description",                       null: false
    t.integer  "group_id",                          null: false
    t.string   "street"
    t.string   "zip"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "host_id"
    t.string   "status",      default: "SCHEDULED"
  end

  create_table "group_participants", force: :cascade do |t|
    t.integer "group_id",       null: false
    t.integer "participant_id", null: false
  end

  create_table "groups", force: :cascade do |t|
    t.string   "title",       null: false
    t.float    "lat",         null: false
    t.float    "lng",         null: false
    t.text     "description", null: false
    t.integer  "creator_id",  null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "image_url"
    t.string   "city"
    t.string   "state"
  end

  add_index "groups", ["creator_id"], name: "index_groups_on_creator_id", using: :btree

  create_table "images", force: :cascade do |t|
    t.integer  "imageable_id",   null: false
    t.string   "imageable_type", null: false
    t.string   "image_url",      null: false
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  add_index "images", ["imageable_id"], name: "index_images_on_imageable_id", using: :btree

  create_table "taggings", force: :cascade do |t|
    t.integer  "group_id",   null: false
    t.integer  "tag_id",     null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tags", force: :cascade do |t|
    t.string "name", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "owner_name",      null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.string   "email",           null: false
    t.string   "name",            null: false
    t.float    "lat",             null: false
    t.float    "lng",             null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "image_url"
    t.string   "username",        null: false
    t.string   "city"
    t.string   "state"
  end

end
