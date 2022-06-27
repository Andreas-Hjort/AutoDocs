<script>
import {TabulatorFull as Tabulator} from 'tabulator-tables'; //import Tabulator library

export default {
    name: 'Ordre',
    data () {
        return {
            tabulator: null, //variable to hold your table
            tableData: [], //data for table to display
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
            {title:"Name", field:"name", sorter:"string", width:150},
            {title:"Age", field:"age", sorter:"number", hozAlign:"left", formatter:"progress"},
            {title:"Favourite Color", field:"col", sorter:"string", headerSort: false},
            {title:"Date Of Birth", field:"dob", sorter:"date", hozAlign:"center"},
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
        lavData() {
            console.log("lav data er kaldt");
            this.tableData = [
                {id:1, name:"Oli Bob", age:"12", col:"red", dob:""},
                {id:2, name:"Mary May", age:"1", col:"blue", dob:"14/05/1982"},
                {id:3, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
                {id:4, name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
                {id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
            ];
            console.log("lav data er slut");
        },
        downloadCSV() {
            console.log("Vi prøver at downloade");
            this.tabulator.download("csv", "tester.csv");
        }
    }
    
}



</script>



<template>
<div>
    <button @click="lavData">Lav noget data</button>
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
