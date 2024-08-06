import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule, InjectDataSource } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

enum DataBaseName {
  MASTER = 'master',
  USING = 'ticatch',
}

const initialDataSourceOptions: DataSourceOptions = {
  type: 'mssql',
  host: 'localhost',
  port: 1430,
  username: 'sa',
  password: '1q2w3e4r!',
  database: DataBaseName.MASTER,
  synchronize: true,
  logging: true,
  extra: {
    trustServerCertificate: true,
  },
};

const finalDataSourceOptions: DataSourceOptions = {
  ...initialDataSourceOptions,
  database: DataBaseName.USING,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
};

@Module({
  imports: [TypeOrmModule.forRoot(initialDataSourceOptions)],
})
export class DatabaseModule implements OnModuleInit {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async onModuleInit() {
    await this.createDatabase();
    await this.reconnect();
  }

  private async createDatabase() {
    await this.dataSource.query(
      `IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = '${DataBaseName.USING}') CREATE DATABASE ${DataBaseName.USING}`,
    );
  }

  private async reconnect() {
    await this.dataSource.destroy();

    const newDataSource = new DataSource(finalDataSourceOptions);
    await newDataSource.initialize();

    this.overrideDataSource(newDataSource);
  }

  private overrideDataSource(newDataSource: DataSource) {
    // Overriding the dataSource in the module
    Object.assign(this.dataSource, newDataSource);
  }
}
