class CreateEventUsers < ActiveRecord::Migration
  def change
    create_table :event_users do |t|
      t.integer :event_id, null: false
      t.integer :user_id, null: false

      t.timestamps null: false
    end
  end
end
