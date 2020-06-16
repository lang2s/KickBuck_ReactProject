import React, { Component, Fragment } from "react";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Dialogtitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import TextFieldAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  hidden: {
    display: "none"
  }
});

class OffBucketCommentUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      OffBucketCommentUpdate: this.props.commentData,
      user_name: "",
      num: 41,
      subject: "",
      image: "",
      content: "",
      endday: "",
      file: "",
      fileName: "",
      pk: "",
      open: false
    };
    console.log("image=" + this.state.pk);
  }

  render() {
    const { classes } = this.props;
    return <Fragment></Fragment>;
  }
}

export default withStyles(styles)(OffBucketCommentUpdate);
