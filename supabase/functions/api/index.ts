// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "@supabase/server";
import { routes as CollectionRoutes } from "./modules/collections.ts";
import { isRequestBodyValid, parseRouteParams, RouteParams } from "./utils.ts";
import { errorResponse } from "./errors.ts";

const ROUTE_REGEX = /\[([A-Z,]+)\]:((?:\/[a-zA-Z0-9-_#:]+){1,3})/;

const routes = {
  ...CollectionRoutes(),
}

export default {
  fetch: withSupabase({ auth: 'user' }, async (req, ctx) => {
    const url = new URL(req.url);
    const path = url.pathname.replace('/api', '');
    const method = req.method;
    
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'authorization, content-type',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    };

    if (method === 'OPTIONS') {
      return new Response(null, { headers }) // preflight
    }

    if (!isRequestBodyValid(req)) {
      return errorResponse({ type: 'invalid_payload' });
    }

    const routeParams: RouteParams = {};
    const routeKey = Object.keys(routes).find((route) => {
      const [_, routeMethod, routePath] = [...(route.match(ROUTE_REGEX) ?? [])];
      const methods = routeMethod.split(',');

      if (methods.includes(method) && parseRouteParams(path, routePath, routeParams)) {
        return true;
      }
      
      return false;
    }) as keyof typeof routes | undefined;

    if (routeKey) {
      return routes[routeKey](req, routeParams, ctx);
    }

    return errorResponse({ type: 'not_found' });
  }),
};