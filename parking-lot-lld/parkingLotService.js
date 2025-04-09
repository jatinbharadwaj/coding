const { Car, Bike, Truck } = require('./vehicle');
const ParkingLot = require('./parkingLot');
const TicketService = require('./ticketService');

class ParkingLotService {
    constructor() {
        this.parkingLot = null;
    }

    createParkingLot(id, numberOfFloors, slotsPerFloor) {
        this.parkingLot = new ParkingLot(id, numberOfFloors, slotsPerFloor);
        return `Created parking lot with ${numberOfFloors} floors and ${slotsPerFloor} slots per floor`;
    }

    parkVehicle(vehicleType, regNo, color) {
        if (!this.parkingLot) {
            return 'Parking lot not created';
        }

        let vehicle;
        switch (vehicleType) {
            case 'CAR':
                vehicle = new Car(regNo, color);
                break;
            case 'BIKE':
                vehicle = new Bike(regNo, color);
                break;
            case 'TRUCK':
                vehicle = new Truck(regNo, color);
                break;
            default:
                return 'Invalid vehicle type';
        }

        const result = this.parkingLot.parkVehicle(vehicle);
        if (!result) {
            return 'Parking Lot Full';
        }

        const ticketId = TicketService.generateTicketId(
            this.parkingLot.id,
            result.floor.floorNumber,
            result.slot.slotNumber
        );
        return `Parked vehicle. Ticket ID: ${ticketId}`;
    }

    unparkVehicle(ticketId) {
        if (!this.parkingLot) {
            return 'Parking lot not created';
        }

        const vehicle = this.parkingLot.unparkVehicle(ticketId);
        if (!vehicle) {
            return 'Invalid Ticket';
        }

        return `Unparked vehicle with Registration Number: ${vehicle.registrationNumber} and Color: ${vehicle.color}`;
    }

    displayFreeCount(vehicleType) {
        if (!this.parkingLot) {
            return 'Parking lot not created';
        }

        const counts = this.parkingLot.getFreeCounts(vehicleType);
        return counts.map(item =>
            `No. of free slots for ${vehicleType} on Floor ${item.floorNumber}: ${item.count}`
        ).join('\n');
    }

    displayFreeSlots(vehicleType) {
        if (!this.parkingLot) {
            return 'Parking lot not created';
        }

        const slots = this.parkingLot.getFreeSlots(vehicleType);
        return slots.map(floor =>
            `Free slots for ${vehicleType} on Floor ${floor.floorNumber}: ${floor.slots.join(',')}`
        ).join('\n');
    }

    displayOccupiedSlots(vehicleType) {
        if (!this.parkingLot) {
            return 'Parking lot not created';
        }

        const slots = this.parkingLot.getOccupiedSlots(vehicleType);
        return slots.map(floor =>
            `Occupied slots for ${vehicleType} on Floor ${floor.floorNumber}: ${floor.slots.join(',')}`
        ).join('\n');
    }
}

module.exports = ParkingLotService;