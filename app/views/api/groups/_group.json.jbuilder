json.extract! group, :id, :title, :image_url, :lat, :lng, :creator_id
json.tags group.tags
Time.zone = params[:time_zone]
unless simple
	json.participants group.participants do |partic|
		json.extract! partic, :id, :name
	end
	json.images group.images do |image|
		json.extract! image, :image_url, :id
	end
	json.description group.description
	json.group_events group.group_events do |event|
		json.extract! event, :lat, :lng, :city, :state, :title, 
						:description, :group_id, :street, :zip, :id
		json.event_time Time.utc(*event.event_time).in_time_zone
	end
end