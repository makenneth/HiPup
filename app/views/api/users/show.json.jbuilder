json.extract! current_user_info, :name, :lat, :lng, :id, :username, :city, :state, :email, :image_url, :owner_name
json.groups current_user_info.joined_groups
json.joined_events current_user_info.joined_events do |joined_event|
	json.partial! 'api/group_events/event', group_event: joined_event
	json.belonged_group joined_event.group
end
