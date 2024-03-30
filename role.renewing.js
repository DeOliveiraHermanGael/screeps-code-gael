module.exports = {
    run: function(creep) {
        creep.say('renewing')
        creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY)
        if (Game.spawns['Spawn1'].renewCreep(creep) == ERR_NOT_IN_RANGE) {
            creep.moveTo(Game.spawns['Spawn1'])
        }
        if (creep.ticksToLive > 1000) {
            creep.memory.role = creep.memory._role
            creep.memory.targetSwitch = true
            Game.spawns['Spawn1'].room.memory.updateSecondary_extensionsToSupply = true
        }
    }
};









