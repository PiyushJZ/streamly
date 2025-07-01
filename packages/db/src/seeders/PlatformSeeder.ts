import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Platform } from '../models/platform.entity';

export class PlatformSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const platforms = [
      new Platform('Youtube'),
      new Platform('Twitch'),
      new Platform('Instagram'),
      new Platform('Facebook'),
      new Platform('Spotify'),
      new Platform('Simplecast'),
      new Platform('Cohost'),
    ];

    await em.persistAndFlush(platforms);
  }
}
