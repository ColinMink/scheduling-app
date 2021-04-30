class CreateTechnicans < ActiveRecord::Migration[6.1]
  def change
    create_table :technicans do |t|
      t.string :name

      t.timestamps
    end
  end
end
