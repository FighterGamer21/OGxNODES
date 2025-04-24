const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

exports.handler = async () => {
  try {
    const { data, error } = await supabase.from('feedback').select('*').limit(1);

    if (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to connect to Supabase", details: error }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, data }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Unexpected server error", details: err.message }),
    };
  }
};
