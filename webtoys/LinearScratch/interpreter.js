let runningInfo;

function initialise(code, inputs, range, inputType, outputMode) {
    interpreterInfo.requestInput = false
    runningInfo = {
        pointer: 0,
        memory: [range[0]!==undefined?range[0]:0],
        inputs: [...inputs],
        inputIndex: 0,
        range: range,
        output: [],
        outputMode: outputMode,
        inputType: inputType,
        stackInfo: [
            {
                index: 1,
                code: code
            }
        ]
    }
}

function interpretNext() {
    if(!interpreterInfo.requestInput) {
        const stackInfo = runningInfo.stackInfo[runningInfo.stackInfo.length - 1]
        if (stackInfo.index > stackInfo.code.split("‡").length - 1) {
            interpreterInfo.paused = true;
            const RBH = document.getElementsByClassName("runningButtonsHolder")[0]
            if (RBH) {
                RBH.insertAdjacentHTML('afterend', startButton());
                RBH.remove();
            }
            document.dispatchEvent(new CustomEvent("programEnd"))
        }
        if (!(stackInfo.index > stackInfo.code.split("‡").length - 1)) {
            const i = stackInfo.index
            const t = stackInfo.code.split('‡')[i]
            runToken(t, i, stackInfo)
        }
    }
}

function renderUpdates(instant) {
    const stackInfo = runningInfo.stackInfo[0]
    if(document.getElementsByClassName("debugScriptWrapperHolder")[0]){
        document.getElementsByClassName("debugScriptWrapperHolder")[0].scrollTo({left: ((stackInfo.index < stackInfo.code.split("‡").length - 1) ? stackInfo.index : stackInfo.code.split("‡").length - 1) * 168 - 53, behavior: (instant) ? "auto" : "smooth"})
        const memWrapper = document.getElementsByClassName("memDisplayWrapper")[0]
        memWrapper.innerHTML = renderMemDisplay()
        memWrapper.scrollTo({left: memWrapper.children[Math.floor((document.body.clientWidth / 70 + 2) / 2) + runningInfo.pointer].offsetLeft - document.body.clientWidth / 2 + 20, top: 0, behavior: (instant) ? "auto" : "smooth"})
        memWrapper.children[Math.floor((document.body.clientWidth / 70 + 2) / 2) + runningInfo.pointer].classList.add("atPointer");
        [...document.getElementsByClassName("glowing")].forEach((el) => {
            el.remove()
        })
        const running = document.getElementsByClassName("debugScriptWrapper")[0].children[(stackInfo.index < stackInfo.code.split("‡").length - 1) ? stackInfo.index : stackInfo.code.split("‡").length - 1]
        running.insertAdjacentHTML("afterend", `<span class="block glowing" style="position: absolute; top: 0; left: ${running.offsetLeft - 2}px; --block-color: #00000000; margin: 0;"><span class="blockTop"></span><span class="blockBottom"></span><span class="innerBlock"></span></span>`)
    } else {
        if(document.getElementsByClassName("debugContent")[0]) renderDebugContent(runningInfo.outputMode);
        else renderOutputContent(runningInfo.outputMode)
    }
    if(runningInfo.output.length === 10001) renderWarning("Due to browser rendering limitations, this version of Linear Scratch only displays the first 10,000 values output by your program.")
}

function runCustomBlock(stackInfo){
    if(!interpreterInfo.requestInput) {
        stackInfo.code.split("‡")
        if (stackInfo.index > stackInfo.code.split("‡").length - 1) {
            runningInfo.stackInfo[runningInfo.stackInfo.length - 2].index++
            runningInfo.stackInfo.pop()
            if (!interpreterInfo.paused) renderUpdates()
            interpretNext()
        } else {
            const i = stackInfo.index
            const t = stackInfo.code.split('‡')[i]
            runToken(t, i, stackInfo)
        }
    }
}

function runToken(t, i, stackInfo){
    if(['>', '<', '+', '-', '.', ',', '[', ']'].includes(t)){
        if(t === '>') {
            runningInfo.pointer++
            if(runningInfo.pointer > runningInfo.memory.length-1) {
                runningInfo.memory.push(runningInfo.range[0]!==undefined?runningInfo.range[0]:0)
            }
        }
        else if(t === '<') {
            runningInfo.pointer--
            if(runningInfo.pointer < 0){
                if(document.getElementsByClassName("memDisplayWrapper")[0])document.getElementsByClassName("memDisplayWrapper")[0].scrollLeft += 70
                runningInfo.memory.unshift(runningInfo.range[0]!==undefined?runningInfo.range[0]:0)
                runningInfo.pointer++
            }
        }
        else if(t === '+') {
            runningInfo.memory[runningInfo.pointer]++
            if(runningInfo.range[0]<runningInfo.range[1]&&runningInfo.memory[runningInfo.pointer] > runningInfo.range[1]) {
                runningInfo.memory[runningInfo.pointer] = runningInfo.range[0]
            }
        }
        else if(t === '-') {
            runningInfo.memory[runningInfo.pointer]--
            if(runningInfo.range[0]<runningInfo.range[1]&&runningInfo.memory[runningInfo.pointer] < runningInfo.range[0]) {
                runningInfo.memory[runningInfo.pointer] = runningInfo.range[1]
            }
        }
        else if(t === '.') runningInfo.output.push(runningInfo.memory[runningInfo.pointer])
        else if(t === ',') {
            if(!runningInfo.inputs[runningInfo.inputIndex]) {
                runningInfo.inputIndex++
                stackInfo.index++
                if(!document.getElementsByClassName("playerIdentifier")[0]) popups.getInput(runningInfo.inputType, stackInfo)
                else {
                    interpreterInfo.requestInput = stackInfo
                    document.getElementsByClassName("inputsHolder")[0].children[0].focus()
                    if(document.getElementsByClassName('inputPrompt')[0]) document.getElementsByClassName("inputPrompt")[0].remove()
                    document.getElementsByClassName("projectControls")[0].children[1].insertAdjacentHTML("afterend",`<span class="inputPrompt" style="transform: translate(0, -3px); display: inline-flex; justify-content: center; align-items: center">Waiting for input</span>`)
                }
                return
            } else {
                runningInfo.memory[runningInfo.pointer] = parseInt(runningInfo.inputs[runningInfo.inputIndex])
                runningInfo.inputIndex++
            }
        }
        else if(t === '[' && runningInfo.memory[runningInfo.pointer] === 0){
            let depth = 1
            while(depth > 0){
                i++
                if(stackInfo.code.split('‡')[i] === '[') depth++
                else if(stackInfo.code.split('‡')[i] === ']') depth--
            }
            stackInfo.index = i
        }
        else if(t === ']' && runningInfo.memory[runningInfo.pointer] !== 0){
            let depth = 1
            while(depth > 0){
                i--
                if(stackInfo.code.split('‡')[i] === ']') depth++
                else if(stackInfo.code.split('‡')[i] === '[') depth--
            }
            stackInfo.index = i
        }
    } else {
        runningInfo.stackInfo.push({index: 1, code: projectInfo.projectData.scripts[t].code})
        runCustomBlock(runningInfo.stackInfo[runningInfo.stackInfo.length-1])
        return
    }
    stackInfo.index++
    if(!interpreterInfo.paused)renderUpdates()
    if(!interpreterInfo.paused && runningInfo.stackInfo.length<2) {
        setTimeout(() => {
            interpretNext()
        }, (interpreterInfo.turbo) ? document.getElementsByClassName("playerIdentifier")[0] ? 1 : 150 : 300)
    } else {
        if(!interpreterInfo.paused) {
            runCustomBlock(stackInfo)
        }
    }
}

function pushInput(){
    let toInput = runningInfo.inputs[runningInfo.inputs.length-1]
    if (runningInfo.inputType === "ASCII") toInput = toInput.charCodeAt(0)
    toInput = parseInt(toInput,10)
    if (toInput>runningInfo.range[1]) toInput = ((toInput - parseInt(runningInfo.range[0])) % (parseInt(runningInfo.range[1]) - parseInt(runningInfo.range[0])))+parseInt(runningInfo.range[0],10)
    else if (toInput<runningInfo.range[0]) toInput = Math.abs(toInput % (parseInt(runningInfo.range[0])))+parseInt(runningInfo.range[1],10) - parseInt(runningInfo.range[0],10)
    runningInfo.memory[runningInfo.pointer] = toInput
    renderUpdates()
}

function compileToBFStart(rawCode){
    let encounteredError;
    return compileToBF(rawCode)
    function compileToBF(rawCode){
        let code = rawCode.split("‡")
        code = code.splice(1, code.length - 1)
        let acc = ""
        code.forEach((i) => {
            if(encounteredError === undefined) {
                if (Object.keys(blockInfo).includes(i)) {
                    acc += i
                } else {
                    try {
                        acc += compileToBF(projectInfo.projectData.scripts[i].code)
                    } catch (error) {
                        encounteredError = error
                    }
                }
            }
        })
        if (encounteredError) return encounteredError
        return acc;
    }
}