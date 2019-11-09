const express = require('express') 
const cors = require('cors');
const app = express()
const path = require('path')
const port = 9000

// app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/index.html')))
app.use(cors())
app.use(express.static("public"))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

