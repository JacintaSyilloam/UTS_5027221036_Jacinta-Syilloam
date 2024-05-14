<template>
  <div>
    <h1>WHAT ARE U IN IKEA</h1>
    <p>Answer the following questions to find out what you are in IKEA</p>
    enter name
    <br>
    <input type="text" v-model="name" />

    <div>
      <p>1) u saw ikea, are you gonna break the norms and not follow path they made?</p>
      <input type="radio" id="path-yes" value="yes" v-model="pathChoice">
      <label for="path-yes">Yes</label>
      <input type="radio" id="path-no" value="no" v-model="pathChoice">
      <label for="path-no">No</label>

      <p>2) u blue?</p>
      <input type="radio" id="welcome-yes" value="yes" v-model="welcomeChoice">
      <label for="welcome-yes">Yes</label>
      <input type="radio" id="welcome-no" value="no" v-model="welcomeChoice">
      <label for="welcome-no">No</label>

      <p>3) u saw a bed, are you sleeping on it?</p>
      <input type="radio" id="bed-yes" value="yes" v-model="bedChoice">
      <label for="bed-yes">Yes</label>
      <input type="radio" id="bed-no" value="no" v-model="bedChoice">
      <label for="bed-no">No</label>

      <p>4) u spending most of ur time in the plushie section?</p>
      <input type="radio" id="plushie-yes" value="yes" v-model="plushieChoice">
      <label for="plushie-yes">Yes</label>
      <input type="radio" id="plushie-no" value="no" v-model="plushieChoice">
      <label for="plushie-no">No</label>

      <p>5) u did not steal some pencil on the way?</p>
      <input type="radio" id="pencil-yes" value="yes" v-model="pencilChoice">
      <label for="pencil-yes">Yes</label>
      <input type="radio" id="pencil-no" value="no" v-model="pencilChoice">
      <label for="pencil-no">No</label>
    </div>

    <br>
    <button @click="submit">Submit</button>

  </div>
  
  <div>
    Score:
    <br>
    - 0 - 30 = You are a normal person
    <br>
    - 40 - 50 = You are a blahaj
  </div>

  <div>
    <h2>Everyones result:</h2>
    <ul>
      <li v-for="entry in entries" :key="entry._id">
        Name: {{ entry.name }} - Score: {{ entry.score }}  - <button>Delete</button> - <button>Edit</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      pathChoice: null,
      welcomeChoice: null,
      bedChoice: null,
      plushieChoice: null,
      pencilChoice: null,
      entries: []
    };
  },
  mounted() {
    console.log("Hello from App.vue");

    // Retrieve entries from the database upon component mount
    this.fetchEntries();
  },
  methods: {
    submit() {
      // Calculate score based on user's answers
      let score = 0;
      if (this.pathChoice === 'yes') score += 10;
      if (this.welcomeChoice === 'yes') score += 10;
      if (this.bedChoice === 'yes') score += 10;
      if (this.plushieChoice === 'yes') score += 10;
      if (this.pencilChoice === 'yes') score += 10;

      // Post new entry to the database
      fetch("http://localhost:3001/api/entry", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: this.name,
          score: score
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log('New entry added:', data);
        // Refresh entries after adding a new entry
        this.fetchEntries();
      })
      .catch(error => {
        console.error('Error adding new entry:', error);
      });
    },
    fetchEntries() {
      // Retrieve entries from the database
      fetch("http://localhost:3001/api/entry")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.message === "Entries retrieved successfully") {
          this.entries = data.data.entries;
        }
      })
      .catch(error => {
        console.error('Error retrieving entries:', error);
      });
    }
  }
};
</script>
