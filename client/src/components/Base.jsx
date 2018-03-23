import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import Auth from '../modules/Auth';


import {grey500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';


const muiTheme = getMuiTheme({
  palette: {
    textColor: grey500,
  },
  appBar: {
    height: 50,
  },
});

var letterStyle = {
            padding: 18,
            margin: 1,
            backgroundColor: "#F5FFFA",
            color: "#F08080",
            display: "inline-block",
            fontFamily: "Oswald",
            fontSize: 20,
            textAlign: "center"
        };

const Base = ({ children }) => (
  <div>
    <div className="top-bar">
      <div className="top-bar-left" style = {letterStyle}>
        <IndexLink to="/">SANJAY RANKA&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</IndexLink>
        <Link to="/biocv">Bio & C.V.&nbsp;&nbsp;&nbsp;&nbsp;</Link>
        <Link to="/writings">Writings&nbsp;&nbsp;&nbsp;&nbsp;</Link>
        <Link to="/researchareas">Research Areas&nbsp;&nbsp;&nbsp;&nbsp;</Link>
        <Link to="/software">Software&nbsp;&nbsp;&nbsp;&nbsp;</Link>
        <Link to="/teaching">Teaching&nbsp;&nbsp;&nbsp;&nbsp;</Link>
        <Link to="/gr-students">Graduate Students&nbsp;&nbsp;&nbsp;&nbsp;</Link>
        <Link to="/contact">Contact</Link>


      </div>

      {Auth.isUserAuthenticated() ? (
        <div className="top-bar-right" style = {letterStyle}>
          <Link to="/logout"><font size="2">Log out</font></Link>
        </div>
      ) : (
        <div className="top-bar-right" style = {letterStyle}>
          <Link to="/login"><font size="2">Log in</font></Link>
          <Link to="/signup"><font size="2">Sign up</font></Link>
        </div>
      )}

    </div>

    { /* child component will be rendered here */ }
    {children}

  </div>
);

Base.propTypes = {
  children: PropTypes.object.isRequired
};

export default Base;