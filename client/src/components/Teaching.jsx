// ******************* RESEARCH AREAS ****************

import React from 'react';

import Auth from '../modules/Auth';

import { Card, CardActions, CardExpandable, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import ActionDownload from 'material-ui/svg-icons/action/get-app';

const style_head = {fontSize: 20, fontWeight: 'bold', textAlign: 'center',
fontFamily: "Oswald", color: "#00b3b3", textDecoration: 'underline', marginTop: -30}
const style_subhead = {fontSize: 15, fontWeight: 'bold', textAlign: 'left'}
const style_body1 = {fontSize: 12, textAlign: 'left'}
const style_card = {width: 900, height: 465, marginBottom: 40, marginTop: 20};

const styles_grid = {
  root: {
    marginLeft: 280,
    width: 750,
    height: 400,
    marginBottom: 40,
  },
  gridList: {
    width: 500,
    height: 400,
    overflowY: 'auto',
    backgroundColor: "#ffffff",
  },
};

class Teaching extends React.Component {

    constructor(props, context) {
        super(props, context);



        // set the initial component state
        this.state = {
        records:[],
        secretData: ''
    };

    //this.downloadFile = this.downloadFile.bind(this);
    this.deleteAttachment = this.deleteAttachment.bind(this);
  }


  componentDidMount() {
    console.log(" Teaching componentDidMount() called");




    // Get Teaching
    var typesarray = ['teaching'];
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/openapi/records');
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        this.setState({
          records: xhr.response
        });
      } else {

      }
      console.log("records resp:- "+JSON.stringify(this.state.records));
    });
    var data = JSON.stringify({types:typesarray});
    xhr.send(data);


  }

  downloadFile(fileid,filename){
    console.log("downloadFile() called " +fileid+".."+filename);
    const xhr1 = new XMLHttpRequest();
    xhr1.open('get', '/openapi/attachment/'+fileid);
    //xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    //xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr1.responseType = 'arraybuffer';
    xhr1.addEventListener('load', () => {
      if (xhr1.status === 200) {
        console.log("success resp from download: "+JSON.stringify(xhr1.response));
        require('downloadjs')(xhr1.response, filename);
      }
      else{
        console.log("downloadFile failed: " + JSON.stringify(xhr1.response));
      }

    });
    xhr1.send();
  }

  deleteAttachment(id){
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/api/deleterecord/'+id);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        console.log("Deletion success");
        this.setState({
          displaymsg: 'Deletion success!'
        });
        //this.state.attachments.splice(index,1);
        var arrayvar = this.state.records.filter(e => e._id !== id);
        //arrayvar.splice(index,1)
        this.setState({ records: arrayvar })
      }
      else{
        this.setState({
          displaymsg: 'Deletion failed! Please try again later.'
        });
      }
    });
    xhr.send();
  }

  render() {
    return (
      <div style={styles_grid.root}>
        <div style={style_head}>Teaching</div> <br />

{   this.state.records.map((record,index)=>(
        <div key={index}>
        <Card>
    <CardHeader
      title={record.title}
      actAsExpander={true}
      showExpandableButton={true}
    />
    <CardActions>
      {record.attachment!="" &&
        <IconButton tooltip="Download" onClick={this.downloadFile.bind(this,record.fileid,record.attachment)}>
                      <ActionDownload />
                    </IconButton>
      }
      {Auth.isUserAuthenticated() &&
    <IconButton tooltip="Delete"
                onClick={this.deleteAttachment.bind(this,record._id)}>
                  <DeleteIcon />
              </IconButton>
    }
    </CardActions>



    <CardText expandable={true}>
      {record.description}
    </CardText>
  </Card>
  <br/>
  </div>
))}



      </div>
      )
    }


}

export default Teaching;