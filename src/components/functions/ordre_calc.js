
import CONSTANTS from '@/components/dictionaries/CONSTANTS.json' 


function getConstants() {
    return {
        "panel_h": CONSTANTS["panel_h"],
        "panel_w": CONSTANTS["panel_w"],
        "afstand": CONSTANTS["afstand"],
        "Sunpower_effektlist": CONSTANTS["Sunpower_effektlist"],
    }
}






function singleRoofParts(cols, rows, retning, befaestelse) {
    var montageskinne = 0
    var forbindeled = 0
    var rammemontageclips_midt = 0
    var rammemontageclips_ende = 0
    var montageskrue = 0
    var adaptervinkel = 0
    var montagebeslag = 0
    if (rows <= 1 || cols <= 1 || rows % 1 != 0 || cols % 1 != 0) {
        return {
        "montageskinne": montageskinne,
        "forbindeled": forbindeled,
        "rammemontageclips_ende": rammemontageclips_ende,
        "rammemontageclips_midt": rammemontageclips_midt,
        "rammemontageclips_ende": rammemontageclips_ende,
        "montageskrue": montageskrue,
        "adaptervinkel": adaptervinkel,
        "montagebeslag": montagebeslag
        }
    }

    var constants = getConstants();
    var panel_h = constants["panel_h"]
    var panel_w = constants["panel_w"]
    var afstand = constants["afstand"]

    var subtotal_w = retning == "portrait" ? panel_w*cols/1000 : panel_h*cols/1000
    var middle_clamps = 0.02 * (cols - 1)
    var end_clamps = 2 * 0.03

    var total_w = subtotal_w + middle_clamps + end_clamps
    var total_h = retning == "portrait" ? panel_h*rows/1000 : panel_w*rows/1000

    
    if (retning == "portrait") {
        montageskinne += Math.ceil(total_w/3.3)*2*rows
        forbindeled += (Math.ceil(total_w/3)-1)*2*rows
        rammemontageclips_midt += 2*(cols-1)*rows
        rammemontageclips_ende += 2*2*rows

        var befaestelsesTal = (Math.ceil(total_w/(afstand/1000))+1)*2*rows
        if (befaestelse == "Tagkrog") {
            montagebeslag += befaestelsesTal
        } else {
            montageskrue += befaestelsesTal
            adaptervinkel += befaestelsesTal
        }
    } else {
        console.log(`total_h er: ${total_h}`);
        montageskinne += Math.ceil(total_h/3.3)*2*cols
        forbindeled += (Math.ceil(total_h/3)-1)*2*cols
        rammemontageclips_midt += 2*(rows-1)*cols
        rammemontageclips_ende += 2*2*cols
        var befaestelsesTal = (Math.ceil(total_h/(afstand/1000))+1)*2*cols
        if (befaestelse == "Tagkrog") {
            montagebeslag += befaestelsesTal
        } else {
            montageskrue += befaestelsesTal
            adaptervinkel += befaestelsesTal
        }
    }

    var partlist = {
        "montageskinne": montageskinne,
        "forbindeled": forbindeled,
        "rammemontageclips_ende": rammemontageclips_ende,
        "rammemontageclips_midt": rammemontageclips_midt,
        "rammemontageclips_ende": rammemontageclips_ende,
        "montageskrue": montageskrue,
        "adaptervinkel": adaptervinkel,
        "montagebeslag": montagebeslag
    }
    return partlist
}

function getMontageParts(inputs) {
    var montageskinne_total = 0
    var forbindeled_total = 0
    var rammemontageclips_midt_total = 0
    var rammemontageclips_ende_total = 0
    var montageskrue_total = 0
    var adaptervinkel_total = 0
    var montagebeslag_total = 0
    for (let tag in inputs) {   
        var singleRoofPartlist = singleRoofParts(inputs[tag].col, inputs[tag].row, inputs[tag].retning, inputs[tag].befaestelse)
        montageskinne_total += singleRoofPartlist["montageskinne"]
        forbindeled_total += singleRoofPartlist["forbindeled"]
        rammemontageclips_midt_total += singleRoofPartlist["rammemontageclips_midt"]
        rammemontageclips_ende_total += singleRoofPartlist["rammemontageclips_ende"]
        montageskrue_total += singleRoofPartlist["montageskrue"]
        adaptervinkel_total += singleRoofPartlist["adaptervinkel"]
        montagebeslag_total += singleRoofPartlist["montagebeslag"]
    }

    
    var montagePartlist = {
        "MC4 stik Han - inkl. crimp" : [6],
        "MC4 stik Hun - inkl. crimp" : [6],
        "Montageskinne 48x36mm - 3,30 m - Sort": [montageskinne_total/2],
        "Montageskinne 48x36mm - 3,30 m - Sølv": [montageskinne_total/2],
        "Forbindeled 47x37mm": [forbindeled_total],
        "Rammemontageclips - Ende - Sort": [rammemontageclips_ende_total],
        "Rammemontageclips - Midt - Sort": [rammemontageclips_midt_total],
        "Universal Dubsko Sort": [rammemontageclips_ende_total],
        "Montageskrue Type 1 M10x200mm": [montageskrue_total],
        "Adaptervinkel M10": [adaptervinkel_total],
        "Montagebeslag Alu Justerbar (m. 3 skruer)": [montagebeslag_total],
        "Pakning": [1],
        "Stor fragt": [1],
    }

    return montagePartlist
}

function getInverterParts(inputs, BAT_DICT) {
     let constants = getConstants();

     let inv1 = {}, inv2 = {}, inv3 = {}
    // TODO: hvis et hubspot felt er tomt, får vi så null eller en tom string?
    

    // TODO: Her er hardkodet noget
    let invList = [[inv1, "Invertervalg 1"], [inv2, "Invertervalg 2"], [inv3, "Invertervalg 3"]]
    for (var i = 0;i<3;i++) {
        let invString = invList[i][1]
        
        switch (i) {
            case 0:
                if (inputs[invString] != null) {
                    console.log("Den er ikke null");
                    inv1[inputs[invString]] = 1
                }
                break;
            case 1:
                if (inputs[invString] != null) {
                    inv2[inputs[invString]] = 1
                }
                break;
            case 2:
                if (inputs[invString] != null) {
                    inv3[inputs[invString]] = 1
                }
                break;
            default:
                break;
        }
    }

    let bat = {}
    let anlaegsStr
    if (inputs["Batteri valg"] != null) { // Eller tom?
        let sonnen = inputs["Batteri valg"].toLowerCase().includes("sonnen")
        let moduleSize = sonnen ? 2.5 : 5
        let n_modules = parseFloat(inputs["Batteri effekt"].replace(",",".")) / moduleSize
        
        if (sonnen) {
            anlaegsStr = `Hybridanlæg med Sonnen inverter`
            bat[BAT_DICT[inputs["Batteri valg"]]["module"]] = n_modules
            bat[BAT_DICT[inputs["Batteri valg"]]["accessory"]] = 1
            if (n_modules > 2 && n_modules < 5) {
                bat[BAT_DICT[inputs["Batteri valg"]]["cabinet"]["small"]] = 1
                bat[BAT_DICT[inputs["Batteri valg"]]["cabinet_accessory"]["small"]] = 1
            } else if (n_modules > 2) {
                bat[BAT_DICT[inputs["Batteri valg"]]["cabinet"]["large"]] = 1
                bat[BAT_DICT[inputs["Batteri valg"]]["cabinet_accessory"]["large"]] = 1
            }
            bat[BAT_DICT[inputs["Batteri valg"]]["rcd"]] = 1
        } else {
            anlaegsStr = `Hybridanlæg med Huawei inverter`
            bat[BAT_DICT[inputs["Batteri valg"]]["module"]] = n_modules
            bat[BAT_DICT[inputs["Batteri valg"]]["power"]] = 1
            bat[BAT_DICT[inputs["Batteri valg"]]["meter"]] = 1
        }
    } else {
        anlaegsStr = `Solcelleanlæg med Huawei inverter`
    }

    // TODO: Hvad med ladestander?

    let panelStr = constants["Sunpower_effektlist"].includes(inputs["Solcellepanel, Wp"])  ? `Sunpower Performance ${inputs["Solcellepanel, Wp"]}wp Solar Panel Full Black` : `LONGi Solar ${inputs["Solcellepanel, Wp"]}wp Solar Panel Full Black`


    let montageArbejde = inputs["Selvmontage"] == "0" || inputs["Selvmontage"] == "2" ? 1 : 0
    let elArbejde = inputs["Selvmontage"] == "0" || inputs["Selvmontage"] == "1" ? 1 : 0
    return {
        [anlaegsStr]: 1,
        "Tagmontør - arbejdsløn": montageArbejde,
        "El-installatør - arbejdsløn": elArbejde,
        [panelStr]: 1,
        ...inv1,
        ...inv2,
        ...inv3,
        ...bat
    }
        
    
}


function calcTotalParts(inputs, BAT_DICT) {

     let inverterParts = getInverterParts(inputs["inverterInputs"], BAT_DICT)

     let montagePartlist = getMontageParts(inputs["montageInputs"])

     let totalPartlist = {
        ...inverterParts,
        ...montagePartlist
    }
    return totalPartlist
}


function createTable(totalPartlist, kolonneInfo, priser, PART_DICT) {
    let pris_total = priser[0]
    let pris_montage = priser[1]
    let pris_elarbejde = priser[2]

    let tableData = []
    for (let part in totalPartlist) {
        let pris = PART_DICT[part] == 55 ? pris_total : PART_DICT[part] == 56 ? pris_montage : PART_DICT[part] == 57 ? pris_elarbejde : 0
        let row = {
            "Kundenr": kolonneInfo["Kundenr"],
            "Varenr": PART_DICT[part],
            "Varenavn": part,
            "Værdi": totalPartlist[part],
            "Leveret": kolonneInfo["Leveret"],
            "Faktureret": kolonneInfo["Faktureret"],
            "Enhed": kolonneInfo["Enhed"],
            "Enhedspris": pris,
            "Rabat i %": kolonneInfo["Rabat i %"],
            "I alt": pris*(1-parseFloat(kolonneInfo["Rabat i %"])),
            "Overskrift": kolonneInfo["Overskrift"],
            "Tekst 1": kolonneInfo["Tekst 1"],
            "Tekst 1_1": kolonneInfo["Tekst 1_1"],
            "Tekst 2": kolonneInfo["Tekst 2"],
            "Vores ref": kolonneInfo["Vores ref"],
            "Øvrig ref": kolonneInfo["Øvrig ref"],
            "Ordrenr": kolonneInfo["Ordrenr"],
            "Navn": kolonneInfo["Navn"],
            "Betingelser": kolonneInfo["Betingelser"],
            "Dato": kolonneInfo["Dato"],
            "Levering": kolonneInfo["Levering"],
            "Layout gruppe": kolonneInfo["Layout gruppe"],
        }
        tableData.push(row)
    }


    return tableData
}

export function generateTableData(inputs, BAT_DICT, PART_DICT) {
    let totalPartlist = calcTotalParts(inputs, BAT_DICT)
    let priser = [74957, 12640, 9900]

    let tableData = createTable(totalPartlist, inputs["kolonneInfo"], priser, PART_DICT)
    // console.log(tableData);
    return tableData
}


