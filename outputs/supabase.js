import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
const stylesheet=document.createElement("link");stylesheet.rel="stylesheet";stylesheet.href="./professional.css";document.head.append(stylesheet);
export const supabase=createClient("https://dtzuagluzfshsvjfeoar.supabase.co","sb_publishable_xzHBV3mB6Iwit2rX66TaVA_p55ZqrOg");
export async function role(){const {data:{user}}=await supabase.auth.getUser();if(!user)return null;const {data}=await supabase.rpc('my_role');return data}
import './route-enhancements.js';
import './customer-tracker-fix.js';
