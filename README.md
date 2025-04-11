# Simple CRUD App

Made using React + Typescript and Express.js

## Usage

1. `git clone https://github.com/Deaponn/simple-crud-app.git`

2. `cd simple-crud-app`
    1. `cp backend/.example.env backend/.env`

    2. Populate .env file with forecast API key from [this website](weatherapi.com)

    3. Install PostgreSQL and provide valid link in .env (postgres://postgres@localhost should work)

    4. Create PostgreSQL database and supply its name in the .env

    5. On one terminal: `cd backend && npm i && npm run start`

    6. `echo SERVER_URL=http://localhost:3000 > frontend/.env`

    6. On second terminal: `cd frontend && npm i && npm run start`

3. Connect with the application via browser on localhost:1234

## Live demo

[Simple CRUD App](http://app.sajecki.ct8.pl)
