import { RECEIVED_TAGS, RECEIVED_TAG } from '../constants/constants';

const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const TagStore = new Store(AppDispatcher);

let _tags = [];

const _resetTags = (tags) => {
	_tags = tags;
};

const _addTag = (tag) => {
	_tags.push(tag);
};

TagStore.all = function() {
	return _tags;
};

TagStore.find = function(id) {
	const newId = parseInt(id);
	for (let i = 0; i < _tags.length; i++) {
		if (_tags[i].id === newId) {
			return _tags[i];
		}
	}
};

TagStore.__onDispatch = function(payload) {
	switch (payload.actionType) {
		case RECEIVED_TAGS:
			_resetTags(payload.tags);
			TagStore.__emitChange();
			break;
		case RECEIVED_TAG:
			_addTag(payload.tag);
			TagStore.__emitChange();
			break;
	}
};

module.exports = TagStore;
