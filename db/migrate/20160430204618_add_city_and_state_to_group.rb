class AddCityAndStateToGroup < ActiveRecord::Migration
  def change
    add_column :groups, :city, :string
    add_column :groups, :state, :string
  end
end
