import React, { Component } from 'react';

export default class Rowitem_bmr extends Component {
   

    render(){
        return (
            <tr className='board_body' width="1200px" height="70px;">

                <td style={{textAlign: 'center', width: '200px'}}>
                    {this.props.row.nickname}
                </td>
                <td style={{width: '800px'}}>
                    <b>{this.props.row.contents}</b>
                </td>
                <td style={{textAlign: 'center', width: '200px'}}>
                    {this.props.row.daytime}
                </td>
            </tr>
        )
    }
}
