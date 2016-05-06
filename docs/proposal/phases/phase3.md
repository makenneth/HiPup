# Phase 3: Flux Architecture and Router (1.5 days)

## Rails
### Models

### Controllers
* Api::GroupsController (create, destroy, index, show, update)

### Views
* groups/index.json.jbuilder
* groups/show.json.jbuilder
* tags/show.json.jbuilder

## Flux
### Views (React Components)
* GroupsIndex
  - GroupsIndexItem
* GroupsDetail
* GroupForm

### Stores

### Actions
* ServerActions.receiveAllGroups -> triggered by ApiUtil
* ServerActions.receiveSingleGroup
* ServerActions.deleteGroup
* ClientActions.fetchAllGroups -> triggers ApiUtil
* ClientActions.fetchSingleGroup 
* ClientActions.createGroup
* ClientActions.editGroup
* ClientActions.destroyGroup

### ApiUtil


## Gems/Libraries

