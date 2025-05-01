import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from 'jsr:@supabase/supabase-js@2'


Deno.serve(async (req) => {
  if(req.methid !== 'GET'){
    return new Response(JSON.stringify({
      error : "Invalid request type"
    }));
  }

  const url = new URL(req.url);
  const user_id = url.searchParams.get("user_id");

  const supabaseUrl = 'https://iyuwhikkttuscyrzdolh.supabase.co';
  const supabaseKey = Deno.env.get("SERVICE_ROLE_KEY");

  if(!user_id){
    return new Response(
      JSON.stringify({
        error : "No input user_id param"
      }),{
        status : 400,
        headers : {"Content-Type" : "application/json"},
      }
    );
  }

  const supabaseClient = createClient(supabaseUrl, supabaseKey);

  const { data, error } = await supabaseClient
                            .from("notes")
                            .select("*")
                            .eq("user_id", user_id)
                            .order("created_at", {ascending : false});
  if (error) {
    return new Response(
      JSON.stringify({ 
        error: error.message 
      }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  return new Response(
    JSON.stringify({ 
      notes: data 
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
});


