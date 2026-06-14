import { SupabaseContext } from "@supabase/server";
import z from "zod";
import { isValidUUID, RouteParams, validateData } from "../utils.ts";
import { Database } from '../../_shared/database.types.ts';
import { errorResponse } from "../errors.ts";

const getVolumes = async (
  req: Request,
  params: RouteParams,
  ctx: SupabaseContext<Database>
): Promise<Response> => {
  const query = new URLSearchParams(new URL(req.url).search);
  const user = await ctx.supabase.auth.getUser();

  if (!user.data.user) {
    return errorResponse({ type: 'unauthorized' });
  }

  const collectionId = query.get('collection_id');

  if (collectionId && !isValidUUID(collectionId ?? '')) {
    return errorResponse({ type: 'invalid_payload', message: 'collection_id must be a valid UUID' });
  }

  let result = ctx.supabase
    .from('volumes')
    .select('*')
    .eq('created_by', user.data.user.id)
    .order('id', { ascending: true });

  if (collectionId) {
    result = result.eq('collection_id', collectionId);
  }

  const { data: volumes, error } = await result;

  if (error) {
    console.error('Error fetching volumes:', error);
    return errorResponse({ type: 'internal_error' });
  }

  const dateFormatter = new Intl.DateTimeFormat('en-CA');    

  return Response.json({
    data: {
      volumes: volumes?.map((volume) => ({
        ...volume,
        created_at: volume.created_at ? dateFormatter.format(new Date(volume.created_at)) : null,
        updated_at: volume.updated_at ? dateFormatter.format(new Date(volume.updated_at)) : null,
      })) ?? [],
    }
  });
}

export const routes = () => ({
  '[GET]:/volumes': getVolumes,
})