import './App.css';
import React, { useState, useEffect } from "react";

// React Router
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";

// Meterial-UI Components
import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core/styles'
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from '@material-ui/icons/Home';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import AddCircleIcon from '@material-ui/icons/AddCircle';

// Firebase
import firebaseApp from './firebaseConfig';
import { getPerformance } from "firebase/performance";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Pages
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import RewardsPage from './pages/Rewards/RewardsPage';

// Components
import MyAppBar from "./components/AppBar/MyAppBar";

// Context Provider
import { AuthProvider } from './context/Auth'
import NewReward from './pages/Rewards/NewReward';
import RewardInfo from './pages/Rewards/RewardInfo';
import RecycleLocationsPage from './pages/RecycleLocations/RecycleLocationsPage';
import NewRecycleLocation from './pages/RecycleLocations/NewRecycleLocation';
import EditRecycleLocation from './pages/RecycleLocations/EditRecycleLocation';
import AddPointHomePage from './pages/AddPointPage/AddPointHomePage';
import AddPointQRCodeScanner from './pages/AddPointPage/AddPointQRCodeScannerPage';
import AddPointToStudentPage from './pages/AddPointPage/AddPointToStudentPage';
import RewardHistoryPage from './pages/Rewards/RewardHistory';
import RewardHistoryInfoPage from './pages/Rewards/RewardHistoryInfo';
import StudentAccountDeletePage from './pages/StudentAccountDelete/StudentAccountDeletePage';
import AboutPage from './pages/AboutPage/AboutPage';
import RewardHistorySearchPage from './pages/Rewards/RewardHistorySearch';

// Get Firebase Service
const auth = getAuth(firebaseApp);
// eslint-disable-next-line no-unused-vars
const perf = getPerformance(firebaseApp);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(firebaseApp);

const useStyles = makeStyles((theme) => ({
  navBar: {
    overflow: "hidden",
    position: "fixed",
    bottom: 0,
    width: "100%",
    zIndex: 1
  },
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1,
    margin: theme.spacing(1),
    fontWeight: "bold",
    fontFamily: ["Arial", "Helvetica", "sans-serif"]
  },
  button: {
    margin: theme.spacing(1)
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const customizedTheme = createTheme({
  "palette":
  {
    "common": {
      "black": "#000",
      "white": "#fff"
    },
    "background":
    {
      "paper": "#fff",
      "default": "#fafafa"
    },
    "primary": {
      "light": "#7986cb",
      "main": "rgba(33, 150, 243, 1)",
      "dark": "#303f9f",
      "contrastText": "#fff"
    },
    "secondary": {
      "light": "#ff4569",
      "main": "rgba(231, 76, 60, 1)",
      "dark": "#c51162",
      "contrastText": "#fff"
    },
    "error": {
      "light": "#e57373",
      "main": "#f44336",
      "dark": "#d32f2f",
      "contrastText": "#fff"
    },
    "text": {
      "primary": "rgba(0, 0, 0, 0.87)",
      "secondary": "rgba(0, 0, 0, 0.54)",
      "disabled": "rgba(0, 0, 0, 0.38)",
      "hint": "rgba(0, 0, 0, 0.38)"
    }
  },
  typography: {
    fontFamily: [
      'Prompt',
      'sans-serif',
    ].join(','),
  }
});

function App() {
  const MyBottomNavigation = () => {
    const classes = useStyles();
    const history = useHistory();

    const routes = ["/", "rewards", "add-point", "recycle-location"];
    const [value, setValue] = useState(routes[0]);
    const [isUserSignedIn, setIsUserSignedIn] = useState(false);

    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsUserSignedIn(true)
        }
      })
      
      history.listen((location) => {
        window.scrollTo(0, 0);
        let pathname = (location.pathname).substr(1)
        if (pathname.includes("rewards")) {
          setValue(routes[1])
        } else if (pathname.includes("add-point")) {
          setValue(routes[2])
        } else if (pathname.includes("recycle-location")) {
          setValue(routes[3])
        } else {
          setValue(routes[0])
        }
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [history])

    if (isUserSignedIn) {
      return (
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            if (newValue === "/") {
              history.push("/")
            } else {
              history.push("/" + newValue);
            }
            setValue(newValue);
          }}
          showLabels
          className={classes.navBar}
        >
          <BottomNavigationAction
            label="หน้าเเรก"
            to="/"
            value={routes[0]}
            icon={<HomeIcon />}
          />
          <BottomNavigationAction
            label="ของรางวัล"
            to="/rewards"
            value={routes[1]}
            icon={<CardGiftcardIcon />}
          />
          <BottomNavigationAction
            label="เเต้มสะสม"
            to="/add-point"
            value={routes[2]}
            icon={<AddCircleIcon />}
          />
          <BottomNavigationAction
            label="จุดรีไซเคิล"
            to="/recycle-location"
            value={routes[3]}
            icon={<LocationOnIcon />}
          />
        </BottomNavigation>
      );
    } else {
      return (<div></div>)
    }
  };

  return (
    <ThemeProvider theme={customizedTheme}>
      <AuthProvider>
        <Router>
          <div>
            <header>
              <MyAppBar />
            </header>
            <div>
              <div>
                <Switch>
                  <Route path="/" exact>
                    <HomePage />
                  </Route>
                  <Route path="/Login">
                    <LoginPage />
                  </Route>

                  <Route path="/add-point" exact>
                    <AddPointHomePage />
                  </Route>
                  <Route path="/add-point/qr-code-scanner">
                    <AddPointQRCodeScanner />
                  </Route>
                  <Route path="/add-point/student/:studentId">
                    <AddPointToStudentPage />
                  </Route>

                  <Route path="/rewards" exact>
                    <RewardsPage />
                  </Route>
                  <Route path="/rewards/add" exact>
                    <NewReward />
                  </Route>
                  <Route path="/rewards/edit/:rewardId" exact>
                    <RewardInfo />
                  </Route>
                  <Route path="/reward/history/search" exact>
                    <RewardHistorySearchPage />
                  </Route>
                  <Route path="/rewards/history/:rewardUUID" exact>
                    <RewardHistoryPage />
                  </Route>
                  <Route path="/rewards/history/info/:redeemTXId" exact>
                    <RewardHistoryInfoPage />
                  </Route>

                  <Route path="/recycle-location/new">
                    <NewRecycleLocation />
                  </Route>
                  <Route path="/recycle-location/edit/:recycleLocationId">
                    <EditRecycleLocation />
                  </Route>
                  <Route path="/recycle-location/">
                    <RecycleLocationsPage />
                  </Route>

                  <Route path="/student-account-delete/">
                    <StudentAccountDeletePage />
                  </Route>

                  <Route path="/about/">
                    <AboutPage />
                  </Route>
                </Switch>
              </div>
            </div>
            <MyBottomNavigation />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
