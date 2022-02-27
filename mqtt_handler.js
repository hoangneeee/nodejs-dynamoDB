const mqtt = require('mqtt');
const {v4: uuidv4} = require('uuid');
const {addOrUpdateCharacter} = require('./dynamoDB')


class MqttHandler {
    constructor() {
        this.mqttClient = null;
        this.host = 'mqtt://localhost:1883';
    }

    connect() {
        this.mqttClient = mqtt.connect(this.host);

        // Mqtt error calback
        this.mqttClient.on('error', (err) => {
            console.log(err);
            this.mqttClient.end();
        });

        // Connection callback
        this.mqttClient.on('connect', () => {
            console.log(`Mqtt client connected in ${this.host}`);
        });

        // mqtt subscriptions
        this.mqttClient.subscribe('topictest', {qos: 0});

        // When a message arrives, console.log it
        this.mqttClient.on('message', async (topic, message) => {
            const character = JSON.parse(message);
            console.log(character);
            try {
                await addOrUpdateCharacter(Object.assign(character,{id: uuidv4()}));
            } catch (error) {
                console.error(error);
            }
        });

        this.mqttClient.on('close', () => {
            console.log('Mqtt client disconnected');
        });
    }

    sendMessage(message) {
        this.mqttClient.publish('topictest', message);
    }
}

module.exports = MqttHandler;