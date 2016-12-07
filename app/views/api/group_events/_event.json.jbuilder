json.extract! group_event, :id, :street, :city, :zip, :state,
				:title, :description, :lat, :lng, :host_id, :status
json.event_time Time.utc(*group_event.event_time)
json.time Time.utc(*group_event.event_time).in_time_zone.to_f * 1000
json.event_users group_event.event_participants
