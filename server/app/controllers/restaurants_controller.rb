class RestaurantsController < ApplicationController
    def index 
        restaurant = Restaurant.all
        data = []
        restaurant.each do |rest|
            h = {}
            h[:id] = rest.id 
            h[:name] = rest.name
            h[:foods] = rest.foods.order("id DESC")
            data << h 
        end 
        render json: data, except: [:created_at, :updated_at]
    end 
end
