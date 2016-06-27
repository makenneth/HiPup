class User < ActiveRecord::Base
	before_validation :ensure_image
	validates :username, :email, :name, :password_digest, 
									:lat, :lng, :owner_name, 
									:city, :state, presence: true
	validates :password, length: {minimum: 8, allow_nil: true}
	validates :username, :email, uniqueness: true

	has_many :groups, 
		foreign_key: :creator_id, 
		class_name: :Group
	has_many :group_participants, 
		foreign_key: :participant_id, 
		primary_key: :id, 
		class_name: :GroupParticipant
	has_many :joined_groups, through: :group_participants, source: :group
	has_many :event_users, foreign_key: :user_id, class_name: :EventUser
	has_many :joined_events, through: :event_users, source: :group_event
	has_many :sessions
	attr_reader :password

	def self.find_by_credentials(username, password)
		user = User.find_by(username: username)
		return user if user && user.is_password?(password)
	end

	def self.find_by_session_token(session_token)
		user = User.joins(:sessions).where("sessions.session_token = ?", session_token)
		user[0]
	end

	def destroy_session_token!(session_token)
		session = Session.find_by(user_id: self.id, session_token: session_token)
		session.destroy! if session
	end

	def password=(password)
		@password = password
		self.password_digest = BCrypt::Password.create(password)
	end

	def is_password?(password)
		BCrypt::Password.new(self.password_digest).is_password?(password)
	end

	def ensure_image
		self.image_url = "https://placehold.it/500x300.jpg/000" if self.image_url == ""
	end
	# private
	# def ensure_session_token
	# 	self.session_token ||= SecureRandom.base64
	# end
end
