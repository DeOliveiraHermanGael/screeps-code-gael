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
                    if (room.memory.logistics.civilian[0].storages) {
                        room.memory.logistics.civilian[0].storages.map(function(id) {return Game.getObjectById(id)})
                    } else {
                        return false
                    }
                }
            }
        },
        {//[1]
            primary: {
                initialize: function(room) {
                    room.memory.logistics.artificialSources.forEach(function(artificialSource) {
                        room.memory.logistics.civilian[1].primary.concat(room.memory.logistics.civilian[1].primary, artificialSource.primary)
                    })

                    civilian[2].primaryToSupply.initialize(room)
                    civilian[2].primary_heavy.initalize(room)
                    civilian[2].secondary.initialize(room)
                },
                get: function(room) {
                    if (room.memory.primary) {
                        return room.memory.primary.map(function(id) {return Game.getObjectById(id)})
                    } else {
                        return false
                    }
                }
            },
            heavy: {
                initialize: function(room) {
                    room.memory.logistics.civilian[1].heavy = _.filter(civilian[0].storages.get(room), function(structure) {return structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE}).map(function(object) {return object.id})
                    
                    
                },
                get: function(room) {
                    if (room.memory.heavy) {
                        return room.memory.heavy.map(function(id) {return Game.getObjectById(id)})
                    } else {
                        return false
                    }
                }
            }
        },
        {//[2]
            primaryToSupply: {
                initialize: function(room) {
                    room.memory.logistics[2] = _.filter(civilian[1].primary.get(room), function (primary) {return primary.store.getCapacity(RESOURCE_ENERGY) >  primary.store.getUsedCapacity(RESOURCE_ENERGY)}).map(function(object) {return object.id})
                    room.memory.updatePrimaryToSupply = false
                },
                get: function(room) {
                    if (room.memory.primaryToSupply.length > 0) {
                        return room.memory.primaryToSupply.map(function(id) {return Game.getObjectById(id)})
                    } else {
                        return false
                    }
                }
            },
            primary_heavy: {
                initalize: function(room) {
                    room.memory.primary_heavy = _.filter(logistics1.primary(room), function(primary) {return primary.structureType != STRUCTURE_EXTENSION}).map(function(object) {return object.id})
                    room.memory.updatePrimary_heavyToResupply = true
                    room.memory.updatePrimary_heavy = false
                },
                get: function(room) {
                    if (room.memory.primary_heavy.length > 0) {
                        return room.memory.primary_heavy.map(function(id) {return Game.getObjectById(id)})
                    } else {
                        return false
                    }
                }
            },
            secondary: {
                initialize: function(room) {
                    room.memory.secondary = _.filter(civilian[0].storages.get(room), function(storage) {
                        return civilian[1].primary.get(room).includes(storage) == false
                    }).map(function(object) {return object.id})
                    
                    civilian[3].secondary_extensions.initialize(room)
                    civilian[3].secondary_heavy.initialize(room)
                },
                get: function(room) {
                    if (room.memory.secondary.length > 0) {
                        return room.memory.secondary.map(function(id) {return Game.getObjectById(id)})
                    } else {
                    return false
                    }
                }
            }
        },
        { // [3]
            primary_heavyToResupply: {
                initialize: function(room) {
                    room.memory.primary_heavyToResupply = _.filter(logistics2.primary_heavy(room), function(primary_heavy) {return primary_heavy.store[RESOURCE_ENERGY] > 500}).map(function(object) {return object.id})
                    room.memory.updateHeavy_toResupply = true
                    room.memory.updatePrimary_heavyToResupply = false
                },
                get: function(room) {
                    if (room.memory.primary_heavyToResupply.length > 0) {
                        return room.memory.primary_heavyToResupply.map(function(id) {return Game.getObjectById(id)})
                    } else {
                        return []
                    }
                }    
            },
            primary_heavyToSupply: {
                initialize: function(room) {
                    room.memory.primary_heavyToSupply = _.filter(logistics2.primary_heavy(room), function(primary_heavy) {return primary_heavy.store.getFreeCapacity(RESOURCE_ENERGY) > 51}).map(function(object) {return object.id})
                    room.memory.updatePrimary_heavyToSupply = false 
                },
                get: function(room) {
                    if (room.memory.primary_heavyToResupply.length > 0) {
                        return room.memory.primary_heavyToSupply.map(function(id) {return Game.getObjectById(id)})
                    } else {
                        return false
                    }
                }
            },
            secondary_heavy: {
                initialize: function(room) {
                    room.memory.secondary_heavy = _.filter(logistics2.secondary(room), function(secondary) {return secondary.structureType != STRUCTURE_EXTENSION && secondary.structureType != STRUCTURE_TOWER}).map(function(object) {return object.id})
                    room.memory.updateSecondary_heavyToSupply = true
                    room.memory.updateSecondary_heavyToResupply = true
                    room.memory.updateSecondary_heavy = false
                },
                get: function(room) {
                    if (room.memory.secondary_heavy.length > 0) {
                        return room.memory.secondary_heavy.map(function(id) {return Game.getObjectById(id)})
                    } else {
                        return false
                    }
                }
            },
            secondary_extensions: {
                initialize: function(room) {
                    room.memory.secondary_extensions = _.filter(logistics2.secondary(room), function(secondary) {return secondary.structureType == STRUCTURE_EXTENSION}).map(function(object) {return object.id})
                    civilian[4].secondary_extensionsToSupply.initialize(room)
                },    
                get: function(room) {
                    if (room.memory.secondary_extensions.length > 0) {
                        return room.memory.secondary_extensions.map(function(id) {return Game.getObjectById(id)})
                    } else {
                        return false
                    }
                }
            }
        },
        {//[4]
            secondary_extensionsToSupply: {
                initialize: function(room) {
                    room.memory.secondary_extensionsToSupply = _.filter(logistics3.secondary_extensions(room), function(extension) {return extension.store[RESOURCE_ENERGY] < 50}).map(function(object) {return object.id})
                },
                get: function(room) {
                    if (room.memory.secondary_extensionsToSupply.length > 0) {
                        return room.memory.secondary_extensionsToSupply.map(function(id) {return Game.getObjectById(id)})
                    } else {
                        return false
                    }
                }    
            },
            secondary_heavyToSupply: {
                initialize: function(room) {
                    room.memory.secondary_heavyToSupply = _.filter(logistics3.secondary_heavy(room), function(heavy) {
                        return heavy.store.getFreeCapacity(RESOURCE_ENERGY) > 300}).map(function(object) {return object.id})
                    room.memory.updateSecondary_heavyToSupply = false
                },
                get: function(room) {
                    if (room.memory.secondary_heavyToSupply.length > 0) {
                        return room.memory.secondary_heavyToSupply.map(function(id) {return Game.getObjectById(id)})
                    } else {
                        return false
                    }
                }
            },
            secondary_heavyToResupply: {
                initialize: function(room) {
                        room.memory.secondary_heavyToResupply = _.filter(logistics3.secondary_heavy(room), function(heavy) {
                    return heavy.store.getUsedCapacity(RESOURCE_ENERGY) > 400}).map(function(object) {return object.id})
                        room.memory.updateHeavy_toResupply = true
                    room.memory.updateSecondary_heavyToResupply = false
                },
                get: function(room) {
                    if (room.memory.secondary_heavyToResupply.length > 0) {
                        return room.memory.secondary_heavyToResupply.map(function(id) {return Game.getObjectById(id)})
                    } else {
                        return []
                    }
                }
            }
        }
    ],
    artificialSources: {
        
        spots: {
            process: function(source) {
                roomName = source.room.name
                terrain = new Room.Terrain(roomName)
                spotsArray = []
                const Y = source.pos.y
                const X = source.pos.x
                for (let y = source.pos.y - 1; y < Y + 2; y++) {
                    for (let x = source.pos.x - 1; x < X + 2; x++) {
                        if (terrain.get(x, y) != TERRAIN_MASK_WALL) {
                            spotsArray.push(new RoomPosition(x, y, roomName))
                        }
                    }
                }
                return spotsArray
            },
            get: function (artificialSource) {
                return artificialSource.spots
            }
        },
        
        initialize: function(room) {
            const sources = room.find(FIND_SOURCES)
            room.memory.logistics.artificialSources = []
            sources.forEach(function(source) {
                room.memory.logistics.artificialSources.push({
                    id: source.id,
                    pos: source.pos,
                    spots: logistics.artificialSources.spots.process(source),
                    primary: [
                        {storages: source.pos.findInRange(logistics.civilian[0].storages.get(room), 2)},
                        {heavy: source.pos.findInRange(logistics.civilian[1].heavy.get(room), 2)},
                        {heavy_toSupply: source.pos.findInRange(logistics.civilian[2].primary_heavyToSupply.get(room), 2)}, 
                        {heavy_toResupply: source.pos.findInRange(logistics.civilian[3].primary_heavyToResupply.get(room), 2)},
                        ],
                })
            })
        } 
        
    }
}