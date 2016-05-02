class AddStreetAndZipToGroupEvent < ActiveRecord::Migration
  def change
    add_column :group_events, :street, :string
    add_column :group_events, :zip, :string
  end
end
