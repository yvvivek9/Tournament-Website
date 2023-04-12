const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")
const https = require("https")
const fs = require("fs")
const { MongoClient } = require("mongodb");
const dburl = "mongodb+srv://vivekdgrt:Pintu090703@cluster0.qxivjzg.mongodb.net/?retryWrites=true&w=majority";

const app = express()
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.resolve('application', 'build')));

const certificates = {
    key: fs.readFileSync('./certificates/certificate.key'),
    cert: fs.readFileSync('./certificates/certificate.pem')
}

app.get("/", (req,res) => {
    console.log(__dirname)
    res.sendFile(path.resolve('application', 'build', 'index.html'))
})

app.post("/findOrAdd", (req, res) => {
    const client = new MongoClient(dburl);
    var Person = {}
    const findOrAdd = async () => {
        try {
            const db = client.db("Tournament")
            const Applicants = db.collection("Applicants")
            Person = await Applicants.findOne({email: req.query.email})
            if(!Person){
                Person = {email: req.query.email, name: req.query.name, applied: false, payment: 0}
                const insert = await Applicants.insertOne(Person)
                console.log(insert)
            }
        } catch (error) {
            console.log(error)
            res.status(500)
        } finally {
            await client.close()
            res.status(200).json(Person)
        }
    }
    findOrAdd()
})

app.post("/dummy", (req, res) => {
    console.log(req.body.name)
    res.status(200)
})

https.createServer(certificates, app).listen(443, () => {
    console.log("Server running on port 443")
})