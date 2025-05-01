import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from 'jsr:@supabase/supabase-js@2'

// used post as we are adding/creating new data to db.
// parameters are taken from body just like as usual.
Deno.serve(async (req) => {
  if(req.methid !== 'POST'){
    return new Response(JSON.stringify({
      error : "Invalid request type"
    }));
  }

  const {user_id, content} = await req.json();
  const supabaseUrl = 'https://iyuwhikkttuscyrzdolh.supabase.co';
  const supabaseKey = Deno.env.get("SERVICE_ROLE_KEY");

  if (!user_id || !content) {
    return new Response(
      JSON.stringify({ 
        error: "Incomplete input values" 
      }), 
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const supabaseClient = createClient(supabaseUrl, supabaseKey);

  const { data, error } = await supabaseClient
                          .from("notes")
                          .insert({
                            user_id,
                            content,
                          });
  
  if(error){
    return new Response(
      JSON.stringify({
        error : error.message
      }), {
        status: 500,
        headers : {"Content-Type" : "application/json"}
      }
    );
  }

  return new Response(
    JSON.stringify({
      message : "Note added : ", data
    }), {
      status : 200,
      headers : {"Content-Type" : "application/json"}
    }
  );  
});


