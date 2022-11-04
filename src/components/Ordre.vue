<script>
import {TabulatorFull as Tabulator} from 'tabulator-tables'; //import Tabulator library
import {generateTableData} from '@/components/functions/ordre_calc.js'
import {formatHubspotData} from '@/components/functions/format_inputs.js'
import INPUTS from '@/components/dictionaries/INPUTS.json'
import BAT_DICT from '@/components/dictionaries/BAT_DICT.json'
import PART_DICT from '@/components/dictionaries/PART_DICT.json'

import axios from 'axios';

export default {
    name: 'Ordre',
    data () {
        return {
            tabulator: null, //variable to hold your table
            tableData: [], //data for table to display
            dealInfo: {
                'navn': 'Emil kunde tester',
                'tag1_row': 2,
                'tag1_col': 8,
                'tag2_row': 0,
                'tag2_col': 0,
                'tag3_row': 0,
                'tag3_col': 0,
                'tag4_row': 0,
                'tag4_col': 0,
                'tag5_row': 0,
                'tag5_col': 0,
                'tag6_row': 0,
                'tag6_col': 0,
            },
            deal: null,
            formattedDeal: null
        }
    },
    watch: {
        //update table if data changes
        tableData:{
            handler: function (newData) {
            this.tabulator.replaceData(newData);
            },
            deep: true,
        }
    },
    mounted(){
        //instantiate Tabulator when element is mounted
        this.tabulator = new Tabulator(this.$refs.table, {
            data: this.tableData, //link data to table
            reactiveData:true, //enable data reactivity HVORFOR VIRKER DET HER SLET IKKE?
            columns: [
            {title:"Kundenr", field:"Kundenr", sorter:"string", width:150},
            {title:"Varenr", field:"Varenr", sorter:"string"},
            {title:"Varenavn", field:"Varenavn", sorter:"string"},
            {title:"Værdi", field:"Værdi", sorter:"string"},
            {title:"Leveret", field:"Leveret", sorter:"string"},
            {title:"Faktureret", field:"Faktureret", sorter:"string"},
            {title:"Enhed", field:"Enhed", sorter:"string"},
            {title:"Enhedspris", field:"Enhedspris", sorter:"string"},
            {title:"Rabat i %", field:"Rabat i %", sorter:"string"},
            {title:"I alt", field:"I alt", sorter:"string"},
            {title:"Overskrift", field:"Overskrift", sorter:"string"},
            {title:"Tekst 1", field:"Tekst 1", sorter:"string"},
            {title:"Tekst 1_1", field:"Tekst 1_1", sorter:"string"},
            {title:"Tekst 2", field:"Tekst 2", sorter:"string"},
            {title:"Vores ref", field:"Vores ref", sorter:"string"},
            {title:"Øvrig ref", field:"Øvrig ref", sorter:"string"},
            {title:"Ordrenr", field:"Ordrenr", sorter:"string"},
            {title:"Navn", field:"Navn", sorter:"string"},
            {title:"Betingelser", field:"Betingelser", sorter:"string"},
            {title:"Dato", field:"Dato", sorter:"string"},
            {title:"Levering", field:"Levering", sorter:"string"},
            {title:"Layout gruppe", field:"Layout gruppe", sorter:"string"},
            ], //define table columns
        });


        this.tabulator.on("cellClick", (e, cell) => {
            console.log(e);
            console.log(cell);
            alert(`cell at position (${cell.getRow().getIndex()}, ${cell.getColumn().getField()}) Clicked!!!!`)
            console.log("Der er sgu klikket");
        })
    },
    methods: {
        tester() {
            let dealId = "5467160834"
            const dealUrl = `http://localhost:4000/hubspot/dealInfo/${dealId}`;

            console.log("Fetching deals...");
            axios
                .get(dealUrl, {timeout: 5000})
                .then(response => {
                
                this.deal = response.data;
                this.formattedDeal = formatHubspotData(this.deal)
                })
                .catch(error => {
                console.log(error)
                this.apiError = "Coudn't get data :( try again later maybe"
                })

            
        },
        lavData() {
            console.log("lav data er kaldt");
            var inputs = INPUTS
            let _tableData = generateTableData(inputs, BAT_DICT, PART_DICT)
            this.tableData = _tableData
            console.log(_tableData);
        },
        downloadCSV() {
            console.log("Vi prøver at downloade");
            this.tabulator.download("csv", `ordre - ${this.dealInfo.navn}.csv`);
        }
    }
    
}



</script>



<template>
<div>
    <button @click="lavData">Lav noget data</button>
    <button @click="tester">test for satan</button>
    <button @click="downloadCSV">Download csv</button>
    </div>
<div ref="table">
</div>

<div id="example-table"></div>
</template>

<style lang='scss'>

// @import "~vue-tabulator/dist/scss/bootstrap/tabulator_bootstrap4";
@import 'tabulator-tables/dist/css/tabulator_midnight.min.css';
@import "tabulator-tables/dist/css/tabulator.min.css"; //import Tabulator stylesheet
</style>
