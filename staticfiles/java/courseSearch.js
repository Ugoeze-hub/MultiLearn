// import { initializeApp } from "firebase/app";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { getDatabase, ref, push, set } from "firebase/database";
// import { getAnalytics } from "firebase/analytics";

// const firebaseConfig = {
//   apiKey: "AIzaSyCiCXhlUxE-OTfu_3jS2vr0_E1KYKrNM50",
//   authDomain: "learnify-ydfgroup2.firebaseapp.com",
//   databaseURL: "https://learnify-ydfgroup2-default-rtdb.firebaseio.com",
//   projectId: "learnify-ydfgroup2",
//   storageBucket: "learnify-ydfgroup2.firebasestorage.app",
//   messagingSenderId: "330149071608",
//   appId: "1:330149071608:web:4b64e760f8793b2835490d",
//   measurementId: "G-JGBSE62KS0"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

let nextPageToken = '';
let isLoading = false;


async function handleCourseSearch() {
    const input = document.getElementById("course-search");
    const query = input.value.trim();

    if (!query) {
        alert('Please enter a topic to search for.');
        return;
    }

    const resultsContainer = document.getElementById("search-results-container");
    resultsContainer.innerHTML = "<p>Loading...</p>";

    try {
        const response = await fetch(`/api/youtube-courses?topic=${encodeURIComponent(query)}`);
        const data = await response.json();

        if (data.error) {
            resultsContainer.innerHTML = `<p class="error">${data.error}</p>`;
            return;
        }

        resultsContainer.innerHTML = "";
        displayCourses(data.results);

        if (data.meta && data.meta.nextPageToken) {
            nextPageToken = data.meta.nextPageToken;
            resultsContainer.addEventListener('scroll', handleScroll);
        } else {
            nextPageToken = '';
        }

    } catch (err) {
        console.error('Fetch error:', err);
        resultsContainer.innerHTML = '<p class="error">An error occurred fetching courses.</p>';
    }
}

function displayCourses(courses) {
    const resultsContainer = document.getElementById("search-results-container");

    courses.forEach(course => {
        const title = course.title?.text && course.title.text.length > 0 ? course.title.text : "Untitled Course";
        const channel = course.channel || "Unknown Channel";
        const source = course.source || "Unknown Source";
        const url = course.url || "#";
        const duration = formatDuration(course.duration);

        const sourceImages = {
            "Udemy": "./static/img/udemy-logo.jpg",
            "Coursera": "./static/img/coursera-Logo.png",
            "YouTube": "./static/img/youtube-logo.jpg",
        };

        const courseImage = sourceImages[course.source] || '/static/img/icon.jpg';
        const thumbnailUrl = course.thumbnail || '/static/img/icon.jpg';
        const thumbnailImg = `<img src="${thumbnailUrl}" alt="${title}">`;

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            ${thumbnailImg}
            <div class="card-text">
                <button onclick="handleEnrollment('${title}', '${url}', '${source}')">Add</button>
                <p>Source: ${source}</p>
                <p>Channel: ${channel}</p>
                <p class="duration">Duration: ${formatDuration(duration)}</p>
                <button onclick="window.open('${url}', '_blank')">Continue Learning</button>
            </div>
        `;
        resultsContainer.appendChild(card);
    });
}

function handleScroll(event) {
    const container = event.target;
    if (container.scrollHeight - container.scrollTop <= container.clientHeight + 100) {
        if (nextPageToken && !isLoading) {
            loadMoreCourses();
        }
    }
}

async function loadMoreCourses() {
    isLoading = true;
    const query = document.getElementById("course-search").value.trim();

    try {
        const response = await fetch(`/api/youtube-courses?topic=${encodeURIComponent(query)}&pageToken=${nextPageToken}`);
        const data = await response.json();

        if (data.error) {
            console.error("Error loading more courses:", data.error);
            return;
        }

        displayCourses(data.results);

        if (data.meta && data.meta.nextPageToken) {
            nextPageToken = data.meta.nextPageToken;
        } else {
            nextPageToken = '';
            document.getElementById("search-results-container").removeEventListener('scroll', handleScroll);
        }
    } catch (err) {
        console.error('Fetch error:', err);
    } finally {
        isLoading = false;
    }
}

function formatDuration(duration) {
    if (!duration) return 'Unknown Duration';
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return duration;

    const hours = match[1] ? match[1].replace('H', '') + 'h ' : '';
    const minutes = match[2] ? match[2].replace('M', 'm ') : '';
    const seconds = match[3] ? match[3].replace('S', 's') : '';
    return `${hours}${minutes}${seconds}`.trim() || 'Unknown Duration';
}

async function handleEnrollment(title, url, source) {
  const success = await enrollCourse({
    title: title,
    url: url,
    source: source
  });
  
  if (success) {
    alert('Successfully enrolled!');
  } else {
    alert('Enrollment failed. Please login.');
  }
}
async function enrollCourse(courseData) {
  try {
    
    const enrolledRef = ref(db, `users/${user.uid}/enrolledCourses`);
    const newCourseRef = push(enrolledRef);
    await set(newCourseRef, {
      ...courseData,
      enrolledAt: new Date().toISOString()
    });
    return true;
  } catch (error) {
    console.error("Enrollment error:", error);
    return false;
  }
}