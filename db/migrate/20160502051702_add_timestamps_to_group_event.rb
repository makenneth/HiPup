class AddTimestampsToGroupEvent < ActiveRecord::Migration
  def change
  	change_table :group_events do |t|
  		t.timestamps
  	end
  end
end
