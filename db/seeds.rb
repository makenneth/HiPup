# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
User.create({username: "sampleuser", email: "sampleuser@example.com", 
							lat: 37.7749, lng: -122.4194, name: "Sample User", password: "password"});


30.times do 
		User.create({
			name: Faker::Superhero.name,
			username: Faker::Internet.user_name,
			password: "password",
			email: Faker::Internet.free_email,
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