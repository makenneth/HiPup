json.extract! group, :id, :title, :image_url, :lat, :lng
json.tags group.tags
unless simple
	json.participants group.participants do |partic|
		json.extract! partic, :id, :name
	end
	json.images group.images do |image|
		json.extract! image, :image_url, :id
	end
	json.description group.description
	json.group_events group.group_events
end