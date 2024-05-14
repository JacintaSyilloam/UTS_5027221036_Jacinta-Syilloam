client = require("./client");

client.updateEntry(
  {
    _id: "60f3f5d4e0b0e3b8d5c7d3b6",
    name: "test update",
    score: 200,
  },
  (error, data) => {
    if (!error) {
      console.log("Successfully updated entry");
      console.log(data);
    } else {
      console.error(error);
    }
  }
);
