const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const feedback = JSON.parse(event.body);
    const { name, feedback: message, country, city, countryCode, mobile, email, image, date } = feedback;

    const { error } = await supabase.from("feedback").insert([
      {
        name,
        message,
        country,
        city,
        countryCode,
        mobile,
        email,
        image,
        date: new Date().toISOString(),  // Use ISO format for date
      },
    ]);

    if (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to insert feedback." }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Feedback submitted successfully." }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server error." }),
    };
  }
};
