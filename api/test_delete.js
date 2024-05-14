const client = require("./client");

client.deleteEntry(
  {
    _id: "60f3f5d4e0b0e3b8d5c7d3b6",
  },
  (error, data) => {
    if (!error) {
      console.log("Successfully deleted entry");
      console.log(data);
    } else {
      console.error(error);
    }
  }
);
