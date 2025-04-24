const { createClient } = require('@supabase/supabase-js');

const supabase = createClient('https://jjmuatnffjayjnuungwd.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqbXVhdG5mZmpheWpudXVuZ3dkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5MDk4ODcsImV4cCI6MjA1OTQ4NTg4N30.HGfIjLAIK6cIuaoeDSK3ceOlvC8dgbusEitdsAi7f1A');

exports.handler = async () => {
  try {
    const { data, error } = await supabase
      .from('feedback')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      return { statusCode: 500, body: JSON.stringify({ error: 'Failed to fetch feedback.' }) };
    }

    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Server error.' }) };
  }
};
