const ParkingSlot = require('./parkingSlot');

class ParkingFloor {
    constructor(floorNumber, numberOfSlots) {
        this.floorNumber = floorNumber;
        this.slots = this.initializeSlots(numberOfSlots);
    }

    initializeSlots(numberOfSlots) {
        const slots = [];
        for (let i = 1; i <= numberOfSlots; i++) {
            let vehicleType;
            if (i === 1) vehicleType = 'TRUCK';
            else if (i <= 3) vehicleType = 'BIKE';
            else vehicleType = 'CAR';

            slots.push(new ParkingSlot(this.floorNumber, i, vehicleType));
        }
        return slots;
    }

    findAvailableSlot(vehicleType) {
        return this.slots.find(slot =>
            !slot.isOccupied && slot.vehicleType === vehicleType
        );
    }

    parkVehicle(vehicle) {
        const slot = this.findAvailableSlot(vehicle.type);
        if (slot && slot.park(vehicle)) {
            return slot;
        }
        return null;
    }

    unparkVehicle(slotNumber) {
        if (slotNumber < 1 || slotNumber > this.slots.length) {
            return null;
        }
        return this.slots[slotNumber - 1].unpark();
    }

    getFreeSlots(vehicleType) {
        return this.slots
            .filter(slot => !slot.isOccupied && slot.vehicleType === vehicleType)
            .map(slot => slot.slotNumber);
    }

    getOccupiedSlots(vehicleType) {
        return this.slots
            .filter(slot => slot.isOccupied && slot.vehicleType === vehicleType)
            .map(slot => slot.slotNumber);
    }

    getFreeCount(vehicleType) {
        return this.slots.filter(
            slot => !slot.isOccupied && slot.vehicleType === vehicleType
        ).length;
    }
}

module.exports = ParkingFloor;