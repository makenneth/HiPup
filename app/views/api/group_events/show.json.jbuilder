Time.zone = params[:time_zone]
json.extract! @group_event, :id, :street, :city, :zip, :state, 
				:title, :description, :lat, :lng, :host_id, :status
json.event_time (Time.utc(*@group_event.event_time).in_time_zone).strftime("%A, %B %d, %Y || %I:%M %p")
json.time Time.utc(*@group_event.event_time).in_time_zone.to_f * 1000
json.event_users @group_event.event_participants
json.daysAway distance_of_time_in_words(@group_event.event_time, Time.now)