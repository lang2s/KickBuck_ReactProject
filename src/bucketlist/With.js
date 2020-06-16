import React, { Component } from 'react';
import Axios from 'axios';
import CardDetail from '../CardDetail';
import WithItem from './WithItem';


class With extends Component {

    constructor() {
        super();

        this.state = {
            bucketWithData: [],
            bucketOneData: [],
            show: false,  
        }

        this.detailShow = this.detailShow.bind(this);
        this.detailHide = this.detailHide.bind(this);
    }

    bucketWithList = () => {
        var url = "http://localhost:9000/controller/withselect";
        Axios.get(url)
        .then( (resData) => {
            this.setState({
                bucketWithData: resData.data
            })
        })
        .catch( (error) => {
            console.log("with error" + error.data);
        })
    }

    bucketWithSelect = (num) => {
        var url = "http://localhost:9000/controller/oneselect?num=" + num;

        Axios.get(url)
        .then( (resData) => {
            this.setState({
                bucketOneData: resData.data
            })
        })
        .catch( (error) => {
            console.log("with one select: " + error.data);
        })
    }

    detailShow = () => {
        this.setState({
            show : true
        })

    }

    detailHide = () => {
        this.setState({
            show : false
        })
    }

    componentDidMount() {
        this.bucketWithList();
    }

    render() {

        let box;

        if(this.state.show) {
            box = <CardDetail detailHide={this.detailHide} bucketOneData={this.state.bucketOneData} />
        }

        return (
            <div>
                {
                    this.state.bucketWithData.map( (idx) => (
                        <WithItem detailShow={this.detailShow} bucketWithSelect={this.bucketWithSelect} idx={idx} key={idx.num} />
                    ))
                }
                {box}
            </div>
        );
    }
}

export default With;