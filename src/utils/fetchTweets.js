import fetch from 'node-fetch';
import path from "path";
import fs from 'fs';

const BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;
const username = "@compExtractor";
const LAST_ID_FILE = path.join(process.cwd(), "public", "last_id.txt");

async function fetchTweets() {
  
  const baseUrl = "https://api.twitter.com/2/tweets/search/recent";

  const params = new URLSearchParams({
    query: username,
    expansions: "attachments.media_keys,author_id",
    "media.fields": "url,type",
    "tweet.fields": "created_at,attachments",
    "user.fields": "username,name"
  });

  let since_id = "";

  if (fs.existsSync(LAST_ID_FILE)) {
    since_id = fs.readFileSync(LAST_ID_FILE, "utf-8").trim();
  }

  if (since_id) {
    params.append("since_id", since_id);
  }

  const res = await fetch(`${baseUrl}?${params.toString()}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Twitter API error: ${res.status}`);
  }

  const data = await res.json();

  const mediaMap = {};
  if (data.includes?.media) {
    for (const m of data.includes.media) {
      mediaMap[m.media_key] = m.url;
    }
  }

  const userMap = {};
  if (data.includes?.users) {
    for (const u of data.includes.users) {
      userMap[u.id] = {
        username: u.username,
        name: u.name
      };
    }
  }

  const tweets = data.data?.map((tweet) => {
    let mediaUrls = [];
    if (tweet.attachments?.media_keys) {
      mediaUrls = tweet.attachments.media_keys
        .map((key) => mediaMap[key])
        .filter(Boolean);
    }

    const user = userMap[tweet.author_id] || {};

    return {
      id: tweet.id,
      text: tweet.text,
      author_id: tweet.author_id,
      username: user.username || null,
      name: user.name || null,
      created_at: tweet.created_at,
      media: mediaUrls,
    };
  }) || [];
  
  if (tweets.length > 0) {
    fs.writeFileSync(LAST_ID_FILE, tweets[0].id.toString());
  }

  return tweets;
}

export { fetchTweets };
