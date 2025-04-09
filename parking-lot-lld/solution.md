# Parking Lot System Design

I'll design a comprehensive parking lot system that meets all the requirements while being modular, extensible, and thread-safe. The system will be implemented in Node.js with proper separation of concerns.

## System Architecture

- **Vehicle**: Base class for different vehicle types.
- **ParkingSlot**: Represents individual parking slots.
- **ParkingFloor**: Manages slots on a single floor.
- **ParkingLot**: Main class managing multiple floors.
- **Ticket**: Handles ticket generation and validation.
- **ParkingLotService**: Main service layer handling commands.
- **CLI**: Command line interface for user interaction.

## Design Patterns and Principles

- **Factory Pattern**: Used in vehicle creation (`parkVehicle` method).
- **Strategy Pattern**: Different slot finding strategies can be implemented.
- **Single Responsibility Principle**: Each class has a single responsibility.
- **Open/Closed Principle**: Easy to extend with new vehicle types or slot types.
- **Dependency Inversion**: High-level modules don't depend on low-level implementations.

## Thread Safety Considerations

To make the system thread-safe:

- **Mutex Locks**: Use Node's `worker_threads` or external libraries like `async-mutex`.
- **Atomic Operations**: Ensure critical sections are atomic.
- **Immutable Data**: Use immutable data structures where possible.

### Example with Mutex

```javascript
const { Mutex } = require('async-mutex');
const mutex = new Mutex();

// In ParkingLotService methods:
async function parkVehicle(vehicleType, regNo, color) {
    const release = await mutex.acquire();
    try {
        // ... existing code ...
    } finally {
        release();
    }
}
```

## Extensibility Points

- **New Vehicle Types**:
  - Add a new vehicle class.
  - Extend the factory in `parkVehicle`.

- **Different Slot Finding Strategy**:
  - Create a strategy interface.
  - Implement different strategies.
  - Inject the strategy into `ParkingLot`.

- **Multiple Parking Lots**:
  - Change `ParkingLotService` to manage multiple lots.
  - Add parking lot ID to commands.

- **Additional Commands**:
  - Add new methods to `ParkingLotService`.
  - Extend CLI command parsing.

## Sample Execution

```bash
$ node app.js
create_parking_lot PR1234 2 6
Created parking lot with 2 floors and 6 slots per floor
park_vehicle CAR KA-01-DB-1234 black
Parked vehicle. Ticket ID: PR1234_1_4
display free_count CAR
No. of free slots for CAR on Floor 1: 2
No. of free slots for CAR on Floor 2: 3
exit
```

This implementation provides a robust, modular, and extensible parking lot system that meets all requirements while following software design best practices.
