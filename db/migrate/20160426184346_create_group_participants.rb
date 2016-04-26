class CreateGroupParticipants < ActiveRecord::Migration
  def change
    create_table :group_participants do |t|
      t.integer :group_id, null: false
      t.integer :participant_id, null: false

      t.timestamp
    end
  end
end
