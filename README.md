# HiPup
====

HiPup is a full-stack web application inspired by MeetUp. It is a platform where pets can find groups by similar interests. If the owner can't, why can't they? 

It utilizes Ruby on Rails on the backend, a PostgreSQL database, and React.js with a Flux architectural framework on the frontend.

## Features 
===
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

### Group
Upon user's visit to the page, I start to watch the user's position. So I can narrow the results that are better fit to the users' current location. I store the user's location temporarily in the user store, not only because I can return tailored results to users that are not logged in, I can also provide better results for registered users.

```javascript
	componentDidMount: function() {
		this.posListener = navigator.geolocation.watchPosition(this.recordLatLng);
	},
	recordLatLng: function(position){
		UserStore.setCurrentCoords(position.coords);
		UserActions.getTimeZone(lat, lng, position.timestamp);
		UserActions.getCityAndState(lat, lng);
	},
```

I then fetch groups according response from the navigator. Since I store the coordinates where users signed up with, if the navigator returns a error, I will narrow the results based on the users' original locality. If the user did not sign in, 

```ruby
	def self.distance_between(user_coord, miles)
		Group.where(Geocoder::Calculations.distance_between(user_coord, [:lat, :lng]) < miles)
	end
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
- [] Direct Messaging / Friend requests
- [] User groups suggestions based on their interest

[Front-page]: ./docs/images/Front-page.png
[Group-page]: ./docs/images/Group-page.png
[Profile-page]: ./docs/images/Profile-page.png
[Event-page]: ./docs/images/Event-page.png