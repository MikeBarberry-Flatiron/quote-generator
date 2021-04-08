require 'faker'

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
(1..4) each do |restaurant|
    name = Faker::Restaurant.name
    Restaurant.create(name: name)
end 

(1..2).each do |food|
    dish = Faker::Food.dish 
    description = Faker::Food.description
    Food.create(dish: dish, description: description, restaurant_id: 1)
end 

(1..2).each do |food|
    dish = Faker::Food.dish 
    description = Faker::Food.description
    Food.create(dish: dish, description: description, restaurant_id: 2)
end 

(1..2).each do |food|
    dish = Faker::Food.dish 
    description = Faker::Food.description
    Food.create(dish: dish, description: description, restaurant_id: 3)
end 

(1..2).each do |food|
    dish = Faker::Food.dish 
    description = Faker::Food.description
    Food.create(dish: dish, description: description, restaurant_id: 4)
end 
 