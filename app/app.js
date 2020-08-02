$(async function () {
    await loadPage('login.html')
});

const loadPage = async pageName => {
    $.get("pages/"+pageName).then(
        function (result) {
            $("#displayContainer").html(result);
        }
    )
}

const APIBaseURL = 'http://213.35.139.201/api/v1/';
//const APIBaseURL = 'http://localhost:3000/api/v1/';

const app = {
    "userDataToLoad":false
}
