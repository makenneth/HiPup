json.array! groups_json = Array.new(@groups.length)
location = !!params[:user_coord]
threads = (0...3).to_a.map do |i|
  Thread.new do
    10.times do |j|
      idx = i * num_of_threads + j
      break if idx >= @groups.length
      group = @groups[idx]
      groups_json[idx] = json.partial! 'group', group: group, simple: true, location: location
    end
  end
end

threads.each(&:join)
groups_json
