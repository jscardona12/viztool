import React, {Component} from 'react';
const libVoyager = require('voyager');

export default class Graph extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tuplas: [],
        }
        this.container = document.getElementById("voyager-embed");
        this.config = undefined;
        this.voyagerInstance = libVoyager.CreateVoyager(this.container, undefined, undefined)
        const data = {
            "values": [
                {"fieldA": "A", "fieldB": 28}, {"fieldA": "B", "fieldB": 55}, {"fieldA": "C", "fieldB": 43},
                {"fieldA": "D", "fieldB": 91}, {"fieldA": "E", "fieldB": 81}, {"fieldA": "F", "fieldB": 53},
                {"fieldA": "G", "fieldB": 19}, {"fieldA": "H", "fieldB": 87}, {"fieldA": "I", "fieldB": 52}
            ]
        };

        this.voyagerInstance.updateData(data);
    }



    render(){
        return (
            <div id="voyager-embed">


            </div>
        )
    }
}
