json.extract! group, :id, :title, :image_url, :lat, :lng, :creator_id, :city, :state
if @location
	json.distance Geocoder::Calculations.distance_between(@location, [group.lat, group.lng])
end

json.created_at (Time.utc(*group.created_at))
json.tags group.tags

json.participants group.participants do |partic|
	json.extract! partic, :id, :name, :image_url
end

unless simple
	json.description group.description
	json.groupEvents group.group_events do |event|
		json.extract! event, :lat, :lng, :city, :state, :title,
						:description, :group_id, :street, :zip, :id, :event_time
	end
end
