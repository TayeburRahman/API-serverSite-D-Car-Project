const express = require('express');
// mongo db cloud
const { MongoClient } = require('mongodb');
// private git data no push
require('dotenv').config();
// cors.0
const cors = require('cors');
// POST API Single-data show ServerSit 'Page' no.3.1
const ObjectID = require('mongodb').ObjectId

const app = express();
const port = 5000;
// cors.0.1 middleware end
app.use(cors());
app.use(express.json());


// dynamic private user create MongoDB cloud
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yjiyu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// MongoDB Driver Insert a Document(connect database)
async function run() {
    try {
      await client.connect();
    //  create database
      const database = client.db('CarMechanic');
      const servicesCollection = database.collection('service');

    // *GET API* no.2
    app.get('/survices', async(req, res) =>{
      // POST API data show ServerSit 'Page' no.2.1 [Client-site set url & end]
      const cursor = servicesCollection.find({});
      const services = await cursor.toArray();
      res.send(services)
    })

    // *GET Single API* no.3
    app.get('/survices/:id', async(req, res) =>{
      // POST API Single-data show ServerSit 'Page' no.3.2 [Client-site set url(dynamic id) & end]
      const id = req.params.id;
      console.log('get in id', id)
      const query = {_id: ObjectID(id)};
      const service = await servicesCollection.findOne(query);
      res.json(service);
    })

    // *DELETE API* no.4
    app.delete('/survices/:id', async(req, res) =>{
      // dltClick Client-site for Delete API no.4.1 =>Client site
      const id = req.params.id;
      const query = {_id:ObjectID(id)};
      const result = await servicesCollection.deleteOne(query);
      res.json(result);
    })

    // ***create Client site document***
    //   *POST API* no.1 => Client site
    app.post('/survices', async(req, res) =>{
      // ClientSite From-data 'get' ServerSit no.1.2 end
      const service = req.body;
        const result = await servicesCollection.insertOne(service);
        console.log(result)
        res.json(result)
    });



    } finally {
      // await client.close();
    }
  }
  run().catch(console.dir);



app.get('/', (req, res) =>{
    res.send('Running Genius Server');
})

app.listen(port, () =>{
    console.log('running genius server', port);
})