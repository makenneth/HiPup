# FresherNote

[Heroku link][heroku] **NB:** This should be a link to your production site

[heroku]: http://www.herokuapp.com

## Minimum Viable Product

Hip Up is a web application inspired by Meet Up that will be built using Ruby on Rails and React.js.  By the end of Week 9, this app will, at a minimum, satisfy the following criteria:

- [ ] New account creation, login, and guest/demo login
- [ ] Smooth, bug-free navigation
- [ ] Adequate seed data to demonstrate the site's features
- [ ] The minimally necessary features for an Evernote-inspired site: note creation and saving, note editing, and notes organized into notebooks
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
- [ ] Organize notes within Notebooks (MVP)
- [ ] Tag events with multiple tags (expected feature, but not MVP)
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

### Phase 2: Groups Model, API, and basic APIUtil (1.5 days)

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
- [ ] save Notes to the DB when the form loses focus or is left idle
  after editing.
- [ ] temporary bootstrap CSS



### Phase 4: Group Events (1 day)

**Objective:** Group Events belong to groups.

- [ ] create `Group Events` model
- [ ] set up associations with users and group
- [ ] set up polymorphic association of images
- build out API, Flux loop, and components for:
  - [ ] Group Events CRUD
  - [ ] Showing all events information
- temporary Bootstrap CSS


### Phase 6: Tags (1.5 days)

**Objective:** Notes can be tagged with multiple tags, and tags are searchable.

- [ ] create `User` model and join table
- build out API, Flux loop, and components for:
  - [ ] fetching users for events
  - [ ] fetching events for users
- [ ] Style new elements

### Phase 4: Start Styling (0.5 days)

**Objective:** Existing pages (including singup/signin) will look good.

- [ ] create a basic style guide
- [ ] position elements on the page
- [ ] add basic colors & styles

### Phase 7: Allow Complex Styling in Notes (0.5 days)

**objective:** Enable complex styling of notes.

- [ ] Integrate `react-quill` (based on Quill.js).
- [ ] Use Rails helpers to sanitize HTML before rendering.
- [ ] Style the new Quill elements.

### Phase 8: Styling Cleanup and Seeding (1 day)

**objective:** Make the site feel more cohesive and awesome.

- [ ] Get feedback on my UI from others
- [ ] Refactor HTML classes & CSS rules
- [ ] Add modals, transitions, and other styling flourishes.

### Bonus Features (TBD)
- [ ] Infinite Scroll for event index
- [ ] Discussion page for group
- [ ] Page Animation
- [ ] Multiple sessions

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
