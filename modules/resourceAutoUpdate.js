const {
    playerGathers,
    getAllLands,
    updateLandResources
} = require("./localDatabase")

module.exports = () => {

    const lands = getAllLands()


    lands.map(land => {

        const stats = {
            gold: 0,
            wood: 0,
            stone: 0
        }

        land.buildings.map(building => {

            if(land.resources[building] >= 1) {
                stats[building] += 1
                updateLandResources(land.index, building)
            }
        })

        Object.keys(stats).map(key => playerGathers(land.playerId, key, stats[key]))

        // playerGathers(land.playerId, "gold", stats.gold)
        // playerGathers(land.playerId, "wood", stats.wood)
        // playerGathers(land.playerId, "stone", stats.stone)

    })
}