class AddHostIdToPostEvents < ActiveRecord::Migration
  def change
    add_column :group_events, :host_id, :integer
  end
end
