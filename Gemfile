source 'https://rubygems.org'
ruby "2.3.1"

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.2.5.1'
gem 'puma'
# Use postgresql as the database for Active Record
gem 'pg'
gem 'geocoder'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
gem 'bootstrap-sass'
gem 'redis', '~>3.2'
gem 'redis-namespace'
gem 'rack-cors', :require => 'rack/cors'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# Use CoffeeScript for .coffee assets and views
gem 'jquery-rails'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.0'
# bundle exec rake doc:rails generates the API under doc/api.
# Use ActiveModel has_secure_password
gem 'bcrypt', '~> 3.1.7'
gem 'faker'
gem 'aws-sdk-v1'
gem 'figaro'
# Use Unicorn as the app server
# gem 'unicorn'

# Use Capistrano for deployment
group :development do
  gem 'capistrano'
  gem 'capistrano-rails', group: :development
  gem 'capistrano-ext', group: :development
  gem 'capistrano-rvm', github: 'capistrano/rvm'
  gem 'capistrano-bundler', github: 'capistrano/bundler'
  gem 'capistrano3-puma',   require: false
end

group :production do
  gem 'newrelic_rpm'
  gem 'rails_12factor' # error feedback
end
group :assets do
end
group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'pry-rails'
  gem 'byebug'
end
