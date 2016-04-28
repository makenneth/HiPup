class CreateGroupEvent < ActiveRecord::Migration
  def change
    create_table :group_events do |t|
      t.datetime :event_time, null: false
      t.float :lat, null: false
      t.float :lng, null: false
      t.string :city, null: false
      t.string :state, null: false
      t.string :title, null: false
      t.text :description, null: false
      t.integer :group_id, null: false
    end
  end
end
