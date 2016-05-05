class GroupEvent < ActiveRecord::Base
	before_validation :convert_time

	validates :lat, :lng, :city, :state, :title, :description, :group_id,
				:event_time, :host_id, presence: true

	belongs_to :group
	has_many :event_users, foreign_key: :event_id, class_name: :EventUser
	has_many :event_participants, through: :event_users, source: :event_participant
	belongs_to :user, foreign_key: :host_id, class_name: :User


	attr_reader :time, :date

	def convert_time
		self.event_time ||= Time.new(*@date, *@time)
	end

	def time=(event_time)
		@time = event_time.split(":")
	end

	def date=(event_date)
		@date = event_date.split("-")
	end
end