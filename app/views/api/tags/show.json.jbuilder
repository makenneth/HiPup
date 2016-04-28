json.extract! @tag, :id, :name
json.groups @tag.groups do |group|
	json.extract! group, :id, :name, :lat, :lng
end
