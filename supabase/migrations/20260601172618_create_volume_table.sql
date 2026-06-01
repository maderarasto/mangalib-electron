create table public.volumes (
    id uuid not null primary key default gen_random_uuid(),
    collection_id uuid not null references public.collections(id) on delete cascade,
    title text not null,
    summary text,
    state volume_state not null,
    created_by uuid not null references auth.users(id) on delete cascade,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

alter table public.volumes enable row level security;

create policy "Allow users to manage their own volumes"
    on public.volumes for all
    using (created_by = auth.uid());