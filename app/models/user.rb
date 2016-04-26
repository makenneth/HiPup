class User < ActiveRecord::Base
	after_initialize :ensure_session_token
	validates :username, :email, :name, :password_digest, 
									:session_token, :lat, :lng, presence: true
	validates :password, length: {minimum: 8, allow_nil: true}
	validates :username, :email, uniqueness: true

	has_many :groups, foreign_key: :creator_id, className: :Groups
	has_many :group_participants, foreign_key: :participant_id, className: :GroupParticipant
	has_many :joined_groups, through: :group_participants, source: :group
	
	attr_reader :password

	def self.find_by_credentials(username, password)
		user = User.find_by(username: username)
		return user if user && user.is_password?(password)
	end

	def reset_session_token!
		self.session_token = SecureRandom.base64
		self.save!
		self.session_token
	end

	def password=(password)
		@password = password
		self.password_digest = BCrypt::Password.create(password)
	end

	def is_password?(password)
		BCrypt::Password.new(self.password_digest).is_password?(password)
	end

	private
	def ensure_session_token
		self.session_token ||= SecureRandom.base64
	end
end
