# screeps-code-gael

1. Current modifications underway

1.1. Room.logistics module:

The complete restructuring of how the memory is organized within the the room, and the module itself. 

1.1.1. The room: Instead of just hurling and retrieving whatever variable I needed from room.memory, I am currently organizing room memory into 2 categories: logistics, and booleans. Logistics contains 3 keys: 
- civilian: an array which registers the id's of the storages corresponding to various filters. In each index of the array are found multiple objects that correspond to the application of a certain filter or combinations of filters. They are all derived from civilian[0].storages, which is the array containing all the storages' id's, except the objects that start with "primary", which are derived from the artificialSources object.
  
- military: Empty for now

- artificialSources: An object which contains an array of objects referring to the sources the room, including id, position, the positions that are free to be exploited by harvesters, the storages in a perimeter of 2, organized the same way as the civilian array, except all the objects that start with secondary. 

1.1.2. The code module is organized in the exact same way. Each object contained in each index of the civilian array, and the artificialSources object, possesses 2 functions: initialize, and get. Get returns the object from memory, and initialize filters the objects from the i. When an object from a lower index is initialize, it automatically calls the getter of previous order, and the corresponding initialize function of superior order. Currently this process will have to be repeated for every new store that will be constructed, but ideally, it should be done only once, since I plan to stock the id's no longer in arrays, but in dynamic objects that the creeps themselves would then be able to access and modify. 

Booleans

2. Plans for the future:

2.1. Logistics:

2.1.1. Room.logistics module:
- Replace the storage's id with an artificial object that would store its id of course, but also its position, supply, demand, currently targeting creep(s) id list, ETA for the creep(s) to arrive. I would like the object to be a property itself, but I don't know how to dynamically assign and delete object properties yet, so I will use splicing for now. 

2.1.2. Military
Every initialized room has a wartime boolean variable in the booleans property. It will determine resource prioritization as well, creep roles as well as which task has priority over which task, the threshold for renewing status acquisition, and the threshold upon which renewing will cease, depending on the number and type of body parts with "military" status, which are all the body parts aside WORK and CARRY. 

2.2. Creep functionalities:

2.2.1. priority evaluation:
  - Each task will have a priority value between 1 and 11 assigned to it. All military tasks will have priority value 1 when wartime room boolean is set to false. Controller upgrading value 2. I'm not yet sure what values to assign to other high priority tasks such as harvesting, and logistics. Priority will be the main factor that will determine which creep will either stop moving, or take the longer path in case of conflicting positions. For heavy logistics, resupplying the tower will at all times be priority 11. 

2.2.2. ETA (Estimated Time for Arrival):
  - the ETA will be calculated by caching in the creep's memory the path to arrive wherever it is targeting, from its length, number of each of the terrain types, the presence or not of a road, and the balance between the MOVE body parts, and the full CARRY parts and the others.
  - Perhaps create an array in which I will stock the ETA for each of the positions the creep will be, and compare the ETA/position pair with those of all the other creeps in the room. If they correspond, have the creep with lesser priority evaluation, delay for one moving interval, and compare the creep's ETA with the rest of the creeps' paths in the room once more.







