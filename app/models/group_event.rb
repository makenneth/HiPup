class GroupEvent < ActiveRecord::Base
	validates :lat, :lng, :city, :state, :title, :description, :group_id,
				:event_time, presence: true

	belongs_to :group
	has_many :event_users, foreign_key: :event_id, class_name: :EventUser
	has_many :event_participants, through: :event_users, source: :event_participant
end