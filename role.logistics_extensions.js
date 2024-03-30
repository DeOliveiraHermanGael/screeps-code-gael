closestTarget = require('creep.path').closestTarget
logistics3 = require('Room.logistics3')
logistics4 = require('Room.logistics4')
module.exports = {
    run: function(creep) {
        if (creep.store.getFreeCapacity() === 0 && creep.memory.primary) {
            creep.memory.primary = false
            creep.memory.targetSwitch = true
            creep.say('full')
        
        } else if (creep.store.getUsedCapacity() === 0 && !creep.memory.primary) {
            creep.memory.primary = true
            creep.memory.targetSwitch = true
            creep.say('empty')
        } 
        if (!creep.memory.primary) {
            creep.say('Transferring')
            if (logistics4.secondary_extensionsToSupply(creep.room)) {
                let target = closestTarget(creep, logistics4.secondary_extensionsToSupply(creep.room))
                if (target.store.getFreeCapacity(RESOURCE_ENERGY) === 0) {
                    creep.memory.targetSwitch = true
                    console.log(target)
                    // creep.room.memory.updateSecondary_extensionsToSupply = true
                    creep.say('updating')
                } else if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target)
                } else if(creep.transfer(target, RESOURCE_ENERGY) == OK) {
                    creep.memory.targetSwitch = true
                    if (target.store[RESOURCE_ENERGY] == 50) {
                        creep.room.memory.updateSecondary_extensionsToSupply = true
                    }
                }
            } else {
                require('role.logistics_heavy').run(creep)
            }
        } else {
            require('task.logistics_resupply').run(creep)
        }
    }
};