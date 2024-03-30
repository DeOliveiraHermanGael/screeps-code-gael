closestPath = require('creep.path').closestPath
logistics0 = require('Room.logistics0')
logistics1 = require('Room.logistics1')
logistics2 = require('Room.logistics1exp')
logistics3 = require('Room.logistics2exp')
logistics4 = require('Room.logistics4')
module.exports = {
    run: function(creep) {
        creep.room.memory.updateSecondary_heavyToSupply = true
    }
}