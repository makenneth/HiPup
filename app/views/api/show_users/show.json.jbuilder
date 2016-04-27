json.extract! @user, :name, :owner_name, :image_url, :lat, :lng

if current_user == @user
	json.extract! @user, :email, :username, :created_at
end
