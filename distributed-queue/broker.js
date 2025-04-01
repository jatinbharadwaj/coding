const EventEmitter = require('events');

class Broker extends EventEmitter {
    constructor() {
        super();
        this.topics = new Map(); // topicName -> Topic
        this.consumerGroups = new Map(); // groupId -> ConsumerGroup
    }

    createTopic(topicName) {
        if (!this.topics.has(topicName)) {
            this.topics.set(topicName, new Topic(topicName));
        }
        return this.topics.get(topicName);
    }

    getTopic(topicName) {
        return this.topics.get(topicName);
    }

    createConsumerGroup(groupId) {
        if (!this.consumerGroups.has(groupId)) {
            this.consumerGroups.set(groupId, new ConsumerGroup(groupId));
        }
        return this.consumerGroups.get(groupId);
    }

    publish(topicName, message) {
        const topic = this.topics.get(topicName);
        if (topic) {
            topic.addMessage(message);
            this.emit('messagePublished', topicName, message);
        }
    }

    subscribe(consumer, topicName, groupId = null) {
        const topic = this.topics.get(topicName);
        if (topic) {
            if (groupId) {
                let group = this.consumerGroups.get(groupId);
                if (!group) {
                    group = this.createConsumerGroup(groupId);
                }
                group.addConsumer(consumer, topicName);
            } else {
                topic.addConsumer(consumer);
            }
        }
    }
}

class Topic {
    constructor(name) {
        this.name = name;
        this.messages = [];
        this.consumers = new Set();
        this.consumerOffsets = new WeakMap(); // WeakMap to store consumer offsets
    }

    addMessage(message) {
        this.messages.push(message);
        this.notifyConsumers();
    }

    addConsumer(consumer) {
        this.consumers.add(consumer);
        this.consumerOffsets.set(consumer, this.messages.length);
    }

    notifyConsumers() {
        for (const consumer of this.consumers) {
            this.deliverMessages(consumer);
        }
    }

    deliverMessages(consumer) {
        let offset = this.consumerOffsets.get(consumer) || 0;
        while (offset < this.messages.length) {
            const message = this.messages[offset];
            consumer.consume(this.name, message);
            offset++;
        }
        this.consumerOffsets.set(consumer, offset);
    }
}

class ConsumerGroup {
    constructor(id) {
        this.id = id;
        this.topicConsumers = new Map(); // topicName -> Set of consumers
    }

    addConsumer(consumer, topicName) {
        if (!this.topicConsumers.has(topicName)) {
            this.topicConsumers.set(topicName, new Set());
        }
        this.topicConsumers.get(topicName).add(consumer);
    }

    getConsumers(topicName) {
        return this.topicConsumers.get(topicName) || new Set();
    }
}

module.exports = new Broker(); // Singleton broker instance