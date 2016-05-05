Time.zone = params[:time_zone]
json.extract! @user, :name, :owner_name, :image_url, :id, :username, :city, :state, :created_at
json.member_since (Time.utc(*@user.created_at).in_time_zone).strftime("%B %d, %Y")
json.groups @user.joined_groups


