import { WebpayPlus, Options, IntegrationApiKeys, Environment, IntegrationCommerceCodes } from 'transbank-sdk';

// Configuración de Transbank
// En producción, estas variables deben venir de process.env
const commerceCode = process.env.TRANSBANK_COMMERCE_CODE || IntegrationCommerceCodes.WEBPAY_PLUS;
const apiKey = process.env.TRANSBANK_API_KEY || IntegrationApiKeys.WEBPAY;
const environment = process.env.NODE_ENV === 'production' ? Environment.Production : Environment.Integration;

const options = new Options(commerceCode, apiKey, environment);
export const webpayPlus = new WebpayPlus.Transaction(options);

export const TBK_RETURN_URL = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3002'}/api/transbank/confirm`;
