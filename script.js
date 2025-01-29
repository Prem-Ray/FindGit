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

let url = "https://api.github.com/users";

let setdarklightmode = document.querySelector('.setdarklightmode');
let light = 1;

document.querySelector('.dev-container').classList.remove('active');

// get data from search
async function datasearch(api) {
    let response = await fetch(api);
    let val = await response.json();
    console.log(val);
    if (input.value === '') {
        document.querySelector('.dev-container').classList.remove('active');
        document.querySelector('.not-found').classList.add('active');
        return;
    }
    document.querySelector('.not-found').classList.remove('active');
    document.querySelector('.dev-container').classList.add('active');

    ProfileName.innerText = val.name;
    userName.innerText = val.login;
    let timestamp = val.created_at;
    let [date, time] = timestamp.split('T');
    let [year, month, day] = date.split('-');
    joiningDate.innerText = `Joined ${day}/${month}/${year}`;
    image.src = val.avatar_url;
    about.innerText = `${val.bio} || ${val.company} || ${val.location}`;
    
    if(val.location) {
        let [cityName] = val.location.split(',');
        city.innerText = cityName;
    } else {
        city.innerText = "Not Available";
    }

    if(val.twitter_username){
        twitter.innerText = val.twitter_username;
    } else{
        twitter.innerText = "Not Available" ;
    }
    
    if(val.blog){
        blog.innerText = val.blog;
    } else {
        blog.innerText = "Not Available";
    }

    followersval.innerText = val.followers;
    followingval.innerText = val.following;
    reposval.innerText = val.public_repos;
}

// for searching
search.addEventListener('click', (e) => {
    console.log(input.value);
    let api = `${url}/${input.value}`;
    console.log(api);

    datasearch(api);
});

// Handle Enter key press for search
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        search.click();
    }
});

// for dark-light mode set up
setdarklightmode.addEventListener('click', (e) => {
    if (light === 1) {
        // light mode to dark mode
        setdarklightmode.innerHTML = `Light <img src="./image/light-svgrepo-com.svg" height="24" width="24" class="darklightimg" alt="">`;
        light = 0;
        document.querySelector('.wrapper').style = `
            overflow-x: hidden;
            overflow-y: hidden;
            height: 100vh;
            width: 100vw;
            background-color: #041822;
            position: relative;
        `;

        document.querySelector('#size').style = `
        color:White ;
        display:flex ;
        justify-content: space-between;
        width:950px ;
        margin:1.08rem ;
        background-color: #042525 ;`;

        document.querySelector('.search-container').style = `
        font-size:1.2rem ;
        position: relative;
        padding: 1.3rem 2.33rem ;
        color:white ;
        background-color: #042525 ;
        display: flex ;
        justify-content: space-between;
        align-items: center;
        border-radius: 12px;`;

        document.querySelector('.darklightimg').style = `
        color:white ; 
        margin-left:1rem ;`;

        document.querySelector('input').style = `
        background: none;
        border: none;
        color: white; 
        font-size:1.2rem ;
        font-weight:250 ;
        padding-left:8px ;`;

        document.querySelector('.dev-container').style = `
        width:950px ;
        color:#FFFFFF ;
        background-color: #042525 ;
        position: relative;
        height:405px ;
        border-radius: 12px ;`;
        
    } else { 
        // dark mode to light mode
        setdarklightmode.innerHTML = `Dark <img src="./image/moon-dark-theme-svgrepo-com.svg" height="24" width="24" class="darklightimg" alt="">`;
        light = 1;

        document.querySelector('.wrapper').style = `
            overflow-x: hidden ;
            overflow-y: hidden ;
            height:100vh ;
            width:100vw ;
            background-color: #FFFFFF;
            position: relative;
        `;

        document.querySelector('#size').style = `
        color:black ;
        display:flex ;
        justify-content: space-between;
        width:950px ;
        margin:1.08rem ;
        background-color: #87CEEB;`;

        document.querySelector('.search-container').style = `
        font-size:1.2rem ;
        position: relative;
        padding: 1.3rem 2.33rem ;
        color:white ;
        background-color: #87CEEB;
        display: flex ;
        justify-content: space-between;
        align-items: center;
        border-radius: 12px;`;

        document.querySelector('.darklightimg').style = `
        color:#041822 ;
        margin-left:1rem ;`;

        document.querySelector('input').style = `
        background: none;
        border: none;
        color:#041822 ;
        font-size:1.2rem ;
        font-weight:250 ;
        padding-left:8px ;`;

        document.querySelector('.dev-container').style = `
        width:950px ;
        color:#212121 ;
        background-color: #fff;
        position: relative;
        height:405px ;
        border-radius: 12px ;`;
    }
});
