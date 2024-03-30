module.exports = {
    sites: function(room) {
        if (room.memory.updateSites) {
            room.memory.sites = room.find(FIND_CONSTRUCTION_SITES).map(function(site) {return site.id})
            room.memory.updateSites = false
        }
        return room.memory.sites.map(function(id) {return Game.getObjectById(id)})
    },
    repairStructures: function(room) {
        if (room.memory.updateRepair) {
            room.memory.structuresToRepair = room.find(FIND_STRUCTURES, {filter: function(structure) {return (structure.structureType == STRUCTURE_ROAD || structure.structureType == STRUCTURE_CONTAINER) && structure.hits < structure.hitsMax}}).map(function(site) {return site.id})
            room.memory.updateRepair = false
        }
        if (room.memory.structuresToRepair.length > 0) {
            return room.memory.structuresToRepair.map(function(id) {return Game.getObjectById(id)})
        } else {
            return false
        }
    }
};