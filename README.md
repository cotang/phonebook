Project of phonebook, that uses json-server as backend. 
Possible opeartions are: getting phonenumbers from db.json, creating new ones, editing and deleting existing ones.
It is also possible to download and upload phonebook in csv format. Uploading data is synchronised with existing appropriately (creating, updating, deleting records). Test file 'my-phonebook-export-test.csv' is attached.

Visual presentation of how the project works
![phonebook](https://raw.githubusercontent.com/cotang/phonebook/master/video.gif)

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Steps:
1. Clone repo

`git clone git@github.com:cotang/phonebook.git`

2. Go to the folder and install npm packages

`cd phonebook`

`yarn install`

3. In order to simulate backend run json-server. It will open on http://localhost:3004/phones

`yarn fake`

4. In another terminal window run the project. It will open on http://localhost:3000

`yarn start`

5. Launch the production mode if it is necessary

`yarn build`

