import React from 'react';
import { Card, CardActions, CardExpandable, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';

import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';

import Paper from 'material-ui/Paper';

import {Tabs, Tab} from 'material-ui/Tabs';

import SwipeableViews from 'react-swipeable-views';



import RaisedButton from 'material-ui/RaisedButton';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import FontIcon from 'material-ui/FontIcon';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import ActionDownload from 'material-ui/svg-icons/action/get-app';
import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';

import { Link, IndexLink } from 'react-router';

const style_avatar = {marginLeft: 5, marginRight: 465, marginTop: -60};
const style_card = {width: 450, height: 305, marginLeft: 800, marginBottom: 40, marginTop: -305, marginRight: 10};
const style_card2 = {width: 140, height: 30, marginLeft: 120, marginBottom: 40, marginTop: -15, marginRight: 10};

const style_card_bottom = {width: 1245, height: 100, marginLeft: 10, marginBottom: 0, marginRight: 10, color: "#00b3b3"};

const style_head = {fontSize: 22, fontWeight: 'bold', textAlign: 'left', fontFamily: "Oswald",
color: "#00b3b3", textDecoration: 'underline'}
const style_head2 = {fontSize: 16, textAlign: 'center', fontFamily: "Arial",
color: "#ffffff", backgroundColor: "#00CED1", padding: 12}


const style_subhead = {fontSize: 15, fontWeight: 'bold', textAlign: 'left', fontFamily: "Palatino"}
const style_subheadbottom = {fontSize: 16, fontWeight: 'bold', fontFamily: "Oswald", textAlign: 'center'}

const style_body1 = {fontSize: 19, textAlign: 'left', fontFamily: "Georgia",
marginBottom: 0,
backgroundImage: 'url("https://www.moooi.com/sites/default/files/styles/large/public/paper_detail.jpg")' };


const styles_last = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  slide: {
    padding: 10,
  },
};

const styles_grid = {
  root: {

    marginLeft: 100,
    width: 500,
    height: 400,
    marginBottom: 40,
    marginTop: 60,

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

    marginLeft: 650,
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

const styles_grid3 = {
  root: {

    marginLeft: 100,
    width: 600,
    height: 300,
    marginBottom: 40,
    marginTop: 100,
  },
  gridList: {
    width: 600,
    height: 300,
    overflowY: 'auto',
    backgroundColor: "#ffffff",
  },
};

const styles_grid4 = {
  root: {

    marginLeft: 750,
    width: 400,
    height: 300,
    marginBottom: 40,
    marginTop: -340,
  },
  gridList: {
    width: 400,
    height: 300,
    overflowY: 'auto',
    backgroundColor: "#ffffff",
  },
};

const styles_grid5 = {
  root: {

    marginLeft: 750,
    width: 400,
    height: 300,
    marginBottom: 40,
    marginTop: 120,
  },
  gridList: {
    width: 400,
    height: 300,
    overflowY: 'auto',
    backgroundColor: "#ffffff",
  },
};


const tilesData = [
  {
    img: 'images/grid-list/00-52-29-429_640.jpg',
    title: 'Breakfast',
    author: 'jill111',
    featured: true,
  },

];


const style = {
  display: 'inline-block',
  margin: '16px 32px 16px 0',
};

const styles = {
  button: {
    marginLeft: 35,
    marginTop: 40,
    marginRight: 1035,
    marginBottom: 20,
  },
  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    fontFamily: "Palatino",
    width: '100%',
    backgroundColor: "#F5FFFA",
    opacity: 0,
  },
};

class HomePage extends React.Component {
      constructor(props, context) {
        super(props, context);

        // set the initial component state
        this.state = {
          allrecords:{
            methods:[],
            applications:[],
            papers:[],
            ppt:[],
            swproj:[],
            swreleases:[],
            patents:[],
            books:[]
          },
          records:[],
          slideIndex: 0,
        };
        this.handleChange = this.handleChange.bind(this);
      }



  handleChange(value){
    this.setState({
      slideIndex: value,
    });
  }

      componentDidMount() {
        var typesarray = ['methods','applications','conferencePapers','presentations',
          'softwareProjects','software','softwareReleases','patents','books','bookChapter'];
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
          //console.log("home page records resp:- "+JSON.stringify(this.state.records));

          /*xhr.response.map((rec)=>{
            if(rec.Type==='methods'){

            }
          });*/
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

      render() {
    return (



	<div>

    <CardMedia
          style={style_avatar}
         >
          <img src="https://www.collegemagazine.com/wp-content/uploads/2015/10/Century-Tower-APA-Cropped.jpg" height="305" width="550"/>
    </CardMedia>


    <Card className="container"
            style = {style_card}
    >

    <CardText style = {style_body1}>
      Sanjay Ranka is a Professor in the Department of
      <a href="https://www.cise.ufl.edu/people/faculty/ranka" target="_blank"> Computer
      and Information Science and Engineering</a> at University of Florida.
      His current research interests are high performance
      and parallel computing with a focus on energy efficiency; and big data science with a focus on
      data mining/machine learning algorithms for spatiotemporal applications. His work is driven by
      applications in CFD, remote sensing, health care and transportation. <br/>

       <Link style={style_head} to="/biocv">Full bio and CV</Link>

    </CardText>

    </Card>




    <div style={styles_grid.root}>
    <GridList
      cols={2}
      cellHeight='auto'
      padding={1}
      style={styles_grid.gridList}
    >
      {tilesData.map((tile) => (
        <GridTile
          key='1'
          title=''
          titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
          cols={tile.featured ? 2 : 2}
          rows={tile.featured ? 2 : 2}
        >
          <div style = {style_head2}>METHODS </div>
          {
            this.state.records.filter((rec)=>{
              return rec.Type==='methods';
            })
            .map((rec,index)=>(
              <div key={index}>
              <Card>
                <CardHeader
                  title={rec.title}
                  actAsExpander={true}
                  showExpandableButton={true}
                />

                <CardText expandable={true}>
                  {rec.description}
                  {rec.attachment!="" &&
                    <IconButton tooltip="Download" onClick={this.downloadFile.bind(this,rec.fileid,rec.attachment)}>
                      <ActionDownload />
                    </IconButton>
                  }

                </CardText>
              </Card>
              </div>
            ))
          }

        </GridTile>
      ))}

    </GridList>
  </div>


  <div style={styles_grid2.root}>
    <GridList
      cols={2}
      cellHeight='auto'
      padding={1}
      style={styles_grid2.gridList}
    >
      {tilesData.map((tile) => (
        <GridTile
          key='1'
          title=''
          titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
          cols={tile.featured ? 2 : 2}
          rows={tile.featured ? 2 : 2}
        >
          <div style = {style_head2}>APPLICATIONS</div>
          {
            this.state.records.filter((rec)=>{
              return rec.Type==='applications';
            })
            .map((rec,index)=>(
              <div key={index}>
              <Card>
                <CardHeader
                  title={rec.title}
                  actAsExpander={true}
                  showExpandableButton={true}
                />
                <CardActions>
                </CardActions>
                <CardText expandable={true}>
                  {rec.description}
                  {rec.attachment!="" &&
                    <IconButton tooltip="Download" onClick={this.downloadFile.bind(this,rec.fileid,rec.attachment)}>
                    <ActionDownload />
                  </IconButton>
                  }
                </CardText>
              </Card>
              </div>
            ))
          }
        </GridTile>
      ))}
    </GridList>
  </div>

  <div style={styles_grid3.root}>
    <GridList
      cols={2}
      cellHeight='auto'
      padding={1}
      style={styles_grid3.gridList}
    >
      {tilesData.map((tile) => (
        <GridTile
          key='1'
          title=''
          titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
          cols={tile.featured ? 2 : 2}
          rows={tile.featured ? 2 : 2}
        >
          <div style = {style_head2}>RECENT PAPERS</div>
          {
            this.state.records.filter((rec)=>{
              return rec.Type==='conferencePapers';
            })
            .map((rec,index)=>(
              <div key={index}>
              <Card>
                <CardHeader
                  title={rec.title}
                  actAsExpander={true}
                  showExpandableButton={true}
                />
                <CardActions>
                </CardActions>
                <CardText expandable={true}>
                  {rec.description}
                  {rec.attachment!="" &&
                    <IconButton tooltip="Download" onClick={this.downloadFile.bind(this,rec.fileid,rec.attachment)}>
                    <ActionDownload />
                  </IconButton>
                  }
                </CardText>
              </Card>
              </div>
            ))
          }
        </GridTile>
      ))}
    </GridList>
  </div>

  <div style={styles_grid4.root}>
    <GridList
      cols={2}
      cellHeight='auto'
      padding={1}
      style={styles_grid4.gridList}
    >
      {tilesData.map((tile) => (
        <GridTile
          key='1'
          titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
          cols={tile.featured ? 2 : 2}
          rows={tile.featured ? 2 : 2}
        >
          <div style = {style_head2}>PRESENTATIONS</div>
          {
            this.state.records.filter((rec)=>{
              return rec.Type==='presentations';
            })
            .map((rec,index)=>(
              <div key={index}>
              <Card>
                <CardHeader
                  title={rec.title}
                  actAsExpander={true}
                  showExpandableButton={true}
                />
                <CardActions>
                </CardActions>
                <CardText expandable={true}>
                  {rec.description}
                  {rec.attachment!="" &&
                    <IconButton tooltip="Download" onClick={this.downloadFile.bind(this,rec.fileid,rec.attachment)}>
                    <ActionDownload />
                  </IconButton>
                }
                </CardText>
              </Card>
              </div>
            ))
          }
        </GridTile>
      ))}
    </GridList>
  </div>



<div style={styles_grid3.root}>
    <GridList
      cols={2}
      cellHeight='auto'
      padding={1}
      style={styles_grid3.gridList}
    >
      {tilesData.map((tile) => (
        <GridTile
          key='1'
          title=''
          titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
          cols={tile.featured ? 2 : 2}
          rows={tile.featured ? 2 : 2}
        >

          <div>
        <Tabs
          onChange={this.handleChange}
          value={this.state.slideIndex}
        >
          <Tab label="Software Projects" value={0} />
          <Tab label="Software Releases" value={1} />
          <Tab label="Patents" value={2} />
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
        >
        <div>
          {
            this.state.records.filter((rec)=>{
              return rec.Type==='softwareProjects';
            })
            .map((rec,index)=>(

              <Card key={index}>
                <CardHeader
                  title={rec.title}
                  actAsExpander={true}
                  showExpandableButton={true}
                />
                <CardActions>
                </CardActions>
                <CardText expandable={true}>
                  {rec.description}
                  {rec.attachment!="" &&
                    <IconButton tooltip="Download" onClick={this.downloadFile.bind(this,rec.fileid,rec.attachment)}>
                      <ActionDownload />
                    </IconButton>
                  }
                </CardText>
              </Card>

            ))
          }
          </div>
          <div style={styles.slide}>
            {
            this.state.records.filter((rec)=>{
              return rec.Type==='softwareReleases';
            })
            .map((rec,index)=>(

              <Card key={index}>
                <CardHeader
                  title={rec.title}
                  actAsExpander={true}
                  showExpandableButton={true}
                />
                <CardActions>
                </CardActions>
                <CardText expandable={true}>
                  {rec.description}
                  {rec.attachment!="" &&
                    <IconButton tooltip="Download" onClick={this.downloadFile.bind(this,rec.fileid,rec.attachment)}>
                    <ActionDownload />
                  </IconButton>
                }
                </CardText>
              </Card>

            ))
          }
          </div>
          <div style={styles.slide}>
            {
            this.state.records.filter((rec)=>{
              return rec.Type==='patents';
            })
            .map((rec,index)=>(

              <Card key={index}>
                <CardHeader
                  title={rec.title}
                  actAsExpander={true}
                  showExpandableButton={true}
                />
                <CardActions>
                </CardActions>
                <CardText expandable={true}>
                  {rec.description}
                  {rec.attachment!="" &&
                    <IconButton tooltip="Download" onClick={this.downloadFile.bind(this,rec.fileid,rec.attachment)}>
                    <ActionDownload />
                  </IconButton>
                }
                </CardText>
              </Card>

            ))
          }
          </div>
        </SwipeableViews>
      </div>

        </GridTile>
      ))}
    </GridList>
  </div>








  <div style={styles_grid4.root}>
    <GridList
      cols={2}
      cellHeight='auto'
      padding={1}
      style={styles_grid5.gridList}
    >
      {tilesData.map((tile) => (
        <GridTile
          key='1'
          titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
          cols={tile.featured ? 2 : 2}
          rows={tile.featured ? 2 : 2}
        >
          <div style = {style_head2}>BOOKS</div>
          {
            this.state.records.filter((rec)=>{
              return rec.Type==='books' || rec.Type==='bookChapter';
            })
            .map((rec,index)=>(
              <div key={index}>
              <Card>
                <CardHeader
                  title={rec.title}
                  actAsExpander={true}
                  showExpandableButton={true}
                />
                <CardActions>
                </CardActions>
                <CardText expandable={true}>
                  {rec.description}
                  {rec.attachment!="" &&
                    <IconButton tooltip="Download" onClick={this.downloadFile.bind(this,rec.fileid,rec.attachment)}>
                    <ActionDownload />
                  </IconButton>
                }
                </CardText>
              </Card>
              </div>
            ))
          }
        </GridTile>
      ))}
    </GridList>
  </div>




     <Card className="container"
            style = {style_card_bottom}
    >
    <br/>

     <p style={style_subheadbottom}>

     &nbsp;&nbsp;
     <a href="https://www.facebook.com/sanjay.ranka" target="_blank">Facebook</a> &nbsp;&nbsp;
     &nbsp;&nbsp;Twitter&nbsp;&nbsp;&nbsp;&nbsp;
     <a href="mailto:sanjayranka@gmail.com?Subject=Hello" target="_top">Email</a>
     &nbsp;&nbsp;&nbsp;&nbsp;
     <a href="https://www.linkedin.com/in/sanjay-ranka-85b2741/" target="_blank">LinkedIn</a>&nbsp;&nbsp;&nbsp;&nbsp;
     <a href="https://scholar.google.com/citations?user=j7WSgbwAAAAJ&hl=en" target="_blank">Google Scholar</a>
     </p>





    </Card>

  </div>
)
  }
}

export default HomePage;
