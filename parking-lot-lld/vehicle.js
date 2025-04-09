class Vehicle {
    constructor(type, registrationNumber, color) {
        this.type = type;
        this.registrationNumber = registrationNumber;
        this.color = color;
    }
}

class Car extends Vehicle {
    constructor(registrationNumber, color) {
        super('CAR', registrationNumber, color);
    }
}

class Bike extends Vehicle {
    constructor(registrationNumber, color) {
        super('BIKE', registrationNumber, color);
    }
}

class Truck extends Vehicle {
    constructor(registrationNumber, color) {
        super('TRUCK', registrationNumber, color);
    }
}

module.exports = { Vehicle, Car, Bike, Truck };