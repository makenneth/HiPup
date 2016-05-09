var Store = require('flux/utils').Store,
		AppDispatcher = require('../dispatcher/dispatcher'),
		TagStore = new Store(AppDispatcher),
		TagConstants = require('../constants/tagConstants');

var _tags = [];

var _resetTags = function(tags){
	_tags = tags;
};

var _addTag = function(tag){
	_tags.push(tag);
};

TagStore.all = function(){
	return _tags;
};

TagStore.find = function(id){
	var newId = parseInt(id);
	for (var i = 0; i < _tags.length; i++) {
		if (_tags[i].id === newId){
			return _tags[i];
		}
	}
};
//fetch all tags in the beginning?

TagStore.__onDispatch = function(payload){
	switch (payload.actionType){
		case TagConstants.RECEIVED_TAGS:
			_resetTags(payload.tags);
			TagStore.__emitChange();
			break;
		case TagConstants.RECEIVED_TAG:
			_addTag(payload.tag);
			TagStore.__emitChange();
			break;
	}
};

module.exports = TagStore;
