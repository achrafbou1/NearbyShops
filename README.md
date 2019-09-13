# NearbyShops
A MEVN Stack application that lists nearby shops based on a user's location.

# Features implemented
* As a User, I can sign up using my email & password

* As a User, I can sign in using my email & password

* As a User, I can display the list of shops sorted by distance

* As a User, I can like a shop, so it can be added to my preferred shops

* As a User, I can dislike a shop, so it won’t be displayed within “Nearby Shops” list during the next 2 hours

* As a User, I can display the list of preferred shops

* As a User, I can remove a shop from my preferred shops list

# Screenshots
* Landing page:
![alt text](https://image.prntscr.com/image/wqBcL2VLSgWrkoyg7s8-nA.png)

* Login
![alt text](https://image.prntscr.com/image/zqwJ2IXmSLGaR1Xu1Gho1g.png)

* Register
![alt text](https://image.prntscr.com/image/Vu08rfV7TgKo84SN_Viybw.png)

* Nearby Shops
![alt text](https://image.prntscr.com/image/Tpl_bofKRqyp4jFuDZlyIA.png)

* My Preferred Shops
![alt text](https://image.prntscr.com/image/hEyTnL8NRUqCIayMvUVsvg.png)

# Getting Started
## Technologies used
* Git 2.20.1
* Vue CLI 3.0
* NPM 6.4.1
* MongoDB 4.0.5

# Quick installation & setup
First, make sure you have git and npm installed. Clone this repository using the following command:
```
git clone https://github.com/achrafbou1/NearbyShops/
```

Next, inside the project folder, open two terminal instances. In the first one, access the front-end folder using
```
cd .\front-end\
```

Then, run the following commands:

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

Next, in the second terminal, access the back-end folder using this command:
```
cd .\back-end\
```
Then, run the following commands:

## Project setup
```
npm install
```

### Start the server
```
npm start
```
## Now go to http://localhost:8080

# Setting up seed data 

Start your MongoDB server then download the following file: https://github.com/hiddenfounders/web-coding-challenge/blob/master/dump-shops.zip

Extract the .bson file somewhere.

Open mongorestore from the MongoDB installation directory and type the following command to populate your database:
```
mongorestore -d united-remote-web-challenge 'bson file path'
```

