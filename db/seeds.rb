city1 = {city: "San Francisco", state: "CA", lat: 37.7749, lng: -122.4194}
city2 = {city: "San Jose", state: "CA", lat: 37.3382, lng: -122.8864}
city3 = {city: "New York City", state: "NY", lat: 40.7128, lng: -74.0059}
city4 = {city: "Boston", state: "MA", lat: 42.3601, lng: -71.0589}

User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city1[:lat], lng: city1[:lng], 
							name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city1[:city], 
							state: city1[:state], image_url: "/pictures/dog1.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city1[:lat], lng: city1[:lng], 
							name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city1[:city], 
							state: city1[:state], image_url: "/pictures/dog2.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city1[:lat], lng: city1[:lng], 
							name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city1[:city], 
							state: city1[:state], image_url: "/pictures/dog3.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city1[:lat], lng: city1[:lng], 
							name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city1[:city], 
							state: city1[:state], image_url: "/pictures/dog4.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city1[:lat], lng: city1[:lng], 
							name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city1[:city], 
							state: city1[:state], image_url: "/pictures/dog5.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city1[:lat], lng: city1[:lng], 
							name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city1[:city], 
							state: city1[:state], image_url: "/pictures/dog6.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city1[:lat], lng: city1[:lng], 
							name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city1[:city], 
							state: city1[:state], image_url: "/pictures/dog7.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city1[:lat], lng: city1[:lng], 
							name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city1[:city], 
							state: city1[:state], image_url: "/pictures/dog8.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city1[:lat], lng: city1[:lng], 
							name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city1[:city], 
							state: city1[:state], image_url: "/pictures/dog9.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city1[:lat], lng: city1[:lng], 
							name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city1[:city], 
							state: city1[:state], image_url: "/pictures/dog10.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city2[:lat], lng: city2[:lng], 
							name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city2[:city], 
							state: city2[:state], image_url: "/pictures/dog1.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city2[:lat], lng: city2[:lng], 
							name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city2[:city], 
							state: city2[:state], image_url: "/pictures/dog2.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city2[:lat], lng: city2[:lng], 
							name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city2[:city], 
							state: city2[:state], image_url: "/pictures/dog3.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city2[:lat], lng: city2[:lng], 
							name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city2[:city], 
							state: city2[:state], image_url: "/pictures/dog4.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city2[:lat], lng: city2[:lng], 
							name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city2[:city], 
							state: city2[:state], image_url: "/pictures/dog5.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city2[:lat], lng: city2[:lng], 
							name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city2[:city], 
							state: city2[:state], image_url: "/pictures/dog6.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city2[:lat], lng: city2[:lng], 
							name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city2[:city], 
							state: city2[:state], image_url: "/pictures/dog7.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city2[:lat], lng: city2[:lng], 
							name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city2[:city], 
							state: city2[:state], image_url: "/pictures/dog8.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city2[:lat], lng: city2[:lng], 
							name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city2[:city], 
							state: city2[:state], image_url: "/pictures/dog9.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city2[:lat], lng: city2[:lng], 
							name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city2[:city], 
							state: city2[:state], image_url: "/pictures/dog10.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city3[:lat], lng: city3[:lng], 
	name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city3[:city], 
	state: city3[:state], image_url: "/pictures/dog1.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city3[:lat], lng: city3[:lng], 
	name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city3[:city], 
	state: city3[:state], image_url: "/pictures/dog2.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city3[:lat], lng: city3[:lng], 
	name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city3[:city], 
	state: city3[:state], image_url: "/pictures/dog3.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city3[:lat], lng: city3[:lng], 
	name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city3[:city], 
	state: city3[:state], image_url: "/pictures/dog4.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city3[:lat], lng: city3[:lng], 
	name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city3[:city], 
	state: city3[:state], image_url: "/pictures/dog5.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city3[:lat], lng: city3[:lng], 
	name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city3[:city], 
	state: city3[:state], image_url: "/pictures/dog6.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city3[:lat], lng: city3[:lng], 
	name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city3[:city], 
	state: city3[:state], image_url: "/pictures/dog7.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city3[:lat], lng: city3[:lng], 
	name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city3[:city], 
	state: city3[:state], image_url: "/pictures/dog8.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city3[:lat], lng: city3[:lng], 
	name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city3[:city], 
	state: city3[:state], image_url: "/pictures/dog9.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city3[:lat], lng: city3[:lng], 
	name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city3[:city], 
	state: city3[:state], image_url: "/pictures/dog10.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city4[:lat], lng: city4[:lng], 
	name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city4[:city], 
	state: city4[:state], image_url: "/pictures/dog1.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city4[:lat], lng: city4[:lng], 
	name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city4[:city], 
	state: city4[:state], image_url: "/pictures/dog2.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city4[:lat], lng: city4[:lng], 
	name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city4[:city], 
	state: city4[:state], image_url: "/pictures/dog3.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city4[:lat], lng: city4[:lng], 
	name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city4[:city], 
	state: city4[:state], image_url: "/pictures/dog4.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city4[:lat], lng: city4[:lng], 
	name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city4[:city], 
	state: city4[:state], image_url: "/pictures/dog5.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city4[:lat], lng: city4[:lng], 
	name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city4[:city], 
	state: city4[:state], image_url: "/pictures/dog6.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city4[:lat], lng: city4[:lng], 
	name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city4[:city], 
	state: city4[:state], image_url: "/pictures/dog7.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city4[:lat], lng: city4[:lng], 
	name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city4[:city], 
	state: city4[:state], image_url: "/pictures/dog8.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city4[:lat], lng: city4[:lng], 
	name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city4[:city], 
	state: city4[:state], image_url: "/pictures/dog9.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city4[:lat], lng: city4[:lng], 
	name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city4[:city], 
	state: city4[:state], image_url: "/pictures/dog10.jpg" });
#####################################
#####################################
###############cats##################
#####################################
#####################################
#####################################
#cats
User.create({owner_name: "Sample User", email: "whisker@example.com", lat: city1[:lat], lng: city1[:lng], 
	name: "Whisker", password: "password", username: "sampleuser", city: city1[:city], 
	state: city1[:state], image_url: "/pictures/cat1.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city1[:lat], lng: city1[:lng], 
							name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city1[:city], 
							state: city1[:state], image_url: "/pictures/cat2.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city1[:lat], lng: city1[:lng], 
							name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city1[:city], 
							state: city1[:state], image_url: "/pictures/cat3.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city1[:lat], lng: city1[:lng], 
							name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city1[:city], 
							state: city1[:state], image_url: "/pictures/cat4.png" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city1[:lat], lng: city1[:lng], 
							name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city1[:city], 
							state: city1[:state], image_url: "/pictures/cat5.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city1[:lat], lng: city1[:lng], 
							name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city1[:city], 
							state: city1[:state], image_url: "/pictures/cat6.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city1[:lat], lng: city1[:lng], 
							name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city1[:city], 
							state: city1[:state], image_url: "/pictures/cat7.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city1[:lat], lng: city1[:lng], 
							name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city1[:city], 
							state: city1[:state], image_url: "/pictures/cat8.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city1[:lat], lng: city1[:lng], 
							name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city1[:city], 
							state: city1[:state], image_url: "/pictures/cat9.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city1[:lat], lng: city1[:lng], 
							name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city1[:city], 
							state: city1[:state], image_url: "/pictures/cat10.jpg" });
User.create({owner_name: "Sample User", email: "whisker@example.com", lat: city2[:lat], lng: city2[:lng], 
	name: "Whisker", password: Faker::Internet.password(8), username: "sampleuser", city: city2[:city], 
	state: city2[:state], image_url: "/pictures/cat1.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city2[:lat], lng: city2[:lng], 
							name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city2[:city], 
							state: city2[:state], image_url: "/pictures/cat2.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city2[:lat], lng: city2[:lng], 
							name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city2[:city], 
							state: city2[:state], image_url: "/pictures/cat3.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city2[:lat], lng: city2[:lng], 
							name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city2[:city], 
							state: city2[:state], image_url: "/pictures/cat4.png" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city2[:lat], lng: city2[:lng], 
							name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city2[:city], 
							state: city2[:state], image_url: "/pictures/cat5.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city2[:lat], lng: city2[:lng], 
							name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city2[:city], 
							state: city2[:state], image_url: "/pictures/cat6.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city2[:lat], lng: city2[:lng], 
							name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city2[:city], 
							state: city2[:state], image_url: "/pictures/cat7.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city2[:lat], lng: city2[:lng], 
							name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city2[:city], 
							state: city2[:state], image_url: "/pictures/cat8.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city2[:lat], lng: city2[:lng], 
							name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city2[:city], 
							state: city2[:state], image_url: "/pictures/cat9.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city2[:lat], lng: city2[:lng], 
							name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city2[:city], 
							state: city2[:state], image_url: "/pictures/cat10.jpg" });

User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city3[:lat], lng: city3[:lng], 
	name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city3[:city], 
	state: city3[:state], image_url: "/pictures/cat1.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city3[:lat], lng: city3[:lng], 
	name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city3[:city], 
	state: city3[:state], image_url: "/pictures/cat2.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city3[:lat], lng: city3[:lng], 
	name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city3[:city], 
	state: city3[:state], image_url: "/pictures/cat3.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city3[:lat], lng: city3[:lng], 
	name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city3[:city], 
	state: city3[:state], image_url: "/pictures/cat4.png" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city3[:lat], lng: city3[:lng], 
	name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city3[:city], 
	state: city3[:state], image_url: "/pictures/cat5.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city3[:lat], lng: city3[:lng], 
	name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city3[:city], 
	state: city3[:state], image_url: "/pictures/cat6.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city3[:lat], lng: city3[:lng], 
	name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city3[:city], 
	state: city3[:state], image_url: "/pictures/cat7.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city3[:lat], lng: city3[:lng], 
	name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city3[:city], 
	state: city3[:state], image_url: "/pictures/cat8.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city3[:lat], lng: city3[:lng], 
	name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city3[:city], 
	state: city3[:state], image_url: "/pictures/cat9.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city3[:lat], lng: city3[:lng], 
	name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city3[:city], 
	state: city3[:state], image_url: "/pictures/cat10.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city4[:lat], lng: city4[:lng], 
	name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city4[:city], 
	state: city4[:state], image_url: "/pictures/cat1.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city4[:lat], lng: city4[:lng], 
	name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city4[:city], 
	state: city4[:state], image_url: "/pictures/cat2.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city4[:lat], lng: city4[:lng], 
	name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city4[:city], 
	state: city4[:state], image_url: "/pictures/cat3.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city4[:lat], lng: city4[:lng], 
	name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city4[:city], 
	state: city4[:state], image_url: "/pictures/cat4.png" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city4[:lat], lng: city4[:lng], 
	name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city4[:city], 
	state: city4[:state], image_url: "/pictures/cat5.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city4[:lat], lng: city4[:lng], 
	name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city4[:city], 
	state: city4[:state], image_url: "/pictures/cat6.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city4[:lat], lng: city4[:lng], 
	name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city4[:city], 
	state: city4[:state], image_url: "/pictures/cat7.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city4[:lat], lng: city4[:lng], 
	name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city4[:city], 
	state: city4[:state], image_url: "/pictures/cat8.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city4[:lat], lng: city4[:lng], 
	name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city4[:city], 
	state: city4[:state], image_url: "/pictures/cat9.jpg" });
User.create({owner_name: Faker::Name.name, email: Faker::Internet.free_email(Faker::Name.first_name), lat: city4[:lat], lng: city4[:lng], 
	name: Faker::Name.first_name, password: Faker::Internet.password(8), username: Faker::Internet.slug, city: city4[:city], 
	state: city4[:state], image_url: "/pictures/cat10.jpg" });

Tag.create({name: "Swimming"})
Tag.create({name: "Massage"})
Tag.create({name: "Frisbee"})
Tag.create({name: "Manicure"})
Tag.create({name: "Soccer"})
Tag.create({name: "Waterpolo"})
Tag.create({name: "Surfing"})
Tag.create({name: "Yarnball"})
Tag.create({name: "Obstacle Course"})
Tag.create({name: "Napping"})
Tag.create({name: "Hide-N-seek"})
Tag.create({name: "Sun Bathe"})
Tag.create({name: "Hiking"})
Tag.create({name: "Cat"})
Tag.create({name: "Dog"})
cities = [city1, city2, city3, city4]
4.times do |z|
	Group.create({title: "Dog Frisbee Group", description: Faker::Lorem.paragraphs(3).join("\n"), lat: cities[z][:lat], lng: cities[z][:lng], creator_id: rand(10) + 1, image_url: "/pictures/dog-frisbee1.jpg", city: cities[z][:city], state: cities[z][:state] })
	Tagging.create({group_id: 1 + z * 10, tag_id: 3})
	Tagging.create({group_id: 1 + z * 10, tag_id: 15})
	Group.create({title: "Dog Manicure Group", description: Faker::Lorem.paragraphs(3).join("\n"), lat: cities[z][:lat], lng: cities[z][:lng], creator_id: rand(10) + 1, image_url: "/pictures/dog-manicure.jpg", city: cities[z][:city], state: cities[z][:state] })
	Tagging.create({group_id: 2 + z * 10, tag_id: 4})
	Tagging.create({group_id: 2 + z * 10, tag_id: 15})
	Group.create({title: "Soccer Competition", description: Faker::Lorem.paragraphs(3).join("\n"), lat: cities[z][:lat], lng: cities[z][:lng], creator_id: rand(10) + 1, image_url: "/pictures/dog-soccer.jpg", city: cities[z][:city], state: cities[z][:state] })
	Tagging.create({group_id: 3 + z * 10, tag_id: 5})
	Tagging.create({group_id: 3 + z * 10, tag_id: 15})
	Group.create({title: "Obstacle Course Training", description: Faker::Lorem.paragraphs(3).join("\n"), lat: cities[z][:lat], lng: cities[z][:lng], creator_id: rand(10) + 1, image_url: "/pictures/dog-obstacle.jpg", city: cities[z][:city], state: cities[z][:state] })
	Tagging.create({group_id: 4 + z * 10, tag_id: 9})
	Tagging.create({group_id: 4 + z * 10, tag_id: 15})
	Group.create({title: "Hiking", description: Faker::Lorem.paragraphs(3).join("\n"), lat: cities[z][:lat], lng: cities[z][:lng], creator_id: rand(10) + 1, image_url: "/pictures/dog-hiking.jpg", city: cities[z][:city], state: cities[z][:state] })
	Tagging.create({group_id: 5 + z * 10, tag_id: 13})
	Tagging.create({group_id: 5 + z * 10, tag_id: 15})
	Group.create({title: "Dog Surfing", description: Faker::Lorem.paragraphs(3).join("\n"), lat: cities[z][:lat], lng: cities[z][:lng], creator_id: rand(10) + 1, image_url: "/pictures/dog-surfing3.jpg", city: cities[z][:city], state: cities[z][:state] })
	Tagging.create({group_id: 6 + z * 10, tag_id: 7})
	Tagging.create({group_id: 6 + z * 10, tag_id: 15})
	Group.create({title: "Dog/Cat Massage", description: Faker::Lorem.paragraphs(3).join("\n"), lat: cities[z][:lat], lng: cities[z][:lng], creator_id: rand(10) + 1, image_url: "/pictures/dog-massage.jpg", city: cities[z][:city], state: cities[z][:state] })
	Tagging.create({group_id: 7 + z * 10, tag_id: 2})
	Tagging.create({group_id: 7 + z * 10, tag_id: 15})
	Tagging.create({group_id: 7 + z * 10, tag_id: 14})
	Group.create({title: "Yarnball playdate for cats!", description: Faker::Lorem.paragraphs(3).join("\n"), lat: cities[z][:lat], lng: cities[z][:lng], creator_id: rand(10) + 1 + 40, image_url: "/pictures/cat-yarnball.jpg", city: cities[z][:city], state: cities[z][:state] })
	Tagging.create({group_id: 8 + z * 10, tag_id: 8})
	Tagging.create({group_id: 8 + z * 10, tag_id: 14})
	Group.create({title: "Hide-N-seek for cats!", description: Faker::Lorem.paragraphs(3).join("\n"), lat: cities[z][:lat], lng: cities[z][:lng], creator_id: rand(10) + 1 + 40, image_url: "/pictures/cat-hidenseek.jpg", city: cities[z][:city], state: cities[z][:state] })
	Tagging.create({group_id: 9 + z * 10, tag_id: 11})
	Tagging.create({group_id: 9 + z * 10, tag_id: 14})
	Group.create({title: "Sun Bathe for cats!", description: Faker::Lorem.paragraphs(3).join("\n"), lat: cities[z][:lat], lng: cities[z][:lng], creator_id: rand(10) + 1 + 40, image_url: "/pictures/cat-sunbathe-3.jpg", city: cities[z][:city], state: cities[z][:state] })
	Tagging.create({group_id: 10 + z * 10, tag_id: 12})
	Tagging.create({group_id: 10 + z * 10, tag_id: 14})
end
4.times do |z|
	((1 + z * 10)..(7 + z * 10)).each do |i|
		group = Group.find(i)
		GroupParticipant.create({participant_id: group.creator_id, group_id: i}) #should join the user in the controller

		participants = []
		6.times do 
			participant = i % 10 < 8 ? rand(10) + 10 * z + 1 : rand(10) + 41 + 10 * z
			next if participants.include?(participant) || participant == group.creator_id 
			participants << participant 
			GroupParticipant.create({participant_id: participant, group_id: i})
		end

		((1 + (z * 4))..(4 + (z * 4))).each do |j|
			GroupEvent.create({
				title: group.title + " " + %w(Group Competition Club Meetup Connection Community).sample,
				description: Faker::Lorem.paragraphs(2).join("\n"),
				lat: cities[z][:lat] + rand * 2 / 5 - 0.2, lng: cities[z][:lng] + rand * 2 / 5 - 0.2,
				city: cities[z][:city],
				state: cities[z][:state],
				group_id: i,
				street: Faker::Address.street_address,
				zip: Faker::Address.zip_code,
				event_time: [Faker::Time.between(120.days.ago, Date.today, :day), Faker::Time.forward(120, :day), Faker::Time.forward(120, :day)].sample,
				host_id: group.creator_id
				})
				# EventUser.create({event_id: j, user_id: group.host_id})
			5.times do 
				EventUser.create({event_id: j, user_id: participants.sample})
			end
		end

	end
end


