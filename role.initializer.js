logistics = require('Room.logistics')
artificialSources = logistics.artificialSources
civilian = logistics.civilian
module.exports = {
    run: function(creep) {
        if (false) {
            creep.room.memory.logistics = {
                civilian: [
                    {
                        storages: []
                    },
                    { //1
                        primary: [],
                        heavy: []
                    },
                    { //2
                        primaryToSupply: [],
                        primary_heavy: [],
                        secondary: []
                    },
                    { //3
                        primary_heavyToSupply: [],
                        primary_heavyToResupply: [],
                        secondary_extensions: [],
                        secondary_heavy: []
                    },
                    { //4
                        secondary_extensionsToSupply: [],
                        secondary_heavyToSupply: [],
                        secondary_heavyToResupply: []
                    },
                ],
                military: [
                
                    ],
                artificialSources: []
            },
                
            creep.room.memory.relay = {
                civilian: {
                    builder: {
                        structuresToRepair: [],
                        structuresToBuild: []
                    },
                    harvester: {}
                },
                military: {
                    
                }
            }
            creep.room.memory.booleans = {
                wartime: false,
                initialized: true
            }
            artificialSources.initialize(creep.room)

        } 
    }
}
















