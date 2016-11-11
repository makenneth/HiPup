# HiPup [Live Link](http://hipup.co)
HiPup is a full-stack web application inspired by MeetUp. It is a platform where pets can find groups by similar interests. If the owner can, why can't they?

It utilizes Ruby on Rails on the backend, a PostgreSQL database, and React with Flux on the frontend.

## Features
Users can:

* Securely create an account
... can log in from multiple locations at the same time
* Join groups or start their own
* Join events or Start/Cancel their own events
* View other members' profile and see their group associations
* Search Groups by titles, tags, and proximity
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


Users now have the options to filter groups by their location, by tag, and/or by a simple dynamic name search.

```javascript
    const libraries = this.state.groups.filter((group) => {
      return (
        group.title.toLowerCase().match(searchCriteria) &&
          group.tags.some(tag => this.state.selectedTags[tag.id])
      );
    });
```

## Future Directions for HiPup
- [ ] Direct Messaging / Friend requests
- [ ] User groups suggestions based on their interest

[Front-page]: ./docs/images/Front-page.png
[Group-page]: ./docs/images/Group-page.png
[Profile-page]: ./docs/images/profile-page.png
[Event-page]: ./docs/images/Event-page.png