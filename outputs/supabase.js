// Load the Supabase SDK in the background. Customer tracking has its own
// direct request and is therefore never blocked by an SDK/CDN delay.
const clientPromise = import('https://esm.sh/@supabase/supabase-js@2').then(({ createClient }) =>
  createClient('https://dtzuagluzfshsvjfeoar.supabase.co', 'sb_publishable_xzHBV3mB6Iwit2rX66TaVA_p55ZqrOg')
);

export const supabase = {
  rpc: (...args) => clientPromise.then(client => client.rpc(...args)),
  auth: {
    getUser: () => clientPromise.then(client => client.auth.getUser()),
    signOut: () => clientPromise.then(client => client.auth.signOut()),
    onAuthStateChange: callback => {
      clientPromise.then(client => client.auth.onAuthStateChange(callback));
      return { data: { subscription: { unsubscribe() {} } } };
    }
  }
};

export async function role() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data } = await supabase.rpc('my_role');
  return data;
}

import './route-enhancements.js';
import './customer-tracker-fix.js';
