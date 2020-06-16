import React, { Component } from 'react';
import axios from 'axios';
import Rowitem from './Rowitem_bmr';
import '../Board.css';

export default class Bmr extends Component {
    constructor(props) {
        super(props);

        this.state={
            bmrList: [],
        }
    }

    componentWillMount() {
        this.list();
    }

    list=()=>{
        const url="http://localhost:9000/controller/guestselect";
        axios.get(url)
            .then((res)=>{
                this.setState({
                    bmrList: res.data
                });
            })
            .catch((err)=>{
                console.log("list error:"+err.data);
            });
    }

    render(){
        return (            

            <div className='board_container'>
                <table className="board">
                    <thead className='board_head'>
                        <tr height= '80px'>
                            
                            <th style={{textAlign: 'center'}}>방문자</th>
                            <th style={{textAlign: 'center'}}>내용</th>
                            <th style={{textAlign: 'center'}}>작성일</th>
                        </tr>
                    </thead>
                    <tbody className='board_body'>
                        {
                            this.state.bmrList.map((row, idx)=>(
                            <Rowitem idx={ idx } key={ idx } row={ row }/>  
                            ))
                        }
                    </tbody>
                </table>
            </div>

        )
    }
}

