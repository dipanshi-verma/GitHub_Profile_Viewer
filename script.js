async function getProfile() 
{
   const username = document.getElementById("usernameInput").value.trim();
   const profileDiv = document.getElementById("profile");
   if(!username) 
{
      profileDiv.innerHTML = "<p>Please enter a github username.</p>";
      return;
   }

   try{
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) 
    {
        throw new Error("User not found");
    }
    const data = await response.json();
    console.log(data);
    profileDiv.innerHTML = `
        <div class="profile-card">
            <img class="profile-avatar" src="${data.avatar_url}" alt="avatar"/>
            <h2 class="profile-name">${data.name || "Name not available"}</h2>
            <p class="profile-bio">${data.bio || "Bio not available"}</p>
            <p>${data.location || "Location not available"}</p>
            <p class="profile-bio">Followers: ${data.followers || "Followers not found"}</p>
            <p>Following: ${data.following || "Following not found"}</p>
            <p>Public Repos: ${data.public_repos || "Public repos not found"}</p>
            <p>${data.company || "Company not available"}</p>
            <p>${data.hireable || "Hireable : No Information"}</p>
            </div>`;
            profileDiv.classList.add("loaded");

   }
   
   catch (error)
   {
    console.error("Error fetching profile:", error);
   }

}