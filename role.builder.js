roomExtensions = require('Room.memory')
creepPath = require('creep.path')
builderExtensions = require('Room.builder')

module.exports = {
    run: function(creep) {
        if (!creep.memory.building && creep.store.getFreeCapacity() === 0) {
            creep.memory.building = true
        } else if (creep.memory.building && creep.store.getUsedCapacity() === 0) {
            creep.memory.building = false
            creep.memory.targetSwitch = true
        }
        if (creep.memory.building) {
            const structuresToRepair = builderExtensions.repairStructures(creep.room)
            const sites = builderExtensions.sites(creep.room)
            if (structuresToRepair) {
                creep.say('repairing')
                if (creep.memory.task != 'repairing') {
                    creep.memory.task = 'repairing'
                    creep.memory.targetSwitch = true
                }
                let target = creepPath.closestTarget(creep, structuresToRepair)
                if (target) {
                    if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target)
                    }
                    if (target.hitsMax == target.hits) {
                        creep.memory.targetSwitch = true
                        creep.room.memory.updateRepair = true
                    }
                }
            } else if (sites.length > 0) {
                if (creep.memory.task != 'building') {
                    creep.memory.task = 'building'
                    creep.memory.targetSwitch = true
                }
                creep.say('building')
                let target = creepPath.closestTarget(creep, sites)
                if (!creepPath.closestTarget(creep, sites)) {
                    creep.memory.targetSwitch = true
                    creep.room.memory.updateSites = true
                }
                if (creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target)
                }
            } else if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller)
            }
        } else {
            require('task.resupply').run(creep)
        }
    }
}
