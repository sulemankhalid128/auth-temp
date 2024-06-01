import { DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";
import { config } from 'dotenv';
config()
//local connection credentials
let dataSourceOptions: DataSourceOptions & SeederOptions = {
    migrationsTableName: 'migrations',
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || ''),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: false,
    synchronize: false,
    name: 'default',
    entities: ['src/**/**.entity.ts'],
    migrations: ['src/migrations/*.ts'],
    seeds: ['src/database/seeds/**/*.ts'],
  };

  export { dataSourceOptions };