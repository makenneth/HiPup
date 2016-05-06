# Phase 5: Group Events (2 days)

## Rails
### Models
* Group Events


### Controllers
* Api::GroupEventsController (create, destroy, index, show, update)

### Views
* groupEvents/index.json.jbuilder
* groupEvents/show.json.jbuilder


## Flux
### Views (React Components)
* GroupEventsIndex
  - GroupEventIndexItem
* GroupEventForm

### Stores
* GroupEvents

### Actions
* ServerAction.receiveAllGroupEvents -> triggered by ApiUtil
* ServerAction.receiveSingleGroupEvent
* ServerAction.deleteGroupEvent
* ClientActions.fetchAllGroupEvents -> triggers ApiUtil
* ClientActions.fetchSingleGroupEvent
* ClientActions.createGroupEvent
* ClientActions.editGroupEvent
* ClientActions.destroyGroupEvent

### ApiUtil
* ApiUtil.fetchAllGroupEvents
* ApiUtil.fetchSingleGroupEvent
* ApiUtil.createGroupEvent
* ApiUtil.editGroupEvent
* ApiUtil.destroyGroupEvent

## Gems/Libraries
