class ParkingSlot {
    constructor(floorNumber, slotNumber, vehicleType) {
        this.floorNumber = floorNumber;
        this.slotNumber = slotNumber;
        this.vehicleType = vehicleType;
        this.isOccupied = false;
        this.vehicle = null;
    }

    park(vehicle) {
        if (this.isOccupied || vehicle.type !== this.vehicleType) {
            return false;
        }
        this.vehicle = vehicle;
        this.isOccupied = true;
        return true;
    }

    unpark() {
        if (!this.isOccupied) {
            return null;
        }
        const vehicle = this.vehicle;
        this.vehicle = null;
        this.isOccupied = false;
        return vehicle;
    }
}

module.exports = ParkingSlot;