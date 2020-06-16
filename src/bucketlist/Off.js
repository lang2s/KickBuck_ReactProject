import React, { Component } from 'react';
import OffItem from './OffItem';
import Axios from 'axios';
import CardDetail from '../CardDetail';

class Off extends Component {

    constructor() {
        super();

        this.state = {
            bucketOffData: [],
            show: false,  
            bucketOneData: [],
            off: 'off'
        }

        this.bucketOffList = this.bucketOffList.bind(this);
        this.bucketOffSelect = this.bucketOffSelect.bind(this);
        this.detailShow = this.detailShow.bind(this);
        this.detailHide = this.detailHide.bind(this);
    }

    bucketOffList = () => {
        var url = "http://localhost:9000/controller/offselect";
        Axios.get(url)
        .then( (resData) => {
            this.setState({
                bucketOffData: resData.data
            })
        })
        .catch( (error) => {
            console.log("off error" + error.data);
        })
    }

    bucketOffSelect = (num) => {
        var url = "http://localhost:9000/controller/offoneselect?num=" + num;

        Axios.get(url)
        .then( (resData) => {
            this.setState({
                bucketOneData: resData.data
            })
        })
        .catch( (error) => {
            console.log("offoneselect : " + error);
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
        this.bucketOffList();
    }

    render() {

        let box;

        if(this.state.show) {
            box = <CardDetail detailHide={this.detailHide} bucketOneData={this.state.bucketOneData} off={this.state.off} />
        }

        return (
            <div>
                {
                    this.state.bucketOffData.map( (idx) => (
                        <OffItem detailShow={this.detailShow} bucketOffSelect={this.bucketOffSelect} idx={idx} key={idx.num} />
                    ))
                }
                {box}
            </div>
        );
    }
}

export default Off;
