let input = document.querySelector('input');
let search = document.querySelector('button');
let image = document.querySelector('.logo');
let ProfileName = document.querySelector('#name');
let joiningDate = document.querySelector('#joiningDate');
let userName = document.querySelector('#username');
let about = document.querySelector('#about');
let reposval = document.querySelector('#reposval');
let followersval = document.querySelector('#followersval');
let followingval = document.querySelector('#followingval');
let city = document.querySelector('#city');
let twitter = document.querySelector('#twitter');
let blog = document.querySelector('#blog');
let linkedIn = document.querySelector('#linkedIn');

let setdarklightmode = document.querySelector('.setdarklightmode');
let url = "https://api.github.com/users";

// Initialize light mode by default
let light = true;

// Hide profile container initially
document.querySelector('.dev-container').classList.remove('active');

// Fetch GitHub data
async function datasearch(api) {
    const response = await fetch(api);
    const val = await response.json();

    if (!input.value.trim() || val.message === "Not Found") {
        document.querySelector('.dev-container').classList.remove('active');
        document.querySelector('.not-found').classList.add('active');
        return;
    }

    document.querySelector('.not-found').classList.remove('active');
    document.querySelector('.dev-container').classList.add('active');

    ProfileName.innerText = val.name || "Not Available";
    userName.innerText = val.login || "Not Available";
    let [date] = val.created_at.split('T');
    let [year, month, day] = date.split('-');
    joiningDate.innerText = `Joined ${day}/${month}/${year}`;
    image.src = val.avatar_url;
    about.innerText = `${val.bio || 'No bio'} || ${val.company || 'No company'} || ${val.location || 'No location'}`;
    
    city.innerText = val.location ? val.location.split(',')[0] : "Not Available";
    twitter.innerText = val.twitter_username || "Not Available";
    blog.innerText = val.blog || "Not Available";

    followersval.innerText = val.followers;
    followingval.innerText = val.following;
    reposval.innerText = val.public_repos;
}

// Trigger search
search.addEventListener('click', () => {
    const api = `${url}/${input.value.trim()}`;
    datasearch(api);
});

// Allow Enter key for search
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        search.click();
    }
});

// Dark/Light Mode Toggle
setdarklightmode.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    light = !light;

    setdarklightmode.innerHTML = light
        ? `Dark <img src="./image/moon-dark-theme-svgrepo-com.svg" height="24" width="24" class="darklightimg" alt="">`
        : `Light <img src="./image/light-svgrepo-com.svg" height="24" width="24" class="darklightimg" alt="">`;
});
const toggleBtn = document.getElementById("themeToggleBtn");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  // Toggle emoji
  if (document.body.classList.contains("dark-mode")) {
    toggleBtn.textContent = "☀️"; // light mode icon
  } else {
    toggleBtn.textContent = "🌙"; // dark mode icon
  }
});

