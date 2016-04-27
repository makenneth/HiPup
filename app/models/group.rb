class Group < ActiveRecord::Base
	validates :title, :description, :lat, :lng, :creator_id, presence: true

	belongs_to :user
	has_many :group_participants #join table
	has_many :participants, through: :group_participants, source: :participant
	has_many :images, as: :imageable
end
