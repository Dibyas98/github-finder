let search = document.querySelector("#search");
let searchbtn = document.querySelector(".searchbtn");
// console.log(search);
searchbtn.addEventListener("click", function () {
    console.log(search);
    gitcall(search);
});
search.addEventListener('keyup',function(event){
    if(event.key==='Enter'){
        gitcall(search);
    }
})

async function gitcall(searc) {
        const response = await fetch(`https://api.github.com/users/${search.value}`);
        let data = await response.json();
        // console.log(data);
        // console.log(data.public_repos);
        displayprofile(data);
        if (data.message=='Not Found'){
            let parent = document.querySelector(".profile");
            parent.innerHTML='<p class="h-8 text-xl text-left">User not found</p>';
        }
        else{
            displayprofile(data);
        }
    

}

function displayprofile(data) {
    let parent = document.querySelector(".profile");
    // console.log(parent);
    parent.innerHTML = `
    <div class="flex p-5 w-11/12">
    <img src="${data.avatar_url}" alt="" class="w-28 h-28 rounded-full">
    <div class="flex w-10/12 justify-between p-11">
        <div>
            <h1 class="text-3xl font-bold  dark:text-white">${data.name}</h1>
            <a href="" class="text-xl">${data.login}</a>
        </div>
        <p class="text-xl"> Joined - ${new Date(data.created_at).toLocaleDateString('en-US')}</p>
    </div>
</div>
<div class="w-10/12 h-16 bg-slate-50 rounded-xl  dark:text-gray-900">
    <ul class="h-full flex justify-between items-center p-5">
        <li class="">repos -<br><span>${data.public_repos}</span></li>
        <li>followers -<br><span>${data.followers}</span></li>
        <li>following -<br><span>${data.following}</span></li>
    </ul>
</div>
<div class="flex justify-between w-11/12 p-10">
    <ul>
        <li><i class="fa-solid fa-location-dot"></i>
            <br><span>${data.location}</span>
        </li>
        <li><i class="fa-solid fa-link"></i>
            <br><span>${data.blog}</span>
        </li>
    </ul>
    <ul>
        <li><i class="fa-brands fa-twitter"></i>
            <br><span>${data.twitter_username}</span>
        </li>
        <li> <i class="fa-solid fa-building"></i>
            <br><span>${data.company}</span>
        </li>
    </ul>
</div>
    `;
}
