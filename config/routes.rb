Rails.application.routes.draw do
  root to: "static_pages#root"

  namespace :api, defaults: {format: :json} do
    resource :user, only: [:create, :destroy, :show, :update]
    resource :session, only: [:create, :destroy]
    resources :groups, except: [:new, :edit]
    resources :show_users, only: [:show] 
    resources :tags, only: [:show, :create, :index]
    resources :group_events, except: [:new, :edit]
    resources :group_participants, only: [:create] do
      delete :leave, on: :collection
    end

    resources :event_users, only: [:create] do
      delete :leave, on: :collection
    end
  end
end