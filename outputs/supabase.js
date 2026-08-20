import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
export const supabase=createClient("https://dtzuagluzfshsvjfeoar.supabase.co","sb_publishable_xzHBV3mB6Iwit2rX66TaVA_p55ZqrOg");
export async function role(){const {data:{user}}=await supabase.auth.getUser();if(!user)return null;const {data}=await supabase.rpc('my_role');return data}
