window.addEventListener("load", runFuncs)

let techTitles = {
    "Military-Seaborne":"Navy",
    "Civilian-Seaborne":"CWV",
    "Airborne":"Air Fleet",
    "Land":"Land",
    "Civilian-Equipment":"Civ Equip",
    "Military-Equipment":"Mil Equip"
}

let tech = {
    "Military-Seaborne": [
        {
            "name": "Man Of War",
            "id": "ManOfWar",
            "civLevel": "1",
            "description": "The Man of War is a 19th Century Warship. It is powerful, made of wood, and uses cannons for it's main weapon.",
            "jobs": "50-100 people",
            "costStr": "500-1000 tons of metal\n1000-2000 tons of timber\n50 Tons of Canvas\n5,000,000 Nocks",
            "costJSON": {
                "pricetag": 5000000,
                "metal": 750,
                "timber": 1500,
                "canvas": 50,
                "crew": [75, "people"],
                "capacity": ["", "N/A"]
            },
            "upkeepStr": "300 tons of metal\n20 tons of fuel\n5 tons of canvas\n1,000,000 Nocks",
            "upkeepJSON": {
                "pricetag": 1000000,
                "metal": 300,
                "fuel": 20,
                "canvas": 5,
            },
            "capacity": "0 tons",
            "image": "LSimages/ManOfWar.jpeg",
            "alt": "Image of a Man Of War warship",
            "efficiency": "N/A"
        }
    ],
    "Civilian-Seaborne": [
        {
            "name": "Sailing Ship",
            "id": "Sailboat",
            "civLevel": "1",
            "description": "A basic civilian ship. Lightly armed, although not designed for combat. It is used to transport goods and people.",
            "jobs": "30-200 people",
            "costStr": "750 tons of metal\n1500-2500 tons of timber\n100 Tons of Canvas\n4,000,000 Nocks",
            "costJSON": {
                "pricetag": 4000000,
                "metal": 750,
                "timber": 2000,
                "canvas": 100,
                "crew": [85, "people"],
                "capacity": [1000, "tons"]
            },
            "upkeepStr": "100 tons of metal\n10 tons of fuel\n1 ton of canvas\n1,000,000 Nocks",
            "upkeepJSON": {
                "pricetag": 1000000,
                "metal": 100,
                "fuel": 10,
                "canvas": 1,
            },
            "capacity": "1000 tons",
            "image": "LSimages/Sailboat.webp",
            "alt": "Image of a sailing ship",
            "efficiency": "N/A"
        }
    ],
    "Airborne": [],
    "Land": [
        {
            "name": "Wagon",
            "id": "Wagon",
            "civLevel": "1",
            "description": "Cheap land transport. Can easily be manufactured en masse to transport large amounts of goods.",
            "jobs": "1-10 horses",
            "costStr": "2-5 tons of metal\n10-20 tons of timber\n20,000 Nocks",
            "costJSON": {
                "pricetag": 20000,
                "metal": 3.5,
                "timber": 15,
                "crew": [5, "horses"],
                "capacity": [20, "tons"]
            },
            "upkeepStr": "0.2 tons of metal\n2 tons of timber\n2,000 Nocks",
            "upkeepJSON": {
                "pricetag": 2000,
                "metal": 0.2,
                "timber": 2,
            },
            "capacity": "20 tons",
            "image": "LSimages/Wagon.jpeg",
            "alt": "Image of a wagon",
            "efficiency": "N/A"
        },
        {
            "name": "Train",
            "id": "Train",
            "civLevel": "2",
            "description": "Trains are the most advanced method of land transportation. They are fairly fast and average 50mph on open land. Every 1,200 trips, a train  explodes, losing all crew and the train.\nPrices below are for 5 cars and a locomotive.",
            "jobs": "1-10 horses",
            "costStr": "2-5 tons of metal\n10-20 tons of timber\n20,000 Nocks",
            "costJSON": {
                "pricetag": 100000,
                "metal": 600,
                "timber": 500,
                "crew": [5, "people"],
                "capacity": [0, "Not provided"]
            },
            "upkeepStr": "0.2 tons of metal\n2 tons of timber\n2,000 Nocks",
            "upkeepJSON": {
                "pricetag": 2000,
                "metal": 50,
                "fuel": 1000,
                "water": 40000
            },
            "capacity": "20 tons",
            "image": "LSimages/Train.jpeg",
            "alt": "Image of a train",
            "efficiency": "N/A"
        },
        {
            "name": "Railway",
            "id": "rail",
            "civLevel": "2",
            "description": "Rails are used for Trains to run on. You lose 1% of the workers that you assign to build a railway due to dangerous conditions and hard work. Prices listed are for 1 mile of track.",
            "jobs": "1-10 horses",
            "costJSON": {
                "metal": 50,
                "timber": 10,
                "building material": 5,
                "crew": ["", "N/A"],
                "capacity": ["", "N/A"]
            },
            "upkeepJSON": {"pricetag":0},
            "capacity": "20 tons",
            "image": "LSimages/rail.jpeg",
            "alt": "Image of a railway",
            "efficiency": "N/A",
            "crew": ["", "N/A"],
        },
        {
            "name": "Railway bridge",
            "id": "railbridge",
            "civLevel": "2",
            "description": "Rails but above water.\nPrices listed are for 1 mile of track.",
            "jobs": "1-10 horses",
            "costJSON": {
                "metal": 0.5,
                "timber": 5,
                "rail": 1,
                "crew": ["", "N/A"],
                "capacity": ["", "N/A"]
            },
            "upkeepJSON": {},
            "capacity": "20 tons",
            "image": "LSimages/railbridge.jpeg",
            "alt": "Image of a railway bridge",
            "efficiency": "N/A"
        }
    ],
    "Civilian-Equipment": [
        {
            "name": "Loom",
            "id": "Loom",
            "civLevel": "1",
            "description": "Can create uniforms using Canvas. (Can turn 1 ton of Canvas into 1,000 uniforms)",
            "jobs": "0",
            "costStr": "1 ton of metal\n2 tons of timber\n50,000 Nocks",
            "costJSON": {
                "pricetag": 50000,
                "metal": 1,
                "timber": 2,
                "crew": ["", "N/A"],
                "capacity": ["", "N/A"]
            },
            "upkeepStr": "0.2 tons of metal\n1 ton of timber\n5,000 Nocks",
            "upkeepJSON": {
                "pricetag": 5000,
                "metal": 0.2,
                "timber": 1,
            },
            "capacity": "N/A",
            "image": "LSimages/Loom.jpeg",
            "alt": "Image of a loom",
            "efficiency": "N/A"
        },
        {
            "name": "Water Mill",
            "id": "WaterMill",
            "civLevel": "1",
            "description": "Required to turn crops into food. (Can turn 1 ton of unprocessed crops into 1 ton of food)",
            "jobs": "0",
            "costStr": "10 tons of metal\n80 tons of timber\n60 tons of building material\n500,000 Nocks",
            "costJSON": {
                "pricetag": 500000,
                "metal": 750,
                "timber": 80,
                "building material": 60,
                "crew": ["", "N/A"],
                "capacity": ["", "N/A"]
            },
            "upkeepStr": "1 ton of metal\n2 tons of timber\n5,000 Nocks",
            "upkeepJSON": {
                "pricetag": 5000,
                "metal": 1,
                "timber": 2
            },
            "capacity": "N/A",
            "image": "LSimages/WaterMill.jpeg",
            "alt": "Image of a Water Mill",
            "efficiency": "N/A"
        },
        {
            "name": "Forge",
            "id": "Forge",
            "civLevel": "1",
            "description": "Required to turn raw ores into metal and can turn metal into weapons.",
            "jobs": "0",
            "costStr": "2 tons of metal\n50 tons of timber\n20 tons of building material \n200,000 Nocks",
            "costJSON": {
                "pricetag": 200000,
                "metal": 2,
                "timber": 50,
                "building material": 20,
                "crew": ["", "N/A"],
                "capacity": ["", "N/A"]
            },
            "upkeepStr": "0.2 tons of metal\n2 tons of timber\n25,000 Nocks",
            "upkeepJSON": {
                "pricetag": 25000,
                "metal": 0.2,
                "timber": 2
            },
            "capacity": "N/A",
            "image": "LSimages/Forge.jpeg",
            "alt": "Image of a Forge",
            "efficiency": 0.2
        },
        {
            "name": "Plough (Plow)",
            "id": "Plough",
            "civLevel": "1",
            "description": "Assists in farming crops",
            "jobs": "2 horses",
            "costStr": "2 tons of metal\n5 tons of timber\n10,000 Nocks",
            "costJSON": {
                "pricetag": 10000,
                "metal": 2,
                "timber": 5,
                "crew": [2, "horses"],
                "capacity": ["", "N/A"]
            },
            "upkeepStr": "1 ton of metal\n1 ton of timber\n5,000 Nocks",
            "upkeepJSON": {
                "pricetag": 5000,
                "metal": 1,
                "timber": 1
            },
            "capacity": "N/A",
            "image": "LSimages/Plough.jpeg",
            "alt": "Image of a Plough",
            "efficiency": 0.5
        },
        {
            "name": "Dynamite",
            "id": "Dynamite",
            "civLevel": "2",
            "description": "Dynamite is a useful explosive in mining and building. Using it on mountainous terrain can lower railway building  costs by 10%, and increase mining efficiency by 0.1%. Prices per ton.",
            "jobs": "2 horses",
            "costJSON": {
                "pricetag": 100,
                "metal": 1,
                "Building material": 1,
                "crew": ["", "N/A"],
                "capacity": ["", "N/A"]
            },
            "upkeepJSON": {
                "preicetag":0,
                "metal": 0.1,
            },
            "capacity": "N/A",
            "image": "LSimages/Dynamite.jpeg",
            "alt": "Image of Dynamite",
            "efficiency": "N/A"
        }
    ],
    "Military-Equipment": [
        {
            "name": "Musket",
            "id": "Musket",
            "civLevel": "1",
            "description": "The most basic of guns. A slow loading, inaccurate, and short-ranged weapon, but certainly better than a melee weapon such as a sabre",
            "jobs": "1 soldier",
            "costStr": "0.01 ton of metal\n0.01 ton of timber\n100 Nocks",
            "costJSON": {
                "pricetag": 100,
                "metal": 0.01,
                "timber": 0.01,
                "crew": [1, "people"],
                "capacity": ["", "N/A"]
            },
            "upkeepStr": "0.01 ton of metal\n0.01 ton of fuel",
            "upkeepJSON": {
                "metal": 0.01,
                "fuel": 0.01
            },
            "capacity": "N/A",
            "image": "LSimages/Musket.jpg",
            "alt": "Image of a Musket",
            "efficiency": "N/A"
        },
        {
            "name": "Pistol",
            "id": "Flintlock",
            "civLevel": "1",
            "description": "The same as a musket, but worse and cheaper. Don't get these. They are highly inaccurate, have a very short range, and are extremely slow loading.",
            "jobs": "1 soldier",
            "costStr": "0.005 tons of metal\n0.005 tons of timber\n50 Nocks",
            "costJSON": {
                "pricetag": 50,
                "metal": 0.005,
                "timber": 0.005,
                "crew": [1, "people"],
                "capacity": ["", "N/A"]
            },
            "upkeepStr": "0.005 tons of metal\n0.005 tons of fuel",
            "upkeepJSON": {
                "metal": 0.005,
                "fuel": 0.005
            },
            "capacity": "N/A",
            "image": "LSimages/Flintlock.jpeg",
            "alt": "Image of an old pistol",
            "efficiency": "N/A"
        },
        {
            "name": "Sabre (Saber)",
            "id": "Sword",
            "civLevel": "1",
            "description": "A melee weapon. Not good for most warfare, although good for soldiers to have in case of enemy charges, or in your own charges.",
            "jobs": "1 soldier",
            "costStr": "0.015 tons of metal\n0.005 tons of timber\n50 Nocks",
            "costJSON": {
                "pricetag": 50,
                "metal": 0.015,
                "timber": 0.005,
                "crew": [1, "people"],
                "capacity": ["", "N/A"]
            },
            "upkeepStr": "0.0005 tons of fuel\n5 Nocks",
            "upkeepJSON": {
                "pricetag": 5,
                "fuel": 0.0005
            },
            "capacity": "N/A",
            "image": "LSimages/Sword.jpeg",
            "alt": "Image of a sabre",
            "efficiency": "N/A"
        },
        {
            "name": "Cannon",
            "id": "Cannon",
            "civLevel": "1",
            "description": "The only artillery of the 19th century, and as you would expect of such a time period, it is not highly accurate. It has a range of 914.4 meters (1000 yards)",
            "jobs": "1 soldier",
            "costStr": "2 tons of metal\n1 ton of timber\n10,000 Nocks",
            "costJSON": {
                "pricetag": 10000,
                "metal": 2,
                "timber": 1,
                "crew": ["", "N/A"],
                "capacity": ["", "N/A"]
            },
            "upkeepStr": "1 ton of metal\n1 ton of fuel\n1,000 Nocks",
            "upkeepJSON": {
                "pricetag": 1000,
                "metal": 1,
                "fuel": 1,
                "crew": ["", "N/A"],
                "capacity": ["", "N/A"]
            },
            "capacity": "N/A",
            "image": "LSimages/Cannon.jpeg",
            "alt": "Image of a cannon",
            "efficiency": "N/A"
        }
    ]
}

let totalInit = {}
let totalUpkeep = {}
let totalCrew = {}
let totalCapacity = {}
let tab = "init"

function renderLRDeterminer(num) {
    if (num % 2 === 0) {
        return "left"
    } else return "right"
}

function renderTech() {
    const categories = Object.keys(tech)
    let categoryIndex = 0;
    categories.forEach(category => {
        let items = tech[category]
        let itemIndex = 0;
        items.forEach(item => {
            let element;
            element = document.getElementById(categories[categoryIndex])

            element.insertAdjacentHTML("beforeend", `
<div class="techContainer" id="${item.id}" style="float: ${renderLRDeterminer(itemIndex)}; clear: ${renderLRDeterminer(itemIndex)}; ">
<div style="display: flex"><div style="width: 50%; display: inline-block;"><h3 style="display: inline">${item.name}</h3><span style="float: right">amount: <input type="number" min="0" style="display: inline; width: 40px" id="${item.id}amount" class="amountInput" previousVal="1" value="1"></span><br>
<span class="hashRef">#${item.id}</span> - <button class="copier" id="#${item.id}" onclick="navigator.clipboard.writeText(window.location.host + window.location.pathname + this.id)">copy link (click)</button>
<br><br><span class="civLevel">Civilisation Level: ${item.civLevel}</span>
<p class="description">${item.description}</p></div>
<div style="margin-bottom: 11px"></div>
<img alt="${item.alt}" style="display: flex; margin-left: 5%" width="45%" height="150px" src="${item.image}">
</div>
<hr style="margin: 8px 0 16px 0">
<div class="dataContainer" style="margin-right: 2%"><b>Cost</b><p id="${item.id}initCost"></p></div>
<div class="dataContainer" style="margin-right: 3%"><b>Upkeep</b><p id="${item.id}upkeep"></p></div>
<div class="dataContainer miscData">
<div><b>Misc</b></div><br>
<div><b class="jobs">Positons</b><span id="${item.id}crew" style="float: right;"></span></div>
<div><b class="jobs">capacity</b><span id="${item.id}capacity" style="float: right;"></span></div>
<div><b class="jobs">Efficiency</b><span id="${item.id}efficiency" style="float: right;"></span></div>
<div style="clear: both"></div>
</div>
</div>
`)
            document.getElementById(item.id + 'initCost').innerHTML = jsonCostsToString(item.costJSON, document.getElementById(item.id + 'amount').value, "initCost", false, Math.abs(document.getElementById(item.id + 'amount').value - document.getElementById(item.id + 'amount').getAttribute("previousVal")))
            document.getElementById(item.id + 'upkeep').innerHTML = jsonCostsToString(item.upkeepJSON, document.getElementById(item.id + 'amount').value, "upkeep", false, Math.abs(document.getElementById(item.id + 'amount').value - document.getElementById(item.id + 'amount').getAttribute("previousVal")))
            document.getElementById(item.id + 'crew').innerHTML = listMetaToString(item.costJSON.crew, document.getElementById(item.id + 'amount').value, "initCost", false, Math.abs(document.getElementById(item.id + 'amount').value - document.getElementById(item.id + 'amount').getAttribute("previousVal")))
            document.getElementById(item.id + 'capacity').innerHTML = listMetaToString(item.costJSON.capacity, document.getElementById(item.id + 'amount').value, "initCost", false, Math.abs(document.getElementById(item.id + 'amount').value - document.getElementById(item.id + 'amount').getAttribute("previousVal")))
            document.getElementById(item.id + 'efficiency').innerHTML = efficiencyFixer(item.efficiency, item.id)
            document.getElementById(item.id + "amount").addEventListener("change", e => {
                if (document.getElementById(item.id + "amount").value < 0) document.getElementById(item.id + "amount").value = 0
                if (document.getElementById(item.id + "amount").value > document.getElementById(item.id + "amount").getAttribute("previousVal")) {
                    document.getElementById(item.id + 'initCost').innerHTML = jsonCostsToString(item.costJSON, document.getElementById(item.id + 'amount').value, "initCost", false, false, false, Math.abs(document.getElementById(item.id + 'amount').value - document.getElementById(item.id + 'amount').getAttribute("previousVal")))
                    document.getElementById(item.id + 'upkeep').innerHTML = jsonCostsToString(item.upkeepJSON, document.getElementById(item.id + 'amount').value, "upkeep", false, false, false, Math.abs(document.getElementById(item.id + 'amount').value - document.getElementById(item.id + 'amount').getAttribute("previousVal")))
                    document.getElementById(item.id + 'crew').innerHTML = listMetaToString(item.costJSON.crew, document.getElementById(item.id + 'amount').value, "initCost", false, false, false, Math.abs(document.getElementById(item.id + 'amount').value - document.getElementById(item.id + 'amount').getAttribute("previousVal")))
                    document.getElementById(item.id + 'capacity').innerHTML = listMetaToString(item.costJSON.capacity, document.getElementById(item.id + 'amount').value, "initCost", false, false, true, Math.abs(document.getElementById(item.id + 'amount').value - document.getElementById(item.id + 'amount').getAttribute("previousVal")))
                    document.getElementById(item.id + 'efficiency').innerHTML = efficiencyFixer(item.efficiency, item.id)
                    totalRender()
                } else {
                    document.getElementById(item.id + 'initCost').innerHTML = jsonCostsToString(item.costJSON, document.getElementById(item.id + 'amount').value, "initCost", false, "sub", false, Math.abs(document.getElementById(item.id + 'amount').value - document.getElementById(item.id + 'amount').getAttribute("previousVal")))
                    document.getElementById(item.id + 'upkeep').innerHTML = jsonCostsToString(item.upkeepJSON, document.getElementById(item.id + 'amount').value, "upkeep", false, "sub", false, Math.abs(document.getElementById(item.id + 'amount').value - document.getElementById(item.id + 'amount').getAttribute("previousVal")))
                    document.getElementById(item.id + 'crew').innerHTML = listMetaToString(item.costJSON.crew, document.getElementById(item.id + 'amount').value, "initCost", false, "sub", false, Math.abs(document.getElementById(item.id + 'amount').value - document.getElementById(item.id + 'amount').getAttribute("previousVal")))
                    document.getElementById(item.id + 'capacity').innerHTML = listMetaToString(item.costJSON.capacity, document.getElementById(item.id + 'amount').value, "initCost", false, "sub", false, Math.abs(document.getElementById(item.id + 'amount').value - document.getElementById(item.id + 'amount').getAttribute("previousVal")))
                    document.getElementById(item.id + 'efficiency').innerHTML = efficiencyFixer(item.efficiency, item.id)
                    totalRender()
                }
                document.getElementById(item.id + "amount").setAttribute("previousVal", document.getElementById(item.id + "amount").value)
            })
            itemIndex++
        })
        categoryIndex++
    })
}

function totalRender() {
    if (tab === "init") {
        document.getElementById("totalContainer").innerHTML = "<b>Initial cost</b><br><br>" + jsonCostsToString(totalInit, 1, "noTons", true, false, true)
    } else if (tab === "jobs") {
        document.getElementById("totalContainer").innerHTML = "<b>Positions</b><br><br>" + jsonCostsToString(totalCrew, 1, "noTons", true, false, true) + "<hr><b>Capacity</b><br><br>" + jsonCostsToString(totalCapacity, 1, "noTons", true, false, true)
    } else if (tab === "upkeep") {
        document.getElementById("totalContainer").innerHTML = "<b>Upkeep costs</b><br><br>" + jsonCostsToString(totalUpkeep, 1, "noTons", true, false, true)
    }

    Object.keys(tech).forEach(x => {
        document.getElementById("techList").insertAdjacentHTML("beforeend", `<b style="color: #0000c4; cursor: pointer"><a onclick="try {document.getElementById(window.location.hash.substring(1)).classList.remove('inURLHash')}catch{} window.location.hash = '${x}'; highlightHash()">${techTitles[x]}</a></b><br>`)
        Object.keys(tech[x]).forEach(y => {
            document.getElementById("techList").insertAdjacentHTML("beforeend", `<a style="color: #8d0000; cursor: pointer" onclick="try {document.getElementById(window.location.hash.substring(1)).classList.remove('inURLHash')}catch{} window.location.hash = '${tech[x][y].id}'; highlightHash()">${tech[x][y].name}</a><br>`)
        })
    })
    document.getElementById("clearAll").setAttribute("style", "width: " + (document.getElementById("techList").clientWidth-1) + "px")
}

function efficiencyFixer(ef, id) {
    if (!isNaN(ef)) return (ef * document.getElementById(id + 'amount').value).toString(); else return "N/A"
}

function highlightHash() {
    let toHL = document.getElementById(window.location.hash.substring(1))
    if (toHL !== null) toHL.classList.add("inURLHash")
    toHL.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
}

function listMetaToString(list, multiplier) {
    if (list[0] === "") {
        if (list[1] === "N/A") {
            return "N/A"
        } else {
            return "<span style='color: red'>Incomplete data</span>"
        }
    } else {
        return list[0] * multiplier + " " + list[1]
    }
}

function jsonCostsToString(object, multiplier, upkeepOrInit, dontprice, sub, nofix, priceMultiplier) {
    console.log(priceMultiplier)
    let element = ""
    Object.keys(object).forEach(key => {
        let FlPoErFixer = "1";
        if (object[key].toString().includes(".") && nofix === false) {
            let places = object[key].toString().split(".")[1].length
            for (let i = 0; i < places; i++) {
                FlPoErFixer += "0"
            }
        }
        if (key !== "pricetag" && key !== "capacity") {
            if (key !== "crew") {
                if (upkeepOrInit !== "noTons") {
                    if (object[key] === 1) {
                        element = element + (object[key] * FlPoErFixer * multiplier) / FlPoErFixer.toString() + " ton of " + key + "<br>";
                    } else {
                        element = element + (object[key] * FlPoErFixer * multiplier) / FlPoErFixer.toString() + " tons of " + key + "<br>";
                    }
                } else element = element + (object[key] * FlPoErFixer * multiplier).toString() + " " + key + "<br>";
            }
        } else {
            if (key === "pricetag") element += (object[key] * FlPoErFixer * multiplier) / FlPoErFixer.toString() + " Nocks<br>";
        }
        if (!dontprice) {
            if (upkeepOrInit === "initCost") {
                if (key !== "crew" && key !== "capacity") {
                    if (!isNaN(object[key])) {
                        if (!totalInit[key]) totalInit[key] = 0

                        if (!sub) {
                            totalInit[key] += object[key] * ((priceMultiplier > 0) ? priceMultiplier : 1)
                        } else {
                            totalInit[key] -= object[key] * ((priceMultiplier > 0) ? priceMultiplier : 1)
                        }
                    }
                } else {
                    if (!isNaN(object[key][0])) {
                        if (key === "crew") {
                            if (!totalCrew[object[key][1]]) totalCrew[object[key][1]] = 0;
                            if (!sub) {
                                totalCrew[object[key][1]] += object[key][0] * ((priceMultiplier > 0) ? priceMultiplier : 1)
                            } else {
                                totalCrew[object[key][1]] -= object[key][0] * ((priceMultiplier > 0) ? priceMultiplier : 1)
                            }
                            delete totalCrew["N/A"]

                        } else {
                            if (key === "capacity") {
                                if (!totalCapacity[object[key][1]]) totalCapacity[object[key][1]] = 0;
                                if (!sub) {
                                    totalCapacity[object[key][1]] += object[key][0] * ((priceMultiplier > 0) ? priceMultiplier : 1)
                                } else {
                                    totalCapacity[object[key][1]] -= object[key][0] * ((priceMultiplier > 0) ? priceMultiplier : 1)
                                }
                                delete totalCapacity["N/A"]

                            }
                        }
                    }
                }
            } else {
                if (key !== "crew" && key !== "capacity") {

                    if (!isNaN(object[key])) {
                        if (!totalUpkeep[key]) totalUpkeep[key] = 0
                        if (!sub) {
                            totalUpkeep[key] += object[key] * priceMultiplier
                        } else {
                            totalUpkeep[key] -= object[key] * priceMultiplier
                        }

                    }
                } else {
                }
            }
        }

    })
    return element
}

function runFuncs() {
    renderTech()
    if(window.location.hash.substring(1) !== '')highlightHash()
    totalRender()
}

