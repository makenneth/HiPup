class EventUser < ActiveRecord::Base
	validates :user_id, :event_id, presence: true
	belongs_to :group_event, foreign_key: :event_id, class_name: :GroupEvent
	belongs_to :event_participant, foreign_key: :user_id, class_name: :User

	validates :user_id, uniqueness: {scope: :event_id}
end
