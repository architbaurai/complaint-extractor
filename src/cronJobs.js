import cron from "node-cron";
import { processComplaint } from "./utils/processComplaint.js";
import { fetchTweets } from "./utils/fetchTweets.js";

const twitterCronJob = () => {

    cron.schedule("*/16 * * * *", async ()=>{

        const tweets = await fetchTweets();

        for(const tweet of tweets){
            await processComplaint(tweet.username, tweet.text, tweet.media, tweet.created_at);
        }

        console.log(tweets);
    });
}

export {twitterCronJob}; 
