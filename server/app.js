const express = require('express');
const fs = require('fs');
const app = express();


// write your logging code here
app.use((req, res, next) => {
    var agent = req.headers['user-agent'];
    var time = new Date().toISOString();
    var method = req.method;
    var resource = req.url;
    var version = 'HTTP/' + req.httpVersion;
    var status = '200';
    var allThings = agent + ',' + time + ',' + method + ',' + resource + ',' + version + ',' + status + '\n';
    fs.appendFile('log.csv', allThings,
        function (err, data) {
        console.log(allThings);
        if (err) { return err };
    next();
        })
});
// write your code to respond "ok" here
app.get('/', (req, res) => {
    res.send('ok');
});
// write your code to return a json object containing the log data here
app.get('/logs', (req, res) => {
    fs.readFile('log.csv', 'utf8', function (err, data) {
        if (err) throw err;
        //console.log(data);

        let dataLines = data.split('\n');
        console.log(dataLines);
        dataLines.shift();

        let jsonData = []

        dataLines.forEach(dataLines => {
            let contents = dataLines.split(',');

            let jsonObject = {
                "Agent": contents[0],
                "Time": contents[1],
                "Method": contents[2],
                "Resource": contents[3],
                "Version": contents[4],
                "Status": contents[5]
            }
            if (contents[0] !== "") {
            jsonData.push(jsonObject);
         }
    });
    res.json(jsonData);
    console.log(jsonData);

})
})

module.exports = app;
