import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const localConfig: TypeOrmModuleOptions = {
  name: 'default',
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'postgres',
  database: 'todo-core',
  entities: ['dist/database/**/**/*.entity.js', 'dist/database/**/*.entity.js'],
  synchronize: false,
};

export const ormConfig = localConfig;
