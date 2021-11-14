class ShowsController < ApplicationController
    def index 
        shows = Show.all
        response = []
        shows.each do |show|
            data = {}
            data[:id] = show.id
            data[:name] = show.name
            data[:quotes] = show.quotes.order("id DESC")
            response << data 
        end

        render json: response, except: [:created_at, :updated_at]
    end 
end
