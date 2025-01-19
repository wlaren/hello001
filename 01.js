let http = require("http");
let path = require("path");
let fs = require("fs");
let url = require("url");
let querystring = require("querystring");
let template = require("art-template");

let persons = {
    "wlaren": {
        name: "wlaren",
        gender: "male",
        age: "33"
    },
    "zhangsan": {
        name: "zhangsan",
        gender: "female",
        age: "54"
    }
};

let server = http.createServer();

server.on("request",function (req, res) {
    if (req.url.startsWith("/index") && req.method.toLowerCase() === "get") {
        let obj = url.parse(req.url);
        // console.log(obj);

        let filePath = path.join(__dirname,obj.pathname);
        fs.readFile(filePath, "utf8", function (err, data) {
            if (err) {
                res.writeHead(404, {
                    "content-type": "text/plain;charset=utf-8"
                });

                res.end("Page Not Found");
            }


            res.writeHead(200, {
                "content-type": "text/html;charset=utf-8"
            });

            res.end(data);
        });
    }
    else if (req.url.startsWith("/info") && req.method.toLowerCase() === "post"){
        let params = "";
        req.on("data",function (chunk) {
            params += chunk;
        });

        req.on("end",function () {
            let obj = querystring.parse(params);
            let per = persons[obj.username]

            let filePath = path.join(__dirname,url.parse(req.url).pathname);

            // fs.readFile(filePath,"utf8",function (err, data) {
            //     if (err){
            //         res.writeHead(404,{
            //             "content-type": "text/plain;charset=utf-8"
            //         });
            //         res.end("Page Not Found");
            //     }
            //
            //     let content = data.replace("!!!name!!!", per.name);
            //     content = content.replace("!!!gender!!!",per.gender);
            //     content = content.replace("!!!age!!!", per.age);
            //
            //     res.end(content);
            //
            // });
            res.writeHead(200,{
                "content-type": "text/html;charset=utf-8"
            });
            let html = template(filePath, per);
            res.end(html);
        })
    }
});

server.listen(3000);