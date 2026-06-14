import { getSession } from "@/store/useAuth";
import { BaseArgs } from "./types";

const API_BASE_URL = `${import.meta.env.VITE_SUPABASE_FUNCTIONS_URL}`;

export type DataResponse<T> = {
  data: T;
  error: never;
}

export type ErrorResponse = {
  data: never;
  error: {
    type: string;
    message: string;
    data: Record<string, unknown>;
  }
}

export type ApiResponse<T = never> = DataResponse<T> | ErrorResponse;

const resolveApiUrl = (endpoint: string) => {
  if (endpoint.startsWith('/')) {
    return `${API_BASE_URL}${endpoint}`;
  } else {
    return `${API_BASE_URL}/${endpoint}`;
  }
}

const sendRequest = async<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  const session = getSession();

  if (session) {
    headers['Authorization'] = `Bearer ${session.access_token}`;
  }

  const response = await fetch(resolveApiUrl(endpoint), {
    headers,
    ...options,
  });
  
  return response.json();
};

export const client = {
  get: <T>(endpoint: string, query?: BaseArgs) => {
    let url = endpoint;

    if (query) {
      query = Object.fromEntries(Object.entries(query).filter(([_, value]) => {
        return value != undefined;
      }));

      url += `?${new URLSearchParams(query as Record<string, string>).toString()}`;
    }

    return sendRequest<T>(url, { method: 'GET' });
  },

  post: <T>(endpoint: string, args?: BaseArgs) => {
    return sendRequest<T>(endpoint, { 
      method: 'POST',
      body: args ? JSON.stringify(args) : undefined,
    });
  },

  put: <T>(endpoint: string, args?: BaseArgs) => {
    return sendRequest<T>(endpoint, { method: 'PUT', ...args });
  },

  delete: <T>(endpoint: string) => {
    return sendRequest<T>(endpoint, { method: 'DELETE' });
  },
}