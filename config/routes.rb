Rails.application.routes.draw do
  root to: "static_pages#root"

  namespace :api, defaults: {format: :json} do
    resource :user, only: [:create, :destroy, :show]
    resource :session, only: [:create, :destroy]
    resources :groups, except: [:new, :edit]
    resources :show_users, only: [:show] #should have update route
    resources :tags, only: [:show, :create, :index]
    resources :group_events, except: [:new, :create]
    resources :group_participants, only: [:create, :destroy]
  end
end