import { Logtail } from '@logtail/node';

const logger = new Logtail(process.env.LOGTAIL_SOURCE_TOKEN as string);

export default logger;
