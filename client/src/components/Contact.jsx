import React from 'react';
import { Card, CardActions, CardExpandable, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';


const style_card_bottom = {width: 900, height: 40, marginLeft: 0, marginBottom: 10, marginRight: 10, color: "#00b3b3", backgroundColor: "#e6ffff"};
const style_subheadbottom = {fontSize: 16, fontWeight: 'bold', fontFamily: "Oswald", textAlign: 'center'};

const style_head = {fontSize: 20, fontWeight: 'bold', textAlign: 'left', fontFamily: "Oswald", color: "#00b3b3", textDecoration: 'underline'}
const style_subhead1 = {fontSize: 15, fontWeight: 'bold', textAlign: 'left', marginTop: -330, fontFamily: "Oswald", color: "#00b3b3"}
const style_subhead = {fontSize: 15, fontWeight: 'bold', textAlign: 'left', fontFamily: "Oswald", color: "#00b3b3"};
const style_body1 = {fontSize: 16, textAlign: 'left', fontFamily: "Palatino"};
const style_card = {width: 900, height: 650, marginBottom: 20, marginTop: -50, fontFamily: "Oswald", color: "#00b3b3", backgroundColor: "#e6ffff"};
const style_image = {width: 500, height: 300, marginLeft: 300};

const Contact = () => (
	<div>


	<Card className="container"
			style = {style_card}
	>

    <CardText
        style = {style_head}
    >

      Contact

    </CardText>

    <img src="https://c1.staticflickr.com/5/4069/4303153330_9e9f1b1180_b.jpg"
      style={style_image}
      />

       <CardText
        style = {style_subhead1}
    >

      Address


    </CardText>

    <CardText
        style = {style_body1}
    >
    E532 CSE Bldg,<br />
    Department of CISE<br />
    University of Florida,<br />
    Gainesville, FL 32611



    </CardText>


     <CardText
        style = {style_subhead}
    >

      Email



    </CardText>

    <CardText
        style = {style_body1}
    >

    <a href="mailto:sanjayranka@gmail.com?Subject=Hello" target="_top">sanjayranka@gmail.com</a> <br />
    <a href="mailto:ranka@cise.ufl.edu?Subject=Hello" target="_top">ranka@cise.ufl.edu</a>

    </CardText>

     <CardText
        style = {style_subhead}
    >

      <a href = "https://sites.google.com/site/sanjayranka" target="_blank">Website</a>

    </CardText>


    <CardText
        style = {style_subhead}
    >

      Phone



    </CardText>

    <CardText
        style = {style_body1}
    >
    352-514-4213<br />
    352-392-1220 (fax)<br />
    352-392-1200 (secretary)

    </CardText>

     <CardText
        style = {style_subhead}
    >

      Office Hours



    </CardText>

    <CardText
        style = {style_body1}
    >
    Tuesday 1-2 pm, Wednesday 9:30-10:30 am or by appointment


    </CardText>


    <Card className="container"
            style = {style_card_bottom}
    >
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




  </Card>
  </div>
);

export default Contact;
