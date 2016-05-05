class CreateSession < ActiveRecord::Migration
  def change
    create_table :sessions do |t|
      t.string :session_token, null: false, index: true
      t.integer :user_id, null: false, index: true
    end
  end
end
