class Api::GroupParticipantsController < ApplicationController
	before_action :check_if_logged_in

	def create
		group_participant = GroupParticipant.new(
			participant_id: @user.id,
			group_id: params[:group_participant][:group_id]
		)
		if group_participant.save
			group = Group.find_by(id: group_participant.group_id)
			data = {
				user: {
					id: @user.id,
					name: @user.name,
					imageUrl: @user.image_url
				},
				group: group
			}

			$redis.del("group:#{group_participant.group_id}")
			render json: data, status: 200
		else
			render json: group_participant.errors.full_messages, status: 422
		end
	end

	def destroy
		group_participant = GroupParticipant.find_by(
			participant_id: @user.id,
			group_id: params[:id]
		)
		if group_participant.destroy
			data = {
				id: @user.id,
				name: @user.name,
				imageUrl: @user.image_url
			}
			$redis.del("group:#{group_participant.group_id}")
			render json: data, status: 200
		else
			render json: ["Unable to delete"], status: 404
		end
	end

	private
	def check_if_logged_in
		@user = current_user
		render json: ["Not logged in"], status: 403 unless @user
	end
end
