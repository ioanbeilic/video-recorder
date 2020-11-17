import * as fs from 'fs';
import { parse } from 'dotenv';
import { cwd } from 'process';
import { Logger } from '@nestjs/common';

export class ConfigService {
  private envConfig: { [key: string]: string };

  constructor(path?: string) {
    const isDevEnv = process.env.NODE_ENv !== 'production';
    let envFilePath = `${cwd()}/.env`;

    if (path) {
      envFilePath = path;
    }

    if (isDevEnv) {
      if (!fs.existsSync(envFilePath)) {
        console.error('.env file does not exist');
        process.exit(0);
      }

      this.envConfig = parse(fs.readFileSync(envFilePath));

      Logger.debug(this.envConfig);
    } else {
      // todo see how process.env work on windows system
      this.envConfig = {
        PORT: process.env.PORT as string,
        MONGO_URI: process.env.MONGO_URI as string,
        HOST: process.env.HOST as string,
      };
    }
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
