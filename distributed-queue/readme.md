## Problem Statement

Design an **In-Memory Distributed Queue** similar to Kafka.

## Requirements

1. The queue should be **in-memory** and should not require access to the file system.
2. There can be **multiple topics** in the queue.
3. A producer/publisher can publish a (string) message to a topic, and consumers/subscribers can subscribe to the topic to receive messages.
4. There can be **multiple producers** and **multiple consumers**.
5. A producer can publish to **multiple topics**.
6. A consumer can listen to **multiple topics**.
7. The consumer should print the following on receiving a message:
    ```
    <consumer_id> received <message>
    ```
8. The queue system should be **multi-threaded**, i.e., messages can be produced or consumed in parallel by different producers/consumers.

## Input/Output Format

- **Input**: No need to take input from the command-line.
- **Setup**:
  - Create 2 topics: `topic1` and `topic2`.
  - Create 2 producers: `producer1` and `producer2`.
  - Create 5 consumers: `consumer1`, `consumer2`, `consumer3`, `consumer4`, and `consumer5`.
  - Make all 5 consumers subscribe to `topic1`.
  - Make `consumer1`, `consumer3`, and `consumer4` subscribe to `topic2`.
- **Publishing**:
  - `producer1` publishes message `"Message 1"` to `topic1`.
  - `producer1` publishes message `"Message 2"` to `topic1`.
  - `producer2` publishes message `"Message 3"` to `topic1`.
  - `producer1` publishes message `"Message 4"` to `topic2`.
  - `producer2` publishes message `"Message 5"` to `topic2`.

## Expectations

- Ensure the code is **working** and **demonstrable**.
- The code should be **functionally correct**.
- Code should be **modular** and **readable**.
- Follow the **separation of concerns** principle.
- Avoid writing everything in a single file (if not coding in C/C++).
- The code should be designed to **easily accommodate new requirements** with minimal changes.
- Include a **main method** to make the code easily testable.
- [Optional] Write **unit tests**, if possible.
- No need to create a GUI.

## Optional Requirements

- Allow **consumer groups**:
  - A consumer group can have multiple consumers.
  - Consumers can specify their consumer group while subscribing to a topic.
  - A message can be consumed by only **one consumer per consumer group**.