require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { MongoClient, ServerApiVersion,ObjectId  } = require('mongodb');
const uri = process.env.MONGODB_URI;

const { createRemoteJWKSet, jwtVerify } = require('jose-cjs');

const app = express();

app.use(cors());
app.use(express.json());



//----------middlewares-------------

const JWKS = createRemoteJWKSet(
  new URL(`${process.env.CLIENT_URL}/api/auth/jwks`)
)


const verifyToken =async (req,res,next)=>{
  const authHeader=req?.headers.authorization
  if(!authHeader){
    return res.status(401).json({message:"Unauthorized"})
  }
  const token = authHeader.split(" ")[1]

  if(!token){
    return res.status(401).json({message:"Unauthorized"})
  }
  console.log(token)



  try{
    const {payload}=await jwtVerify(token,JWKS)

  console.log(payload)

   next()
  }catch(error){
    return res.status(403).json({message:
      "Forbidden"
    });
  }
 
}






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





app.post("/books/:id/request", async (req, res) => {
  try {
    const id = req.params.id;
    const borrower = req.body; // frontend থেকে আসবে

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid Book ID",
      });
    }

    // বই খুঁজে বের করো
    const book = await booksCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    // নিজের বই নিজে borrow করতে পারবে না
    if (book.ownerEmail === borrower.email) {
      return res.status(400).json({
        message: "You can't borrow your own book.",
      });
    }

    // আগে request করেছে কিনা
    const alreadyRequested = await borrowRequestsCollection.findOne({
      bookId: id,
      borrowerEmail: borrower.email,
      status: "pending",
    });

    if (alreadyRequested) {
      return res.status(400).json({
        message: "You already requested this book.",
      });
    }

    // Request Save
    const request = {
      bookId: id,
      bookTitle: book.title,
      ownerEmail: book.ownerEmail,

      borrowerName: borrower.name,
      borrowerEmail: borrower.email,

      status: "pending",
      requestDate: new Date(),
    };

    const result = await borrowRequestsCollection.insertOne(request);

    res.status(201).json({
      success: true,
      insertedId: result.insertedId,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});



app.post("/books",verifyToken, async (req, res) => {
  try {
    // ১. Better Auth থেকে লগইন করা ইউজারের আইডি নিন
    const userId = req.user.id; // ← এটাই হলো "6a63cc86f10de289732d3a83"
    
    // ২. ইউজার ফর্ম থেকে যা পাঠিয়েছে সেটা নিন
    const { title, author, description, category, type, coverImage, pdfUrl, pickupLocation } = req.body;

    // ৩. ডাটাবেসে সেভ করার জন্য ডকুমেন্ট বানান (এখানে ownerId যোগ করুন)
    const newBook = {
      title,
      author,
      description: description || "",
      category,
      type,
      coverImage: coverImage || "",
      pdfUrl: type === "PDF" ? pdfUrl : "",
      pickupLocation: type === "Physical" ? pickupLocation : "",
      status: "Available",
      ownerId: userId, // ← সার্ভার এটি যোগ করছে (ইউজার দেয়নি)
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // ৪. ডাটাবেসে ইনসার্ট করুন
    const result = await booksCollection.insertOne(newBook);
    
    res.status(201).json({ success: true, message: "Book shared!" });

  } catch (error) {
    res.status(500).json({ error: "Failed to share book" });
  }
})






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


