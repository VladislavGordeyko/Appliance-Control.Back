# Appliance-Control (Test task for Electrolux)

This is backend for Appliance-Control task

## Project running 
<hr>

Create .env and add variable HOST and PORT, then install packages
```
    npm i
```

To run project 
```
    npm run dev
```


## Project Description
<hr>
Stack - Express, Typescript, node-persist

All data storing in files in .node-presist folder. Package node-persist help to manage storing data in local Storage of the server.  There are two main models of this project - WahingMachines(Appliances) and Commands. Appliances have Active commands and this command have running time depends on duratation of Command.


## Tests
Tests are containing in ./src/test folder. To run tests type 
```
    npm test
```
 During tests main services are mocking with test repositories.