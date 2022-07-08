import { expandEnvVariables } from '../../domain/helpers';
expandEnvVariables();

/**
 * options enum
 */
export enum EnvObjects {
  TRANSACTION_COMMISSION = 'VirtualBankOptions',
  WIDRAW_COMMISSION = 'VirtualBankOptions',
  DEPOSIT_FEE_PER_MINUTE = 'VirtualBankOptions',
}
//===================================================================================================
/**
 * VirtualBank options
 */
export interface VirtualBankOptions {
  /**
   * Represents the commision amount defined for each money transaction
   */
  transaction_commission: number;
  /**
   * Represents the ammount of commission for each widrawal
   */
  widraw_commission: number;

  /**
   * Represents the fee for each minute more if customer keeps the money in our bank
   */
  deposit_fee_per_minute: number;
}

/**
 * configuration function
 * @returns configuration taken from env
 */
export const configuration = (): any => ({
  VirtualBankOptions: {
    transaction_commission: process.env.TRANSACTION_COMMISSION,
    widraw_commission: process.env.WIDRAW_COMMISSION,
    deposit_fee_per_minute: process.env.DEPOSIT_FEE_PER_MINUTE,
  },
});
