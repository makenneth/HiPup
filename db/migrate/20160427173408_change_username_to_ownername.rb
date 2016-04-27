class ChangeUsernameToOwnername < ActiveRecord::Migration
  def change
  	rename_column :users, :username, :owner_name
  end
end
