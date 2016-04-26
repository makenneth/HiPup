class CreateGroups < ActiveRecord::Migration
  def change
    create_table :groups do |t|
      t.string :title, null: false
      t.float :lat, null: false
      t.float :lng, null: false
      t.text :description, null: false
      t.integer :creator_id, null: false, index: true

      t.timestamps null: false
    end
  end
end
