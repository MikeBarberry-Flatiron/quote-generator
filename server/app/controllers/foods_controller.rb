class FoodsController < ApplicationController
    def delete 
        dish = Food.find(params[:id])
        dish.delete
        render json: {:status => 200, :message => "Quote Successfully Deleted!"}
    end 

    def create 
        restaurant = Restaurant.find(params[:id])
        case restaurant.id
        when 1
            dish = Faker::TvShows::SouthPark.quotes
        when 2
            dish = Faker::TvShows::Community.quotes
        when 3
            dish = Faker::TvShows::HeyArnold.quotes
        when 4 
            dish = Faker::TvShows::GameOfThrones.quotes
        end 
        # dish = Faker::Food.dish 
        description = Faker::Food.description
        Food.create(dish: dish, description: description, restaurant_id: restaurant.id)
        render json: {:status => 200, :message => "Quote Successfully Created!"}
    end 
end
