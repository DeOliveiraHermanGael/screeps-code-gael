module.exports = {
    civilian: [
        { //[0]
            storages: {
                initialize: function(room) {
                    room.memory.logistics.civilian[0].storages = room.find(FIND_STRUCTURES, {filter: function(structure) {
                        return (structure.structureType == STRUCTURE_STORAGE || structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN)
                    }}).map(function(storage) {return storage.id})
                    civilian[1].primary.initialize(room)
                    civilian[1].heavy.initialize(room)
                },
                get: function(room) {
                    if (room.memory.logistics.civilian[0].storages.length) {
                        return room.memory.logistics.civilian[0].storages.map(function(id) {return Game.getObjectById(id)})
                    } else {
                        return []
                    }
                }
            }
        },
        {//[1]
            primary: {
                initialize: function(room) {
                    room.memory.logistics.artificialSources.forEach(function(artificialSource) {
                        artificialSource.primary = Game.getObjectById(artificialSource.id).pos.findInRange(civilian[0].storages.get(room), 2)
                        room.memory.logistics.civilian[1].primary.concat(room.memory.logistics.civilian[1].primary, artificialSource.primary)
                    })

                    civilian[2].primaryToSupply.initialize(room)
                    civilian[2].primary_heavy.initalize(room)
                    civilian[2].secondary.initialize(room)
                },
                get: function(room) {
                    get = room.memory.logistics.civilian[1].primary
                    if (get.length > 0) {
                        return get.map(function(id) {return Game.getObjectById(id)})
                    } else {
                        return []
                    }
                }
            },
            heavy: {
                initialize: function(room) {
                    room.memory.logistics.civilian[1].heavy = room.find(FIND_STRUCTURES, {filter: function(structure) {return structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE}}).map(function(object) {return object.id})
                    civilian[2].primary_heavy.initialize(room)
                },
                get: function(room) {
                    get = room.memory.logistics.civilian[1].heavy
                    if (get.length > 0) {
                        return get.map(function(id) {return Game.getObjectById(id)})
                    } else {
                        return []
                    }
                }
            }
        },
        {//[2]
            primaryToSupply: {
                initialize: function(room) {
                    room.memory.logistics.civilian[2].primaryToSupply = _.filter(civilian[1].primary.get(room), function (primary) {return primary.store.getCapacity(RESOURCE_ENERGY) >  primary.store.getUsedCapacity(RESOURCE_ENERGY)}).map(function(object) {return object.id})
                },
                get: function(room) {
                    get = room.memory.logistics.civilian[2].primaryToSupply
                    if (get.length > 0) {
                        return get.map(function(id) {return Game.getObjectById(id)})
                    } else {
                        return []
                    }
                }
            },
            primary_heavy: {
                initalize: function(room) {
                    room.memory.logistics.civilian[2].primary_heavy = _.filter(civilian[1].primary.get(room), function(primary) {return primary.structureType != STRUCTURE_EXTENSION}).map(function(object) {return object.id})
                    civilian[3].primary_heavyToResupply.initialize(room)
                    civilian[3].primary_heavyToSupply.initialize(room)
                },
                get: function(room) {
                    get = room.memory.logistics.civilian[2].primary_heavy
                    if (get.length > 0) {
                        return get.map(function(id) {return Game.getObjectById(id)})
                    } else {
                        return []
                    }
                }
            },
            secondary: {
                initialize: function(room) {
                    primary = civilian[1].primary.get(room)
                    room.memory.logistics.civilian[2].secondary = _.filter(civilian[0].storages.get(room), function(storage) {return primary.includes(storage) == false}).map(function(object) {return object.id})
                    civilian[3].secondary_extensions.initialize(room)
                    civilian[3].secondary_heavy.initialize(room)
                },
                get: function(room) {
                    get = room.memory.logistics.civilian[2].secondary
                    if (get.length > 0) {
                        return get.map(function(id) {return Game.getObjectById(id)})
                    } else {
                    return []
                    }
                }
            }
        },
        { // [3]
            primary_heavyToResupply: {
                initialize: function(room) {
                    room.memory.logistics.civilian[3].primary_heavyToResupply = _.filter(civilian[2].primary_heavy.get(room), function(primary_heavy) {return primary_heavy.store[RESOURCE_ENERGY] > 500}).map(function(object) {return object.id})
                },
                get: function(room) {
                    get = room.memory.logistics.civilian[3].primary_heavyToResupply
                    if (get.length > 0) {
                        return get.map(function(id) {return Game.getObjectById(id)})
                    } else {
                        return []
                    }
                }    
            },
            primary_heavyToSupply: {
                initialize: function(room) {
                    room.memory.logistics.civilian[3].primary_heavyToSupply = _.filter(civilian[2].primary_heavy.get(room), function(primary_heavy) {return primary_heavy.store.getFreeCapacity(RESOURCE_ENERGY) > 51}).map(function(object) {return object.id})
                },
                get: function(room) {
                    get = room.memory.logistics.civilian[3].primary_heavyToSupply
                    if (get.length > 0) {
                        return get.map(function(id) {return Game.getObjectById(id)})
                    } else {
                        return []
                    }
                }
            },
            secondary_heavy: {
                initialize: function(room) {
                    room.memory.logistics.civilian[1].secondary_heavy = _.filter(civilian[2].secondary.get(room), function(secondary) {return secondary.structureType != STRUCTURE_EXTENSION && secondary.structureType != STRUCTURE_TOWER}).map(function(object) {return object.id})
                    civilian[4].secondary_heavyToSupply.initialize(room)
                    civilian[4].secondary_heavyToResupply.initialize(room)
                },
                get: function(room) {
                    get = room.memory.logistics.civilian[3].secondary_heavy
                    if (get.length > 0) {
                        return get.map(function(id) {return Game.getObjectById(id)})
                    } else {
                        return []
                    }
                }
            },
            secondary_extensions: {
                initialize: function(room) {
                    room.memory.logistics.civilian[3].secondary_extensions = _.filter(civilian[2].secondary.get(room), function(secondary) {return secondary.structureType == STRUCTURE_EXTENSION}).map(function(object) {return object.id})
                    civilian[4].secondary_extensionsToSupply.initialize(room)
                },    
                get: function(room) {
                    get = room.memory.logistics.civilian[3].secondary_extensions
                    if (get.length > 0) {
                        return get.map(function(id) {return Game.getObjectById(id)})
                    } else {
                        return []
                    }
                }
            }
        },
        {//[4]
            secondary_extensionsToSupply: {
                initialize: function(room) {
                    room.memory.logistics.civilian[4].secondary_extensionsToSupply = _.filter(civilian[3].secondary_extensions.get(room), function(extension) {return extension.store[RESOURCE_ENERGY] < 50}).map(function(object) {return object.id})
                },
                get: function(room) {
                    get = room.memory.logistics.civilian[4].secondary_extensionsToSupply
                    if (get.length > 0) {
                        return get.map(function(id) {return Game.getObjectById(id)})
                    } else {
                        return []
                    }
                }    
            },
            secondary_heavyToSupply: {
                initialize: function(room) {
                    room.memory.logistics.civilian[4].secondary_heavyToSupply = _.filter(civilian[3].secondary_heavy.get(room), function(heavy) {
                        return heavy.store.getFreeCapacity(RESOURCE_ENERGY) > 300}).map(function(object) {return object.id})
                },
                get: function(room) {
                    get = room.memory.logistics.civilian[4].secondary_heavyToSupply
                    if (get.length > 0) {
                        return get.map(function(id) {return Game.getObjectById(id)})
                    } else {
                        return []
                    }
                }
            },
            secondary_heavyToResupply: {
                initialize: function(room) {
                        room.memory.logistics.civilian[4].secondary_heavyToResupply = _.filter(civilian[3].secondary_heavy.get(room), function(heavy) {
                    return heavy.store.getUsedCapacity(RESOURCE_ENERGY) > 400}).map(function(object) {return object.id})
                },
                get: function(room) {
                    get = room.memory.logistics.civilian[4].secondary_heavyToResupply
                    if (get.length > 0) {
                        return get.map(function(id) {return Game.getObjectById(id)})
                    } else {
                        return []
                    }
                }
            }
        }
    ],
    artificialSources: {
        
        creepCapacity: {
            initialize: function(source) {
                source = Game.getObjectById(artificialSource.id)
                roomName = source.room.name
                terrain = new Room.Terrain(roomName)
                length = 0
                const Y = source.pos.y
                const X = source.pos.x
                for (let y = source.pos.y - 1; y < Y + 2; y++) {
                    for (let x = source.pos.x - 1; x < X + 2; x++) {
                        if (terrain.get(x, y) == TERRAIN_MASK_WALL) {
                        	length++
                        } else {
                            
                            artificialSource.spots.push(new RoomPosition(x, y, roomName))
                        }
                    }
                }
                return 9 - length
            },
            get: function (artificialSource) {
                return artificialSource.creepCapacity
            }
        },
        
        initialize: function(room) {
            const sources = room.find(FIND_SOURCES)
            room.memory.logistics.artificialSources = []
            sources.forEach(function(source) {
                room.memory.logistics.artificialSources.push({
                    id: source.id,
                    pos: source.pos,
                    creepCapacity: artificialSources.creepCapacity.get(source),
                    exploitingCreeps: [],
                    num: function() {return this.exploitingCreeps.length},
                    spots: [],
                    occupied: [],
                    available: [],
                    primary: [
                        {storages: source.pos.findInRange(civilian[0].storages.get(room), 2)},
                        {heavy: source.pos.findInRange(civilian[1].heavy.get(room), 2)},
                        {heavy_toSupply: source.pos.findInRange(civilian[3].primary_heavyToSupply.get(room), 2)}, 
                        {heavy_toResupply: source.pos.findInRange(civilian[3].primary_heavyToResupply.get(room), 2)},
                        ],
                })
            })
            civilian[1].primary.initialize(room)
        },
        get: function(room) {
        	return room.memory.logistics.artificialSources.map(function(artificialSource) {return Game.getObjectById(artificialSource.id)})
        }
	
        
    }
}
