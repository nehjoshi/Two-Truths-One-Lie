const cron = require('node-cron');
const Game = require('../models/GameModel');

const Scheduler = () => {
    cron.schedule("* * * * *", async () => { //Delete unwanted games every 5 minutes
        console.log("Scheduling a cron job");
        Game.deleteMany({updatedAt: {$lt: new Date(Date.now() - 1000 * 60 * 5)}})
        .then(() => {
            console.log("Deleted timed out games");
        })
        .catch(err => {
            console.log("Error Deleting garbage games: ", err);
        })
    })
}
module.exports = Scheduler;