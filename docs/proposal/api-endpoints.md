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
  - accepts `tag_name` query param to list groups by tags
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


- `GET /api/tags`
  - includes query param for typeahead suggestions
- `POST /api/groups/:groups_id/tags`: add tag to group by name
- `DELETE /api/groups/:group_id/tags/:tag_name`: remove tag from group by
  name
