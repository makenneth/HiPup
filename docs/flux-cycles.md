# Flux Cycles

Flux loops are organized by data type. Under each data type, there may
be sub-categories, and each action is listed with the sequence of groups
that result from its invocation, ending with the API or store. Finally,
store listeners are listed at the end.

You should be able to use this document trace an **action** starting
with where it was invoked, through the **API**/**store** involved, and
finally to the **components** that update as a result. This is important
because once you start implementing your flux loops, that's precisely
what you'll need to do.


## Groups Cycles

### Group API Request Actions

* `fetchAllgroups`
  0. invoked from `GroupsIndex` `didMount`/`willReceiveProps`
  0. `GET /api/groups` is called.
  0. `receiveAllGroups` is set as the callback.

* `createGroup`
  0. invoked from new group button `onClick`
  0. `POST /api/groups` is called.
  0. `receiveSingleGroup` is set as the callback.

* `fetchSingleGroup`
  0. invoked from `GroupDetail` `didMount`/`willReceiveProps`
  0. `GET /api/groups/:id` is called.
  0. `receiveSingleGroup` is set as the callback.

* `updateGroup`
  0. invoked from `GroupForm` `onSubmit`
  0. `POST /api/groups` is called.
  0. `receiveSingleGroup` is set as the callback.

* `destroyGroup`
  0. invoked from delete event button `onClick`
  0. `DELETE /api/groups/:id` is called.
  0. `removeGroup` is set as the callback.

### Groups API Response Actions

* `receiveAllGroups`
  0. invoked from an API callback.
  0. `Group` store updates `_groups` and emits change.

* `receiveSingleGroup`
  0. invoked from an API callback.
  0. `Group` store updates `_groups[id]` and emits change.

* `removeGroup`
  0. invoked from an API callback.
  0. `Group` store removes `_groups[id]` and emits change.

### Store Listeners

* `GroupIndex` component listens to `Group` store.
* `GroupDetail` component listens to `Group` store.


## Users Cycles

### GroupEvents API Request Actions

* `fetchAllGroupEvents`
  0. invoked from `GroupEventsIndex` `didMount`/`willReceiveProps`
  0. `GET /api/GroupEvents` is called.
  0. `receiveAllGroupEvents` is set as the callback.

* `createGroupEvents`
  0. invoked from new group events button `onClick`
  0. `POST /api/groupevents` is called.
  0. `receiveSingleGroupEvent` is set as the callback.

* `fetchSingleGroupEvent`
  0. invoked from `GroupEventDetail` `didMount`/`willReceiveProps`
  0. `GET /api/groupevents/:id` is called.
  0. `receiveSingleGroupEvent` is set as the callback.

* `updateGroupEvent`
  0. invoked from `GroupEventForm` `onSubmit`
  0. `POST /api/groupevents` is called.
  0. `receiveSingleGroupEvent` is set as the callback.

* `destroyGroupEvent`
  0. invoked from delete group event button `onClick`
  0. `DELETE /api/groupevents/:id` is called.
  0. `removeGroupevent` is set as the callback.

### Group Events API Response Actions

* `receiveAllGroupEvents`
  0. invoked from an API callback.
  0. `GroupEvent` store updates `_groupEvents` and emits change.

* `receiveSingleGroupEvent`
  0. invoked from an API callback.
  0. `GroupEvent` store updates `_groupEvents[id]` and emits change.

* `removeGroupEvent`
  0. invoked from an API callback.
  0. `GroupEvent` store removes `_groupEvents[id]` and emits change.

### Store Listeners

* `GroupEventsIndex` component listens to `Group Event` store.


