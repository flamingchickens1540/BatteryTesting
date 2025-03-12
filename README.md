# Hatching Batteries (name)
This repository is a battery testing app for team 1540. Using it, our team can see records and read logs of all our batteries, and test their capacities. Additionally, some planned features include recording battery data during matches, estimating the energy in a battery based on their voltages, plus much more.


## Code
This app does not use any frameworks to run. All written code is purely made up of JavaScript, Node.JS, HTML, CSS, mySQL. The app is split into two directories: [frontend](/frontend/README.md) and [backend](/backend/README.md). The frontend contains all webpages and their functionality, while backend focuses server-related tasks. 

## Run Code
To start up the backend, use the following command:

```bash
# go to the backend/batteryLog directory
cd backend/batteryLog

# install dependencies
npm i

# run code
node src/index.js
```

## Setup database
```sql
-- Run commands to create the tables
source setupDatabase.sql

-- Run commands to create the procedures
source procedureSetup.sql

```