var Store = require('flux/utils').Store,
		AppDispatcher = require('../dispatcher/dispatcher'),
		TagStore = new Store(AppDispatcher),
		TagConstants = require('../constants/tagConstants');

var _tags = [];


var _resetTags = function(tags){
	_tags = tags;
};

var _addTag = function(tag){
	_tags.push(tag)
};

TagsStore.all = function(){
	return _tags;
};

TagsStore.find = function(id){
	for (var i = 0; i < _tags.length; i++) {
		if (_tags[i] === id){
			return _tags[i];
		}
	}
};
//fetch all tags in the beginning?

TagsStore.__onDispatch = function(payload){
	switch (payload.actionType){
		case TagConstants.RECEIVED_TAGS:
			_resetTags(payload.tags);
			TagsStore.__emitChange();
			break;
		case TagConstants.RECEIVED_TAG:
			_addTag(payload.tag);
			TagsStore.__emitChange();
			break;
	}
};
