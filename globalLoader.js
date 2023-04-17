window.addEventListener("load", loader)



function loader(){
    let head = document.head

    let scripts = ["../globalButtons.js"]

    scripts.forEach(scr => {
        const newScript = document.createElement("script")
        newScript.src = scr
        head.appendChild(newScript)
    })
    let resources = ["../styles.css"]

    resources.forEach(resource => {
        const newResource = document.createElement("link")
        newResource.rel = "stylesheet"
        newResource.href = resource
        head.appendChild(newResource)
    })
}