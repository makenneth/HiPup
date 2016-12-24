
json.extract! current_user_info, :name, :lat, :lng, :id, :username, :city, :state, :email
json.imageUrl current_user_info.image_url
json.ownerName currnet_user_info.owner_name
json.groups current_user_info.joined_groups
json.joinedEvents current_user_info.joined_events do |joined_event|
	json.partial! 'api/group_events/event', group_event: joined_event
	json.belongedGroup joined_event.group
end
