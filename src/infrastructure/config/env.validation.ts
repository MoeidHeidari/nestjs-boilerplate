import { plainToClass } from 'class-transformer';
import { validateSync, IsOptional } from 'class-validator';

/**
 * env vatiables
 */
class EnvironmentVariables {
  /**
   * Represents the amount of comission for each transaction
   */
  @IsOptional()
  TRANSACTION_COMMISSION = 0.001;

  @IsOptional()
  WIDRAW_COMMISSION = 0.001;

  @IsOptional()
  DEPOSIT_FEE_PER_MINUTE = 0.0001;
}

/**
 * validates the config
 * @param config congig
 * @returns validated config
 */
export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, { enableImplicitConversion: true });
  const errors = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
