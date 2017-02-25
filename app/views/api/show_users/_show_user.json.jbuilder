json.extract! user, :name, :id, :owner_name, :username,
  :city, :state, :image_url, :created_at
json.groups user.joined_groups
