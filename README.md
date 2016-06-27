# HiPup
HiPup is a full-stack web application inspired by MeetUp. It is a platform where pets can find groups by similar interests. If the owner can, why can't they? 

It utilizes Ruby on Rails on the backend, a PostgreSQL database, and React.js with a Flux architectural framework on the frontend.

## Features 
Users are allowed to:

* Securely create an account
... can log in on multiple location at the same time
* Join groups or start their own
* Join events or Start/Cancel their own events
* View other members' profile and see their group associations
* Search Groups by title, tags, and proximity
* Browse All Upcoming events

#### Front view
![Front-page]

#### Group view
![Group-page]

#### Profile page
![Profile-page]

#### Event View
![Event-page]

## Implementation
### Multiple Sessions
```ruby	
	def self.find_by_session_token(session_token)
		user = User.joins(:sessions).where("sessions.session_token = ?", session_token)
		user[0]
	end

	def destroy_session_token!(session_token)
		session = Session.find_by(user_id: self.id, session_token: session_token)
		session.destroy! if session
	end

	def log_in!(user)
    @current_user = user
    new_session = Session.create(user_id: @current_user.id, session_token: Session.generate_session_token)
  	session[:session_token] = new_session.session_token
  end

  def log_out!
  	current_user.destroy_session_token!(session[:session_token])
  	@current_user = nil
  	session[:session_token] = nil
  end
```
### Group
Upon user's visit HiPup, their locations are recorded by checking the approximate location from their IP address.

```$.ajax({
      url: "https://api.ipify.org/",
      success: function(ip){
        UserActions.findLocationWithIp(ip);
      }

    _setCurrentLocation = function(location){
	  	currentLocation.coords.latitude = location.lat;
	  	currentLocation.coords.longitude = location.lon;
	  	currentLocation.place = [location.city, location.region].join(", ");
	  	currentLocation.timeZone = location.timeZone;
		}
```

Users now have the option to filter groups by their location, by tag, and/or by a simple dynamic name search.

```javascript
		var searchCriteria = this.state.searchString.toLowerCase().trim();
		var libraries = this.state.groups.filter(function(group){
			var titleIsMatched = group.title.toLowerCase().match(searchCriteria);
			if (that.state.tag){
				return titleIsMatched && 
									group.tags.some(function(tag){ 
										return tag.name === that.state.tag; 
									});
			} else {
				return titleIsMatched;
			}
		}
```

### Events
Events within a group are organized by time, whether the event's time has passed.			

```ruby
	json.upcoming_events group.group_events.where("group_events.event_time > ? AND group_events.status = ?", Time.now, "SCHEDULED") do |event|
		json.extract! event, :lat, :lng, :city, :state, :title, 
						:description, :group_id, :street, :zip, :id
		json.event_time (Time.utc(*event.event_time).in_time_zone).strftime("%a %b %d || %I:%M %p")
	end
	json.old_events group.group_events.where("group_events.event_time <= ? OR group_events.status = ?", Time.now, "CANCEL") do |event|
		json.extract! event, :lat, :lng, :city, :state, :title, 
						:description, :group_id, :street, :zip, :id
		json.event_time (Time.utc(*event.event_time).in_time_zone).strftime("%a %b %d || %I:%M %p")
	end
```


## Future Directions for HiPup
- [ ] Direct Messaging / Friend requests
- [ ] User groups suggestions based on their interest

[Front-page]: ./docs/images/Front-page.png
[Group-page]: ./docs/images/Group-page.png
[Profile-page]: ./docs/images/profile-page.png
[Event-page]: ./docs/images/Event-page.png