json.extract! @user, :name, :id, :username, :city, :state
json.ownerName @user.owner_name
json.imageUrl @user.image_url
json.memberSince @user.created_at
json.groups @user.joined_groups


