const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const {v4: uuidv4} = require('uuid');
const {getCharacters} = require('./dynamoDB')

const app = express();
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// MQTT
const mqtt = require('mqtt');
const mqttHandler = require('./mqtt_handler');

// AWS DynamoDB
const AWS = require('aws-sdk');
const client = new AWS.DynamoDB.DocumentClient();
const tableName = 'MailSources';

AWS.config.update({region: 'us-west-2'});

//HTTP logger
app.use(morgan('dev'));

const mqttClient = new mqttHandler();
mqttClient.connect();

// Routes
app.post("/create_characters", (req, res) => {
    mqttClient.sendMessage(req.body.message);
    res.status(200).json('OK');
});


app.get('/characters', async (req, res) => {
    try {
        const charecters = await getCharacters();
        res.json(charecters)
    } catch (error) {
        console.error(error);
        res.status(500).json({err: 'Something went wrong'});
    }
});


app.listen(port, () => console.log(`Listening at http://localhost:${port}`));