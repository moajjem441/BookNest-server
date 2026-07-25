require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { MongoClient, ServerApiVersion,ObjectId  } = require('mongodb');
const uri = process.env.MONGODB_URI;


const app = express();

app.use(cors());
app.use(express.json());


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
   
    const db = client.db("booknest");

    const booksCollection = db.collection("books");

    const usersCollection = db.collection("user");

   
   
    const  borrowRequestsCollection = db.collection("borrowRequest");

     

    app.get("/books",async(req,res)=>{
      const books = await booksCollection.find({}).toArray();
      res.json(books);
    })


   app.get("/books/:id", async (req, res) => {
  const id = req.params.id;

  const book = await booksCollection.findOne({
    _id: new ObjectId(id),
  });

  res.json(book);
});






app.get("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid User ID format" });
    }

    // Replace `usersCollection` below with your actual collection variable name!
    const singleUser = await usersCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!singleUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(singleUser);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});





// app.post("/books/:id/request",async(req,res)=>{
//   const id = req.params.id;
//   const book = await booksCollection.findOne({
//     _id: new ObjectId(id),
//     $set:status:"requested"
//   })
// })



    app.get("/", (req, res) => {
  res.send("booknest Server Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


