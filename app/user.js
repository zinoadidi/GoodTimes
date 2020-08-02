


let login = function () {

    let email = document.querySelector("#email");
    let password = document.querySelector("#password");

    const userData = {
        "email": email.value,
        "password": password.value
    };

    const request = {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    fetch(
        APIBaseURL+'users/authenticate',
        request
    )
    .then(response => response.text())
    .then(async (response) => {
        response = JSON.parse(response);
        alert(response.message)
        if (response.statusCode === 200) {
            sessionStorage.setItem("userData", JSON.stringify(response));
            await loadPage("profile.html")
        }
    })
    .catch((error)=>handleError(error));

    return false;
};


const handleError = function(error){
    alert(error.message);
};

const showProfileData = function(data, profileType){
    let userData;
    if(profileType === "otherUsers"){
        userData = data;
        app.userDataToLoad = null;
    }else{
        userData = data.data;
    }
    document.querySelector("#email").innerHTML = userData.email;
    document.querySelector("#phone").innerHTML = userData.phone;
    document.querySelector("#location").innerHTML = userData.location;
    document.querySelector("#name").innerHTML = userData.name;
    document.querySelector("#about").innerHTML = userData.about;
    document.querySelector("#image").src = userData.image;
};

const register = function(){
    userData = {
        "name": document.querySelector("#name").value,
        "location": document.querySelector("#location").value,
        "phone": document.querySelector("#phone").value,
        "image": document.querySelector("#image").value,
        "email": document.querySelector("#email").value,
        "password": document.querySelector("#password").value,
        "about": document.querySelector("#about").value
    }

    const request = {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    fetch(
        APIBaseURL+'users/register',
        request
    ).then(response => response.text())

    .then(async (response) => {
        response = JSON.parse(response);
        alert(response.message)
        if (response.statusCode === 201) {
            sessionStorage.setItem("userData", JSON.stringify(response));
            await loadPage("profile.html")
        }
    }).catch((error)=>handleError(error));
};

function showGoodTimersOnUI(users) {
    let goodTimerContainer = document.querySelector("#goodTimersContainer");

    let goodTimersHtml = "";

    users.forEach(
        async function (user) {
            let singleUserHtml = `
                <li class="w3-margin w3-padding w3-row">
                    <img src="${user.image}" width="120px" class=" w3-cell w3-circle w3-card w3-margin">
                    <div class="w3-cell w3-margin">
                        <span> ${user.name}</span> from <span> ${user.location}</span>
                        <p>About Me: ${user.about}</p>
                    </div>
                    <div>
                       <button onclick="getSingleUserFromAPI('${user.id}')" class="w3-btn w3-margin w3-padding w3-indigo">
                            See Profile
                        </button>
                    </div>
            </li>
            `;

            goodTimersHtml += singleUserHtml;
        }
    )

    goodTimerContainer.innerHTML = goodTimersHtml;
}

const getUsersFromAPI = function (){
    const request = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    fetch(
        APIBaseURL+'users/',
        request
    ).then(response => response.text())
        .then((response) =>{
            response = JSON.parse(response);

            if(response.statusCode === 200){
                showGoodTimersOnUI(response.data);
            }
        })
        .catch((error)=>handleError(error));

}

const getSingleUserFromAPI = function (id){
    const request = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    fetch(
        APIBaseURL+'users/'+id,
        request
    ).then(response => response.text())
        .then(async (response) => {
            response = JSON.parse(response);
            if (response.statusCode === 200) {
                app.userDataToLoad = response.data
                await loadPage("profile.html")
            } else {
                alert(response.message)
            }
        })
        .catch((error)=>handleError(error));

}
