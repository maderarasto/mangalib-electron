type ErrorType = (
  | 'invalid_payload'
  | 'validation_error'
  | 'unauthorized'
  | 'not_found'
  | 'internal_error'
);

type ErrorData = Record<string, unknown>;

interface ErrorParams {
  type: ErrorType;
  message?: string;
  data?: ErrorData;
}

const DEFAULT_ERRORS: Record<ErrorType, { status: number; message: string }> = {
  invalid_payload: { 
    status: 400, 
    message: 'Malformed JSON' 
  },
  validation_error: { 
    status: 400, 
    message: 'Invalid request data' 
  },
  unauthorized: { 
    status: 401, 
    message: 'Unauthorized' 
  },
  not_found: { 
    status: 404, 
    message: 'Route not found' 
  },
  internal_error: { 
    status: 500, 
    message: 'Internal server error' 
  },
};

export const errorResponse = ({ type, message, data = {} }: ErrorParams): Response => {
  const defaultError = DEFAULT_ERRORS[type];

  return Response.json({
    error: {
      type,
      message: message || defaultError.message,
      data,
    }
  }, { status: defaultError.status });
}