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
                            <ReactTable style={{backgroundColor: 'white', opacity: 0.8}}
                            data={data}
                            columns={[
                                {
                                    Header: "Longitude",
                                    accessor: "longitude",
                                },
                                {
                                    Header: "Latitude",
                                    accessor: "latitude",
                                },
                                {
                                    Header: "Location Name",
                                    accessor: "display_name",
                                },
                                {
                                    Header: "Timezone",
                                    accessor: "timezone",
                                },
                                {
                                    Header: "Delete",
                                    accessor: "display_name",
                                    Cell: ({ value }) => (
                                        <a
                                            onClick={() => {
                                                if (
                                                window.confirm("Do You Want To Delete This Record ???")
                                                ) 
                                                {this.deleteLocation(value);}
                                                
                                                
                                            }}
                                        >
                                        <Button color="danger" onClick={() => { this.deleteLocation(value); }} > Delete </Button>
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

  
