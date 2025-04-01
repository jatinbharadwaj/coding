const broker = require('./broker');

class Consumer {
    constructor(id) {
        this.id = id;
    }

    subscribe(topicName, groupId = null) {
        broker.subscribe(this, topicName, groupId);
    }

    consume(topicName, message) {
        console.log(`${this.id} received ${message} from ${topicName}`);
    }
}

module.exports = Consumer;