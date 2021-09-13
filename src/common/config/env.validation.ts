import { plainToClass } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

class EnvironmentVariables {
  @IsNumber()
  PORT: number;

  @IsString()
  MONGO_URL: string;

  @IsString()
  JWT_SECRET: string;

  @IsString()
  GMAIL_ACCOOUNT: string;

  @IsString()
  GMAIL_PASSWORD: string;

  @IsString()
  NOTIFICATION_KEY: string;
}

export function envValidate(config: Record<string, unknown>) {
  //console.log(config);
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
