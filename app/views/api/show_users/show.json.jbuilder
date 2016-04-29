json.extract! @user, :name, :owner_name, :image_url, :lat, :lng, :id, :username 
json.groups @user.joined_groups


