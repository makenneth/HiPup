json.group_events @group_events do |event|
	json.extract! event, :id, :street, :city, :zip, :state, :title, :description, :host_id, :status, :group, :event_time
end
