json.extract! current_user, :name, :owner_name, :image_url, :lat, :lng, :id, :username 
json.groups current_user.joined_groups
json.joinedEvents current_user.joined_events