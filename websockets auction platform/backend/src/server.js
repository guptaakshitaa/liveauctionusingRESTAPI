//importing a library
const express = require("express");
const cors = require("cors");
const auctionItemsFile = require("./auctionItems")

//initialising library to 'app' variable 
const app = express();

//specifies port no
const PORT = 3000;

//parse/be ready to recieve json queries 
app.use(express.json());
app.use(cors());

let bidHistory = [];

// '/' means home route
app.get("/", (req, res) => 
    {
    res.status(200).send("MLH GHW API Week!")
});


app.get("/api/items", (req, res) => 
    {
    res.status(200).json(auctionItemsFile);
});

//TO FIND A PARTICULAR NUMBER OF ITEMS 
//app.get("name of the file :id ")
app.get("/api/items/:id", (req, res) => {
    const reqId = parseInt(req.params.id); //re.params.id is a query parameter , parseInt converts it into an int from string
    
    const item = auctionItemsFile.auctionItems.find((item) => item.id === reqId);
    if (!item){
        return res.status(404).json({
            error: "Item not found!", //http status code documentation refer 
        });
    }
    //if item is found 
    res.status(200).json(item);
});

//to bid items 
app.post("/api/bids", (req,res) => {
    const { itemId, bidAmount, bidder } = req.body;

//if any of three missing 
    if (!itemId || !bidAmount || !bidder){
        return res.status(400).json({error: "Missing required fields"});
    }

//correct req -> find item 
//=> this means 'such that'
    const foundItem = auctionItemsFile.auctionItems.find(
        (item) => item.id === parseInt(itemId)
    );

//if item dne 
    if (!foundItem) {
        return res.status(404).json({error: "Item not found!"});
    }

    console.log("Current Bid:", foundItem.currentBid); // DEBUG
    console.log("Your Bid:", bidAmount);               // DEBUG

    if (parseInt(bidAmount) <= foundItem.currentBid) {
        return res.status(400).json({error: "Bid amount must be higher than current bid "})
    }

//updated bid after new bidding
    foundItem.currentBid = parseInt(bidAmount);

    const updatedBid = {
        id: bidHistory.length + 1,
        itemId : parseInt(itemId),
        bidder,
        amount: parseInt(bidAmount),
        timeStamp: new Date().toISOString(),
    };

    foundItem.bids.push(updatedBid);
    bidHistory.push(updatedBid);

    res.status(201).json(updatedBid)
});

app.listen(PORT, () => 
    {
    console.log(`Server UP & RUNNING on Port ${PORT}`);
});

