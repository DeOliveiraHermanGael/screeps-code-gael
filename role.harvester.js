logistics = require('Room.logistics')
civilian = logistics.civilian
closestTarget = require('creep.path').closestTarget
artificialSources = logistics.artificialSources
module.exports = {
    run: function(creep) {
        if (creep.store.getFreeCapacity() === 0 && creep.memory.harvesting == true) {
            creep.memory.harvesting = false
            creep.memory.targetSwitch = true
            creep.say('full')
        } else if (!creep.memory.harvesting && creep.store.getUsedCapacity() === 0) {
            creep.memory.harvesting = true
            creep.memory.targetSwitch = true
            creep.say('empty')
        } 
        if (creep.memory.harvesting) {
            creep.say('harvesting')
            const source = closestTarget(creep, artificialSources.get(creep.room))
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source)
            }
        } else {
            if (civilian[2].primaryToSupply.get(creep.room).length > 0) {
                const target = closestTarget(creep, civilian.primaryToSupply.get(creep.room))
                creep.say('supplying')
                if (target.store[RESOURCE_ENERGY] == target.store.getCapacity(RESOURCE_ENERGY)) {
                    creep.memory.targetSwitch = true
                } else if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target)
                } else if (creep.transfer(target, RESOURCE_ENERGY) == OK) {
                    creep.memory.targetSwitch = true
                    if (target.store.getUsedCapacity > 500) {
                        civilian[2].primary_heavyToSupply.initialize(creep.room)
                    }
                    if (target.store[RESOURCE_ENERGY] == target.store.getCapacity[RESOURCE_ENERGY]) {
                        civilian[2].primaryToSupply.initialize(creep.room)
                    }
                } 
            } else if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller)
            }
        }
    }
}





