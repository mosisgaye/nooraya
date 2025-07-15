import { NextRequest, NextResponse } from 'next/server';
import { createErrorResponse } from '../utils';
import { LoggingService } from '../services';

export function errorHandler(error: Error): NextResponse {
  LoggingService.error('API Error:', error);
  
  return createErrorResponse(
    {
      message: 'Internal server error',
      code: 'INTERNAL_ERROR',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    },
    500
  );
}

export function requestLogger(request: NextRequest) {
  const { method, url, headers } = request;
  LoggingService.log(`${method} ${url}`, {
    userAgent: headers.get('user-agent'),
    contentType: headers.get('content-type'),
  });
}

export async function validateRequest(
  request: NextRequest,
  requiredFields: string[] = []
): Promise<{ isValid: boolean; data?: unknown; error?: string }> {
  try {
    if (request.method === 'POST') {
      const body = await request.json();
      
      const missingFields = requiredFields.filter(field => !body[field]);
      if (missingFields.length > 0) {
        return {
          isValid: false,
          error: `Missing required fields: ${missingFields.join(', ')}`,
        };
      }
      
      return { isValid: true, data: body };
    }
    
    return { isValid: true };
  } catch {
    return {
      isValid: false,
      error: 'Invalid JSON in request body',
    };
  }
}