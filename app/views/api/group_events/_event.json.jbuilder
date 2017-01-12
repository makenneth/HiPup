json.extract! group_event, :id, :street, :city, :zip, :state,
				:title, :description, :lat, :lng, :host_id, :status,
        :host_id, :event_time

json.event_users do
  json.array! group_event.event_participants do |person|
    json.extract! person, *person.attributes.keys
  end
end
