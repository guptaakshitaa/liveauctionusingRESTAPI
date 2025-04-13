// auctionItems.js
module.exports = {
    auctionItems: [
      {
        id: 1,
        name: "Vintage Clock",
        currentBid: 100,  // Make sure it's less than your bidAmount
        bids: []
      },
      {
        id: 2,
        name: "Antique Vase",
        currentBid: 200,
        bids: []
      }
    ]
  };
  


/*
const auctionItems = [
    {
        id: 1,
        name: "Vintage Watch",
        description: "Classic Art piece from 1880s",
        startingBid: 100,
        currentBid: 100,
        bids: [],
    },
    {
        id: 2,
        name: "Art Painting",
        description: "Original artwork in scribble.io",
        startingBid: 150,
        currentBid: 150,
        bids: [],
    },
];

//format: file.exports = {file1, file2, .... file n, temp: file4 (here i assigned a name to the file, it will be spcieifed using this name only)}
module.exports = { auctionItems} ;
*/