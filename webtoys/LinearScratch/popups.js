function popup(title, menuContent, content){
    const el = document.createElement("span")
    el.classList.add("popupWrapper")
    el.innerHTML = `
<span class="popup">
<span class="popupBanner">${title}<span class="popupMenubar">${menuContent}</span></span><span class="popupContent">${content}</span></span>`
    return el
}

function insertPopup(title,menuContent,content){
    [...document.querySelectorAll("input, button, textarea")].forEach((el)=>{
        if(el.getAttribute("tabIndex")){
            el.setAttribute("oldTabIndex1",el.getAttribute("tabIndex"))
        }
        el.classList.add("tabSuppressed1")
        el.setAttribute("tabIndex","-1")
    })
    document.body.insertAdjacentElement("beforeend",popup(title,menuContent,content));
    [...document.getElementsByClassName("resize")].forEach((el)=>{resizeCheck(el)})
}

function closePopupButton(){
    return `<button class=\"popupButton\" onclick=\"closePopup()\" style='--button-icon: url("icons/Close.svg")'></button>`
}

function closePopup(noSave){
    document.getElementsByClassName('popupWrapper')[0].remove()
    if(!noSave)saveToHistory();
    [...document.querySelectorAll(".tabSuppressed1")].forEach((el)=>{
        if(el.getAttribute("oldTabIndex1")){
            if(!el.getAttribute("oldTabIndex0"))el.setAttribute("tabIndex",el.getAttribute("oldTabIndex1"))
            el.removeAttribute("oldTabIndex1")
        } else {
            if(!el.getAttribute("oldTabIndex0"))el.removeAttribute("tabIndex")
        }
        el.classList.remove("tabSuppressed1")
    })
}

function popupOkIlluminate(color, symbolExemption){
    const popupOkButton = document.getElementsByClassName('popupOkButton')[0]
    if(document.getElementsByClassName('popupEditMain')[0].value === '' || document.getElementsByClassName('popupEditMain')[0].value === '' || (!symbolExemption && ((color) ? (!document.getElementsByClassName('popupEditMeta')[0].value.match(RegExp('^#[0-9a-fA-F]{6}$'))):(document.getElementsByClassName('popupEditMeta')[0].value.length !== 1) || document.getElementsByClassName('popupEditMain')[0].value === ''))){
        popupOkButton.setAttribute('style','')
        popupOkButton.classList.add('inactive')
    } else {
        popupOkButton.setAttribute('style','color: #ffffff; background: #4d97ff;')
        popupOkButton.classList.remove('inactive')
    }
}

function illuminateIfFits(inputType, value){
    const popupOkButton = document.getElementsByClassName('popupOkButton')[0]
    if (inputType === "ASCII"){
        if(/^[\u0000-\u007f]$/.test(value)){
            popupOkButton.setAttribute('style','color: #ffffff; background: #4d97ff;')
            popupOkButton.classList.remove('inactive')
        } else {
            popupOkButton.setAttribute('style','')
            popupOkButton.classList.add('inactive')
        }
    } else if(inputType === "Number"){
        if(/^-*\d+$/.test(value)){
            popupOkButton.setAttribute('style','color: #ffffff; background: #4d97ff;')
            popupOkButton.classList.remove('inactive')
        } else {
            popupOkButton.setAttribute('style','')
            popupOkButton.classList.add('inactive')
        }
    }
}

function genFileInfo(data) {
    let acc = ""
    Object.keys(data).forEach((i)=>{
        acc += `${i}: <div class="infoContainer">${data[i]}</div><br>`
    })
    acc = acc.substring(0, acc.length-4)
    return acc
}



//This function collection barely functions. It is incredibly inconsistent, especially in dynamic button highlighting.
//Some buttons use styles to determine whether they should highlight when others use a class (which is the sane way to go about this, but to save me going through twenty lines of code I'm not going to change the buttons using styles to determine it).

//REALLY IMPORTANT NOTE
//Input popup must block non-ASCII chars

const popups = {
    editScript: (path, fromOptions, initial) => {
        if(path === 'projectData.main'){
            insertPopup("Edit file", `<button class=\"popupButton\" onclick=\"closePopup(); popups.exportScript('${path}')\" style='--button-icon: url("icons/Download.svg")'></button>` + closePopupButton(), `<div class="popupInputsWrapper"><div class="popupInputsContent"><div class="popupInputTitle">Title</div><input class="normalInput popupGridInput resize popupEditMain" value="${get(projectInfo, path).name}" oninput="resizeCheck(this); popupOkIlluminate(false, true)" placeholder="Name script"></div></div><span class="popupLowerButtonsHolder"><button class="rectButton" style="color: #000000;" onclick="closePopup()">Cancel</button><button class="rectButton popupOkButton ${get(projectInfo,path).name?"":"inactive"}" style="color: #ffffff; background: #4d97ff" onclick="if(this.style.background === 'rgb(77, 151, 255)'){projectInfo.${path}.name = document.getElementsByClassName('popupEditMain')[0].value; ${fromOptions? "":"treeRender();"} renderProjectManager(); renderScript(projectInfo.${path}.name, projectInfo.${path}.code); closePopup()}">Ok</button></span>${fromOptions?`<span style="position: absolute; bottom: 0; left: 0; padding: 20px"><button class="rectButton" style="color: #ffffff; background: #4d97ff; margin-left: 0" onclick="editing = '${path}'; addNameInput(); renderScript(projectInfo.${path}.name, projectInfo.${path}.code); treeRender(); document.getElementsByClassName('whiteBG')[0].remove(); closePopup()">Go to script</button> <span style="position: absolute; top: 20px; left: calc(100% - 15px); width: max-content; height: 37.5px; display: inline-flex; align-items: center">(and cancel)</span></span>`:""}`)
        } else {
            if (initial)insertPopup("Import script", '', `<div class="popupInputsWrapper"><div class="popupInputsContent"><div class="popupInputTitle">Title</div><input class="normalInput popupGridInput resize popupEditMain" value="${get(projectInfo, path).name}" oninput="resizeCheck(this); popupOkIlluminate()" placeholder="Name script"><div class="popupInputTitle">Symbol</div><input class="normalInput popupGridInput resize popupEditMeta" value="${get(projectInfo, path).icon}" oninput="resizeCheck(this); popupOkIlluminate()" placeholder="Add icon"></div></div><span class="popupLowerButtonsHolder"><button class="rectButton" style="color: #ffffff; background: #ff4d4d;" onclick="get(projectInfo,'${get(projectInfo,path).loc}').scripts.splice(get(projectInfo,'${get(projectInfo,path).loc}').scripts.indexOf(projectInfo.${get(projectInfo,path).loc}), 1); delete projectInfo.${path}; ${fromOptions? "":"treeRender();"} editing = 'projectData.main'; renderScript(projectInfo.projectData.main.name, projectInfo.projectData.main.code); renderProjectManager(); closePopup()">Delete</button><button class="rectButton popupOkButton ${get(projectInfo,path).name?"":"inactive"}" style="${get(projectInfo, path).name === "" || get(projectInfo, path).icon === "" ? "" : "color: #ffffff; background: #4d97ff"}" onclick="if(this.style.background === 'rgb(77, 151, 255)'){projectInfo.${path}.name = document.getElementsByClassName('popupEditMain')[0].value; projectInfo.${path}.icon = document.getElementsByClassName('popupEditMeta')[0].value; renderScript(projectInfo.${path}.name, projectInfo.${path}.code); ${fromOptions ? "" : "treeRender();"} renderProjectManager(); closePopup()}">Ok</button></span>`)
            else insertPopup("Edit file", `<button class=\"popupButton\" onclick=\"closePopup(); popups.exportScript('${path}')\" style='--button-icon: url("icons/Download.svg")'></button>` + closePopupButton(), `<div class="popupInputsWrapper"><div class="popupInputsContent"><div class="popupInputTitle">Title</div><input class="normalInput popupGridInput resize popupEditMain" value="${get(projectInfo, path).name}" oninput="resizeCheck(this); popupOkIlluminate()" placeholder="Name script"><div class="popupInputTitle">Symbol</div><input class="normalInput popupGridInput resize popupEditMeta" value="${get(projectInfo, path).icon}" oninput="resizeCheck(this); popupOkIlluminate()" placeholder="Add icon"></div></div><span class="popupLowerButtonsHolder"><button class="rectButton" style="color: #ffffff; background: #ff4d4d;" onclick="get(projectInfo,'${get(projectInfo,path).loc}').scripts.splice(get(projectInfo,'${get(projectInfo,path).loc}').scripts.indexOf(projectInfo.${get(projectInfo,path).loc}), 1); delete projectInfo.${path}; ${fromOptions? "":"treeRender();"} editing = 'projectData.main'; renderScript(projectInfo.projectData.main.name, projectInfo.projectData.main.code); renderProjectManager(); closePopup()">Delete</button><button class="rectButton" style="color: #000000;" onclick="closePopup()">Cancel</button><button class="rectButton popupOkButton ${get(projectInfo,path).name?"":"inactive"}" style="${get(projectInfo, path).name === "" || get(projectInfo, path).icon === "" ? "" : "color: #ffffff; background: #4d97ff"}" onclick="if(this.style.background === 'rgb(77, 151, 255)'){projectInfo.${path}.name = document.getElementsByClassName('popupEditMain')[0].value; projectInfo.${path}.icon = document.getElementsByClassName('popupEditMeta')[0].value; renderScript(projectInfo.${path}.name, projectInfo.${path}.code); ${fromOptions ? "" : "treeRender();"} renderProjectManager(); closePopup()}">Ok</button></span>${fromOptions?`<span style="position: absolute; bottom: 0; left: 0; padding: 20px"><button class="rectButton" style="color: #ffffff; background: #4d97ff; margin-left: 0" onclick="editing = '${path}'; addNameInput(); renderScript(projectInfo.${path}.name, projectInfo.${path}.code); treeRender(); document.getElementsByClassName('whiteBG')[0].remove(); closePopup()">Go to script</button> <span style="position: absolute; top: 20px; left: calc(100% - 15px); width: max-content; height: 37.5px; display: inline-flex; align-items: center">(and cancel)</span></span>`:""}`)
        }
    },
    editExtension: (path, fromOptions) => {
        if(path === 'projectData.custom'){
            insertPopup("Edit extension", `<button class=\"popupButton\" onclick=\"closePopup(); popups.exportExtension('${path}')\" style='--button-icon: url("icons/Download.svg")'></button>` + closePopupButton(), `<div class="popupFullyCenteredContent">You cannot edit properties of the custom blocks collection.<br>You can still export the custom blocks collection as an extension.</div><span class="popupLowerButtonsHolder"><button class="rectButton popupOkButton" style="color: #ffffff; background: #4d97ff" onclick="closePopup()">Ok</button></span>`)
        } else {
            insertPopup("Edit extension", `<button class=\"popupButton\" onclick=\"closePopup(); popups.exportExtension('${path}')\" style='--button-icon: url("icons/Download.svg")'></button>` + closePopupButton(), `<div class="popupInputsWrapper"><div class="popupInputsContent"><div class="popupInputTitle">Title</div><input class="normalInput popupGridInput resize popupEditMain" value="${get(projectInfo, path).name}" oninput="popupOkIlluminate(true); resizeCheck(this)" placeholder="Name script"><div class="popupInputTitle">Color</div><input class="normalInput popupGridInput resize popupEditMeta" value="${get(projectInfo, path).color}" oninput="if(this.value.length>7){this.value = this.value.substring(0, 7)} popupOkIlluminate(true); resizeCheck(this)" placeholder="Add hex color"></div></div><span class="popupLowerButtonsHolder"><button class="rectButton" style="color: #ffffff; background: #ff4d4d;" onclick="delete get(projectInfo,'${path}'); delete projectInfo.${path}; ${fromOptions? "":"treeRender();"} editing = 'projectData.main'; renderScript(projectInfo.projectData.main.name, projectInfo.projectData.main.code); renderProjectManager(); closePopup()">Delete</button><button class="rectButton" style="color: #000000;" onclick="closePopup()">Cancel</button><button class="rectButton popupOkButton" style="color: #ffffff; background: #4d97ff" onclick="if(this.style.background === 'rgb(77, 151, 255)'){projectInfo.${path}.name = document.getElementsByClassName('popupEditMain')[0].value; projectInfo.${path}.icon = document.getElementsByClassName('popupEditMeta')[0].value; renderProjectManager(); closePopup()}">Ok</button></span>`)
        }
    },
    newScript: (loc) => {
        insertPopup("Add file", closePopupButton(), `<div class="popupFullyCenteredContent"><div style="transform: scale(140%);"><button class="buttonWithImage" onclick="closePopup(); popups.importScript('${loc}')"><div>Import file</div><img width="127" src="LSimages/Import_file.svg" alt="create file image"></button><button class="buttonWithImage" onclick="closePopup();popups.createScript('${loc}')"><div>Create file</div><img src="LSimages/Create_file.svg" alt="create file image"></button></div></div>`)
    },
    createScript: (loc) => {
        insertPopup("Create file", closePopupButton(), `<div class="popupInputsWrapper"><div class="popupInputsContent"><div class="popupInputTitle">Title</div><input class="normalInput popupGridInput resize popupEditMain" oninput="resizeCheck(this); popupOkIlluminate()" placeholder="Name script"><div class="popupInputTitle">Symbol</div><input class="normalInput popupGridInput resize popupEditMeta" oninput="if(this.value.length>1){this.value = this.value[0]} popupOkIlluminate(); resizeCheck(this);" placeholder="Add icon"></div></div><span class="popupLowerButtonsHolder"><button class="rectButton" style="color: #000000;" onclick="closePopup()">Cancel</button><button class="rectButton popupOkButton inactive" onclick="if(this.style.background === 'rgb(77, 151, 255)'){createScript('${loc}',document.getElementsByClassName('popupEditMain')[0].value,document.getElementsByClassName('popupEditMeta')[0].value); treeRender(); closePopup()}">Ok</button></span>`)
    },
    newExtension: () => {
        insertPopup("Add extension", closePopupButton(), `<div class="popupFullyCenteredContent"><div style="transform: scale(140%);"><button class="buttonWithImage" onclick="closePopup(); popups.addPremadeExtension()"><div>Built in extension</div><img width="127" src="LSimages/Add_ex_premade.svg" alt="create file image"></button><button class="buttonWithImage" onclick="closePopup();popups.customExtension()"><div>Custom extension</div><img width="127" src="LSimages/Add_ex_custom.svg" alt="create file image"></button></div></div>`)
    },
    customExtension: () => {
        insertPopup("Add extension", closePopupButton(), `<div class="popupFullyCenteredContent"><div style="transform: scale(140%);"><button class="buttonWithImage" onclick="closePopup(); popups.importExtension()"><div>Import extension</div><img width="127" src="LSimages/Import_file.svg" alt="create file image"></button><button class="buttonWithImage" onclick="closePopup();popups.createExtension()"><div>Create extension</div><img src="LSimages/Create_file.svg" alt="create file image"></button></div></div>`)
    },
    createExtension: () => {
        insertPopup("Create extension", closePopupButton(), `<div class="popupInputsWrapper"><div class="popupInputsContent"><div class="popupInputTitle">Title</div><input class="normalInput popupGridInput resize popupEditMain" oninput="resizeCheck(this); popupOkIlluminate(true)" placeholder="Name extension"><div class="popupInputTitle">Color</div><input class="normalInput popupGridInput resize popupEditMeta" oninput="if(this.value.length>7){this.value = this.value.substring(0, 7)} popupOkIlluminate(true); resizeCheck(this);" placeholder="Add hex color"></div></div><span class="popupLowerButtonsHolder"><button class="rectButton" style="color: #000000;" onclick="closePopup()">Cancel</button><button class="rectButton popupOkButton inactive" onclick="if(this.style.background === 'rgb(77, 151, 255)'){createExtension(document.getElementsByClassName('popupEditMain')[0].value,document.getElementsByClassName('popupEditMeta')[0].value); treeRender(); closePopup()}">Ok</button></span>`)
    },
    getInput: (inputType, stackInfo)=>{
        if(runningInfo.stackInfo.length>1) {
            insertPopup("Project requested input", "", `<div class="popupInputsWrapper"><div class="popupInputsContent"><div class="popupInputTitle">Input</div><input class="normalInput popupGridInput resize popupEditMain" oninput="resizeCheck(this); if(this.value && ${inputType === "ASCII"})this.value = this.value[0]; resizeCheck(this); illuminateIfFits('${inputType}', this.value)" placeholder="${inputType}"></div></div><span class="popupLowerButtonsHolder"><button class="rectButton popupOkButton inactive" onclick='if(!this.classList.contains("inactive")){runningInfo.inputs.push(document.getElementsByClassName("popupEditMain")[0].value); pushInput(); runCustomBlock(${JSON.stringify(stackInfo)}); closePopup()}'>Ok</button></span>`)
        } else {
            insertPopup("Project requested input", "", `<div class="popupInputsWrapper"><div class="popupInputsContent"><div class="popupInputTitle">Input</div><input class="normalInput popupGridInput resize popupEditMain" oninput="resizeCheck(this); if(this.value && ${inputType === "ASCII"})this.value = this.value[0]; resizeCheck(this); illuminateIfFits('${inputType}', this.value)" placeholder="${inputType}"></div></div><span class="popupLowerButtonsHolder"><button class="rectButton popupOkButton inactive" onclick="if(!this.classList.contains('inactive')){runningInfo.inputs.push(document.getElementsByClassName('popupEditMain')[0].value); pushInput(); interpretNext(true); closePopup()}">Ok</button></span>`)
        }
        document.getElementsByClassName("popupEditMain")[0].focus()
    },
    exportOutput: () => {
        insertPopup("Export output", closePopupButton(), `<div style="padding: 10px">Is this what you wanted to export?<br><div class="popupInfoSection">Name: <div class="infoContainer">Project_output</div><br>Type: <div class="infoContainer">.txt</div><br>Data: <div class="infoContainer">"${runningInfo.output.toString().replaceAll(',', '<br> ')}"</div></div></div><span class="popupLowerButtonsHolder"><button class="rectButton" style="color: #000000;" onclick="closePopup()">Cancel</button><a class="rectButton popupOkButton" style="color: #ffffff; background: #4d97ff" href="${createDownloadLinkFromList(runningInfo.output)}" download="Project_output.txt" onclick="closePopup()">Export</a></span>`)
    },
    exportBF: () => {
        if(!(compileToBFStart(projectInfo.projectData.main.code) instanceof Error)) {
            insertPopup("Export as BF", closePopupButton(), `<div style="padding: 10px">Is this what you wanted to export?<br><div class="popupInfoSection">Name: <div class="infoContainer">${projectInfo.projectMeta.name}</div><br>Type: <div class="infoContainer">.bf</div><br>Data: <div class="infoContainer">"${compileToBFStart(projectInfo.projectData.main.code)}"</div></div></div><span class="popupLowerButtonsHolder"><button class="rectButton" style="color: #000000;" onclick="closePopup()">Cancel</button><a class="rectButton popupOkButton" style="color: #ffffff; background: #4d97ff" href="${createDownloadLinkFromList(compileToBFStart(projectInfo.projectData.main.code).split(''))}" download="${projectInfo.projectMeta.name}.bf" onclick="closePopup()">Export</a></span>`)
        } else {
            insertPopup("Export as BF", closePopupButton(), `<div style="padding: 10px">An error occured while compiling your project<br><div class="popupInfoSection">Error_message: <div class="infoContainer">${compileToBFStart(projectInfo.projectData.main.code)}</div></div></div><span class="popupLowerButtonsHolder"><button class="rectButton popupOkButton" style="color: #ffffff; background: #4d97ff" onclick="closePopup()">Ok</button></span>`)
        }
    },
    exportLS: () => {
        insertPopup("Export as LS", closePopupButton(), `<div style="padding: 10px 10px 0; max-height: calc(100% - 77.5px); overflow: hidden; position:relative;">Is this what you wanted to export?</div><div class="popupInfoSection">Name: <div class="infoContainer">${projectInfo.projectMeta.name}</div><br>Type: <div class="infoContainer">.ls</div><br>Data: <div class="infoContainer">"${JSON.stringify(projectInfo)}"</div></div><span class="popupLowerButtonsHolder"><button class="rectButton" style="color: #000000;" onclick="closePopup()">Cancel</button><button class="rectButton popupOkButton" style="color: #ffffff; background: #4d97ff" onclick="navigator.clipboard.writeText(JSON.stringify(projectInfo)); closePopup()">Copy</button><a class="rectButton" style="color: #ffffff; background: #4d97ff" href="${createDownloadLinkFromList(JSON.stringify(projectInfo).split(''), true)}" download="${projectInfo.projectMeta.name}.ls" onclick="closePopup()">Export</a></span>`)
    },
    importFile: () => {
        insertPopup("Import file", closePopupButton(), `<label class="rectButton" style="color: #ffffff; background-color: #4d97ff; margin-top: 10px;"><input type="file" accept=".ls,.bf,.JSON" class="import">Browse files</label><button class="rectButton loadFromClipboard" style="color: #ffffff; background-color: #4d97ff;" >Load from clipboard</button><div class="popupInfoSection dropArea"><span style="color:#d9d9d9;">A preview of your file will appear here</span></div><div style="margin-left: 10px;">(This will overwrite your current project)</div><span class="popupLowerButtonsHolder"><button class="rectButton" style="color: #000000;" onclick="closePopup()">Cancel</button><button class="rectButton popupImportButton inactive">Import</button></span>`)
        async function updateData(from, load){
            document.getElementsByClassName("popupImportButton")[0].classList.remove("inactive")
            document.getElementsByClassName("popupImportButton")[0].setAttribute("style","color: #ffffff; background: #4d97ff")
            if(from === "clipboard"){
                const text = await navigator.clipboard.readText()
                try {
                    if(!load) {
                        renderJSONfile(JSON.parse(text).projectMeta.name, text, ".ls: pasted");
                    }
                    else {
                        renderJSONfile(JSON.parse(text).projectMeta.name, text, ".ls: pasted");
                        projectInfo = JSON.parse(text)
                    }
                } catch(error){
                    if(text.split("™").length>5){
                        if(!load){
                            document.getElementsByClassName('dropArea')[0].innerHTML = genFileInfo({
                                name: text.split("™")[0],
                                type: ".ls (old version): pasted",
                                data: text
                            });
                        }
                        else importProjectFromV1(text)
                    } else if(text.match(/^[[\]+-<>,.]*(?=$)/g)){
                        if(!load) {
                            document.getElementsByClassName('dropArea')[0].innerHTML = genFileInfo({
                                name: "none",
                                type: ".bf: pasted",
                                data: text
                            })
                        }
                        else {
                            newProject()
                            projectInfo.projectData.main.code = "‡" + text.split("").join("‡")
                            projectInfo.projectMeta.description = "Project loaded from .bf file."
                            projectInfo.projectMeta.name = "My Project"
                            document.getElementsByClassName("name").value = projectInfo.projectMeta.name
                        }
                    } else {
                        document.getElementsByClassName('dropArea')[0].innerHTML = genFileInfo({
                            Error_message: "File is not valid: expected LS or LS-like file, received a file that does not meet validation criteria"
                        })
                        document.getElementsByClassName("popupImportButton")[0].setAttribute("style","")
                        document.getElementsByClassName("popupImportButton")[0].classList.add("inactive")
                    }
                }
                if (load){
                    treeRender()
                    renderScript(projectInfo.projectData.main.name,projectInfo.projectData.main.code)
                }
            } else if (from === "input") {
                const file = getFile()
                const reader = new FileReader()
                reader.readAsText(file)
                reader.addEventListener("load", () => {
                    const text = reader.result
                    try {
                        if(!load) renderJSONfile(JSON.parse(text).projectMeta.name,text,".ls");
                        else projectInfo = JSON.parse(text)
                    } catch(error) {
                        if(text.split("™").length>5){
                            if(!load) document.getElementsByClassName('dropArea')[0].innerHTML = genFileInfo({
                                name: text.split("™")[0],
                                type: ".ls (old version)",
                                data: text
                            });
                            else importProjectFromV1(text)
                        } else if(text.match(/^[[\]+-<>,.]*(?=$)/g)) {
                            if(!load) document.getElementsByClassName('dropArea')[0].innerHTML = genFileInfo({
                                name: "none",
                                type: ".bf",
                                data: text
                            });
                            else {
                                newProject()
                                projectInfo.projectData.main.code = text.split("").join("‡")
                                projectInfo.projectMeta.description = "Project loaded from .bf file."
                                projectInfo.projectMeta.name = file.name
                            }
                        } else {
                        document.getElementsByClassName('dropArea')[0].innerHTML = genFileInfo({
                            Error_message: "File is not valid: expected LS or LS-like file, received a file that does not meet validation criteria"
                        })
                    }
                    }
                    // document.getElementsByClassName('dropArea')[0].innerHTML = genFileInfo({
                    //     name: file.name.substring(0, indexOfAll(file.name.split(''), '.')[indexOfAll(file.name.split(''), '.').length - 1]),
                    //     type: file.name.substring(indexOfAll(file.name.split(''), '.')[indexOfAll(file.name.split(''), '.').length - 1]),
                    //     data: text
                    // })
                if (load){
                    treeRender()
                    renderScript(projectInfo.projectData.main.name,projectInfo.projectData.main.code)
                    if (document.getElementsByClassName("settingsIdentifier")[0]){
                        renderProjectManager()
                        renderProjectHistory()
                        document.getElementsByClassName("description")[0].value = projectInfo.projectMeta.description
                        document.getElementsByClassName("presetInputs")[0].value = projectInfo.projectMeta.settings.inputs
                        highlightButton(document.getElementsByClassName("defaultInputType")[0].children[(projectInfo.projectMeta.settings.defaultInput==="ASCII")?0:1])
                        highlightButton(document.getElementsByClassName("defaultDisplayType")[0].children[(projectInfo.projectMeta.settings.defaultDisplay==="ASCII")?0:(projectInfo.projectMeta.settings.defaultDisplay==="Numeric")?1:2])
                    }
                }})
            }
            if (load) {
                closePopup()
                playButtonCheck()
            }
            function renderJSONfile(name,text,type){
                if(Object.keys(JSON.parse(text)).toString() === ['version','projectData','projectMeta'].toString()) {
                    document.getElementsByClassName('dropArea')[0].innerHTML = genFileInfo({
                        name: name,
                        type: type,
                        data: text
                    })
                } else{
                    document.getElementsByClassName('dropArea')[0].innerHTML = genFileInfo({
                        Error_message: "File is not valid: expected LS or LS-like file, received a file that does not meet validation criteria"
                    })
                }
            }
        }
        let loadedFrom;
        document.getElementsByClassName("popupImportButton")[0].addEventListener("click",async (ev)=>{if(ev.target.style.background === "rgb(77, 151, 255)")await updateData(loadedFrom, true)})
        document.getElementsByClassName("import")[0].addEventListener("input",async ()=>{await updateData("input"); loadedFrom = "input"})
        document.getElementsByClassName("loadFromClipboard")[0].addEventListener("click",async ()=>{await updateData("clipboard"); loadedFrom = "clipboard"})
    },
    newSaveSlot: (closeSettings)=>{
        insertPopup("Create save slot", closePopupButton(), `<div class="popupInputsWrapper"><div class="popupInputsContent"><div class="popupInputTitle">ID</div><input class="normalInput popupGridInput resize popupEditMain" oninput="resizeCheck(this); if (Object.keys(JSON.parse(localStorage.getItem('ls-projectStore'))).includes(this.value)||this.value===''){document.getElementsByClassName('popupOkButton')[0].setAttribute('style',''); document.getElementsByClassName('popupOkButton')[0].classList.add('inactive')} else {document.getElementsByClassName('popupOkButton')[0].setAttribute('style','color: #ffffff; background: #4d97ff;'); document.getElementsByClassName('popupOkButton')[0].classList.remove('inactive')}" placeholder="Slot identity"></div></div><span style="margin-left: 20px">Please note that slot ID is not directly tied to project name.</span><span class="popupLowerButtonsHolder"><button class="rectButton" style="color: #000000;" onclick="closePopup()">Cancel</button><button class="rectButton popupOkButton inactive" onclick="if(!this.classList.contains('inactive')){createOrEditSaveSlot(document.getElementsByClassName('popupEditMain')[0].value, genProject()); editing = 'projectData.main'; newProject(); projectInfo.projectMeta.name = document.getElementsByClassName('popupEditMain')[0].value; document.getElementsByClassName('name')[0].value = document.getElementsByClassName('popupEditMain')[0].value; closePopup(); sessionInfo.undoRedoHistory = []; sessionInfo.fullHistory = [];${closeSettings ? "addNameInput(); treeRender(); renderScript(get(projectInfo, editing).name,get(projectInfo, editing).code); resizeCheck(document.getElementsByClassName('scriptName')[0]); document.getElementsByClassName('whiteBG')[0].remove(); ":""}}renderSettingsInfo()">Ok</button></span>`)
    },
    editSaveSlot: (id)=>{
        insertPopup("Edit save slot", closePopupButton(), `<div class="popupInputsWrapper"><div class="popupInputsContent"><div class="popupInputTitle">ID</div><input class="normalInput popupGridInput resize popupEditMain" oninput="resizeCheck(this); if ((Object.keys(JSON.parse(localStorage.getItem('ls-projectStore'))).includes(this.value)&&this.value!=='${id}')||this.value===''){document.getElementsByClassName('popupOkButton')[0].setAttribute('style',''); document.getElementsByClassName('popupOkButton')[0].classList.add('inactive')} else {document.getElementsByClassName('popupOkButton')[0].setAttribute('style','color: #ffffff; background: #4d97ff;'); document.getElementsByClassName('popupOkButton')[0].classList.remove('inactive')}" value="${id}" placeholder="Slot identity"></div></div><span class="popupLowerButtonsHolder">${JSON.parse(localStorage.getItem("ls-projectOrder")).length<2 ? "": `<button class="rectButton" style="color: #ffffff; background: #ff4d4d;" onclick="deleteSaveSlot('${id}'); renderSettingsInfo(); document.getElementsByClassName('name')[0].value = document.getElementsByClassName('popupEditMain')[0].value; closePopup(true)">Delete</button>`}<button class="rectButton" style="color: #000000;" onclick="closePopup()">Cancel</button><button class="rectButton popupOkButton" style="color: #ffffff; background: #4d97ff;" onclick="if(!this.classList.contains('inactive')){renameSaveSlot('${id}',document.getElementsByClassName('popupEditMain')[0].value); renderSettingsInfo() closePopup(true)}">Ok</button></span>`)
    },
    exportScript: (path) => {
        insertPopup("Export script", closePopupButton(), `<div style="padding: 10px 10px 0; max-height: calc(100% - 77.5px); overflow: hidden; position:relative;">Is this what you wanted to export?</div><div class="popupInfoSection">Name: <div class="infoContainer">${get(projectInfo,path).name}</div><br>Type: <div class="infoContainer">.lsc</div><br>Data: <div class="infoContainer">"${JSON.stringify({"icon":get(projectInfo,path).icon,"name":get(projectInfo,path).name,"code":get(projectInfo,path).code})}"</div></div><span class="popupLowerButtonsHolder"><button class="rectButton" style="color: #000000;" onclick="closePopup()">Cancel</button><button class="rectButton popupOkButton" style="color: #ffffff; background: #4d97ff" onclick="navigator.clipboard.writeText(decodeURI('${encodeURI(JSON.stringify({"icon":get(projectInfo,path).icon,"name":get(projectInfo,path).name,"code":get(projectInfo,path).code}))}')); closePopup()">Copy</button><a class="rectButton" style="color: #ffffff; background: #4d97ff" href="${createDownloadLinkFromList(JSON.stringify({"icon":get(projectInfo,path).icon,"name":get(projectInfo,path).name,"code":get(projectInfo,path).code}).split(''), true)}" download="${get(projectInfo,path).name}.lsc" onclick="closePopup()">Export</a></span>`)
    },
    exportExtension: (path) => {
        insertPopup("Export extension", closePopupButton(), `<div style="padding: 10px 10px 0; max-height: calc(100% - 77.5px); overflow: hidden; position:relative;">Is this what you wanted to export?</div><div class="popupInfoSection">Name: <div class="infoContainer">${get(projectInfo,path).name}</div><br>Type: <div class="infoContainer">.lsx</div><br>Data: <div class="infoContainer">"${JSON.stringify({"color":get(projectInfo,path).color,"name":get(projectInfo,path).name,"scripts":accScripts(get(projectInfo,path).scripts)})}"</div></div><span class="popupLowerButtonsHolder"><button class="rectButton" style="color: #000000;" onclick="closePopup()">Cancel</button><button class="rectButton popupOkButton" style="color: #ffffff; background: #4d97ff" onclick="navigator.clipboard.writeText(decodeURI('${encodeURI(JSON.stringify({"color":get(projectInfo,path).color,"name":get(projectInfo,path).name,"scripts":accScripts(get(projectInfo,path).scripts)}))}')); closePopup()">Copy</button><a class="rectButton" style="color: #ffffff; background: #4d97ff" href="${createDownloadLinkFromList(JSON.stringify({"color":get(projectInfo,path).color,"name":get(projectInfo,path).name,"scripts":accScripts(get(projectInfo,path).scripts)}).split(''), true)}" download="${get(projectInfo,path).name}.lsx" onclick="closePopup()">Export</a></span>`)
    },
    importScript: (path)=>{
        insertPopup("Import script", closePopupButton(), `<label class="rectButton" style="color: #ffffff; background-color: #4d97ff; margin-top: 10px;"><input type="file" accept=".lsc,.bf,.JSON" class="import">Browse files</label><button class="rectButton loadFromClipboard" style="color: #ffffff; background-color: #4d97ff;" >Load from clipboard</button><div class="popupInfoSection dropArea"><span style="color:#d9d9d9;">A preview of your file will appear here</span></div><span class="popupLowerButtonsHolder"><button class="rectButton" style="color: #000000;" onclick="closePopup()">Cancel</button><button class="rectButton popupImportButton inactive">Import</button></span>`)
        //modified for scripts
        async function updateData(from, load){
            let autoEdit = false
            function activateButton() {
                document.getElementsByClassName("popupImportButton")[0].classList.remove("inactive")
                document.getElementsByClassName("popupImportButton")[0].setAttribute("style","color: #ffffff; background: #4d97ff")
            }
            activateButton()
            function deactivateButton() {
                document.getElementsByClassName("popupImportButton")[0].setAttribute("style","")
                document.getElementsByClassName("popupImportButton")[0].classList.add("inactive")
            }
            if(from === "clipboard"){
                const text = await navigator.clipboard.readText()
                try {
                    if(!load) {
                        renderJSONfile(JSON.parse(text).name, text, ".lsc: pasted");
                    }
                    else {
                        createScript(path,JSON.parse(text).name,JSON.parse(text).symbol,JSON.parse(text).code)
                    }
                } catch(error){
                    if(text.split("±").length>2){
                        if(!load){
                            document.getElementsByClassName('dropArea')[0].innerHTML = genFileInfo({
                                name: text.split("±")[1],
                                type: ".lsc (old version): pasted",
                                data: text
                            });
                        }
                        else {
                                if(!text.split("±")[0] || !text.split("±")[[1]]){
                                    autoEdit = createScript(path, text.split("±")[1], text.split("±")[0], text.split("±")[2])
                                } else {
                                    createScript(path, text.split("±")[1], text.split("±")[0], text.split("±")[2])
                                }                        }
                    } else if(text.match(/^[[\]+-<>,.]*(?=$)/g)){
                        if(!load) {
                            document.getElementsByClassName('dropArea')[0].innerHTML = genFileInfo({
                                name: "none",
                                type: ".bf: pasted",
                                data: text
                            })
                        }
                        else {
                            autoEdit = createScript(path,"","","‡" + text.split("").join("‡"))
                        }
                    } else {
                        document.getElementsByClassName('dropArea')[0].innerHTML = genFileInfo({
                            Error_message: "File is not valid: expected LSC or LSC-like file, received a file that does not meet validation criteria"
                        })
                        deactivateButton()
                    }
                }
                if (load){
                    treeRender()
                    renderScript(projectInfo.projectData.main.name,projectInfo.projectData.main.code)
                    if (autoEdit){
                        popups.editScript("projectData.scripts." + autoEdit, false, true)
                    }
                }
            } else if (from === "input") {
                const file = getFile()
                const reader = new FileReader()
                reader.readAsText(file)
                reader.addEventListener("load", () => {
                    const text = reader.result
                    try {
                        if(!load) renderJSONfile(JSON.parse(text).name,text,".lsc");
                        else {
                            createScript(path,JSON.parse(text).name,JSON.parse(text).symbol,JSON.parse(text).code)
                        }
                    } catch(error) {
                        if(text.split("±").length>2){
                            if(!load) {
                                document.getElementsByClassName('dropArea')[0].innerHTML = genFileInfo({
                                    name: text.split("±")[1],
                                    type: ".lsc (old version)",
                                    data: text
                                });
                                document.getElementsByClassName('dropArea')[0].innerHTML += "preview: <div class='codeHolder'></div>"
                                renderScript(text.split("±")[1], text.split("±")[2], document.getElementsByClassName('codeHolder')[0])
                            }
                            else {
                                if(!text.split("±")[0] || !text.split("±")[[1]]){
                                    autoEdit = createScript(path, text.split("±")[1], text.split("±")[0], text.split("±")[2])
                                } else {
                                    createScript(path, text.split("±")[1], text.split("±")[0], text.split("±")[2])
                                }
                            }
                        } else if(text.match(/^[[\]+-<>,.]*(?=$)/g)) {
                            if(!load) document.getElementsByClassName('dropArea')[0].innerHTML = genFileInfo({
                                name: "none",
                                type: ".bf",
                                data: text
                            });
                            else {
                                autoEdit = createScript(path,"Name","§","‡" + text.split("").join("‡"))
                            }
                        } else {
                            document.getElementsByClassName('dropArea')[0].innerHTML = genFileInfo({
                                Error_message: "File is not valid: expected LSC or LSC-like file, received a file that does not meet validation criteria"
                            })
                            deactivateButton()
                        }
                    }
                    // document.getElementsByClassName('dropArea')[0].innerHTML = genFileInfo({
                    //     name: file.name.substring(0, indexOfAll(file.name.split(''), '.')[indexOfAll(file.name.split(''), '.').length - 1]),
                    //     type: file.name.substring(indexOfAll(file.name.split(''), '.')[indexOfAll(file.name.split(''), '.').length - 1]),
                    //     data: text
                    // })
                    if (load){
                        treeRender()
                        renderScript(projectInfo.projectData.main.name,projectInfo.projectData.main.code)
                        if (autoEdit){
                            popups.editScript("projectData.scripts." + autoEdit, false, true)
                        }
                    }})
            }
            if (load) closePopup()
            function renderJSONfile(name,text,type){
                if(Object.keys(JSON.parse(text)).toString() === ['icon','name','code'].toString()) {
                    document.getElementsByClassName('dropArea')[0].innerHTML = genFileInfo({
                        name: name,
                        type: type,
                        data: text
                    })
                } else{
                    document.getElementsByClassName('dropArea')[0].innerHTML = genFileInfo({
                        Error_message: "File is not valid: expected LSC or LSC-like file, received a file that does not meet validation criteria"
                    })
                    deactivateButton()
                }
            }
        }
        let loadedFrom;
        document.getElementsByClassName("popupImportButton")[0].addEventListener("click",async (ev)=>{if(ev.target.style.background === "rgb(77, 151, 255)")await updateData(loadedFrom, true)})
        document.getElementsByClassName("import")[0].addEventListener("input",async ()=>{await updateData("input"); loadedFrom = "input"})
        document.getElementsByClassName("loadFromClipboard")[0].addEventListener("click",async ()=>{await updateData("clipboard"); loadedFrom = "clipboard"})
    },
    importExtension: ()=>{
        insertPopup("Import extension", closePopupButton(), `<label class="rectButton" style="color: #ffffff; background-color: #4d97ff; margin-top: 10px;"><input type="file" accept=".lsx,.JSON" class="import">Browse files</label><button class="rectButton loadFromClipboard" style="color: #ffffff; background-color: #4d97ff;" >Load from clipboard</button><div class="popupInfoSection dropArea"><span style="color:#d9d9d9;">A preview of your file will appear here</span></div><span class="popupLowerButtonsHolder"><button class="rectButton" style="color: #000000;" onclick="closePopup()">Cancel</button><button class="rectButton popupImportButton inactive">Import</button></span>`)
        async function updateData(from, load){
            let autoEdit = false
            function activateButton() {
                document.getElementsByClassName("popupImportButton")[0].classList.remove("inactive")
                document.getElementsByClassName("popupImportButton")[0].setAttribute("style","color: #ffffff; background: #4d97ff")
            }
            activateButton()
            function deactivateButton() {
                document.getElementsByClassName("popupImportButton")[0].setAttribute("style","")
                document.getElementsByClassName("popupImportButton")[0].classList.add("inactive")
            }
            if(from === "clipboard"){
                const text = await navigator.clipboard.readText()
                try {
                    if(!load) {
                        renderJSONfile(JSON.parse(text).name, text, ".lsx: pasted");
                    }
                    else {
                        let ex = createExtension(JSON.parse(text).name, JSON.parse(text).color)
                        JSON.parse(text).scripts.forEach((i)=>{
                            createScript("projectData.extensions." + ex,i.name,i.icon,i.code)
                        })
                    }
                } catch(error){
                    if(text.split("⁄").length>2){
                        if(!load){
                            document.getElementsByClassName('dropArea')[0].innerHTML = genFileInfo({
                                name: text.split("⁄")[1],
                                type: ".lsx (old version): pasted",
                                data: text
                            });
                        }
                        else {
                            const ex = createExtension(text.split("⁄")[1], text.split("⁄")[2])
                            text.split("⁄").splice(3).forEach((i) => {
                                createScript("projectData.extensions." + ex, i.split("±")[1], i.split("±")[0].charAt(1), i.split("±")[2])
                            })
                        }
                    }  else {
                        document.getElementsByClassName('dropArea')[0].innerHTML = genFileInfo({
                            Error_message: "File is not valid: expected LSX or LSX-like file, received a file that does not meet validation criteria"
                        })
                        deactivateButton()
                    }
                }
                if (load){
                    treeRender()
                    renderScript(projectInfo.projectData.main.name,projectInfo.projectData.main.code)
                    if (autoEdit){
                        popups.editScript("projectData.scripts." + autoEdit, false, true)
                    }
                }
            } else if (from === "input") {
                const file = getFile()
                const reader = new FileReader()
                reader.readAsText(file)
                reader.addEventListener("load", () => {
                    const text = reader.result
                    try {
                        if(!load) {
                            renderJSONfile(JSON.parse(text).name, text, ".lsx: pasted");
                        }
                        else {
                            let ex = createExtension(JSON.parse(text).name, JSON.parse(text).color)
                            JSON.parse(text).scripts.forEach((i)=>{
                                createScript("projectData.extensions." + ex,i.name,i.icon,i.code)
                            })
                        }
                    } catch(error) {if(text.split("⁄").length>2){
                        if(!load){
                            document.getElementsByClassName('dropArea')[0].innerHTML = genFileInfo({
                                name: text.split("⁄")[1],
                                type: ".lsx (old version)",
                                data: text
                            });
                        }
                        else {
                            const ex = createExtension(text.split("⁄")[1],text.split("⁄")[2])
                            text.split("⁄").splice(3).forEach((i)=>{
                                createScript("projectData.extensions." + ex, i.split("±")[1], i.split("±")[0].charAt(1), i.split("±")[2])
                            })
                        }
                    }  else {
                        if(!load) {
                            document.getElementsByClassName('dropArea')[0].innerHTML = genFileInfo({
                                Error_message: "File is not valid: expected LSX or LSX-like file, received a file that does not meet validation criteria"
                            })
                            deactivateButton()
                        }

                    }
                    }
                    // document.getElementsByClassName('dropArea')[0].innerHTML = genFileInfo({
                    //     name: file.name.substring(0, indexOfAll(file.name.split(''), '.')[indexOfAll(file.name.split(''), '.').length - 1]),
                    //     type: file.name.substring(indexOfAll(file.name.split(''), '.')[indexOfAll(file.name.split(''), '.').length - 1]),
                    //     data: text
                    // })
                    if (load){
                        treeRender()
                        renderScript(projectInfo.projectData.main.name,projectInfo.projectData.main.code)
                        if (autoEdit){
                            popups.editScript("projectData.scripts." + autoEdit, false, true)
                        }
                    }})
            }
            if (load) closePopup()
            function renderJSONfile(name,text,type){
                if(Object.keys(JSON.parse(text)).toString() === ['color','name','scripts'].toString()) {
                    document.getElementsByClassName('dropArea')[0].innerHTML = genFileInfo({
                        name: name,
                        type: type,
                        data: text
                    })
                } else{
                    document.getElementsByClassName('dropArea')[0].innerHTML = genFileInfo({
                        Error_message: "File is not valid: expected LSX or LSX-like file, received a file that does not meet validation criteria"
                    })
                    deactivateButton()
                }
            }
        }
        let loadedFrom;
        document.getElementsByClassName("popupImportButton")[0].addEventListener("click",async (ev)=>{if(ev.target.style.background === "rgb(77, 151, 255)")await updateData(loadedFrom, true)})
        document.getElementsByClassName("import")[0].addEventListener("input",async ()=>{await updateData("input"); loadedFrom = "input"})
        document.getElementsByClassName("loadFromClipboard")[0].addEventListener("click",async ()=>{await updateData("clipboard"); loadedFrom = "clipboard"})
    },
    addPremadeExtension: ()=>{
        insertPopup("Add extension", closePopupButton(), `<div class="exSelectWrapper"><div class="extensionSelector"><button class="exSelectBlock" onmouseenter="expandMenuBlock(this)" onmouseleave="this.style.height = ''" style="--hover-content: 'Some simple example programs';" onclick="loadPremadeExtension('HW'); closePopup()"><img src="LSimages/extensions/Hello_world.svg" alt="Extension image">Hello world!</button><button class="exSelectBlock" onmouseenter="expandMenuBlock(this)" onmouseleave="this.style.height = ''" style="--hover-content: 'Adds blocks to duplicate cells left or right';" onclick="loadPremadeExtension('copy'); closePopup()"><img src="LSimages/extensions/Copy.svg" alt="Extension image">Copy cells</button><button class="exSelectBlock" onmouseenter="expandMenuBlock(this)" onmouseleave="this.style.height = ''" style="--hover-content: 'Contains functions that set both negative and positive cells to zero';" onclick="loadPremadeExtension('clear'); closePopup()"><img src="LSimages/extensions/Clear.svg" alt="Extension image">Clear cells</button></div><div class="popupInfoSection" style="height: min-content; width: 420px; margin: 0; overflow: visible;">Can't find what you're looking for in this insanely limited library of extensions? Close this menu, press "Add extension", then press "Add custom".</div></div>`)
    }
}