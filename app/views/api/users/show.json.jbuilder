
json.extract! current_user_info, :name, :owner_name, :image_url, :lat, :lng, :id, :username, :city, :state, :email
json.groups current_user_info.joined_groups
json.joinedEvents current_user_info.joined_events do |joined_event|
	json.partial! 'api/group_events/event', group_event: joined_event
	json.belongedGroup joined_event.group
end
