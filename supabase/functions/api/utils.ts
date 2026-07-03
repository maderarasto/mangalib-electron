import z from "zod";

const METHODS_WITH_BODY = ["POST", "PUT", "PATCH"];
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

export type RouteParams = Record<string, string>;

export const isRequestBodyValid = (req: Request): boolean => {
  if (!METHODS_WITH_BODY.includes(req.method)) {
    return true; // No body expected for this method
  }

  const cloned = req.clone();

  try {
    cloned.json()
    return true;
  } catch {
    return false;
  }
}

export const parseRouteParams = (urlPath: string, routePath: string, params: RouteParams): boolean => {
  const urlParts = urlPath.split('/').filter(Boolean);
  const routeParts = routePath.split('/').filter(Boolean);

  if (urlParts.length !== routeParts.length) {
    return false;
  }

  for (let i = 0; i < routeParts.length; i++) {
    const routePart = routeParts[i];
    const urlPart = urlParts[i];

    if (routePart.startsWith(':')) {
      const paramName = routePart.slice(1);
      params[paramName] = urlPart;
    } else if (routePart !== urlPart) {
      return false;
    }
  }

  return true;
}

export const validateData = <Data>(schema: z.ZodObject<z.ZodRawShape>, data: Data) => {
  const { success, error} = schema.safeParse(data);

  if (success || !error) {
    return { success, errors: null, };
  }

  const fieldErrors = Object.entries(
    error.formErrors.fieldErrors
  ).reduce((acc, [key, value]) => {
    return {
      ...acc,
      [key]: value?.at(0) ?? ''
    };
  }, {}) as Record<string, string[]>;

  return {
    success: false,
    errors: fieldErrors
  }
};

export const isValidUUID = (value: string): boolean => {
  return UUID_REGEX.test(value);
}