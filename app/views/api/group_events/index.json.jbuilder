Time.zone = params[:time_zone]
json.group_events @group_events do |event|
	json.extract! event, :id, :street, :city, :zip, :state, :title, :description, :host_id
	json.event_time (Time.utc(*event.event_time).in_time_zone).strftime("%a, %b %d, %Y || %I:%M %p")
	json.group event.group
end
