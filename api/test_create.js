const client = require("./client");

client.createEntry(
  {
    _id: "idtest2",
    name: "test 2",
    score: 100,
  },
  (error, data) => {
    if (!error) {
      console.log("Successfully created entry");
      console.log(data);
    } else {
      console.error(error);
    }
  }
);