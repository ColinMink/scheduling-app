# README


----------------------------------------setup------------------------------------------

Step 1: Download the project directory with any method, git clone is a good solution for this.

git clone https://github.com/ColinMink/scheduling-app.git

Step 2: Run the database migrate to build the sqlite3 database

rails db:migrate

step 3: Import the CSV data into the database

db:load_csv DIRECTORY_PATH

DIRECTORY_PATH is the location of the directory containing the csv files. They are required to be named locations.csv, technicans,csv and work_orders.csv

step 4: Start the server

rails s

The website will be avaiable at http://127.0.0.1:3000/ by default. The application is on the root page.

---------------------------------------approach------------------------------------------

I started by creating the database migration and models utlizing rails generators.
I created the rake file to import the data. I did not encounter any problems in this stage, the database tables and data were fairly simple, however, I would like to improve the rake task to add more error checking, to load individiual csvs by file name and ignore duplicate entries in the futures.


