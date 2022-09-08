const express = require('express');
const app = express();
const cors = require('cors')

app.use(cors());

const port = process.env.PORT || 80

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
    // res.send("hello node")
})
app.get("/api/:input", (req, res) => {
    let input = req.params.input;
    if (input.includes("-")) {
        let output = new Date(input);
        sendData = { unix: output.getTime(), utc: output.toUTCString() }
        if (!output.getTime() || !output.toUTCString()) {
            res.json({ error: output.toUTCString() })
        }
    } else {
        input = parseInt(input)
        let output = new Date(input);
        sendData = { unix: output.getTime(), utc: output.toUTCString() }
        if (!output.getTime() || !output.toUTCString()) {
            res.json({ error: output.toUTCString() })
        }
    }
    res.json(sendData)
})
app.get("/api/", (req, res) => {
    let output = new Date();
    res.json({ unix: output.getTime(), utc: output.toUTCString() })
})


app.listen(port, () => {
    console.log('CORS-enabled web server listening on port ' + port)
})
