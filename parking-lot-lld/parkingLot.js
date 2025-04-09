const ParkingFloor = require('./parkingFloor');

class ParkingLot {
    constructor(id, numberOfFloors, slotsPerFloor) {
        this.id = id;
        this.floors = this.initializeFloors(numberOfFloors, slotsPerFloor);
    }

    initializeFloors(numberOfFloors, slotsPerFloor) {
        const floors = [];
        for (let i = 1; i <= numberOfFloors; i++) {
            floors.push(new ParkingFloor(i, slotsPerFloor));
        }
        return floors;
    }

    findAvailableSlot(vehicleType) {
        for (const floor of this.floors) {
            const slot = floor.findAvailableSlot(vehicleType);
            if (slot) {
                return { floor, slot };
            }
        }
        return null;
    }

    parkVehicle(vehicle) {
        const available = this.findAvailableSlot(vehicle.type);
        if (!available) {
            return null;
        }
        available.slot.park(vehicle);
        return available;
    }

    unparkVehicle(ticketId) {
        const { floorNumber, slotNumber } = this.parseTicketId(ticketId);
        if (!floorNumber || !slotNumber) {
            return null;
        }

        const floor = this.floors[floorNumber - 1];
        if (!floor) {
            return null;
        }

        return floor.unparkVehicle(slotNumber);
    }

    parseTicketId(ticketId) {
        const parts = ticketId.split('_');
        if (parts.length !== 3 || parts[0] !== this.id) {
            return { floorNumber: null, slotNumber: null };
        }
        return {
            floorNumber: parseInt(parts[1]),
            slotNumber: parseInt(parts[2])
        };
    }

    getFreeSlots(vehicleType) {
        return this.floors.map(floor => ({
            floorNumber: floor.floorNumber,
            slots: floor.getFreeSlots(vehicleType)
        }));
    }

    getOccupiedSlots(vehicleType) {
        return this.floors.map(floor => ({
            floorNumber: floor.floorNumber,
            slots: floor.getOccupiedSlots(vehicleType)
        }));
    }

    getFreeCounts(vehicleType) {
        return this.floors.map(floor => ({
            floorNumber: floor.floorNumber,
            count: floor.getFreeCount(vehicleType)
        }));
    }
}

module.exports = ParkingLot;