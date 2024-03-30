logistics3 = require('Room.logistics3')
module.exports = {
    run: function(creep) {
        if (!creep.memory.resupplying) {
            creep.memory.resupplying = true
            creep.memory.targetSwitch = true
        }
        creep.say('Collecting')
        creep.room.memory.updatePrimary_heavyToResupply = true
        console.log(logistics3.primary_heavyToResupply(creep.room))
        if (logistics3.primary_heavyToResupply(creep.room)) {
            let target = closestTarget(creep, logistics3.primary_heavyToResupply(creep.room))
            if (target) {
                creep.memory.targetStorePreviousValue = target.store[RESOURCE_ENERGY]
                if (target.store.getUsedCapacity(RESOURCE_ENERGY) < creep.store.getCapacity()) {
                    creep.memory.targetSwitch = true
                    creep.say('updating')
                } else if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target)
                } else if (creep.withdraw(target, RESOURCE_ENERGY) == OK) {
                    creep.memory.targetSwitch = true
                    if (target.store[RESOURCE_ENERGY] < 500) {
                        creep.room.memory.updatePrimary_heavyToResupply = true   
                    }
                    if (creep.store[RESOURCE_ENERGY] == creep.store.getCapacity()) {
                        creep.memory.resupplying = false
                    }
                    if (creep.memory.targetStorePreviousValue == target.store.getCapacity(RESOURCE_ENERGY)) {
                        creep.room.memory.updatePrimaryToSupply = true // make it so that it only evaluates that condition if previously at
                    }
                }
            }   
        }
    }
};