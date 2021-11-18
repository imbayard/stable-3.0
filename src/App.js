import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import Nav from "react-bootstrap/Nav";
import Routes from "./Routes";
import "./App.css";
import { Auth } from "aws-amplify";
import { AppContext } from "./libs/contextLib";
import { useHistory } from "react-router-dom";
import { onError } from "./libs/errorLib";
import {getSettings, getDay, getDailyReport, getPriorities} from './libs/apiLib';

function App() {
  const history = useHistory();
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [colorScheme, setColorScheme] = useState({});
  const [isWelcome, setIsWelcome] = useState(false);
  const [settings, setSettings] = useState({});
  const [today, setToday] = useState(null);
  const [report, setDailyReport] = useState(null);
  const [priorities, setPriorities] = useState(null);
  const [dayReady, setDayReady] = useState(false);
  useEffect(() => {    
    async function onLoad() {
      const isWelcome = (window.location.pathname === "/welcome") ? true : false;
      setIsWelcome(isWelcome);
      try {
        await Auth.currentSession();
        userHasAuthenticated(true);
        const gotSettings = await getSettings();
        setSettings(gotSettings);
        const gotPriorities = await getPriorities();
        setPriorities(gotPriorities);
        getColorScheme(gotSettings);
        const gotReport = await getDailyReport();
        setDailyReport(gotReport);
        const id = formatDate(Date.now());
        const today = await getDay(id);
        getToday(today);
      }
      catch(e) {
        if (e !== 'No current user') {
          onError(e);
        }
      }
    
      setIsAuthenticating(false);
    }
    function formatDate(date){
      const newDate = new Date(date).toLocaleString("en-US", { timeZone: 'EST'});
      const dateArr = newDate.split('/');
      const year = dateArr[2].substr(0,4);
      const month = dateArr[0];
      const day = dateArr[1];
      return (month + "-" + day + "-" + year);
    }
    function getToday(today){
      let day = today;
      if(day === ""){
        day = {
          "checkInId": formatDate(Date.now()),
          "cat1": {
            'cat': 'Mind',
            'val': false
          },
          "cat2": {
            'cat': 'Body',
            'val': false
          },
          "cat3": {
            'cat': 'Social',
            'val': false
          },
          "cat4": {
            'cat': 'Mindfulness',
            'val': false
          },
          "cat5": {
            'cat': 'Me Time',
            'val': false
          },
          "trophy": {
            'cat': 'Trophy',
            'val': false
          },
          "report": {
            'focus': 'Mindfulness',
            'vlow': ['Mindfulness', 'Body'],
            'low': [],
            'reached': ['Mind', 'Social'],
            'over': ['Me Time']
          },
          "checkInMini": {
            'happiness': 1,
            'excitement': 1,
            'notes': ''
          }
        }
        setToday(day);
      } else {
        setToday(day);
      }
      setDayReady(true);
    }
    function getColorScheme(settings) {
      let scheme = {};
      switch(settings.theme){
        case 'earthy':
          scheme = {
            'main': '#3EB489',
            'dark': '#629985',
            'darker': '#5A8C7A',
            'darkest': '#497364',
            'lighter': '#A0D9C4',
            'success': '#95B562',
            'fail': '#B55077',
            'warn': '#E86A4F',
            'focus': '#A050B5',
            'fadedWarn': '#E8DFDC',
            'fadedSuccess': '#AEB5A3'
          }
          break;
        case 'clear':
          scheme = {
            'main': '#01AEFC',
            'dark': '#005E8A',
            'darker': '#00557D',
            'darkest': '#004463',
            'lighter': 'white',
            'success': '#00FC33',
            'fail': '#C94114',
            'warn': '#FC8900',
            'focus': '#FCC30D',
            'fadedWarn': '#FCE5C7',
            'fadedSuccess': '#D7FCDE'
          }
          break;
        default:
          scheme = {
            'main': '#3EB489',
            'dark': '#629985',
            'darker': '#5A8C7A',
            'darkest': '#497364',
            'lighter': '#A0D9C4',
            'success': '#95B562',
            'fail': '#B55077',
            'warn': '#E86A4F',
            'focus': '#A050B5',
            'fadedWarn': '#E8DFDC',
            'fadedSuccess': '#AEB5A3'
          }
          break;
      }
      setColorScheme(scheme);
    }
    onLoad();
    console.log("app loaded");
  }, []);

  async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);
    history.push("/login"); // Redirecit user to login screen after logout
  }
  return (!isAuthenticating) ? (
    <div className="app">
        <Navbar collapseOnSelect bg='clear' expand="md" className="mb-3">
          <LinkContainer to="/">
            <Navbar.Brand className="font-weight-bold text-muted">
              Title
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav activeKey={window.location.pathname}>
              {(!isWelcome) ? (isAuthenticated ? (
                <>
                  <LinkContainer to="/settings">
                    <Nav.Link className='text-muted'>Settings</Nav.Link>
                  </LinkContainer>
                  <Nav.Link className='text-muted' onClick={handleLogout}>Logout</Nav.Link>
                </>
              ) : (
                <>
                  <LinkContainer to="/signup">
                    <Nav.Link className='text-muted'>Signup</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <Nav.Link className='text-muted'>Login</Nav.Link>
                  </LinkContainer>
                </>
              )) : (
                <>
                </>
              )}

            </Nav>
          </Navbar.Collapse>
        </Navbar>
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated, settings, colorScheme, today, report, priorities }}>
        {dayReady ? (        
          <div className="App">
            <Routes />
          </div>) : (
            <div className="App">
              <h1>Loading...</h1>
            </div>
          ) }

      </AppContext.Provider>
    </div>
  ) : (
    <div>
      Loading...
    </div>
  )
}

export default App;
