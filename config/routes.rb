Rails.application.routes.draw do
  root to: "static_pages#root"

  namespace :api, defaults: {format: :json} do
    resource :user, only: [:create, :destroy, :show, :update] do
      patch :update_coordinate, on: :member
    end
    resource :session, only: [:create, :destroy]
    resources :groups, except: [:new, :edit]
    resources :show_users, only: [:show]
    resources :tags, only: [:show, :create, :index]
    resources :group_events, except: [:new, :edit, :destroy] do
      patch :cancel, on: :member
    end
    resources :group_participants, only: [:create, :destroy]

    resources :event_users, only: [:create, :destroy]
    resources :locations, only: [:create]
  end
end