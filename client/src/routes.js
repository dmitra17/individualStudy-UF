import Base from './components/Base.jsx';
import ResearchAreas from './components/ResearchAreas.jsx';
import Teaching from './components/Teaching.jsx';
import Writings from './components/Writings.jsx';
import GraduateStudent from './components/GraduateStudent.jsx';
//import Publications from './components/Publications.jsx';
import Software from './components/Software.jsx';
import Contact from './components/Contact.jsx';
import HomePage from './components/HomePage.jsx';
import BioCV from './components/BioCV.jsx';
import DashboardPage from './containers/DashboardPage.jsx';
import LoginPage from './containers/LoginPage.jsx';
import SignUpPage from './containers/SignUpPage.jsx';
import Auth from './modules/Auth';


const routes = {
  // base component (wrapper for the whole application).
  component: Base, ResearchAreas, Writings, Teaching, GraduateStudent, Contact, BioCV, Software,
  childRoutes: [

    {
      path: '/',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, DashboardPage);
        } else {
          callback(null, HomePage);
        }
      }
    },

	{
      path: '/ResearchAreas',
      component: ResearchAreas
    },
    /*{
      path: '/publications',
      component: Publications
    }, */
    {
      path: '/software',
      component: Software
    },
    {
      path: '/writings',
      component: Writings
    },
	{
      path: '/teaching',
      component: Teaching
    },
	{
      path: '/gr-students',
      component: GraduateStudent
    },
	{
      path: '/contact',
      component: Contact
    },

  {
      path: '/biocv',
      component: BioCV
    },

    {
      path: '/login',
      component: LoginPage
    },

    {
      path: '/signup',
      component: SignUpPage
    },

    {
      path: '/logout',
      onEnter: (nextState, replace) => {
        Auth.deauthenticateUser();

        // change the current URL to /
        replace('/');
      }
    }

  ]
};

export default routes;