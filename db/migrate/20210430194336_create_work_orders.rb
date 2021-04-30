class CreateWorkOrders < ActiveRecord::Migration[6.1]
  def change
    create_table :work_orders do |t|
      t.integer :technican_id
      t.integer :location_id
      t.timestamp :time
      t.integer :duration
      t.integer :price

      t.timestamps
    end
  end
end
