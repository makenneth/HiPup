class AddUsernameToUser < ActiveRecord::Migration
  def change
    add_column :users, :owner_name, :string
  end
end
