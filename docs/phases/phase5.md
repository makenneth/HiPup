# Phase 4: Tags and Taggings (1.5days)

## Rails
### Models
* Tags
* Taggings

### Controllers
* Api::RemindersController (create, destroy, index, show, update)

### Views
* reminders/index.json.jbuilder

## Flux
### Views (React Components)
* RemindersIndex
  - ReminderIndexItem
* ReminderShow
* ReminderForm

### Stores
*

### Actions
* ApiActions.receiveAllReminders -> triggered by ApiUtil
* ApiActions.receiveSingleReminder
* ApiActions.deleteReminder
* ReminderActions.fetchAllReminders -> triggers ApiUtil
* ReminderActions.fetchSingleReminder
* ReminderActions.createReminder
* ReminderActions.updateReminder
* ReminderActions.destroyReminder

### ApiUtil
* ApiUtil.fetchAllReminders
* ApiUtil.fetchSingleReminder
* ApiUtil.createReminder
* ApiUtil.updateReminder
* ApiUtil.destroyReminder

## Gems/Libraries
