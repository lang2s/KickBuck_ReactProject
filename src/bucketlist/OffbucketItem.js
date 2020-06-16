import React, { Component } from "react";

class OffbucketItem extends Component {
  render() {
    return (
      <div className="buket_form_box">
        <div className="buket_content">
          <p>{this.props.idx.subject}</p>
        </div>
      </div>
    );
  }
}

export default OffbucketItem;
