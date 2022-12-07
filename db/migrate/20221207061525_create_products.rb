class CreateProducts < ActiveRecord::Migration[7.0]
  def change
    create_table :products do |t|
      t.string :name
      t.string :manufacturer
      t.string :description
      t.string :review
      t.string :link
      t.integer :rating
      t.timestamps
    end
  end
end
