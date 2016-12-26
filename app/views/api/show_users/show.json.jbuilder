json.extract! @user, :name, :id, :owner_name, :username,
  :city, :state, :image_url, :created_at
# json.memberSince @user.created_at
#convert created_at to member since
json.groups @user.joined_groups


