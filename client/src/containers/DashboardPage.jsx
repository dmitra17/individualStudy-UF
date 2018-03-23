import React from 'react';
import Auth from '../modules/Auth';

import Dashboard from '../components/Dashboard.jsx';

import { Card, CardTitle, CardText } from 'material-ui/Card';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import IconButton from 'material-ui/IconButton';

import DeleteIcon from 'material-ui/svg-icons/action/delete';

var axios = require('axios');

const styles = {
  uploadButton: {
    verticalAlign: 'middle',
  },
  uploadInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  slide: {
    padding: 10,
  },
  downloadButton:{
    textTransform: 'none'
  }
};

class DashboardPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    this.state = {
      secretData: '',
      value: 0,
      displaymsg:'',
      attachmentname:'',
      slideIndex: 0,
      attachments:[]
    };

    this.uploadAttachment = this.uploadAttachment.bind(this);
    this.handleSectionChange = this.handleSectionChange.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.deleteAttachment = this.deleteAttachment.bind(this);
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

  handleChange(value){
    console.log("handleChange called");
    this.setState({
      slideIndex: value,
    });
  }

  onNameChange(event){
    this.setState({
      attachmentname: event.target.value
    });
  }

  uploadAttachment(event) {
                console.log("uploadAttachment called");
                let input = event.target;
                if (input.files[0]) {
                    console.log("aaaaa");


                    let reader = new FileReader();



                    reader.readAsDataURL(input.files[0]);

                    var formDataVar = new FormData();

                    if(event.target.files[0]){
                      console.log("Filename= " +event.target.files[0].name);
                    }
                    else{
                      console.log("No file detected");
                    }
                    formDataVar.append('attachment', event.target.files[0], event.target.files[0].name);
                    //formDataVar.append('taskid', this.selectedTask._id);

                    const value = this.state.value;
                    const attachmentname = this.state.attachmentname;

                    // ************* Sending Excel file to backend ************
                    const xhr = new XMLHttpRequest();
                    xhr.open('post', '/api/excelparse');
                    //xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                    // set the authorization HTTP header
                    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
                    xhr.responseType = 'json';
                    xhr.addEventListener('load', () => {
                    if (xhr.status === 200) {
                      // success

                      // change the component-container state
                      console.log("got resp from /api/excelparse: " + JSON.stringify(xhr.response));

                      // set a message
                      //localStorage.setItem('successMessage', xhr.response.message);
                      this.setState({
                        displaymsg: 'File uploaded successfully!'
                      });
                      var arrayvar = this.state.attachments.slice()
                      arrayvar.push(xhr.response)
                      this.setState({ attachments: arrayvar })

                    } else {
                      // failure
                      console.log("got failure from /api/excelparse: " );
                      this.setState({
                        displaymsg: 'File not uploaded! Please provide a Display Name'
                      });
                    }
                  });
                  xhr.send(formDataVar);

                    /* //------ Uploading File to Mongo --------------//
                    // create an AJAX request
                    const xhr = new XMLHttpRequest();
                    xhr.open('post', '/api/attachment/'+value+"/"+attachmentname);
                    //xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                    // set the authorization HTTP header
                    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
                    xhr.responseType = 'json';
                    xhr.addEventListener('load', () => {
                    if (xhr.status === 200) {
                      // success

                      // change the component-container state
                      console.log("got resp from /api/attachment: " + JSON.stringify(xhr.response));

                      // set a message
                      //localStorage.setItem('successMessage', xhr.response.message);
                      this.setState({
                        displaymsg: 'File uploaded successfully!'
                      });
                      var arrayvar = this.state.attachments.slice()
                      arrayvar.push(xhr.response)
                      this.setState({ attachments: arrayvar })

                    } else {
                      // failure
                      console.log("got failure from /api/attachment: " );
                      this.setState({
                        displaymsg: 'File not uploaded! Please provide a Display Name'
                      });
                    }
                  });
                  xhr.send(formDataVar);
                  //------ Uploading File to Mongo ENDS --------------//
                  */
                }
  }

  deleteAttachment(id,index){
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/api/deleteattachment/'+id);
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
        var arrayvar = this.state.attachments.filter(e => e._id !== id);
        //arrayvar.splice(index,1)
        this.setState({ attachments: arrayvar })
      }
      else{
        this.setState({
          displaymsg: 'Deletion failed! Please try again later.'
        });
      }
    });
    xhr.send();
  }


  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/api/dashboard');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        this.setState({
          secretData: xhr.response.message
        });

      }
    });
    xhr.send();



    const xhr2 = new XMLHttpRequest();
    xhr2.open('get', '/openapi/attachments');
    //xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    //xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr2.responseType = 'json';
    xhr2.addEventListener('load', () => {
      if (xhr2.status === 200) {
        this.setState({
          attachments: xhr2.response.attach
        });
        this.state.attachments.sort(function(a,b){
          //console.log(a.uploaddate + "..." +b.uploaddate);
          return (new Date(b.uploaddate) - new Date(a.uploaddate));
        });
      }
      //console.log(JSON.stringify(this.state.attachments));
    });
    xhr2.send();
  }

  handleSectionChange(event, index, value){
    this.setState({value});
    console.log("New value:- "+value);
  }

  //handleSectionChange = (event, index, value) => this.setState({value});

  /**
   * Render the component.
   */
  render() {
    return (
      <div>
      {/* <Dashboard secretData={this.state.secretData} /> */}

      <Card className="container">
    <CardTitle
      title="Upload CSV"
      subtitle={this.state.displaymsg}
    />

    <CardText style={{ fontSize: '16px', color: 'green' }}>


      <form>
      <div className="field-line">

      <br/>
        <FlatButton
          label="Choose a File"
          labelPosition="before"
          style={styles.uploadButton}
          containerElement="label"
        >
      <input type="file" style={styles.uploadInput} onChange={this.uploadAttachment}/>
    </FlatButton>

        </div>
      </form>
    </CardText>
  </Card>



        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
        >
          <div>


            {this.state.attachments.filter( (el)=> {
              return el.sectionid == 0;
            }).map((attachment,index) => (
            <div key={index}>
              <FlatButton onClick={this.downloadFile.bind(this,attachment.attachment,attachment.filename)}
                label={attachment.attachmentname}
                secondary={true}
                style={styles.downloadButton}
              />
              <IconButton tooltip="Delete"
                onClick={this.deleteAttachment.bind(this,attachment._id,index)}>
                  <DeleteIcon />
              </IconButton>

            </div>
            ))}



          </div>

          <div style={styles.slide}>
            {this.state.attachments.filter( (el)=> {
              return el.sectionid == 1;
            }).map((attachment,index) => (
            <div key={index}>
              <FlatButton
                 onClick={this.downloadFile.bind(this,attachment.attachment,attachment.filename)}
                label={attachment.attachmentname}
                secondary={true}
              />
              <IconButton tooltip="Delete"
                onClick={this.deleteAttachment.bind(this,attachment._id)}>
                  <DeleteIcon />
              </IconButton>
            </div>
            ))}
          </div>

          <div style={styles.slide}>
            {this.state.attachments.filter( (el)=> {
              return el.sectionid == 2;
            }).map((attachment,index) => (
            <div key={index}>
              <FlatButton
                 onClick={this.downloadFile.bind(this,attachment.attachment,attachment.filename)}
                label={attachment.attachmentname}
                secondary={true}
              />
              <IconButton tooltip="Delete"
                onClick={this.deleteAttachment.bind(this,attachment._id)}>
                  <DeleteIcon />
              </IconButton>
            </div>
            ))}
          </div>

          <div style={styles.slide}>
            {this.state.attachments.filter( (el)=> {
              return el.sectionid == 3;
            }).map((attachment,index) => (
            <div key={index}>
              <FlatButton
                 onClick={this.downloadFile.bind(this,attachment.attachment,attachment.filename)}
                label={attachment.attachmentname}
                secondary={true}
              />
              <IconButton tooltip="Delete"
                onClick={this.deleteAttachment.bind(this,attachment._id)}>
                  <DeleteIcon />
              </IconButton>
            </div>
            ))}
          </div>

          <div style={styles.slide}>
            {this.state.attachments.filter( (el)=> {
              return el.sectionid == 4;
            }).map((attachment,index) => (
            <div key={index}>
              <FlatButton
                 onClick={this.downloadFile.bind(this,attachment.attachment,attachment.filename)}
                label={attachment.attachmentname}
                secondary={true}
              />
              <IconButton tooltip="Delete"
                onClick={this.deleteAttachment.bind(this,attachment._id)}>
                  <DeleteIcon />
              </IconButton>
            </div>
            ))}
          </div>

        </SwipeableViews>


    </div>
    );
  }

}

export default DashboardPage;