create table public.collections (
    id uuid not null primary key,
    name text not null,
    created_by uuid not null references auth.users(id) on delete cascade,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

alter table public.collections enable row level security;

create policy "Allow users to manage their own collections"
    on public.collections for all
    using (created_by = auth.uid());