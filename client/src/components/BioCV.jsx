import React from 'react';
import { Card, CardActions, CardExpandable, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';

import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';

import RaisedButton from 'material-ui/RaisedButton';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import FontIcon from 'material-ui/FontIcon';



const style_avatar = {marginLeft: 30, marginRight: 1050, marginTop: -40};
const style_card = {width: 980, height: 920, marginLeft: 250, marginBottom: 40, marginTop: -345, marginRight: 10 , backgroundColor: "#e6ffff"};

const style_head = {fontSize: 20, fontWeight: 'bold', textAlign: 'left', fontFamily: "Oswald", color: "#00b3b3", textDecoration: 'underline'}
const style_subhead = {fontSize: 15, fontWeight: 'bold', textAlign: 'left', fontFamily: "Palatino"}
const style_body1 = {fontSize: 18, textAlign: 'left', fontFamily: "Palatino"}

const styles = {
  button: {
    marginLeft: 35,
    marginTop: 40,
    marginRight: 1035,
    marginBottom: 20,
    backgroundColor: "#e6ffff",
    fontFamily: "Palatino",
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



const BioCV = () => (
    <div>


         <CardMedia
          style={style_avatar}
         >
          <img src="https://lh6.googleusercontent.com/-N-v2RCc7I4g/US13OGQUVcI/AAAAAAAAADo/P-4q_qgGZTM/s200/SanjayRanka.jpg" height="250" width="50"/>
         </CardMedia>

         <RaisedButton
      label="Curriculum Vitae"
      labelPosition="before"
      style={styles.button}
  >
      <input style={styles.exampleImageInput} />

  </RaisedButton>


  <Card className="container"
            style = {style_card}
    >
    <CardText
        style = {style_head}
    >
      Sanjay Ranka's Bio

    </CardText>
    <CardText style = {style_body1}>

      Sanjay Ranka is a Professor in the Department of Computer and Information Science and Engineering at University of Florida. His current research interests are high performance and parallel computing with a focus on energy efficiency; and big data science with a focus on data mining/machine learning algorithms for spatiotemporal applications. His work is driven by applications in CFD, remote sensing, health care and transportation. He teaches courses on data science (three course curriculum), data mining and parallel computing. </CardText>

<CardText style = {style_body1}>From 1999-2002, he was the Chief Technology Officer at Paramark (Sunnyvale, CA). At Paramark, he developed a real-time optimization service called PILOT for marketing campaigns. PILOT served more than 10 million optimized decisions a day in 2002 with a 99.99% uptime. Paramark was recognized by VentureWire/Technologic Partners as a top 100 Internet technology company in 2001 and 2002 and was acquired in 2002. He has also held positions as a tenured faculty positions at Syracuse University and as a researcher/visitor at IBM T.J. Watson Research Labs and Hitachi America Limited. </CardText>

<CardText style = {style_body1}>Sanjay earned his Ph.D. (Computer Science) from the University of Minnesota  and a B. Tech. in Computer Science from IIT, Kanpur, India. He has coauthored four books, 250+ journal and refereed conference articles. His recent co-authored work has received a best student paper runner up award at IGARSS 2015, best paper award at BICOB 2014, best student paper award at ACM-BCB 2010, best paper runner up award at KDD-2009, a nomination for the Robbins Prize for the best paper in journal of Physics in Medicine and Biology for 2008, and a best paper award at ICN 2007. </CardText>

<CardText style = {style_body1}>He is a fellow of the IEEE and AAAS, and a past member of IFIP Committee on System Modeling and Optimization. He is an associate Editor-in-Chief of the Journal of Parallel and Distributed Computing and an associate editor for ACM Computing Surveys, IEEE/ACM Transactions on Computational Biology and Bioinformatics, Sustainable Computing: Systems and Informatics, Knowledge and Information Systems, and International Journal of Computing. Additionally, he is a book series editor for CRC Press for Bigdata. In the past, he has been an associate editor for IEEE Transactions on Parallel and Distributed Systems and IEEE Transactions on Computers. </CardText>

<CardText style = {style_body1}>He  was a past member of the IFIP Committee on System Modeling and Optimization, Parallel Compiler Runtime Consortium, the Message Passing Initiative Standards Committee and Technical Committee on Parallel Processing.  He is the program chair for 2015 High Performance Computing, 2013 International Parallel and Distributed Processing Symposium, 2010 International Conference on Contemporary Computing and co-general chair for 2009 International Conference on Data Mining and 2010 International Conference on Green Computing. </CardText>

<CardText style = {style_body1}>Sanjay has had consulting assignments with a number of companies (AT&T Wireless, IBM, Hitachi) and has served as an expert witness in patent disputes.  He is a series editor for CRC press on Bigdata. His work has received 9600+ citations with an h-index of 48 (based on Google Scholar). </CardText>


  </Card>




  </div>



);

export default BioCV;
