logistics = require('Room.logistics')
module.exports = {
    run: function(creep) {
        creep.say('im here')
        if (creep.room.name == creep.memory.roomName && !creep.room.memory.initialized) {
            creep.room.memory.logistics = {
                civilian: [
                    { //0
                        
                    },
                    { //1
                    
                    
                    },
                    { //2
                        
                        
                    },
                    { //3
                        
                        
                    },
                    { //4
                        
                        
                    },
                ],
                military: [
                
                    ],
                artificialSources: [
                        
                ],
            },
                
            creep.room.memory.relay = {
                civilian: {
                    builder: {},
                    harvester: {}
                },
                military: {
                    
                }
            }
            creep.room.memory.booleans = {
                wartime: false,
                initialized: false
            }
            logistics.artificialSources.initialize(creep.room)

        } else {
            creep.moveTo(creep.memory.roomName)
        }
    }
}















