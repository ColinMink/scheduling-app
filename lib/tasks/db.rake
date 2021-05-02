require 'csv'

namespace :db do | args |
    desc 'load CSV files into the database'
    task load_csv: :environment do
        puts "Loading CSV files"
        ARGV.each { |a| task a.to_sym do ; end }
        #TODO check to confirm a valid directory was supplied
        target_dir = ARGV[1]
        Dir.chdir(target_dir)
        csv_files = Dir.glob("*.csv")
        csv_files.each do | file | 
            case file
            when "locations.csv"
                CSV.read(target_dir + "/" + file, headers: true).each do | line |
                    cell_value = { id:line[0] , name:line[1], city:line[2]}
                    Location.create(cell_value)
                end 
                puts "Locations loaded"
            when "technicians.csv"
                CSV.read(target_dir + "/" + file, headers: true).each do | line |
                    cell_value = { id:line[0] , name:line[1]}
                    Technican.create(cell_value)
                end
                puts "Technicans loaded"
            when "work_orders.csv"
                CSV.read(target_dir + "/" + file, headers: true).each do | line |
                    cell_value = { 
                        id:line[0] , 
                        technician_id:line[1], 
                        location_id:line[2],
                        time:Time.parse(line[3]),
                        duration:line[4],
                        price:line[5]
                    }
                    WorkOrder.create(cell_value)
                end
                puts "Work Orders loaded"
            end
        end
    end
end