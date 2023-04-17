function addButtons() {
    let body = document.body
    body.insertAdjacentHTML("afterbegin", "<div class=\"globalButtons\"></div>")
    let GBDiv = document.getElementsByClassName("globalButtons")[0]
    if (window.location.pathname !== "/" && window.location.pathname !== "/ahypnoman.github.io/") {
        GBDiv.insertAdjacentHTML("beforeend", `<a href="../" class="globalButton"><img src="../images/homeIcon.png" width="50" alt="Home"></a>`)
        const params = new URLSearchParams(document.location.search)
        if (params.has("from")){}
    }
}

addButtons()