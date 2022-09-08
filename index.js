const express = require('express');
const app = express();
const cors = require('cors')
require('dotenv').config()

app.use(cors());

const port = process.env.PORT || 5000
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname })
    // res.sendFile(__dirname + "/public/index.html");
    // res.send("hello node")
})
app.get("/api/:date", (req, res) => {
    let date_string = req.params.date;
    // date_string    = date_string.match(/\d{5,}/)
    if (date_string.match(/\d{5,}/)) {
        date_string = +date_string;
    }
    let output = new Date(date_string);
    if(output.toUTCString()=="Invalid Date"){
        res.json({ error: output.toUTCString() })
    }else{
        res.json({ unix: output.getTime(), utc: output.toUTCString() })
    }
    // if (date_string) {
    //     let output = new Date(date_string);
    //     sendData = { unix: output.getTime(), utc: output.toUTCString() }
    //     if (!output.getTime() || !output.toUTCString()) {
    //         res.json({ error: output.toUTCString() })
    //     }
    // } else {
    //     date_string = parseInt(date_string)
    //     let output = new Date(date_string);
    //     sendData = { unix: output.getTime(), utc: output.toUTCString() }
    //     if (!output.getTime() || !output.toUTCString()) {
    //         res.json({ error: output.toUTCString() })
    //     }
    // }
    // res.json(sendData)
})
app.get("/api/", (req, res) => {
    let output = new Date();
    res.json({ unix: output.getTime(), utc: output.toUTCString() })
})


app.listen(port, () => {
    console.log('CORS-enabled web server listening on port ' + port)
})
