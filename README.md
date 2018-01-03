# Hey Mr. Postman Frontend
An interactive, 3D display of your email inbox.


demo: https://youtu.be/BvQG8dyOTNs

backend repo: https://github.com/annabush092/hey-mr-postman

Created with React, Three.js, CSS3D, and Vanilla Javascript


To run:

yarn install

yarn start (after you have started the backend server. When prompted, type 'y' to allow the server to run on another port)

In order to view seeded Faker emails, you must obtain a username from your database.
Go to http://localhost:3000/api/v1/users/1 and copy paste the name of the user into the sign-in menu to view this user's email inbox.

Some computers may not support THREE.js.
A risky work-around is to open your Chrome browser, visit chrome://flags, and enable the first option, "Override software rendering list". This could allow 3D rendering to freeze your computer and is not recommended - it is always good to have all of your data backed up before trying this work-around. However, enabling this option has worked in some cases to allow for 3D rendering in the browser (including one of the co-creators of this very project).



This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
