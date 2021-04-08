class FoodsController < ApplicationController
    def delete 
        dish = Food.find(params[:id])
        dish.delete
        render json: {:status => 200, :message => "Dish Successfully Deleted!"}
    end 

    def create 
        restaurant = Restaurant.find(params[:id])
        dish = Faker::Food.dish 
        description = Faker::Food.description
        Food.create(dish: dish, description: description, restaurant_id: restaurant.id)
        render json: {:status => 200, :message => "Dish Successfully Created!"}
    end 
end
