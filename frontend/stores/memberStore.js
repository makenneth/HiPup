import { MEMBER_FETCHED } from "../constants/constants";

const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');

const MemberStore = new Store(AppDispatcher);
const _members = {};
//cache already looked up users
//somehow have to redirect to profile page if id matches the current_user

MemberStore.find = function(id) {
	return _members[id];
};

var _setMember = function(member){
	_members[member.id] = member;
};

MemberStore.__onDispatch = function(payload){
	switch (payload.actionType){
		case MEMBER_FETCHED:
			_setMember(payload.member);
			MemberStore.__emitChange();
			break;
	}
};

module.exports = MemberStore;
