logistics2= require('Room.logistics2')
logistics1 = require('Room.logistics1')
closestTarget = require('creep.path').closestTarget
logistics5 = require('Room.logistics5')
module.exports = {
    run: function(creep) {
        if (!creep.memory.resupplying) {
            creep.memory.resupplying = true
            creep.memory.targetSwitch = true
        }
        creep.say('resupplying')
        creep.room.memory.updateHeavy_toResupply = true
        if (logistics5.heavyToResupply(creep.room)) {
            const target = closestTarget(creep, logistics5.heavyToResupply(creep.room))
            console.log(target)
            if (target) {
                if (target.store[RESOURCE_ENERGY] < 400) {
                    creep.memory.targetSwitch = true
                } else if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target)
                } else if (creep.withdraw(target, RESOURCE_ENERGY) == OK) {
                    if (target.store[RESOURCE_ENERGY] < 400) {
                        creep.room.memory.updateHeavy_ToResupply = true
                    }
                    creep.memory.targetSwitch = true
                    if (creep.store[RESOURCE_ENERGY] == creep.store.getCapacity()) {
                        creep.memory.resupplying = false
                    }
                }
            }
        }
    }
}