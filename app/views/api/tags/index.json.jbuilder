json.array! @tags do |tag|
	json.extract! tag, :id, :name
	json.groups tag.groups do |group|
		json.extract! group, :id, :title, :lat, :lng
	end
end
