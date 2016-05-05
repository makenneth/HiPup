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
							name: "Whisker", password: "password", username: "sampleuser",
							city: "San Francisco", state: "CA"
						});

30.times do 
		name = Faker::Name.first_name
		User.create({
			name: name,
			username: Faker::Internet.user_name,
			owner_name: Faker::Name.name,
			password: "P8ssword*",
			email: Faker::Internet.free_email(name),
			city: "San Francisco", state: "CA",
			lat: 37.7749, lng: -122.4194,
			image_url: Faker::Placeholdit.image("250x250", 'jpg')})
end

5.times do
		Tag.create({
			name: Faker::Team.sport
			})
end
20.times do |i|
		Group.create({
			title: Faker::Hipster.words(2).join(" "),
			description: Faker::Hipster.paragraph(5),
			lat: Faker::Address.latitude,
			lng: Faker::Address.longitude,
			creator_id: rand(30) + 1,
			image_url: Faker::Placeholdit.image("500x300", 'jpg'),
			city: "San Francisco",
			state: "CA"
			})
		2.times do 
			Tagging.create({
				group_id: i,
				tag_id: rand(5) + 1
				})
		end
	3.times do |j|
		GroupEvent.create({
			title: Faker::Hacker.noun.capitalize + " Convention",
			description: Faker::Lorem.paragraphs(2).join("\n"),
			lat: 37.7749, lng: -122.4194,
			city: "San Francisco",
			state: "California",
			group_id: i,
			street: Faker::Address.street_address,
			zip: Faker::Address.zip_code,
			event_time: Faker::Time.between(365.days.ago, Date.today + 120, :day),
			host_id: rand(30) + 1
			})
			5.times do
				EventUser.create({
					event_id: j,
					user_id: rand(30) + 1
					})
			end
	end
	3.times do 
		Image.create({
			imageable_id: i,
			imageable_type: "Group",
			image_url: Faker::Placeholdit.image("500x300", 'jpg')
			})
	end
	3.times do 
		Image.create({
			imageable_id: j,
			imageable_type: "GroupEvent",
			image_url: Faker::Placeholdit.image("500x300", 'jpg')
			})
	end

end

50.times do
		GroupParticipant.create({
			group_id: rand(20) + 1,
			participant_id: rand(30) + 1
			})
end


