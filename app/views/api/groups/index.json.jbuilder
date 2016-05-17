
json.array! @groups do |group|
	json.partial! 'group', group: group, simple: true
end.concat(params[:miles] ? [params[:miles]] : [])
