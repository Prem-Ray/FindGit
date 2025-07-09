// Input and display elements
const input = document.querySelector('input');
const search = document.querySelector('button');
const image = document.querySelector('.logo');
const ProfileName = document.querySelector('#name');
const joiningDate = document.querySelector('#joiningDate');
const userName = document.querySelector('#username');
const about = document.querySelector('#about');
const reposval = document.querySelector('#reposval');
const followersval = document.querySelector('#followersval');
const followingval = document.querySelector('#followingval');
const city = document.querySelector('#city');
const twitter = document.querySelector('#twitter');
const blog = document.querySelector('#blog');
const linkedIn = document.querySelector('#linkedIn');
const toggleBtn = document.getElementById("themeToggleBtn");

// GitHub API base URL
const url = "https://api.github.com/users";

// Hide profile initially
document.querySelector('.dev-container').classList.remove('active');

// Fetch GitHub user data
async function datasearch(api) {
    try {
        const response = await fetch(api);
        const val = await response.json();

        // Handle errors or empty input
        if (!input.value.trim() || val.message === "Not Found") {
            document.querySelector('.dev-container').classList.remove('active');
            document.querySelector('.not-found').classList.add('active');
            return;
        }

        // Show profile container
        document.querySelector('.not-found').classList.remove('active');
        document.querySelector('.dev-container').classList.add('active');

        // Fill user info
        ProfileName.innerText = val.name || "Not Available";
        userName.innerText = val.login || "Not Available";
        image.src = val.avatar_url;
        const [date] = val.created_at.split('T');
        const [year, month, day] = date.split('-');
        joiningDate.innerText = `Joined ${day}/${month}/${year}`;
        about.innerText = `${val.bio || 'No bio'} || ${val.company || 'No company'} || ${val.location || 'No location'}`;

        city.innerText = val.location ? val.location.split(',')[0] : "Not Available";
        twitter.innerText = val.twitter_username || "Not Available";
        blog.innerText = val.blog || "Not Available";
        linkedIn.innerText = "Not Available"; // GitHub doesn't provide LinkedIn

        reposval.innerText = val.public_repos;
        followersval.innerText = val.followers;
        followingval.innerText = val.following;
    } catch (error) {
        console.error("Error fetching user:", error);
    }
}

// Search button click
search.addEventListener('click', () => {
    const api = `${url}/${input.value.trim()}`;
    datasearch(api);
});

// Search on Enter key
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        search.click();
    }
});

// Theme toggle button (emoji 🌙 / ☀️)
window.addEventListener("DOMContentLoaded", () => {
    toggleBtn.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    toggleBtn.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});
