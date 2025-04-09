const readline = require('readline');
const ParkingLotService = require('./parkingLotService');

class CLI {
    constructor() {
        this.service = new ParkingLotService();
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    start() {
        this.rl.on('line', (input) => {
            if (input.toLowerCase() === 'exit') {
                this.rl.close();
                return;
            }

            const [command, ...args] = input.split(' ');
            let result;

            try {
                switch (command) {
                    case 'create_parking_lot':
                        result = this.service.createParkingLot(args[0], parseInt(args[1]), parseInt(args[2]));
                        break;
                    case 'park_vehicle':
                        result = this.service.parkVehicle(args[0], args[1], args[2]);
                        break;
                    case 'unpark_vehicle':
                        result = this.service.unparkVehicle(args[0]);
                        break;
                    case 'display':
                        const displayType = args[0];
                        const vehicleType = args[1];
                        if (displayType === 'free_count') {
                            result = this.service.displayFreeCount(vehicleType);
                        } else if (displayType === 'free_slots') {
                            result = this.service.displayFreeSlots(vehicleType);
                        } else if (displayType === 'occupied_slots') {
                            result = this.service.displayOccupiedSlots(vehicleType);
                        } else {
                            result = 'Invalid display type';
                        }
                        break;
                    default:
                        result = 'Invalid command';
                }
                console.log(result);
            } catch (error) {
                console.log('Error:', error.message);
            }
        });

        this.rl.on('close', () => {
            process.exit(0);
        });
    }
}

module.exports = CLI;