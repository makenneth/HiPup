
json.extract! @group_event, :id, :street, :city, :zip, :state, 
				:title, :description, :event_time, :lat, :lng

json.daysAway distance_of_time_in_words(@group_event.event_time, Time.now)