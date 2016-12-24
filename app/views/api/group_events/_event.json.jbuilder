json.extract! group_event, :id, :street, :city, :zip, :state,
				:title, :description, :lat, :lng, :host_id, :status
json.hostId group_event.host_id
json.eventTime group_event.event_time
json.eventUsers group_event.event_participants
