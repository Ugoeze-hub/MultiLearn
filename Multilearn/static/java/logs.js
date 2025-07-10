// // Check for user data in DOM
// const userElement = document.getElementById('user-data');
// if (userElement) {
//     try {
//         const userData = JSON.parse(userElement.dataset.user);
//         if (userData) {
//             sessionStorage.setItem('user', JSON.stringify(userData));
//         }
//     } catch (e) {
//         console.error('Failed to parse user data:', e);
//     }
// }

// document.addEventListener("DOMContentLoaded", () => {
//   const wrapper = document.querySelector(".wrapper");
//   const registerLink = document.querySelector(".register-link");
//   const loginLink = document.querySelector(".login-link");

//   registerLink.onclick = (e) => {
//     e.preventDefault();
//     console.log("Register clicked");
//     wrapper.classList.add("active");
//     // Update URL to reflect the signup view without creating a new history entry
//     history.replaceState(null, '', '/login?view=signup');
//     console.log("Wrapper classes:", wrapper.classList);
//   };

//   loginLink.onclick = (e) => {
//     e.preventDefault();
//     console.log("Login clicked");
//     wrapper.classList.remove("active");
//     // Update URL to reflect the login view without creating a new history entry
//     history.replaceState(null, '', '/login?view=login');
//     console.log("Wrapper classes:", wrapper.classList);
//   };
// });

// // After successful login, make sure to store user data
// fetch('/login', {
//   method: 'POST',
//   headers: {
//       'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//       email: email,
//       password: password
//   })
// })
// .then(response => response.json())
// .then(data => {
//   if (data.success) {
//       // Store user data in sessionStorage
//       sessionStorage.setItem('user', JSON.stringify({
//           user_id: data.user.user_id,
//           email: data.user.email,
//           user_name: data.user.user_name
//       }));
//       window.location.href = '/user';
//   } else {
//       showLoginError(data.message);
//   }
// });

// View toggling (unchanged)
document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(".wrapper");
  const registerLink = document.querySelector(".register-link");
  const loginLink = document.querySelector(".login-link");

  registerLink.onclick = (e) => {
    e.preventDefault();
    wrapper.classList.add("active");
    history.replaceState(null, '', '/login?view=signup');
  };

  loginLink.onclick = (e) => {
    e.preventDefault();
    wrapper.classList.remove("active");
    history.replaceState(null, '', '/login?view=login');
  };

  // Add login form handler
  const loginForm = document.querySelector('#login-form');
  if (loginForm) {
      loginForm.addEventListener('submit', handleLoginSubmit);
  }
});

// Login handler
async function handleLoginSubmit(e) {
    e.preventDefault();
    const form = e.target;
    
    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: form.querySelector('[name="email"]').value,
                password: form.querySelector('[name="password"]').value,
                form_type: 'login'
            })
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
        
        const result = await response.json();
        console.log('Response received:', result);
        
        if (result.status === 'success') {
            sessionStorage.setItem('user', JSON.stringify({
                user_id: result.user.user_id,
                email: result.user.email,
                user_name: result.user.user_name
            }));
            window.location.href = result.redirect_url || '/user'; // Redirect to user page or default
        } else {
            showLoginError(result.message);
        }
    } catch (error) {
        console.error('Login error:', error);
        showLoginError('Connection error');
    }

}

// Your existing error display function
function showLoginError(message) {
    const errorElement = document.querySelector('.login-error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    } else {
        alert(message); // Fallback
    }
}

