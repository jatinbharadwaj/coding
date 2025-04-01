const express = require('express');
const Producer = require('./producer');
const Consumer = require('./consumer');
const broker = require('./broker');

const app = express();
app.use(express.json());

// Initialize topics
broker.createTopic('topic1');
broker.createTopic('topic2');

// Initialize producers
const producer1 = new Producer('producer1');
const producer2 = new Producer('producer2');

// Initialize consumers
const consumer1 = new Consumer('consumer1');
const consumer2 = new Consumer('consumer2');
const consumer3 = new Consumer('consumer3');
const consumer4 = new Consumer('consumer4');
const consumer5 = new Consumer('consumer5');

// Set up subscriptions
[consumer1, consumer2, consumer3, consumer4, consumer5].forEach(consumer => {
    consumer.subscribe('topic1');
});

[consumer1, consumer3, consumer4].forEach(consumer => {
    consumer.subscribe('topic2');
});

// Publish messages
producer1.publish('topic1', 'Message 1');
producer1.publish('topic1', 'Message 2');
producer2.publish('topic1', 'Message 3');
producer1.publish('topic2', 'Message 4');
producer2.publish('topic2', 'Message 5');

// API Endpoints
app.post('/topics', (req, res) => {
    const { name } = req.body;
    broker.createTopic(name);
    res.status(201).send(`Topic ${name} created`);
});

app.post('/producers', (req, res) => {
    const { id } = req.body;
    const producer = new Producer(id);
    res.status(201).json({ message: `Producer ${id} created` });
});

app.post('/consumers', (req, res) => {
    const { id } = req.body;
    const consumer = new Consumer(id);
    res.status(201).json({ message: `Consumer ${id} created` });
});

app.post('/subscribe', (req, res) => {
    const { consumerId, topicName, groupId } = req.body;
    // In a real implementation, we'd look up the consumer
    const consumer = new Consumer(consumerId);
    consumer.subscribe(topicName, groupId);
    res.status(200).json({ message: `Consumer ${consumerId} subscribed to ${topicName}` });
});

app.post('/publish', (req, res) => {
    const { producerId, topicName, message } = req.body;
    // In a real implementation, we'd look up the producer
    const producer = new Producer(producerId);
    producer.publish(topicName, message);
    res.status(200).json({ message: `Message published to ${topicName}` });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Queue system running on port ${PORT}`);
});