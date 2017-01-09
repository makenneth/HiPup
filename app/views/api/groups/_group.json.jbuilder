json.extract! group, :id, :title, :lat, :lng, :city, :state, :creator_id, :image_url
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
						:description, :street, :zip, :id, :group_id, :event_time
	end
end
