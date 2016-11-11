groups_json = Array.new(@groups.length)
num_of_threads = @groups.length / 10
location = !!params[:user_coord]
p @groups.length
threads = (0...num_of_threads).to_a.map do |i|
  Thread.new do
    10.times do |j|
      idx = i * num_of_threads + j
      p idx
      break if idx >= @groups.length
      group = @groups[idx]
      groups_json[idx] = json.partial! 'group', group: group, simple: true, location: location
    end
  end
end

threads.each(&:join)
json.array!(group_json)