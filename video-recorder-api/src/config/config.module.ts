import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { ConfigService } from './config.service';

@Global()
@Module({})
export class ConfigModule {
  static forRoot(path?: string): DynamicModule {
    const configServiceProvider: Provider = {
      provide: ConfigService,
      useFactory: () => new ConfigService(path),
    };
    return {
      module: ConfigModule,
      providers: [configServiceProvider],
      exports: [configServiceProvider],
    };
  }
}
