class AddStatusToGroupEvent < ActiveRecord::Migration
  def change
    add_column :group_events, :status, :string, default: "SCHEDULED"
  end
end
