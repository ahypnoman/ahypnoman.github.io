window.addEventListener("load", runFuncs)

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
                "crew": [75,"people"]

            },
            "upkeepStr": "300 tons of metal\n20 tons of fuel\n5 tons of canvas\n1,000,000 Nocks",
            "upkeepJSON": {
                "pricetag": 1000000,
                "metal": 300,
                "fuel": 20,
                "canvas": 5,
            },
            "capacity":"0 tons",
            "image":"images/ManOfWar.jpeg",
            "alt":"Image of a Man Of War warship",
            "efficiency":"N/A"
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
                "crew": [85,"people"]

            },
            "upkeepStr": "100 tons of metal\n10 tons of fuel\n1 ton of canvas\n1,000,000 Nocks",
            "upkeepJSON": {
                "pricetag": 1000000,
                "metal": 100,
                "fuel": 10,
                "canvas": 1,
            },
            "capacity":"1000 tons",
            "image":"images/Sailboat.webp",
            "alt":"Image of a sailing ship",
            "efficiency":"N/A"
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
                "crew": [5,"horses"]
            },
            "upkeepStr": "0.2 tons of metal\n2 tons of timber\n2,000 Nocks",
            "upkeepJSON": {
                "pricetag": 2000,
                "metal": 0.2,
                "timber": 2,
            },
            "capacity":"20 tons",
            "image":"images/Wagon.jpeg",
            "alt":"Image of a wagon",
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
                "crew": ["","N/A"]

            },
            "upkeepStr": "0.2 tons of metal\n1 ton of timber\n5,000 Nocks",
            "upkeepJSON": {
                "pricetag": 5000,
                "metal": 0.2,
                "timber": 1,
            },
            "capacity":"N/A",
            "image":"images/Loom.jpeg",
            "alt":"Image of a loom",
            "efficiency":"N/A"
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
                "crew": ["","N/A"]

            },
            "upkeepStr": "1 ton of metal\n2 tons of timber\n5,000 Nocks",
            "upkeepJSON": {
                "pricetag": 5000,
                "metal": 1,
                "timber": 2
            },
            "capacity":"N/A",
            "image":"images/WaterMill.jpeg",
            "alt":"Image of a Water Mill",
            "efficiency":"N/A"
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
                "crew": ["","N/A"]

            },
            "upkeepStr": "0.2 tons of metal\n2 tons of timber\n25,000 Nocks",
            "upkeepJSON": {
                "pricetag": 25000,
                "metal": 0.2,
                "timber": 2
            },
            "capacity":"N/A",
            "image":"images/Forge.jpeg",
            "alt":"Image of a Forge",
            "efficiency":"0.2"
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
                "crew": [2,"horses"]
            },
            "upkeepStr": "1 ton of metal\n1 ton of timber\n5,000 Nocks",
            "upkeepJSON": {
                "pricetag": 5000,
                "metal": 1,
                "timber": 1
            },
            "capacity":"N/A",
            "image":"images/Plough.jpeg",
            "alt":"Image of a Plough",
            "efficiency":"0.5"
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
                "crew": [1,"person"]
            },
            "upkeepStr": "0.01 ton of metal\n0.01 ton of fuel",
            "upkeepJSON": {
                "metal": 0.01,
                "fuel": 0.01
            },
            "capacity":"N/A",
            "image":"images/Musket.jpg",
            "alt":"Image of a Musket",
            "efficiency":"N/A"
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
                "crew": [1,"person"]

            },
            "upkeepStr": "0.005 tons of metal\n0.005 tons of fuel",
            "upkeepJSON": {
                "metal": 0.005,
                "fuel": 0.005
            },
            "capacity":"N/A",
            "image":"images/Flintlock.jpeg",
            "alt":"Image of an old pistol",
            "efficiency":"N/A"
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
                "crew": [1,"person"]

            },
            "upkeepStr": "0.0005 tons of fuel\n5 Nocks",
            "upkeepJSON": {
                "pricetag": 5,
                "fuel": 0.0005
            },
            "capacity":"N/A",
            "image":"images/Sword.jpeg",
            "alt":"Image of a sabre",
            "efficiency":"N/A"
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
                "crew": ["","N/A"]
            },
            "upkeepStr": "1 ton of metal\n1 ton of fuel\n1,000 Nocks",
            "upkeepJSON": {
                "pricetag": 1000,
                "metal": 1,
                "fuel": 1,
                "crew": ["","N/A"]
            },
            "capacity":"N/A",
            "image":"images/Cannon.jpeg",
            "alt":"Image of a cannon",
            "efficiency":"N/A"
        }
    ]
}

function renderLRDeterminer(num){
    if (num%2===0){
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
            if (itemIndex%2 === 0){
            } else {

            }
            element = document.getElementById(categories[categoryIndex])

            element.insertAdjacentHTML("beforeend", `
<div class="techContainer" id="${item.id}" style="float: ${renderLRDeterminer(itemIndex)}; clear: ${renderLRDeterminer(itemIndex)}; ">
<div style="display: flex"><div style="width: 50%; display: inline-block;"><h3 style="display: inline">${item.name}</h3><span style="float: right">amount: <input type="number" min="1" style="display: inline; width: 40px" id="${item.id}amount" value="1"></span><br>
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
<div><b class="jobs">Positons</b><span style="float: right;">${item.costJSON.crew[0]} ${item.costJSON.crew[1]}</span></div>
<div><b class="jobs">Capacity</b><span style="float: right;">${item.capacity}</span></div>
<div><b class="jobs">Efficiency</b><span style="float: right;">${item.efficiency}</span></div>
<div style="clear: both"></div>
</div>
</div>
`)
            document.getElementById(item.id + 'initCost').innerHTML = jsonCostsToString(item.costJSON, document.getElementById(item.id + 'amount').value)
            document.getElementById(item.id + 'upkeep').innerHTML = jsonCostsToString(item.upkeepJSON, document.getElementById(item.id + 'amount').value)
            document.getElementById(item.id + "amount").addEventListener("change", e => {
                if (document.getElementById(item.id + "amount").value < 1) document.getElementById(item.id + "amount").value = 1
                document.getElementById(item.id + 'initCost').innerHTML = jsonCostsToString(item.costJSON, document.getElementById(item.id + 'amount').value)
                document.getElementById(item.id + 'upkeep').innerHTML = jsonCostsToString(item.upkeepJSON, document.getElementById(item.id + 'amount').value)

            })
                itemIndex ++
        })
        categoryIndex ++
    })
}

function highlightHash() {

    let toHL = document.getElementById(window.location.hash.substring(1))
    if (toHL !== null) toHL.classList.add("inURLHash")
}

function jsonCostsToString(object, multiplier){
    let element = ""
    Object.keys(object).forEach(key => {
        if (key !== "pricetag"){
            if (key !== "crew"){
                if (object[key] === 1){
                    element = element + (object[key] * multiplier).toString() + " ton of " + key + "<br>";
                } else {
                    element = element + (object[key] * multiplier).toString() + " tons of " + key + "<br>";
                }
            }
        } else {
            element += (object[key]*multiplier).toString() + " Nocks<br>";
        }
    })
    return element
}

function runFuncs() {
    renderTech()
    highlightHash()
}

