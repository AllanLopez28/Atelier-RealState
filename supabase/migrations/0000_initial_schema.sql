-- Habilitar extensión para UUIDs
create extension if not exists "uuid-ossp";

-- 1. Agencias (Tenants)
create table public.agencies (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  logo_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Perfiles (Usuarios del sistema extendiendo auth.users)
create type public.user_role as enum ('owner', 'admin', 'agent');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  agency_id uuid references public.agencies(id) on delete cascade,
  role user_role default 'agent'::user_role not null,
  first_name text,
  last_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Propiedades (Listings)
create type public.property_status as enum ('draft', 'published', 'sold', 'rented', 'archived');
create type public.property_type as enum ('house', 'apartment', 'condo', 'land', 'commercial');
create type public.listing_type as enum ('sale', 'rent');

create table public.properties (
  id uuid primary key default uuid_generate_v4(),
  agency_id uuid references public.agencies(id) on delete cascade not null,
  agent_id uuid references public.profiles(id) on delete set null,
  title text not null,
  description text,
  property_type property_type not null,
  listing_type listing_type not null,
  price numeric not null,
  currency text default 'USD' not null,
  address text,
  city text,
  state text,
  zip_code text,
  country text default 'US',
  bedrooms integer,
  bathrooms numeric, -- puede ser 2.5 baños
  area_sqm numeric,
  status property_status default 'draft'::property_status not null,
  image_urls text[] default '{}'::text[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Leads (Contactos de clientes interesados)
create type public.lead_status as enum ('new', 'contacted', 'qualified', 'lost', 'won');

create table public.leads (
  id uuid primary key default uuid_generate_v4(),
  agency_id uuid references public.agencies(id) on delete cascade not null,
  property_id uuid references public.properties(id) on delete set null,
  first_name text not null,
  last_name text,
  email text not null,
  phone text,
  message text,
  status lead_status default 'new'::lead_status not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==========================================
-- Triggers de actualizacion (updated_at)
-- ==========================================

create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_agencies_updated_at
  before update on public.agencies
  for each row execute procedure public.handle_updated_at();

create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();

create trigger set_properties_updated_at
  before update on public.properties
  for each row execute procedure public.handle_updated_at();

create trigger set_leads_updated_at
  before update on public.leads
  for each row execute procedure public.handle_updated_at();

-- ==========================================
-- Trigger para crear perfil en auth.users
-- ==========================================

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, first_name, last_name)
  values (new.id, new.raw_user_meta_data->>'first_name', new.raw_user_meta_data->>'last_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ==========================================
-- Habilitar Row Level Security (RLS)
-- ==========================================

alter table public.agencies enable row level security;
alter table public.profiles enable row level security;
alter table public.properties enable row level security;
alter table public.leads enable row level security;

-- Políticas para Agencies
-- Cualquiera puede ver las agencias (necesario para las vistas publicas del SaaS)
create policy "Agencies are viewable by everyone" on public.agencies for select using (true);
-- Solo admin/owner de la agencia puede actualizar
create policy "Owners can update their agency" on public.agencies for update using (
  exists (
    select 1 from public.profiles
    where profiles.id = auth.uid() and profiles.agency_id = agencies.id and profiles.role in ('owner', 'admin')
  )
);

-- Políticas para Profiles
-- Un usuario puede ver los perfiles de su misma agencia
create policy "Users can view profiles in their agency" on public.profiles for select using (
  agency_id = (select agency_id from public.profiles where id = auth.uid())
);
-- Un usuario puede actualizar su propio perfil
create policy "Users can update own profile" on public.profiles for update using (id = auth.uid());

-- Políticas para Properties
-- Cualquiera puede ver propiedades publicadas
create policy "Published properties are viewable by everyone" on public.properties for select using (status = 'published');
-- Agentes pueden ver TODAS las propiedades de su agencia
create policy "Agents can view all agency properties" on public.properties for select using (
  agency_id = (select agency_id from public.profiles where id = auth.uid())
);
-- Agentes pueden insertar propiedades en su agencia
create policy "Agents can insert properties" on public.properties for insert with check (
  agency_id = (select agency_id from public.profiles where id = auth.uid())
);
-- Agentes pueden actualizar propiedades de su agencia
create policy "Agents can update agency properties" on public.properties for update using (
  agency_id = (select agency_id from public.profiles where id = auth.uid())
);

-- Políticas para Leads
-- Cualquiera (incluso anon) puede insertar un lead desde un formulario público
create policy "Anyone can insert leads" on public.leads for insert with check (true);
-- Solo los agentes de la agencia pueden ver los leads de su agencia
create policy "Agents can view agency leads" on public.leads for select using (
  agency_id = (select agency_id from public.profiles where id = auth.uid())
);
-- Solo los agentes de la agencia pueden actualizar los leads (ej. cambiar status)
create policy "Agents can update agency leads" on public.leads for update using (
  agency_id = (select agency_id from public.profiles where id = auth.uid())
);
