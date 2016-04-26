class GroupParticipant < ActiveRecord::Base
		validates :group_id, :participant_id, presence: true
		validates :group_id, uniqueness: {scope: :participant_id}

		belongs_to :group
		belongs_to :participant, foreign_key: :participant_id, className: :User
end