In-Memory Key-Value Store Implementation
I'll design a Redis-like in-memory key-value store that meets all the specified requirements, including thread safety and data type enforcement.

System Architecture
KeyValueStore: Main store class handling all operations

ValueObject: Represents the value with type-checked attributes

DataTypeValidator: Utility for validating and enforcing data types

CLI: Command line interface for user interaction

Design Patterns and Principles
Thread Safety: Implemented using mutex locks for all operations

Single Responsibility Principle: Each class has a single responsibility

Immutable Data: Value objects are immutable once created

Type Safety: Strict data type enforcement for attributes

Encapsulation: Internal state is protected from direct access

How It Works
Data Storage:

Keys are stored as strings

Values are stored as ValueObjects containing typed attributes

Type Enforcement:

First occurrence of an attribute determines its type

Subsequent operations must match the established type

Thread Safety:

All operations are protected by mutex locks

Ensures atomic operations in concurrent environments

Command Handling:

CLI interface processes user commands

Delegates to KeyValueStore for actual operations

Sample Execution
Copy
$ node app.js
put sde_bootcamp title SDE-Bootcamp price 30000.00 enrolled false estimated_time 30
get sde_bootcamp
title: SDE-Bootcamp, price: 30000.00, enrolled: false, estimated_time: 30
keys
sde_bootcamp
put sde_kickstart title SDE-Kickstart price 4000 enrolled true estimated_time 8
Data Type Error
exit
Extensibility Points
Persistence: Add file system or database persistence

Expiration: Implement TTL for keys

Transactions: Add transaction support

Advanced Data Types: Support lists, sets, etc.

Replication: Add cluster support for distributed storage

This implementation provides a robust, thread-safe key-value store that meets all the specified requirements while following software design best practices. The modular design makes it easy to extend with additional features.