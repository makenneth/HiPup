# Flux Cycles

Flux loops are organized by data type. Under each data type, there may
be sub-categories, and each action is listed with the sequence of events
that result from its invocation, ending with the API or store. Finally,
store listeners are listed at the end.

You should be able to use this document trace an **action** starting
with where it was invoked, through the **API**/**store** involved, and
finally to the **components** that update as a result. This is important
because once you start implementing your flux loops, that's precisely
what you'll need to do.


## Events Cycles

### Event API Request Actions

* `fetchAllevents`
  0. invoked from `EventsIndex` `didMount`/`willReceiveProps`
  0. `GET /api/events` is called.
  0. `receiveAllEvents` is set as the callback.

* `createEvent`
  0. invoked from new note button `onClick`
  0. `POST /api/events` is called.
  0. `receiveSingleEvent` is set as the callback.

* `fetchSingleEvent`
  0. invoked from `EventDetail` `didMount`/`willReceiveProps`
  0. `GET /api/events/:id` is called.
  0. `receiveSingleEvent` is set as the callback.

* `updateEvent`
  0. invoked from `EventForm` `onSubmit`
  0. `POST /api/events` is called.
  0. `receiveSingleEvent` is set as the callback.

* `destroyEvent`
  0. invoked from delete event button `onClick`
  0. `DELETE /api/events/:id` is called.
  0. `removeEvent` is set as the callback.

### Events API Response Actions

* `receiveAllEvents`
  0. invoked from an API callback.
  0. `Event` store updates `_events` and emits change.

* `receiveSingleEvent`
  0. invoked from an API callback.
  0. `Event` store updates `_events[id]` and emits change.

* `removeEvent`
  0. invoked from an API callback.
  0. `Event` store removes `_events[id]` and emits change.

### Store Listeners

* `EventIndex` component listens to `Event` store.
* `EventDetail` component listens to `Event` store.


## Users Cycles

### Notebooks API Request Actions

* `fetchAllNotebooks`
  0. invoked from `NotebooksIndex` `didMount`/`willReceiveProps`
  0. `GET /api/notebooks` is called.
  0. `receiveAllNotebooks` is set as the callback.

* `createNotebook`
  0. invoked from new notebook button `onClick`
  0. `POST /api/notebooks` is called.
  0. `receiveSingleNotebook` is set as the callback.

* `fetchSingleNotebook`
  0. invoked from `NotebookDetail` `didMount`/`willReceiveProps`
  0. `GET /api/notebooks/:id` is called.
  0. `receiveSingleNotebook` is set as the callback.

* `updateNotebook`
  0. invoked from `NotebookForm` `onSubmit`
  0. `POST /api/notebooks` is called.
  0. `receiveSingleNotebook` is set as the callback.

* `destroyNotebook`
  0. invoked from delete notebook button `onClick`
  0. `DELETE /api/notebooks/:id` is called.
  0. `removeNotebook` is set as the callback.

### Notebooks API Response Actions

* `receiveAllNotebooks`
  0. invoked from an API callback.
  0. `Notebook` store updates `_notebooks` and emits change.

* `receiveSingleNotebook`
  0. invoked from an API callback.
  0. `Notebook` store updates `_notebooks[id]` and emits change.

* `removeNotebook`
  0. invoked from an API callback.
  0. `Notebook` store removes `_notebooks[id]` and emits change.

### Store Listeners

* `NotebooksIndex` component listens to `Notebook` store.


## SearchSuggestion Cycles

* `fetchSearchSuggestions`
  0. invoked from `NoteSearchBar` `onChange` when there is text
  0. `GET /api/notes` is called with `text` param.
  0. `receiveSearchSuggestions` is set as the callback.

* `receiveSearchSuggestions`
  0. invoked from an API callback.
  0. `SearchSuggestion` store updates `_suggestions` and emits change.

* `removeSearchSuggestions`
  0. invoked from `NoteSearchBar` `onChange` when empty
  0. `SearchSuggestion` store resets `_suggestions` and emits change.

### Store Listeners

* `SearchBarSuggestions` component listens to `SearchSuggestion` store.
