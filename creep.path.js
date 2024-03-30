module.exports = {
    closestTarget: function(creep, targets) {
        if(creep.memory.targetSwitch == true || !creep.memory.target) {
            if (creep.pos.findClosestByPath(targets)) {
                creep.memory.target = creep.pos.findClosestByPath(targets).id
            } else {
                creep.memory.target = false
            }
            creep.memory.targetSwitch = false
        }
        return Game.getObjectById(creep.memory.target)
    }
}