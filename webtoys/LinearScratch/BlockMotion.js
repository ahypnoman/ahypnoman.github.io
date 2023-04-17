function mouseDownListenerNormal(event) {
    const code = document.getElementsByClassName("codeMenu")[0]
    let newSilhouette = document.createElement("span")
    newSilhouette.setAttribute("class", "silhouette")
    this.parentNode.insertBefore(newSilhouette, this.nextSibling)
    this.setAttribute("mouseOffset", [event.offsetX, event.offsetY].toString())
    const offset = [event.offsetX, event.offsetY]
    this.classList.add("dragging")
    this.style.left = event.clientX - parseFloat(offset[0]) + code.scrollLeft + "px"
    this.style.top = event.clientY - parseFloat(offset[1]) + code.scrollTop + "px"
    const innerSnapPoints = [...this.getElementsByClassName("snapPoint")]
    innerSnapPoints.forEach((sp) => {
        sp.remove()
    })
    document.getElementsByClassName("blockHolder")[0].appendChild(this)
    updateDrag(event)
    updateDrag(event)
    loopAndErrorRender(loopAndErrorCheck(parseFromHtml().array).loops,loopAndErrorCheck(parseFromHtml().array).errors)
}

function mouseDownListenerFake(event) {
    let newBlock = document.createElement("span")
    newBlock.classList.add("block")
    newBlock.classList.add("dragging")
    newBlock.innerHTML = this.innerHTML
    newBlock.style.backgroundColor = this.style.backgroundColor
    newBlock.setAttribute("mouseOffset", [event.offsetX, event.offsetY].toString())
    newBlock.setAttribute("blockType", this.getAttribute("blockType"))
    newBlock.setAttribute("blockCode", this.getAttribute("blockCode"))
    newBlock.setAttribute("style", this.getAttribute("style"))
    const offset = [event.offsetX, event.offsetY]
    newBlock.style.left = event.clientX - parseFloat(offset[0]) + "px"
    newBlock.style.top = event.clientY - parseFloat(offset[1]) + "px"
    document.getElementsByClassName("blockHolder")[0].appendChild(newBlock)
    updateDrag(event)
    loopAndErrorRender(loopAndErrorCheck(parseFromHtml().array).loops,loopAndErrorCheck(parseFromHtml().array).errors)
}

function identifyBlocks(noLoopRender) {
    const blocks = [...document.querySelectorAll(".block")]
    blocks.forEach((el) => {
        el.removeEventListener("mousedown", mouseDownListenerNormal)
        el.removeEventListener("mousedown", mouseDownListenerFake)
        //What am I even doing at this point
        // el.classList.add("col-" + el.getAttribute("blockColor"))
        // const colorSheet = new CSSStyleSheet();
        // colorSheet.replaceSync(".col-" + el.getAttribute("blockColor") + "box-shadow:20px";}")
        // console.log(colorSheet)
        // document.adoptedStyleSheets = [colorSheet];
        // let newEl = el.cloneNode(true)
        // el.parentNode.replaceChild(newEl, el)
    })
    const normalBlocks = [...document.querySelectorAll(".block:not(.fake):not(.dragging):not(.shrinkOut)")]
    const fakeBlocks = [...document.querySelectorAll(".block.fake")]
    normalBlocks.forEach((el) => {
        const innerSnapPoints = [...el.getElementsByClassName("snapPoint")]
        innerSnapPoints.forEach((sp) => {
            sp.remove()
        })
        el.insertAdjacentHTML("beforeend", "<span class='snapPoint'></span>")
        el.addEventListener("mousedown", mouseDownListenerNormal)
    })
    fakeBlocks.forEach((el) => {
        el.addEventListener("mousedown", mouseDownListenerFake)
    })
    if (!noLoopRender) loopAndErrorRender(loopAndErrorCheck(parseFromHtml().array).loops,loopAndErrorCheck(parseFromHtml().array).errors)
}

document.addEventListener("mousemove", updateDrag)
document.addEventListener("mouseup", clearDrag)

function clearDrag() {
    const dragging = [...document.getElementsByClassName("dragging")]
    const silhouette = [...document.getElementsByClassName("silhouette")]
    dragging.forEach((el) => {
        el.classList.remove("dragging")
        const snapPoint = findSnap(el)
        if (snapPoint[3] + 52 < window.innerHeight / 2) {
            el.style.left = ""
            el.style.top = ""
            el.removeAttribute("mouseOffset")
            el.insertAdjacentHTML("beforeend", "<span class='snapPoint'></span>")
            snapPoint[4].parentNode.parentNode.insertBefore(el, snapPoint[4].parentNode.nextSibling)
            loopAndErrorRender(loopAndErrorCheck(parseFromHtml().array).loops,loopAndErrorCheck(parseFromHtml().array).errors)
        } else {
            el.removeEventListener("mousedown", mouseDownListenerNormal)
            el.removeEventListener("mouseup", clearDrag)
            el.removeEventListener("mousemove", updateDrag)
            el.classList.add("shrinkOut")
            setTimeout(() => {
                el.classList.remove("shrinkOut")
                el.remove()
            }, 250)
            loopAndErrorRender(loopAndErrorCheck(parseFromHtml().array).loops,loopAndErrorCheck(parseFromHtml().array).errors)
        }
    })
    silhouette.forEach((el) => {
        el.remove()
    })
    if(dragging.length>0){
        identifyBlocks()
        saveScript(editing, parseFromHtml().array)
        treeRender()
        playButtonCheck()
        saveToHistory()
    }
}

function updateDrag(event) {
    const dragging = [...document.getElementsByClassName("dragging")]
    const silhouette = [...document.getElementsByClassName("silhouette")]
    dragging.forEach((el) => {
        // document.body.style.cursor = "grabbing"
        const snapPoint = findSnap(el)
        let newSilhouette = document.createElement("span")
        newSilhouette.setAttribute("class", "silhouette")
        newSilhouette.setAttribute("style", "--block-color: #0D0D0D;")
        newSilhouette.innerHTML = "<span class=\"blockTop\"></span><span class=\"blockBottom\"></span><span class='innerBlock'></span>"
        newSilhouette.setAttribute("blockCode", el.getAttribute("blockCode"))
        if (snapPoint[3] + 52 < window.innerHeight / 2) {
            snapPoint[4].parentNode.parentNode.insertBefore(newSilhouette, snapPoint[4].parentNode.nextSibling)
        }
        silhouette.forEach((el) => {
            el.remove()
        })
        const offset = el.getAttribute("mouseOffset").split(",")
        el.style.left = event.clientX - parseFloat(offset[0]) + "px"
        el.style.top = event.clientY - parseFloat(offset[1]) + "px"
        loopAndErrorRender(loopAndErrorCheck(parseFromHtml().array).loops,loopAndErrorCheck(parseFromHtml().array).errors)
    })
}

function findSnap(element) {
    const snapPointEls = [...document.getElementsByClassName("snapPoint")]
    let closestSnapPoint
    let smallestDistance = -1
    const el = element.getBoundingClientRect()
    snapPointEls.forEach((snapP) => {
        const sp = snapP.getBoundingClientRect()
        const distX = Math.abs(sp.x - el.x - 45) ^ 2
        const distY = Math.abs(sp.y - el.y) ^ 2
        const distance = Math.round(Math.sqrt(distX + distY))
        if (distance < smallestDistance || smallestDistance === -1) {
            smallestDistance = distance
            closestSnapPoint = [sp.x, sp.y, el.x, el.y, snapP]
        }
    })
    return closestSnapPoint
}