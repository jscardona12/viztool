import React, {Component} from 'react';
import XLSX from 'xlsx';
import moment from 'moment';
import Graph from './Graph.jsx';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tuplas: [],

        }
    }


    convertExcelToObject() {
        var setState = (tups)=> {this.setState({tuplas:tups})}
        console.log("ENTRO")
        const file = document.getElementById('file-input').files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            console.log("Entro 2")
            const data = e.target.result;
            //const name = file.name;
            const wb = XLSX.read(data, {type:'binary'});
            console.log("Entro 3")
            console.log(wb);
            var tuples = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
            setState(tuples);
            console.log(tuples);
            console.log(Object.keys(tuples[0]))
            var rehosp = {};
            tuples.forEach((touple)=>{
                console.log(touple["CENTROATENCION"] === "HOS -  SERVICIOS DE HOSPITALIZACION");
                if(touple["CENTROATENCION"] === "HOS -  SERVICIOS DE HOSPITALIZACION"){
                    console.log("TRUE");
                    console.log(rehosp[touple["DOCUMENTO"]]);
                    if(rehosp[touple["DOCUMENTO"]]){
                        console.log("EXISTS")
                        var feini = rehosp[touple["DOCUMENTO"]]["FECHAINGRESO"];
                        if(feini !== touple["FECHAINGRESO"]) {
                            console.log("DIFFRENT")
                            var feinicio = moment(touple["FECHAINGRESO"],'DD-MM-YYYY hh:mm:ss a');
                            var diff = rehosp[touple["DOCUMENTO"]].fefin.diff(feinicio, "months");
                            if(diff >= 30){
                                touple["RE-HOSPITALIZACION"] = 1;
                            }
                            else{
                                touple["RE-HOSPITALIZACION"] = 0;
                            }
                            console.log(fefin);
                        }
                        else{
                            touple["RE-HOSPITALIZACION"] = 0;
                        }
                    }
                    else {
                        console.log("Created")
                        var feini = moment(touple["FECHAINGRESO"],'DD-MM-YYYY hh:mm:ss a')
                        var fefin = null;
                        if(touple["FECHA_EGRESO"])
                            fefin = moment(touple["FECHA_EGRESO"],'DD-MM-YYYY hh:mm:ss a')
                        rehosp[touple["DOCUMENTO"]] = {
                            "FECHAINGRESO": touple["FECHAINGRESO"],
                            "FECHA_EGRESO": touple["FECHA_EGRESO"],
                            feini,
                            fefin,
                        };
                        console.log(rehosp[touple["DOCUMENTO"]]);
                        touple["RE-HOSPITALIZACION"] = 0;
                    }
                }
            });
        };
        reader.readAsBinaryString(file);

    }
    render(){
        return (
            <div>

                <input type="file" id="file-input" onChange={(event) => {
                    this.convertExcelToObject.bind(this)
                }}/>
                <button onClick={this.convertExcelToObject.bind(this)}>upload</button>
                <div id="out"></div>
                <Graph/>
            </div>
        )
    }
}
