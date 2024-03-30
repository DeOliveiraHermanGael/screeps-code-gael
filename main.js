module.exports.loop = function() {
//    for (const room in Memory.rooms) {
 //       for (const prop in room) {
  //          delete Memory.rooms.room
//        }
 //   }
    console.log('test')
    Game.spawns['Spawn1'].room.memory.counter = Game.spawns['Spawn1'].room.memory.counter + 1
        if (Game.spawns['Spawn1'].room.memory.counter > 500) {
            Game.spawns['Spawn1'].room.memory.updateRepair = true
            Game.spawns['Spawn1'].room.memory.counter = 0
        }
    for (const name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name]
        }
    }
    require('Spawning').run(Game.spawns['Spawn1'])
    for (const name in Game.creeps) {
        const creep = Game.creeps[name]
        if (creep.ticksToLive < 300 && Game.creeps[name].memory.role != 'renewing') {
            creep.memory.role = 'renewing'
        } 
        if (creep.memory.role === 'renewing') {
            require('role.renewing').run(creep)
        } else if (creep.memory.role === 'initializer') {
            require('role.initializer').run(creep)
        } else if (creep.memory.role === 'upgrader') {
            require('role.upgrader').run(creep)
        } else if (creep.memory.role === 'harvester') {
            require('role.harvester').run(creep)
        } else if (creep.memory.role === 'logistics_heavy') {
            require('role.logistics_heavy').run(creep)
        } else if (creep.memory.role === 'logistics_extensions') {
            require('role.logistics_extensions').run(creep)
        } else if (creep.memory.role === 'builder') {
            require('role.builder').run(creep)
        } 
    }
}
