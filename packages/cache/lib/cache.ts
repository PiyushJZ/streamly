import Redis from 'ioredis';
import Config from '@lib/config';

const redisHost = Config.REDIS_HOST || '127.0.0.1';
const redisPort = parseInt(Config.REDIS_PORT || '6379', 10);

const client = new Redis({
  host: redisHost,
  port: redisPort,
  enableAutoPipelining: true,
});

client.on('error', err => {
  console.error('Redis error:', err);
});

class Cache {
  static async set<T>(
    key: string,
    value: T,
    ttlInSeconds?: number,
  ): Promise<void> {
    try {
      const serialized = JSON.stringify(value);
      if (ttlInSeconds) {
        await client.set(key, serialized, 'EX', ttlInSeconds);
      } else {
        await client.set(key, serialized);
      }
    } catch (err) {
      console.error(`Error setting key "${key}" in Redis:`, err);
    }
  }

  static async get<T>(key: string): Promise<T | null> {
    try {
      const data = await client.get(key);
      return data ? JSON.parse(data) : null;
    } catch (err) {
      console.error(`Error getting key "${key}" from Redis:`, err);
      return null;
    }
  }

  static async del(key: string): Promise<void> {
    try {
      await client.del(key);
    } catch (err) {
      console.error(`Error deleting key "${key}" from Redis:`, err);
    }
  }

  static async exists(key: string): Promise<boolean> {
    try {
      const result = await client.exists(key);
      return result === 1;
    } catch (err) {
      console.error(`Error checking existence of key "${key}" in Redis:`, err);
      return false;
    }
  }

  static async disconnect(): Promise<void> {
    try {
      await client.quit();
    } catch (err) {
      console.error('Error disconnecting from Redis:', err);
    }
  }
}

export default Cache;
