$redis = Redis::Namespace.new('hipup', :redis => Redis.new(
  :host => ENV['REDIS_HOST'],
  :port => ENV['REDIS_PORT']
))