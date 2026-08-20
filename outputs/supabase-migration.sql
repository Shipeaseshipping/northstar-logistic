-- Run this if you already ran an earlier version of supabase-schema.sql.
-- It only updates the public tracking function; it does not delete shipments or users.
create or replace function public.get_public_tracking(p_key text)
returns jsonb
language plpgsql
security definer
set search_path=public
as $$
declare s public.shipments%rowtype;
begin
  select * into s from public.shipments where shipment_key=p_key;
  if not found then return null; end if;
  return s.data || jsonb_build_object(
    'key', s.shipment_key,
    'Map X', s.map_x,
    'Map Y', s.map_y
  );
end;
$$;

grant execute on function public.get_public_tracking(text) to anon, authenticated;
