# Coding challenge Abel

## Starting

-  Clone project

       git clone git@github.com:basskibo/coding_challenge_abel.git

-  Change direction to the folder

       cd coding_challenge_abel

-  Install modules

       npm i

-  Run application

       npm run dev

-  You can use API (you can import **Coding_challenge_Abel.postman_collection.json** from _src/config_)
   Setup **.env** as you like , or just run , it will run on port **3000** by default

## Project Structure

```
src\
 |--config\         # Magic numbers, validators and configuration related things
 |--controllers\    # Route controllers (controller layer)
 |--middlewares\    # Custom express middlewares
 |--models\         # Mongoose models (data layer)
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--utils\          # Utility classes and functions
app.js          # Express app
server.js        # App entry point
```
