module.exports = {
    run: function(creep) {
        if (creep.store.getFreeCapacity() === 0) {
            creep.memory.upgrading = true
            creep.say('upgrading')
        } else if (creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.upgrading = false
        }
        if (creep.memory.upgrading) {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller)
            }
        } else if (creep.harvest() == ERR_NOT_IN_RANGE) {
            creep.moveTo()
        }
    }
};