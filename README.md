<img src="https://github.com/zhenghung/soba-game/raw/master/doc_images/logo.png" width=50% />

# Soba - Backend
[![npm version](https://badge.fury.io/js/soba-be.svg)](https://badge.fury.io/js/soba-be)

> Soba is a simple React-based web game engine.
> By using higher-order components, Soba manages the generic socket.io messages and injecting additional functions as props.
> Integrating with Soba allows web games to be made more lightweight.

This is a library function for the Node backend contrasting the React front-end using Soba.

For more information regarding game design and how Soba works, see the main [repository](https://github.com/zhenghung/soba-game).

## Applications using Soba
There is a starting example in this repository to start off with. 

The following are other projects that use Soba.

1. Articulate
    * Game Link: https://articulate-game.herokuapp.com/
    * Source Code 
        * Front-end: https://github.com/chriz218/articulate
        * Back-end: https://github.com/zhenghung/articulate-be

## Dependency
1. [socket.io](https://socket.io/)
```
$ npm install --save socket.io
```

## Installation and Quickstart
1. Install the npm module in your NodeJS backend server project root directory
    ```
    $ npm install --save zhenghung/soba-be
    ```
   
2. Import the function and use it in your io.on callback. An example template index.js file is as follows:

    This requires a few dependencies which can be installed with this
    ```
    $ npm install --save http express socket.io cors
    ```
    
    index.js
    ```
    const http = require('http');
    const express = require('express');
    const socketio = require('socket.io');
    const cors = require('cors');
    const soba = require('soba-be');
     
    const app = express();
    const server = http.createServer(app);
    const io = socketio(server);
    
    app.use(cors());
    app.use(express.json());
    
    io.on('connect', (socket) => {
        soba(io, socket, {logging: true});
    
        /** Add more socket.on listener handlers here*/
    });
    
    server.listen(process.env.PORT || 5000,() => console.log(`Server has started.`));
    ```
   
### Configuration
Custom configuration can be tweaked as it it passed as the third argument into the function.
`soba(io, socket, config)`

Default configurations
```
{
    logging: false
}
```