class Group < ActiveRecord::Base
	validates :title, :description, :lat, :lng, :creator_id, presence: true
	before_validation :ensure_image
	belongs_to :user
	has_many :group_participants
	has_many :participants, through: :group_participants, source: :participant
	has_many :images, as: :imageable
	has_many :taggings
	has_many :tags, through: :taggings, source: :tag
	has_many :group_events

	def ensure_image
		self.image_url = "https://placehold.it/500x300.jpg/000" if self.image_url == ""
	end

	def self.groups_with_distance(user_coord)

		# @groups = Group.includes(:tags, :participants).map do |group|
		# 	group[:distance] = Geocoder::Calculations.distance_between(user_coord, [group.lat, group.lng])
		# end

		@groups = Group.includes(:tags, :participants)

		segments = @groups.length / 15
		threads = (1..segments).to_a.map do |i|
			Thread.new do
				15.times do |i|
					idx = i * 15 + i
					unless idx >= @groups.length
						group = @groups[i]
						group[:distance] = Geocoder::Calculations.distance_between(user_coord, [group.lat, group.lng])
					end
  			end
  		end
  	end

  	threads.each {|t| t.join}
  	p @groups
  	@groups
	end

end
