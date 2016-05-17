json.extract! group, :id, :title, :image_url, :lat, :lng, :creator_id, :city, :state
json.created_at (Time.utc(*group.created_at).in_time_zone).strftime("%b %d, %Y")
json.tags group.tags
Time.zone = params[:time_zone]
unless simple
	json.participants group.participants do |partic|
		json.extract! partic, :id, :name, :image_url
	end
	json.images group.images do |image|
		json.extract! image, :image_url, :id
	end
	json.description group.description
	json.upcoming_events group.group_events.where("group_events.event_time > ? AND group_events.status = ?", Time.now, "SCHEDULED") do |event|
		json.extract! event, :lat, :lng, :city, :state, :title, 
						:description, :group_id, :street, :zip, :id
		json.event_time (Time.utc(*event.event_time).in_time_zone).strftime("%a %b %d || %I:%M %p")
		json.time Time.utc(*event.event_time).in_time_zone.to_f * 1000
	end
	json.old_events group.group_events.where("group_events.event_time <= ? OR group_events.status = ?", Time.now, "CANCEL") do |event|
		json.extract! event, :lat, :lng, :city, :state, :title, 
						:description, :group_id, :street, :zip, :id
		json.event_time (Time.utc(*event.event_time).in_time_zone).strftime("%a %b %d || %I:%M %p")
		json.time Time.utc(*event.event_time).in_time_zone.to_f * 1000
	end
end
