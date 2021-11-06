import './App.css';
import React, { Component } from 'react';
import axios from 'axios';
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import Popup from 'react-popup';
import './Popup.css';
import { Form, FormGroup, InputGroup, Button } from "reactstrap";

export default class App extends Component {
    constructor(){
        super();
        this.state ={
            location:[]
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getAllLocation = () =>{
        axios.get(`/getAllLocation`).then(result =>{
            this.setState({location: result.data});
            console.log(this.state.location);
        })
        .catch(error => {
            console.log(error);
        });
    };

    componentDidMount(){
        this.getAllLocation();
    }

    handleSubmit(e){
        const query = `/getLocation?place=${this.input.value}`;

        console.log(query);

        e.preventDefault();

        axios.get(query).then(result =>{
            console.log(result);
            if (result.data === "Not Found"){
                Popup.alert('Location Not Found');
            }
            Popup.alert(result.data);
            this.getAllLocation();
        })
        .catch(error => {
            alert('Error:',error);
        })
    }

    deleteLocation = (value) => {
        console.log("Delete Location: ", value);
        const query = `/deleteLocation?place=${value}`;

        axios.get(query).then((result) => {
            this.getAllLocation();
        })
        .catch((error) =>{
            alert("Error occurred: ", error);
        });
    };

    render(){
        var data = this.state.location;
        data = data.reverse();
            return(
                
                <div className="App">
                    <div>
                        <h1>Location Searcher</h1>
                         <h3>Find the location here!</h3>
                
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <InputGroup>
                                    <input type="text" class="form-control" placeholder="Search Location Here" autocomplete="off" ref={(input) => (this.input = input)} />
                                    <Button type="submit"> Find </Button>
                                </InputGroup>
                            </FormGroup>
                        </Form>
                    </div>
                    
                    <div>
                         <Popup data={data} />
                    </div>

                    <div className="container-fluid table">
                        <div className="col-sm-12">
                            <p />
                            <ReactTable style={{backgroundColor: '#F7ECE9', opacity: 0.8}}
                            data={data}
                            columns={[
                                {
                                    Header: "Longitude",
                                    accessor: "longitude",
                                    headerStyle: { "background": "#e3b0ac", "border":"1px solid #EC9886" , "fontWeight":"1000"},
                                    style: { "border":"1px solid #e3b0ac", "fontFamily": "Nunito-Regular" , "fontWeight":"1000"},
                                },
                                {
                                    Header: "Latitude",
                                    accessor: "latitude",
                                    headerStyle: { "background": "#e3b0ac", "border":"1px solid #EC9886", "fontWeight":"1000"},
                                    style: { "border":"1px solid #e3b0ac", "fontFamily": "Nunito-Regular", "fontWeight":"1000"},
                                },
                                {
                                    Header: "Location Name",
                                    accessor: "display_name",
                                    headerStyle: { "background": "#e3b0ac", "border":"1px solid #EC9886", "fontWeight":"1000"},
                                    style: { "border":"1px solid #e3b0ac", "fontFamily": "Nunito-Regular", "fontWeight":"1000"},
                                },
                                {
                                    Header: "Timezone",
                                    accessor: "timezone",
                                    headerStyle: { "background": "#e3b0ac", "border":"1px solid #EC9886", "fontWeight":"1000"},
                                    style: { "border":"1px solid #e3b0ac", "fontFamily": "Nunito-Regular", "fontWeight":"1000"},
                                },
                                {
                                    Header: "Delete",
                                    accessor: "display_name",
                                    headerStyle: { "background": "#e3b0ac", "border":"1px solid #EC9886", "fontWeight":"1000"},
                                    style: { "border":"1px solid #e3b0ac"},
                                    Cell: ({ value }) => (
                                        <a
                                            onClick={() => {
                                                if (
                                                window.confirm("Do You Want To Delete This Record ???")
                                                ) 
                                                {this.deleteLocation(value);}
                                                
                                                
                                            }}
                                        >
                                        <Button id="delete" onClick={() => { this.deleteLocation(value); }} > Delete </Button>
                                        </a>
                                    ),
                                },
                                
                            ]}
                            
                            defaultPageSize={5}
                            className="-striped -highlight"
                            />
                        </div>
                    </div>

                </div>
            );
        }
    }

  
