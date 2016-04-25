# FresherNote

[Heroku link][heroku] **NB:** This should be a link to your production site

[heroku]: http://www.herokuapp.com

## Minimum Viable Product

Hip Up is a web application inspired by Meet Up that will be built using Ruby on Rails and React.js.  By the end of Week 9, this app will, at a minimum, satisfy the following criteria:

- [ ] New account creation, login, and guest/demo login
- [ ] Smooth, bug-free navigation
- [ ] Adequate seed data to demonstrate the site's features
- [ ] The minimally necessary features for an Meet-Up-inspired site: Creation, joining, and editing of groups
- [ ] Creation, joining, editing and canceling/destroying of events
- [ ] Hosting on Heroku
- [ ] CSS styling that is satisfactorily visually appealing
- [ ] A production README, replacing this README (**NB**: check out the [sample production README](https://github.com/appacademy/sample-project-proposal/blob/master/docs/production_readme.md) -- you'll write this later)

## Product Goals and Priorities

Hip Up will allow users to do the following:

<!-- This is a Markdown checklist. Use it to keep track of your
progress. Put an x between the brackets for a checkmark: [x] -->

- [ ] Create an account (MVP)
- [ ] Log in / Log out, including as a Guest/Demo User (MVP)
- [ ] Create, read, edit, delete, and join groups (MVP)
- [ ] Create, read, edit, delete, and join Events (MVP)
- [ ] Users can search for events based on proximity and tags (MVP)
- [ ] Apply animations to site while browsing (expected feature, but not MVP)

## Design Docs
* [View Wireframes][views]
* [React Components][components]
* [Flux Cycles][flux-cycles]
* [API endpoints][api-endpoints]
* [DB schema][schema]

[views]: ./docs/views.md
[components]: ./docs/components.md
[flux-cycles]: ./docs/flux-cycles.md
[api-endpoints]: ./docs/api-endpoints.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: Backend setup and User Authentication (0.5 days)

**Objective:** Functioning rails project with Authentication

- [ ] create new project
- [ ] create `User` model
- [ ] authentication
- [ ] user signup/signin pages
- [ ] record user's geolocation
- [ ] blank landing page after signin
- [ ] temporary basic bootstrap CSS

### Phase 2: Groups Model, API, and basic APIUtil (1.5 day)

**Objective:** Groups can be created, read, edited and deleted through
the API.

- [ ] create `Group` model
- [ ] seed the database with a small amount of test data
- [ ] CRUD API for events (`GroupsController`)
- [ ] set up association with Users
- [ ] jBuilder views for events
- [ ] setup Webpack & Flux scaffold
- [ ] setup `APIUtil` to interact with the API
- [ ] test out API interaction in the console.

### Phase 3: Flux Architecture and Router (1.5 days)

**Objective:** Group can be created, read, edited and destroyed with the
user interface.

- [ ] setup the flux loop with skeleton files
- [ ] setup React Router
- implement each group event component, building out the flux loop as needed.
  - [ ] `GroupIndex`
  - [ ] `GroupIndexItem`
  - [ ] `GroupDetail`
- [ ] form for creating new groups
- [ ] temporary bootstrap CSS / start styling if time allows


### Phase 4: Tags (1.5 days)

**Objective:** Groups can be tagged with multiple tags, and tags are searchable.

- [ ] create `Tags` model and join table
- build out API, Flux loop, and components for:
  - [ ] fetching events for tag
  - [ ] fetching tags for event
- preliminary styling

### Phase 5: Group Events (2 day)

**Objective:** Group Events belong to groups.

- [ ] create `Group Events` model
- [ ] create seed data
- [ ] set up associations with users and group
- [ ] set up polymorphic association of images
- build out API, Flux loop, and components for:
  - [ ] Group Events CRUD
  - [ ] Showing all events information
  - [ ] Creating events
- build calendar for events in group index page
- temporary Bootstrap CSS / start styling if time allows


### Phase 6: Start Styling (1 days)

**Objective:** Existing pages (at least Events Index) will look good.

- [ ] create a basic style guide
- [ ] position elements on the page
- [ ] add basic colors & styles

### Phase 7: Google Map Distance Matrix (0.5 days)

**objective:** Allow users to browse events by location and show the events with closest proximity

- [ ] Add query options for proximity in Group models
- [ ] Add google map showing the location in Group Events

### Phase 8: Further Styling (1.5 day)

**objective:** Make the site feel more cohesive and awesome.

- [ ] Further Styling
- [ ] Add transitions and other styling flourishes.


### Bonus Features (TBD)
- [ ] Discussion PAges
- [ ] Infinite Scroll for group indices
- [ ] Associate users with groups of their interest
- [ ] Multiple sessions

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
[phase-six]: ./docs/phases/phase6.md
[phase-seven]: ./docs/phases/phase7.md
[phase-eight]: ./docs/phases/phase8.md
[phase-nine]: ./docs/phases/phase9.md
