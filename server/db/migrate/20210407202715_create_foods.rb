class CreateFoods < ActiveRecord::Migration[6.1]
  def change
    create_table :foods do |t|
      t.string :dish
      t.string :description
      t.references :restaurant, null: false, foreign_key: true

      t.timestamps
    end
  end
end
