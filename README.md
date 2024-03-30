# screeps-code-gael

1. Current modifications underway

Booleans

2. Plans for the future:

2.1. Logistics:

2.1.1. Room.logistics module:
- Replace the storage's id with an artificial object that would store its id of course, but also its position, supply, demand, currently targeting creep(s) id list, ETA for the creep(s) to arrive. I would like the object to be a property itself, but I don't know yet how to dynamically assign and delete object properties, so I will use splicing for now. 

2.1.2. Military
Every initialized room has a wartime boolean variable in the booleans property. It will determine resource prioritization as well, creep roles as well as which task has priority over which task, the threshold for renewing status acquisition, and the threshold upon which renewing will cease, depending on the number and type of body parts with "military" status, which are all the body parts aside WORK and CARRY. 

2.2. Creep functionalities:

2.2.1. priority evaluation:
  - Each task will have a priority value between 1 and 11 assigned to it. All military tasks will have priority value 1 when wartime room boolean is set to false. Controller upgrading value 2. I'm not yet sure what values to assign to other high priority tasks such as harvesting, and logistics. Priority will be the main factor that will determine which creep will either stop moving, or take the longer path in case of conflicting positions. For heavy logistics, resupplying the tower will at all times be priority 11. 

2.2.2. ETA (Estimated Time for Arrival):
  - the ETA will be calculated by caching in the creep's memory the path to arrive wherever it is targeting, from its length, number of each of the terrain types, the presence or not of a road, and the balance between the MOVE body parts, and the full CARRY parts and the others.
  - Perhaps I should create an array in which I will stock the ETA for each of the positions the creep will be, and compare the ETA/position pair with those of all the other creeps in the room. If they correspond, have the creep with lesser priority evaluation, delay for one moving interval, and compare the creep's ETA with the rest of the creeps' paths in the room once more.
  - Calculating ETA will also 







