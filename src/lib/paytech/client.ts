
export interface PayTechConfig {
  apiKey: string;
  secretKey: string;
  apiUrl: string;
  callbackUrl: string;
}

export interface PayTechTransaction {
  phone: string;
  amount: number;
  codeService: string;
  externalTransactionId: string;
  callbackUrl?: string;
  data?: Record<string, unknown>;
}

export interface PayTechResponse {
  success: boolean;
  msg?: string;
  error?: boolean;
  data?: {
    transactionId?: string;
    status?: string;
    [key: string]: unknown;
  };
}

export class PayTechClient {
  private config: PayTechConfig;

  constructor(config: PayTechConfig) {
    this.config = config;
  }

  /**
   * Format phone number for PayTech
   * For card payments and WhatsApp, use international format
   */
  private formatPhoneNumber(phone: string, codeService: string): string {
    // Remove all non-numeric characters
    let cleanPhone = phone.replace(/\D/g, '');

    // Services requiring international format
    const internationalServices = ['BANK_CARD_API_CASH_OUT', 'WHATSAPP_MESSAGING'];
    
    if (internationalServices.includes(codeService)) {
      // Ensure international format
      if (!cleanPhone.startsWith('221')) {
        cleanPhone = '221' + cleanPhone;
      }
      return '+' + cleanPhone;
    }

    // For local services, remove country code if present
    if (cleanPhone.startsWith('221')) {
      cleanPhone = cleanPhone.substring(3);
    }

    return cleanPhone;
  }

  /**
   * Create a payment transaction
   */
  async createPayment(transaction: PayTechTransaction): Promise<PayTechResponse> {
    try {
      const formattedPhone = this.formatPhoneNumber(transaction.phone, transaction.codeService);
      
      const payload = {
        apiKey: this.config.apiKey,
        phone: formattedPhone,
        amount: transaction.amount,
        codeService: transaction.codeService,
        externalTransactionId: transaction.externalTransactionId,
        callbackUrl: transaction.callbackUrl || this.config.callbackUrl,
        ...(transaction.data && { data: JSON.stringify(transaction.data) })
      };

      const response = await fetch(`${this.config.apiUrl}/api-services/operation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(30000) // 30 seconds timeout
      });

      const data = await response.json();

      if (!response.ok) {
        // Map PayTech error codes to user-friendly messages
        const errorMessages: Record<string, string> = {
          'INSUFFICIENT_BALANCE': 'Solde insuffisant',
          'INVALID_PHONE': 'Numéro de téléphone invalide',
          'SERVICE_UNAVAILABLE': 'Service temporairement indisponible',
          'TRANSACTION_LIMIT': 'Limite de transaction atteinte',
          'INVALID_AMOUNT': 'Montant invalide'
        };
        
        const userMessage = errorMessages[data.code] || data.msg || 'Erreur PayTech';
        throw new Error(userMessage);
      }

      return {
        success: true,
        data
      };
    } catch (error) {
      console.error('PayTech payment error:', error);
      return {
        success: false,
        error: true,
        msg: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Check account balance
   */
  async checkBalance(): Promise<PayTechResponse> {
    try {
      const response = await fetch(`${this.config.apiUrl}/api-services/balance`, {
        method: 'GET',
        headers: {
          'Secretkey': this.config.apiKey
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || 'Failed to get balance');
      }

      return {
        success: true,
        data
      };
    } catch (error) {
      console.error('PayTech balance error:', error);
      return {
        success: false,
        error: true,
        msg: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Get available services
   */
  async getServices(): Promise<PayTechResponse> {
    try {
      const response = await fetch(`${this.config.apiUrl}/api-services/services`, {
        method: 'GET',
        headers: {
          'Secretkey': this.config.apiKey
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || 'Failed to get services');
      }

      return {
        success: true,
        data
      };
    } catch (error) {
      console.error('PayTech services error:', error);
      return {
        success: false,
        error: true,
        msg: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Verify callback hash
   */
  static async verifyCallbackHash(
    transactionId: string,
    externalTransactionId: string,
    receivedHash: string,
    apiKey: string
  ): Promise<boolean> {
    const crypto = await import('crypto');
    const expectedHash = crypto
      .createHash('sha256')
      .update(`${transactionId}|${externalTransactionId}|${apiKey}`)
      .digest('hex');
    
    return expectedHash === receivedHash;
  }
}

// Service codes for Nooraya Voyages
export const PAYTECH_SERVICES = {
  // Orange Money
  ORANGE_CASH_IN: 'ORANGE_SN_API_CASH_IN',
  ORANGE_CASH_OUT: 'ORANGE_SN_API_CASH_OUT',
  
  // Wave
  WAVE_CASH_IN: 'WAVE_SN_API_CASH_IN',
  WAVE_CASH_OUT: 'WAVE_SN_API_CASH_OUT',
  
  // Card payment
  CARD_PAYMENT: 'BANK_CARD_API_CASH_OUT',
  
  // WhatsApp
  WHATSAPP: 'WHATSAPP_MESSAGING'
};

// Create singleton instance
export const paytechClient = new PayTechClient({
  apiKey: process.env.PAYTECH_API_KEY || '',
  secretKey: process.env.PAYTECH_SECRET_KEY || '',
  apiUrl: process.env.PAYTECH_API_URL || 'https://api.intech.sn',
  callbackUrl: process.env.PAYTECH_CALLBACK_URL || ''
});

// Export error codes for reference
export const PAYTECH_ERRORS = {
  INSUFFICIENT_BALANCE: 'INSUFFICIENT_BALANCE',
  INVALID_PHONE: 'INVALID_PHONE',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
  TRANSACTION_LIMIT: 'TRANSACTION_LIMIT',
  INVALID_AMOUNT: 'INVALID_AMOUNT',
  TIMEOUT: 'TIMEOUT',
  NETWORK_ERROR: 'NETWORK_ERROR'
};