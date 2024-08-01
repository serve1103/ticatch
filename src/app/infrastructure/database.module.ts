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
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
  extra: {
    trustServerCertificate: true,
  },
};

const finalDataSourceOptions: DataSourceOptions = {
  ...initialDataSourceOptions,
  database: DataBaseName.USING,
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
    // 데이터베이스가 없을 경우 생성
    await this.dataSource.query(
      `IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = '${DataBaseName.USING}') CREATE DATABASE ${DataBaseName.USING}`,
    );
  }

  private async reconnect() {
    await this.dataSource.destroy(); // 기존 연결 닫기

    const newDataSource = new DataSource(finalDataSourceOptions);
    await newDataSource.initialize();
  }
}
