import { Inject, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {createClient} from 'redis'



export const RedisProvider = {
    provider:'REDIS',
    useFactory: async (configService:ConfigService):Promise<ReturnType <typeof createClient>> => {
        console.log('REDIS CONFIG >>>>>>>>>>>>>>>', configService.get('redis'));
        const client = createClient(configService.get('redis'));
        client.on('error', onRedisError);
        client.on('connect', onRedisConnect);
        client.on('reconnecting', onRedisReconnecting);
        client.on('ready', onRedisReady);
        await client.connect();
        return client;
    },
    Inject:[ConfigService]
}


const onRedisError = (err: any) => {
    console.error('REDIS ERROR >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', err);
    Logger.error('REDIS ERROR >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    Logger.error(err);
  };
  
  const onRedisConnect = () => {
    console.log('Redis connected >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  };
  
  const onRedisReconnecting = () => {
    console.log('Redis reconnecting >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  };
  
  const onRedisReady = () => {
    console.log('Redis ready! >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  };