const { Client } = require('pg');  // Use Supabase's PostgreSQL client

// Netlify function to handle the submission
exports.handler = async (event, context) => {
  const { name, countryCode, mobile, email, city, feedback, image, date } = JSON.parse(event.body);
  
  const client = new Client({
    host: 'your-db-host',  // Update with your Supabase database URL
    database: 'your-database',
    user: 'your-username',
    password: 'your-password',
    port: 5432,
  });

  try {
    // Connect to the database
    await client.connect();

    // Insert feedback into Supabase/Postgres table
    const res = await client.query(
      'INSERT INTO feedback (name, country_code, mobile, email, city, feedback, image, date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      [name, countryCode, mobile, email, city, feedback, image, date]
    );

    // Send success response
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Feedback submitted successfully.' })
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error submitting feedback' })
    };
  } finally {
    await client.end();
  }
};
