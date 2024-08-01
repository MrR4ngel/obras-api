import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Obra } from './obra/obra.entity';
import { StatusObra } from './status-obra/status-obra.entity';
import { Usuario } from './usuario/usuario.entity';
import { DiarioDeObra } from './diario-de-obra/diario-de-obra.entity';
import { Material } from './material/material.entity';
import { MaterialDiario } from './material-diario/material-diario.entity';
import { Item } from './item/item.entity';
import { ItemDiario } from './item-diario/item-diario.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'obrasmannager',
      entities: [Obra, StatusObra, Usuario, DiarioDeObra, Material, MaterialDiario, Item, ItemDiario],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Obra, StatusObra, Usuario, DiarioDeObra, Material, MaterialDiario, Item, ItemDiario]),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}






// CacheModule.registerAsync({
//   imports: [ConfigModule],
//   useFactory: async (configService: ConfigService) => ({
//     store: redisStore,
//     host: configService.get<string>('REDIS_HOST'),
//     port: configService.get<number>('REDIS_PORT'),
//     ttl: configService.get<number>('CACHE_TTL'), // Modulo de Cache, não implementado
//   }),
//   inject: [ConfigService],
// }),
// AuthModule,
// ],
// controllers: [AppController],
// providers: [AppService],
// })