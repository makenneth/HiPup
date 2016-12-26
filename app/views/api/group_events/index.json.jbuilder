json.group_events @group_events do |event|
	json.extract! event, :id, :street, :city, :zip, :state, :title, :description, :host_id, :status
	json.event_time event.event_time
	json.group event.group
end
