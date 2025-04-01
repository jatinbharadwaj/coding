const broker = require('./broker');

class Producer {
    constructor(id) {
        this.id = id;
    }

    publish(topicName, message) {
        console.log(`Producer ${this.id} publishing to ${topicName}: ${message}`);
        broker.publish(topicName, message);
    }
}

module.exports = Producer;