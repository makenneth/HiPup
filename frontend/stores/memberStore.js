import { MEMBER_FETCHED } from "../constants/constants";

const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');

const MemberStore = new Store(AppDispatcher);
const _members = {};

const _setMember = (member) => {
	_members[member.id] = member;
};

MemberStore.find = function(id) {
  return _members[id];
};


MemberStore.__onDispatch = function(payload) {
	switch (payload.actionType) {
		case MEMBER_FETCHED:
			_setMember(payload.member);
			MemberStore.__emitChange();
			break;
	}
};

module.exports = MemberStore;
