const express = require('express');
// const bodyParser = require('body-parser'); 
const client = require('./client');
const cors = require('cors');

const app = express();

app.use(cors());
// app.use(bodyParser.json());
app.use(express.json());

app.get('/api/entry', (req, res) => {
    try {
        client.readAllEntry({}, (err, data) => {
            if(err) return res.status(500).send({
                message: 'Error retrieving entries'
            });
            return res.status(200).send({
                message: 'Entries retrieved successfully',
                data
            });
        });
    } catch (error) {
        return res.status(500).send({
            message: 'Internal Server Error'
        });
    }
});

app.post('/api/entry', (req, res) => {
    try {
        // Remove the _id property from the request body
        const { _id, ...entryData } = req.body;

        // Create the entry with the remaining data
        client.createEntry(entryData, (err, data) => {
            if(err) return res.status(500).send({
                message: 'Error making entry'
            });
            return res.status(200).send({
                message: 'Entry made successfully',
                data
            });
        })
    } catch (error) {
        return res.status(500).send({
            message: 'Internal Server Error'
        });
    }
});


app.patch('/api/entry', (req, res) => {
    try {
        client.updateEntry({
            _id: req.body.id,
            name: req.body.name,
            score: req.body.score
        }, (err, data) => {
            if(err) return res.status(500).send({
                message: 'Error updating entry'
            });
            return res.status(200).send({
                message: 'Entry updated successfully',
                data
            });
        });
    } catch (error) {
        return res.status(500).send({
            message: 'Internal Server Error'
        });
    }
});

app.delete('/api/entry', (req, res) => {
    try {
        client.deleteEntry({
            id: req.body.id
        }, (err, data) => {
            if(err) return res.status(500).send({
                message: 'Error deleting entry'
            });
            return res.status(200).send({
                message: 'Entry deleted successfully',
                data
            });
        });
    } catch (error) {
        return res.status(500).send({
            message: 'Internal Server Error'
        });
    }
});

app.listen(3001, () => {
    console.log('Server running on port 3001');
});