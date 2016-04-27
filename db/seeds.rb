# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
User.create({
							owner_name: "Sample User", email: "whisker@example.com", 
							lat: 37.7749, lng: -122.4194, 
							name: "Whisker", password: "password", username: "sampleuser"
						});

30.times do 
		name = Faker::Name.first_name
		User.create({
			name: name,
			username: Faker::Internet.user_name,
			owner_name: Faker::Name.name,
			password: "password",
			email: Faker::Internet.free_email(name),
			lat: Faker::Address.latitude,
			lng: Faker::Address.longitude
			})
end

20.times do
		Group.create({
			title: Faker::Hipster.words(2).join(" "),
			description: Faker::Hipster.paragraph,
			lat: Faker::Address.latitude,
			lng: Faker::Address.longitude,
			creator_id: rand(30) + 1,
			image_url: Faker::Placeholdit.image("500x300", 'jpg')
			})
end

50.times do
		GroupParticipant.create({
			group_id: rand(20) + 1,
			participant_id: rand(30) + 1
			})
end
