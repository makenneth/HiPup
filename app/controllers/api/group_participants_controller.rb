class Api::GroupParticipantsController < ApplicationController
	def create
		group_participant = GroupParticipant.new(group_participant_params)
		if group_participant.save
			render 'api/users/show', status: 200
		else
			render json: group_participant.errors.full_messages, status: 422
		end
	end

	def leave
		group_participant = GroupParticipant.find_by(group_participant_params)
		if group_participant.destroy
			render 'api/users/show', status: 200
		else
			render json: ["Unable to delete"], status: 404
		end
	end
	private
	def group_participant_params
		params.require(:group_participant).permit(:participant_id, :group_id)
	end
end
