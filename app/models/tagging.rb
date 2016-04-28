class Tagging < ActiveRecord::Base
	validates :group_id, :tag_id, presence: true
	validates :group_id, uniqueness: {scope: :tag_id}

	belongs_to :group
	belongs_to :tag
end
