class EventUser < ActiveRecord::Base
	belongs_to :group_event, foreign_key: :event_id, class_name: :GroupEvent
	belongs_to :event_participant, foreign_key: :user_id, class_name: :User
end
