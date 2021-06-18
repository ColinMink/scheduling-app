# README

# Requirments

Tested with the following versions

* yarn 1.22.10
* sqlite3 3.35.5
* ruby 2.7.3p183
* rails 6.1.3.1

# Setup

note: This setup assumes you have the prerequisites installed for your specific operating system.

- [ ] Download the project directory with any method, git clone is a good solution for this. Make sure to move to the directory after it is created.

COMMAND: git clone https://github.com/ColinMink/scheduling-app
COMMAND: cd scheduling-app
- [ ] Run the database migrate to build the sqlite3 database

COMMAND: rake db:migrate

- [ ] Import the CSV data into the database

COMMAND:rake db:load_csv 'DIRECTORY_PATH'

DIRECTORY_PATH is the location of the directory containing the csv files. They are required to be named locations.csv, technicans,csv and work_orders.csv

- [ ] Start the server

COMMAND:rails s

The website will be avaiable at http://127.0.0.1:3000/ by default. The application is on the root page.if the webserver has a webpack error, update webpack with the command below and type y each time you are prompted and then wait for the install to complete. After this is done, you can restart the rails server.

COMMAND: rails webpacker:install

# Approach

I started by creating the database migration and models utlizing rails generators.
I created the rake file to import the data. I did not encounter any problems in this stage, the database tables and data were fairly simple. For a production enviroment would like to improve the rake task to add more error checking, to load individiual csvs by file name and ignore duplicate entries. Therequirments for the web page are fairly simple, a single page that loads information for a single day of work orders. I wrote the basic html with embedded ruby to add the info for the technicans to the page, the javascript to add the required features and to place the work orders at the correct time on the timeline. I finished by doing some css styling. The overall design is simplistic and functional, and can support any number of technicans with horiztonal scrolling. Feautres that I would like to add next would be a date picker and allow the user to select different days.


