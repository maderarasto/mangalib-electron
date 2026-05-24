import { SupabaseContext } from "@supabase/server";
import z from "zod";
import { RouteParams, validateData } from "../utils.ts";
import { Database } from '../../_shared/database.types.ts';
import { errorResponse } from "../errors.ts";

export const createCollectionSchema = z.object({
  name: z.string({ message: "Name is required" }).min(1, "Name is required"),
});
export type CreateCollectionData = z.infer<typeof createCollectionSchema>;

const getCollections = async (
  req: Request,
  params: RouteParams,
  ctx: SupabaseContext<Database>
): Promise<Response> => {
  const { data: collections, error } = await ctx.supabase
    .from('collections')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching collections:', error);
    return errorResponse({ type: 'internal_error' });
  }

  const dateFormatter = new Intl.DateTimeFormat('en-CA');    

  return Response.json({
    data: {
      collections: collections?.map((collection) => ({
        ...collection,
        created_at: collection.created_at ? dateFormatter.format(new Date(collection.created_at)) : null,
        updated_at: collection.updated_at ? dateFormatter.format(new Date(collection.updated_at)) : null,
      })) ?? [],
    }
  });
}

const createCollection = async (
  req: Request,
  params: RouteParams,
  ctx: SupabaseContext<Database>
): Promise<Response> => {
  const { name } = await req.json();
  
  const user = await ctx.supabase.auth.getUser();

  if (!user.data.user) {
    return errorResponse({ type: 'unauthorized' });
  }

  const { success, errors } = validateData(createCollectionSchema, { name });
  
  if (!success) {
    return errorResponse({ 
      type: 'validation_error', 
      message: 'Invalid request data', 
      data: errors
    });
  }

  const { data: collection } = await ctx.supabase
    .from('collections')
    .select('*')
    .eq('name', name)
    .limit(1)
    .single();
  
  if (collection) {
    return errorResponse({
      type: 'validation_error',
      data: {
        name: 'A collection with this name already exists',
      }
    });
  }
  
  const result = await ctx.supabase
    .from('collections')
    .insert({
      name,
      created_by: user.data.user.id || '0',
    });
    
  return Response.json({
    data: {
      collection: result.data?.[0] || null,
      message: 'Collection created successfully',
    }
  });
}

export const routes = () => ({
  '[GET]:/collections': getCollections,
  '[POST]:/collections': createCollection,
})