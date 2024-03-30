logistics = require('Room.logistics').logistics
closestTarget = require('creep.path').closestTarget
module.exports = {
    run: function(creep) {
        if (creep.store.getFreeCapacity() === 0 && creep.memory.harvesting == true) {
            creep.memory.harvesting = false
            creep.memory.targetSwitch = true
            creep.say('full')
        } else if (!creep.memory.harvesting && creep.store.getUsedCapacity() === 0) {
            creep.memory.harvesting = true
            creep.room.memory.updateResupply = true
            creep.memory.targetSwitch = true
            creep.say('empty')
        } 
        if (creep.memory.booleans.harvesting) {
            creep.say('harvesting')
            const source = closestTarget(creep, logistics[0].Esources.get(creep.room))
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source)
            }
        } else {
            if (logistics[2].primaryToSupply.get(creep.room).length > 0) {
                const target = closestTarget(creep, logistics2.primaryToSupply(creep.room))
                creep.say('supplying')
                if (target.store[RESOURCE_ENERGY] == target.store.getCapacity(RESOURCE_ENERGY)) {
                    creep.memory.targetSwitch = true
                    creep.room.memory.updatePrimaryToSupply = true
                } else if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target)
                } else if (creep.transfer(target, RESOURCE_ENERGY) == OK) {
                    creep.memory.targetSwitch = true
                    if (target.store.getUsedCapacity > 500) {
                        creep.room.memory.updatePrimary_heavyToResupply = true
                    }
                    if (target.store[RESOURCE_ENERGY] == target.store.getCapacity[RESOURCE_ENERGY]) {
                        creep.room.memory.updatePrimaryToSupply = true
                    }
                } 
            } else if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller)
            }
        }
    }
}






