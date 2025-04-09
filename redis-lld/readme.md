# Trello-like Project Management System

## Problem Statement

Design an In-Memory Key-Value Store like Redis.

---

## Requirements

1. **In-Memory Storage**: The key-value store will be in-memory and does not require access to the file system.
2. **Key**: The key will always be a string.
3. **Value**: The value will be an object/map with attributes and corresponding values.
    - Example: `"sde_bootcamp": { "title": "SDE-Bootcamp", "price": 30000.00, "enrolled": false, "estimated_time": 30 }`
    - Each attribute key will be a string, and the attribute values can be of type string, integer, double, or boolean.
4. **Thread-Safety**: The key-value store should be thread-safe.
5. **Exposed Functions**:
    - `get(String key)`: Returns the value (object with attributes and their values). Returns `null` if the key is not present.
    - `search(String attributeKey, String attributeValue)`: Returns a list of keys that have the given attribute key-value pair.
    - `put(String key, List<Pair<String, String>> listOfAttributePairs)`: Adds the key and attributes to the store. Replaces the value if the key already exists.
    - `delete(String key)`: Deletes the key-value pair from the store.
    - `keys()`: Returns a list of all keys.
6. **Value Object**:
    - Overrides the `toString` method to print attributes as a comma-separated list of key-value pairs.
    - Example: `attribute1: attribute_value_1, attribute2: attribute_value_2, attribute3: attribute_value_3`
7. **Data Type Enforcement**:
    - The data type of an attribute is fixed after its first occurrence.
    - Example: If `age` is first encountered as an integer, any non-integer value for `age` should result in an exception.
8. **Output Handling**:
    - No output should be printed inside the methods.
    - All scanning, printing, and exception handling should occur in the Driver/Main class.

---

## Input/Output Format

### Input Format

Multiple lines, each containing a command. Possible commands:
Output Format
Print output based on the specific commands as mentioned below.

get
Comma and space-separated attributes. Example:

attribute1: attribute_value_1, attribute2: attribute_value_2, attribute3: attribute_value_3
Print "No entry found for <key>" if get returns null.

put
Do not print anything. Print "Data Type Error" if attribute has data type other than previous set.

delete
Do not print anything.

search
Comma-separated keys. Example:

key1,key2,key3,key4
Print in sorted order

keys
Comma-separated keys. Example:

key1,key2,key3,key4
Print in sorted order

Example
Sample Input
put sde_bootcamp title SDE-Bootcamp price 30000.00 enrolled false estimated_time 30
get sde_bootcamp
keys
put sde_kickstart title SDE-Kickstart price 4000 enrolled true estimated_time 8
get sde_kickstart
keys
put sde_kickstart title SDE-Kickstart price 4000.00 enrolled true estimated_time 8
get sde_kickstart
keys
delete sde_bootcamp
get sde_bootcamp
keys
put sde_bootcamp title SDE-Bootcamp price 30000.00 enrolled true estimated_time 30
search price 30000.00
search enrolled true
Expected Output
title: SDE-Bootcamp, price: 30000.00, enrolled: false, estimated_time: 30
sde_bootcamp
Data Type Error
No entry found for sde_kickstart
sde_bootcamp
title: SDE-Kickstart, price: 4000.00, enrolled: true, estimated_time: 8
sde_bootcamp,sde_kickstart
No entry found for sde_bootcamp
sde_kickstart
sde_bootcamp
sde_bootcamp,sde_kickstart
Expectations
Make sure that you have a working and demonstrable code
Make sure that the code is functionally correct
Code should be modular and readable
Separation of concern should be addressed
Please do not write everything in a single file (if not coding in C/C++)
Code should easily accommodate new requirements and minimal changes
There should be a main method from where the code could be easily testable
[Optional] Write unit tests, if possible
No need to create a GUI