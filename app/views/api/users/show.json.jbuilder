
	json.extract! current_user_info, :name, :owner_name, :image_url, :lat, :lng, :id, :username, :city, :state, :email
	json.groups current_user_info.joined_groups
	json.joinedEvents current_user_info.joined_events
