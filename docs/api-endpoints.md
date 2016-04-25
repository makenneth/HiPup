# API Endpoints

## HTML API

### Root

- `GET /` - loads React web app

### Users

- `GET /users/new`
- `POST /users`
- `PATCH /users`

### Session

- `GET /session/new`
- `POST /session`
- `DELETE /session`

## JSON API

### Users
-	`GET /users/:id`

### Groups

- `GET /api/groups`
  - Group index/search
  - accepts `tag_name` query param to list notes by tag
- `POST /api/groups`
- `GET /api/groups/:id`
- `PATCH /api/groups/:id`
- `DELETE /api/groups/:id`

### GroupEvents

- `GET /api/groups/:id/group_events`
- `POST /api/group_events`
- `PATCH /api/group_events/:id`
- `DELETE /api/group_events/:id`

### Tags

- A note's tags will be included in the note show template
- `GET /api/tags`
  - includes query param for typeahead suggestions
- `POST /api/notes/:note_id/tags`: add tag to note by name
  - if note doesn't already exist, it will be created
- `DELETE /api/notes/:note_id/tags/:tag_name`: remove tag from note by
  name
