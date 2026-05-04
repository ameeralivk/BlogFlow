// import { createClient } from "redis";
// const redisClient = createClient({
//   url: process.env.REDIS_CLIENT_CONNECTION,
//   socket: {
//     reconnectStrategy: (retries) => {
//       if (retries > 10) return new Error("Too many retries.");
//       return Math.min(retries * 100, 3000);
//     },
//   },
// });

// redisClient.on("error", (err) =>
//   console.error("Redis Client Error:", err)
// );

// export const connectRedis = async () => {
//   if (!redisClient.isOpen) {
//     await redisClient.connect();
//     console.log("Connected to Redis!");
//   }
// };

// export default redisClient;

import { createClient } from "redis";

const redisUrl = process.env.REDIS_CLIENT_CONNECTION;

const redisClient = redisUrl
  ? createClient({
      url: redisUrl,
      socket: {
        reconnectStrategy: (retries) => {
          if (retries > 5) return new Error("Too many retries.");
          return Math.min(retries * 100, 3000);
        },
      },
    })
  : null;

if (redisClient) {
  redisClient.on("error", (err) =>
    console.error("Redis Client Error:", err)
  );
}

export const connectRedis = async () => {
  try {
    if (!redisClient) {
      console.log("Redis not configured, skipping...");
      return;
    }

    if (!redisClient.isOpen) {
      await redisClient.connect();
      console.log("Connected to Redis!");
    }
  } catch (err) {
    console.log("Redis failed, continuing without it...");
  }
};

export default redisClient;
