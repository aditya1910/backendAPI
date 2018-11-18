# backendAPI

1. clone the folder 
2. run npm install in console
3. run command npm start to start the Application
to hit an API

POST 
http://localhost:3003/api/v1/monitor
{ "url": "http://www.google.com/", "data": {"a": "b" }, "method": "get" }

GET
http://localhost:3003/api/v1/monitor/:id

GET
http://localhost:3003/api/v1/monitor/:id

DELETE
http://localhost:3003/api/v1/monitor/:id

PUT
http://localhost:3003/api/v1/monitor/:id

body:
{ "url": "http://www.google.com/", "data": {"a": "b" }, "method": "get" }
