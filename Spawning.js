module.exports = {
    run: function(spawn) {
        if (_.filter(Game.creeps, function(creep) {return creep.memory._role === 'harvester'}).length < 0) {
            spawn.spawnCreep([WORK, WORK, MOVE, CARRY], 'Harvester' + Game.time, {memory: {role: 'harvester', _role: 'harvester'}})
            spawn.room.memory.updateSecondary_extensionsToSupply = true
            spawn.room.memory.updatePrimaryToSupply = true
        } else if (_.filter(Game.creeps, function(creep) {return creep.memory._role === 'upgrader'}).length < 0) {
            spawn.spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE], 'Upgrader' + Game.time, {memory: {role: 'upgrader', _role: 'upgrader' }})
            spawn.room.memory.updateSecondary_extensionsToSupply = true 
            spawn.room.memory.updatePrimaryToSupply = true
        } else if (_.filter(Game.creeps, function(creep) {return creep.memory._role === 'builder'}).length < 0) {
            spawn.spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], 'Builder' + Game.time, {memory: {role: 'builder', _role: 'builder'}})
            spawn.room.memory.updateSecondary_extensionsToSupply = true
            spawn.room.memory.updatePrimaryToSupply = true
        } else if (_.filter(Game.creeps, function(creep) {return creep.memory._role === 'logistics_heavy'}).length < 0) {
            spawn.spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], 'Logistics_heavy' + Game.time, {memory: {role: 'logistics_heavy', _role: 'logistics_heavy', primary: false}})
            spawn.room.memory.updateSecondary_extensionsToSupply = true
            spawn.room.memory.updatePrimaryToSupply = true
        } else if (_.filter(Game.creeps, function(creep) {return creep.memory._role === 'logistics_extensions'}).length < 0) {
            spawn.spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], 'Logistics_extensions' + Game.time, {memory: {role: 'logistics_extensions', _role: 'logistics_extensions', primary: false}})
            spawn.room.memory.updateSecondary_extensionsToSupply = true
            spawn.room.memory.updatePrimaryToSupply = true
        } else if (_.filter(Game.creeps, function(creep) {return creep.memory._role === 'healer'}).length < 0) {
            spawn.spawnCreep([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE], 'Logistics_extensions' + Game.time, {memory: {role: 'logistics_extensions', _role: 'logistics_extensions', primary: false}})
            spawn.room.memory.updateSecondary_extensionsToSupply = true
            spawn.room.memory.updatePrimaryToSupply = true
        }
    }
    
};