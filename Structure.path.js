Esources = require('Room.logistics0').Esources
module.exports = {
    Epath: function(structure) {
            if (!structure.memory.paths) {
                structure.memory.paths = {}
                if(!structure.memory.paths.Epaths) {
                    const StartPos = new RoomPosition(structure.pos.x, structure.pos.y - 1, structure.pos.roomName)
                    structure.memory.paths.Epaths = []
                    for (const source of Esources(structure.room)) {
                        structure.memory.paths.Epaths_go.push(StartPos.findPathTo(structure))
                        structure.memory.paths.Epaths_ret.push(source.findPathTo(StartPos))
                    }
                }
            }
            return [structure.memory.paths.Epaths_go, structure.memory.paths.Epaths_ret]
        }
} 