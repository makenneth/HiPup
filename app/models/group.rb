class Group < ActiveRecord::Base
	validates :title, :description, :lat, :lng, :creator_id, presence: true

	belongs_to :user
	has_many :group_participants #join table
	has_many :participants, through: :group_participants, source: :participant
	has_many :images, as: :imageable
	has_many :taggings
	has_many :tags, through: :taggings, source: :tag
	has_many :group_events
end
