var Store = require('flux/utils').Store,
		AppDispatcher = require('../dispatcher/dispatcher'),
		GroupEventStore = new Store(AppDispatcher);