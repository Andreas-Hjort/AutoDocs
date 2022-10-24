



export function formatHubspotData(deal) {
    console.log(`Tjek lige dealen ud: `);
    console.log(deal);
    if (deal["tagtype___v_lg_type"]["value"] != "Tagsten/ Tegltag / Betontegl" && deal["tagtype___v_lg_type"]["value"] != "Bølge Eternit / Ståltag") throw console.error("Vi har ikke implementeret ordre for andet end 'Tagsten/ Tegltag / Betontegl' og 'Bølge Eternit / Ståltag'"); //TODO: Skal vi implementere flere?
    befaestelse = deal["tagtype___v_lg_type"]["value"] == "Tagsten/ Tegltag / Betontegl" ? "Tagkrog" :  "Stokskrue";
    

    let all_info = {
        "montageInputs":{
            "tag_1": {
                "row": 5,
                "col": 2,
                "retning": "portrait",
                "befaestelse": "Tagkrog"
            },
            "tag_2": {"row": 0, "col": 0, "retning": "portrait", "befaestelse": "Stokskrue"},
            "tag_3": {"row": 0, "col": 0, "retning": "landscape", "befaestelse": "Stokskrue"},
            "tag_4": {"row": 0, "col": 0, "retning": "landscape", "befaestelse": "Tagkrog"},
            "tag_5": {"row": 0, "col": 0, "retning": "landscape", "befaestelse": "Tagkrog"} ,
            "tag_6": {"row": 0, "col": 0, "retning": "portrait", "befaestelse": "Tagkrog"},
            "tagtype___v_lg_type": deal["tagtype___v_lg_type"]["value"], //TODO: Vi skal vidst afgøre "Stokskrue"/"Tagkrog" under "befaestelse ud fra den her"
        },
        "inverterInputs": {
            "inverter_valg": deal["inverter_valg"]["value"],
            "ekstra_inverter_valg": deal["ekstra_inverter_valg"]["value"],
            "ekstra_inverter_valg_2_": deal["ekstra_inverter_valg_2_"]["value"],
            "batteri_valg": deal["batteri_valg"]["value"],
            "batteri_effekt_kwh": deal["batteri_effekt_kwh"]["value"],
            "ladestander_valg": deal["ladestander_valg"]["value"],
            "selvmontage_": deal["selvmontage_"]["value"], //TODO: Skal formateres så 0 = nej, 1 = montage, 2 = EL, 3 = montage + EL
            "solcellepanel_wp": deal["solcellepanel_wp"]["value"]
        },
        "kolonneInfo": {
            "Kundenr": "12312312",
            "Leveret": 0,
            "Faktureret": 0,
            "Enhed": "stk",
            "Rabat i %": 0,
            "Overskrift": "Hybridanlæg",
            "Tekst 1": "Solcellemontage",
            "Tekst 1_1": "20/06/2022",
            "Tekst 2": "Lån underskrevet",
            "Deres ref": "",
            "Vores ref": "Marcus",
            "Øvrig ref": "MW",
            "Ordrenr": "8322",
            "Navn": "Johnni Christensen",
            "Betingelser": "Santander",
            "Dato": "09/06/2022",
            "Levering": "adresse",
            "Layout gruppe": "B2C - Netto"
        }
    }
    console.log(all_info);

    if (deal["asdasdasd"] === undefined) {
        console.log("Den er undefined"); // Det var den, når den var tom
    } else {
        console.log("Den er IKKE undefined");
    }
    return {}
}
