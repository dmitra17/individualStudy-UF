import React from 'react';

import Auth from '../modules/Auth';

import { Card, CardActions, CardExpandable, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import ActionDownload from 'material-ui/svg-icons/action/get-app';

const style_head = {fontSize: 20, fontWeight: 'bold', textAlign: 'center',
fontFamily: "Oswald", color: "#00b3b3", textDecoration: 'underline', marginTop: -30}
const style_subhead = {fontSize: 19, fontWeight: 'bold', textAlign: 'left',
fontFamily: "Oswald", color: "#00b3b3", textDecoration: 'underline', marginTop: -30}
const style_body1 = {fontSize: 12, textAlign: 'left'}
const style_center = {textAlign: 'left'}
const style_card = {width: 900, height: 465, marginBottom: 40, marginTop: 20};
const styles_grid = {
  root: {

    marginLeft: 100,
    width: 750,
    height: 400,
    marginBottom: 40,
    marginTop: 20,
  },
  gridList: {
    width: 500,
    height: 400,
    overflowY: 'auto',
    backgroundColor: "#ffffff",
  },
};
const styles_grid2 = {
  root: {

    marginLeft: 1000,
    width: 500,
    height: 400,
    marginBottom: 40,
    marginTop: -440,
  },
  gridList: {
    width: 500,
    height: 400,
    overflowY: 'auto',
    backgroundColor: "#ffffff",
  },
};


class Writings extends React.Component {




    constructor(props, context) {
        super(props, context);



        // set the initial component state
        this.state = {
        records:[],
        showRecords:[],
        secretData: '',
        label:''
    };

    //this.downloadFile = this.downloadFile.bind(this);
    this.deleteAttachment = this.deleteAttachment.bind(this);
    this.updateByYear = this.updateByYear.bind(this);
    this.updateByType = this.updateByType.bind(this);
  }


  componentDidMount() {
    console.log(" Writings componentDidMount() called");




    // Get Writings
    var typesarray = ['books','conferencePapers','softwareProjects','patents','bookChapter','data','journalArticle','miscellaneous','newspaperArticle'];
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/openapi/records');
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        this.setState({
          records: xhr.response,
          showRecords: xhr.response
        });
      } else {

      }
      //console.log("records resp:- "+JSON.stringify(this.state.records));
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
        //console.log("success resp from download: "+JSON.stringify(xhr1.response));
        require('downloadjs')(xhr1.response, filename);
      }
      else{
        //console.log("downloadFile failed: " + JSON.stringify(xhr1.response));
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

  updateByYear(year){
    var temp = this.state.records.filter((rec)=>{
      var d = new Date(rec.file_date);
      //console.log(d.getFullYear());
      return d.getFullYear() == year;
    });

    this.setState({
          showRecords: temp,
          label: year
        });

  }

    updateByType(type){
    var temp = this.state.records.filter((rec)=>{
      return rec.Type == type
    });

    this.setState({
          showRecords: temp,
          label: ""
        });

  }

  render() {
    return (
      <div>
            <div style={style_head}>Writings</div> <br />
<div style={styles_grid.root}>
{this.state.label}
{   this.state.showRecords.map((record,index)=>(
      <div key={index}>
        <Card>
    <CardHeader
      title={record.title}
      subtitle={record.file_date.substring(0,10)}
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
<div style={styles_grid2.root}>
<div style = {style_subhead}>Publications By Year</div>
<br/>
<FlatButton label="2018" onClick={this.updateByYear.bind(this,'2018')}/> <br/>
<FlatButton label="2017" onClick={this.updateByYear.bind(this,'2017')}/> <br/>
<FlatButton label="2016" onClick={this.updateByYear.bind(this,'2016')}/> <br/>
<FlatButton label="2015" onClick={this.updateByYear.bind(this,'2015')}/> <br/>
<FlatButton label="2014" onClick={this.updateByYear.bind(this,'2014')}/> <br/>
<FlatButton label="2013" onClick={this.updateByYear.bind(this,'2013')}/> <br/>
<FlatButton label="2012" onClick={this.updateByYear.bind(this,'2012')}/> <br/>
<FlatButton label="2011" onClick={this.updateByYear.bind(this,'2011')}/> <br/>
<FlatButton label="2010" onClick={this.updateByYear.bind(this,'2010')}/> <br/>
<FlatButton label="2009" onClick={this.updateByYear.bind(this,"2009")}/> <br/>
<FlatButton label="2008" onClick={this.updateByYear.bind(this,"2008")}/> <br/>
<FlatButton label="2007" onClick={this.updateByYear.bind(this,"2007")}/> <br/>
<FlatButton label="2006" onClick={this.updateByYear.bind(this,"2006")}/> <br/>
<FlatButton label="2005" onClick={this.updateByYear.bind(this,"2005")}/> <br/>
<FlatButton label="2004" onClick={this.updateByYear.bind(this,"2004")}/> <br/>
<FlatButton label="2003" onClick={this.updateByYear.bind(this,"2003")}/> <br/>
<FlatButton label="2002" onClick={this.updateByYear.bind(this,"2002")}/> <br/>
<FlatButton label="2001" onClick={this.updateByYear.bind(this,"2001")}/> <br/>
<FlatButton label="2000" onClick={this.updateByYear.bind(this,"2000")}/> <br/>
<FlatButton label="1999" onClick={this.updateByYear.bind(this,"1999")}/> <br/>
<FlatButton label="1998" onClick={this.updateByYear.bind(this,"1998")}/> <br/>
<FlatButton label="1997" onClick={this.updateByYear.bind(this,"1997")}/> <br/>
<FlatButton label="1996" onClick={this.updateByYear.bind(this,"1996")}/> <br/>
<FlatButton label="1995" onClick={this.updateByYear.bind(this,"1995")}/> <br/>
<FlatButton label="1994" onClick={this.updateByYear.bind(this,"1994")}/> <br/>
<FlatButton label="1993" onClick={this.updateByYear.bind(this,"1993")}/> <br/>
<FlatButton label="1992" onClick={this.updateByYear.bind(this,"1992")}/> <br/>
<FlatButton label="1991" onClick={this.updateByYear.bind(this,"1991")}/> <br/>
<FlatButton label="1990" onClick={this.updateByYear.bind(this,"1990")}/> <br/>
<FlatButton label="1989" onClick={this.updateByYear.bind(this,"1989")}/> <br/>
<FlatButton label="1988" onClick={this.updateByYear.bind(this,"1988")}/> <br/>
<br/><br/>
<div style = {style_subhead}>Publications By Type</div>

<div style = {style_center}>
  <FlatButton label="books" onClick={this.updateByType.bind(this,"books")}/> <br/>
  <FlatButton label="conference Papers" onClick={this.updateByType.bind(this,"conferencePapers")}/> <br/>
  <FlatButton label="software Projects" onClick={this.updateByType.bind(this,"softwareProjects")}/> <br/>
  <FlatButton label="patents" onClick={this.updateByType.bind(this,"patents")}/> <br/>
  <FlatButton label="book Chapter" onClick={this.updateByType.bind(this,"bookChapter")}/> <br/>
  <FlatButton label="journal Article" onClick={this.updateByType.bind(this,"journalArticle")}/> <br/>
  <FlatButton label="newspaper Article" onClick={this.updateByType.bind(this,"newspaperArticle")}/> <br/>
  <FlatButton label="miscellaneous" onClick={this.updateByType.bind(this,"miscellaneous")}/> <br/>
  <FlatButton label="DATA" onClick={this.updateByType.bind(this,"data")}/> <br/>
</div>

</div>

      </div>
      )
    }


}

export default Writings;
