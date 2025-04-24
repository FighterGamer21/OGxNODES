// Initialize the Supabase client
const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://jjmuatnffjayjnuungwd.supabase.co';  // Replace with your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqbXVhdG5mZmpheWpudXVuZ3dkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5MDk4ODcsImV4cCI6MjA1OTQ4NTg4N30.HGfIjLAIK6cIuaoeDSK3ceOlvC8dgbusEitdsAi7f1A';  // Replace with your Supabase anon key
const supabase = createClient(supabaseUrl, supabaseKey);

// Subscribe to real-time changes in the 'feedback' table
const feedbackChannel = supabase
  .from('feedback')  // Subscribe to the 'feedback' table
  .on('INSERT', payload => {
    console.log('New feedback received:', payload);
    displayFeedback();  // Update the feedback display when new data is added
  })
  .subscribe();

// Display the feedback list (this function is called to show feedback on page load)
function displayFeedback() {
  const container = document.getElementById('feedbackList');
  const feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
  container.innerHTML = '';

  feedbacks.forEach((f, i) => {
    const div = document.createElement('div');
    div.style = 'border: 1px solid #ccc; border-radius: 12px; padding: 15px; margin-bottom: 15px; background: #f8f8f8; color: #333;';
    div.innerHTML = `
      <img src="${f.image}" alt="User Image" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; margin-bottom: 10px;">
      <p><strong>${f.name}</strong> (${f.country}, ${f.city})</p>
      <p>📅 ${f.date}</p>
      <p>📞 ${f.countryCode} ${f.mobile} | ✉️ ${f.email}</p>
      <p style="margin-top: 10px;">🗣️ "${f.feedback}"</p>
      <button onclick="removeFeedback(${i})" style="margin-top:10px;background:#e74c3c;color:#fff;border:none;padding:5px 10px;border-radius:5px;">Remove</button>
    `;
    container.appendChild(div);
  });
}

// Optionally, add a function to remove feedback
function removeFeedback(index) {
  const feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
  feedbacks.splice(index, 1);
  localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
  displayFeedback();
}

// Call the displayFeedback function to load the feedback initially
window.onload = displayFeedback;
