class Group < ActiveRecord::Base
	validates :title, :description, :lat, :lng, :creator_id, presence: true

	belongs_to :user
	has_many :group_participants
	has_many :participants, through: :group_participants, source: :participant
end
