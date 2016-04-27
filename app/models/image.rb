class Image < ActiveRecord::Base
	validates :imageable_id, :imageable_type, presence: true
	belongs_to :imageable, polymorphic: true	
end
