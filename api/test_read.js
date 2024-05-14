const client = require("./client");

client.readAllEntry({}, (error, data) => {
  if (!error) {
    console.log("Successfully read all entries");
    console.log(data);
  } else {
    console.error(error);
  }
});