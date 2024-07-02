## WorkIndia Inshorts API round

Tech stack used: MySQL, NodeJS + Express, mysql2 NodeJS driver

Assumption: the /filter request, query parameter called "query" is a stringified JSON object as given in the PS doc

Setup:
1. npm install
2. Initialise the following ENV variables in .env: ADMIN_API_KEY, DATABASE_URL, JWT_SECRET, PORT
3. Run CREATE TABLE commands and INSERT INTO user command on your database given in /sql/db2.sql file
4. Populate short table using CSV file /sql/MOCK_DATA_2.csv

