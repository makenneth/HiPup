class Session < ActiveRecord::Base
	validates :user_id, :session_token, presence: true
	validates :session_token, uniqueness: true
	belongs_to :user

	def self.generate_session_token
		SecureRandom.base64
	end

	def reset_session_token!(user_id, session_token)
		session = Session.find_by(user_id: user_id, session_token: session_token)
		session.session_token = self.class.generate_session_token
		session.save!
	end
end