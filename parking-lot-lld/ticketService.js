class TicketService {
    static generateTicketId(parkingLotId, floorNumber, slotNumber) {
        return `${parkingLotId}_${floorNumber}_${slotNumber}`;
    }
}

module.exports = TicketService;