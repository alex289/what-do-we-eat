import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

import { env } from '@/env.mjs';

export const ratelimit = new Ratelimit({
  redis: new Redis({
    url: env.UPSTASH_REDIS_REST_REST_API_URL,
    token: env.UPSTASH_REDIS_REST_REST_API_TOKEN,
  }),
  limiter: Ratelimit.slidingWindow(10, '100 s'),
  analytics: true,
  prefix: 'wdwe',
});
