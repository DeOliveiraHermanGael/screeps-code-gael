// The only thing on which the logistics big object is based on is not the previous setter, but the previous getter, which means it is possible to create separate objects that each 
// require the previous getter. Doing so will save memory. 
// Plan: create Logistics.getters and Logistics.initializers. Each initializer requires getter of previous order. Which means i can require previous... Problem, how to activate initialization
// of next order without having loaded into memory, or checking booleans at each tick

// => sol: require() caches modules, so CPU is no problem, just memory. It's worth it if it saves me from the menial task of having to subdivide my logistics.civilian into 4 new modules,
// Without mentioning my logistics.artificialSources. It's a lot cleaner this way. Perhaps I should consider an IDE for JS

quick access:
initializer
Game.spawns['Spawn1'].spawnCreep([TOUGH], 'initializer0', {memory: {role: 'initializer', _role: 'initializer', roomName: Game.spawns['Spawn1'].room.name}})