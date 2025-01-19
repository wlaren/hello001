let http = require("http");
let querystring = require("querystring");

let server = http.createServer();


server.on("request",function (req, res) {
    let params = "";
    req.on("data",function (chunk) {
       params += chunk;
   });

    req.on("end",function () {
        console.log(params);
        querystring.parse(params,"&","=")
    });


});

server.listen(3000);


