import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { exit } from 'process';

import { db } from './';

const main = async () => {
  try {
    console.log('Migrating database...');
    await migrate(db, {
      migrationsFolder: './src/server/db/migrations',
    });

    console.log('Migration successful');
    exit(0);
  } catch (error) {
    console.error(error);
    exit(1);
  }
};

main();
