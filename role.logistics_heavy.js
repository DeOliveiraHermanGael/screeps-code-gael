closestTarget = require('creep.path').closestTarget
logistics3 = require('Room.logistics3')
logistics4 = require('Room.logistics4')
militaryLogistics = require('Military.logistics1')
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
      //      if (militaryLogistics.towersToSupply) {
     //           if (!creep.memory.military) {
    //                creep.memory.military = true
  //                  creep.memory.targetSwitch = true
//                }
  //              let target = closestTarget(creep, militaryLogistics.towersToSupply(creep.room)))
 //               if (target)
//            } else 
            if (logistics4.secondary_heavyToSupply(creep.room)) {
                let target = closestTarget(creep, logistics4.secondary_heavyToSupply(creep.room))
                if (target) {
                    if (target.store.getFreeCapacity(RESOURCE_ENERGY) < 300) {
                        creep.memory.targetSwitch = true
                        creep.say('updating')
                    } else if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target)
                    } else if(creep.transfer(target, RESOURCE_ENERGY) == OK) {
                        creep.memory.targetSwitch = true
                        creep.room.memory.updateSecondary_heavyToSupply = true
                        creep.room.memory.updateHeavy_resupply = true
                    }
                }
            }
        } else {
            require('task.logistics_resupply').run(creep)
        }    
    }
};












