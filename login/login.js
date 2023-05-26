const loginText = document.getElementById('loginText');
const loginBtn = document.getElementById('loginBtn');

loginBtn.addEventListener('click', async () => {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const userType = document.querySelector('input[name="userType"]:checked').value;

  try {
    const response = await fetch('https://backend-livid-psi.vercel.app/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: username, password, userType })
    });

    const data = await response.json();

    if (response.ok) {
      console.log(data);
      loginText.innerHTML = data.success;

      // Redirect to the appropriate page based on the user type
      if (userType === 'placementOfficer') {
        localStorage.setItem('jwt', data.authToken);
        window.location.href = 'index.html';
      } else {
        window.location.href = 'index.html';
        !localStorage.setItem('jwt', data.authToken);
      }
    } else {
      console.log('Error:', response.status);
      // Display an alert for wrong username or password
      alert('Wrong username or password. Please try again.');
    }
  } catch (error) {
    console.log('Error:', error);
  }
});
