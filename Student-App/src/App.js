import React, { useState, useEffect } from "react";
import './App.css';

// React Router
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";

// Meterial-UI Components
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import HomeIcon from '@material-ui/icons/Home';
import FavoriteIcon from '@material-ui/icons/Favorite';

// Components
import MyAppBar from "./Components/AppBar/MyAppBar";

// Context
import { AuthProvider } from './context/Auth'

// Theme
import { customizedTheme } from "./customization/CustomizedTheme";

// Firebase
import RegisterPage from "./pages/RegisterPage/RegisterPage";

// Pages
import HomePage from "./pages/HomePage/HomePage";
import IntroducePage0 from "./pages/IntroducePage/IntroducePage0";
import IntroducePage1 from "./pages/IntroducePage/IntroducePage1";
import IntroducePage2 from "./pages/IntroducePage/IntroducePage2";
import LearnHomePage from "./pages/LearnPage/LearnHomePage";
import LearnAbout5RPage from "./pages/LearnPage/LearnAbout5RPage";
import LearnHowGoodPage from "./pages/LearnPage/LearnHowGoodPage";
import HowToRecycleHomePage from "./pages/LearnPage/HowToRecyclePage/HowToRecycleHomePage";
import RecyclePlasticBottlePage from "./pages/LearnPage/HowToRecyclePage/RecyclePlasticBottlePage"
import RecyclePaperPage from "./pages/LearnPage/HowToRecyclePage/RecyclePaperPage";
import RecycleBoxPage from "./pages/LearnPage/HowToRecyclePage/RecycleBoxPage";
import RecycleIceCreamWrapPage from "./pages/LearnPage/HowToRecyclePage/RecycleIceCreamWrapPage";
import RecycleMilkBoxUHT from "./pages/LearnPage/HowToRecyclePage/RecycleMilkBoxUHTPage";
import DonationHomePage from "./pages/DonationPage/DonationHomePage";
import Donation0Page from "./pages/DonationPage/Donation0Page";
import Donation1Page from "./pages/DonationPage/Donation1Page";
import Donation2Page from "./pages/DonationPage/Donation2Page";
import QRCodePage from "./pages/QRCodePage/QRCodePage";
import RecycleLocationHomePage from "./pages/RecycleLocationPage/RecycleLocationHomePage";
import RecycleLocationInfoPage from "./pages/RecycleLocationPage/RecycleLocationInfoPage";
import RewardHomePage from "./pages/RewardPage/RewardHomePage";
import RewardInfoPage from "./pages/RewardPage/RewardInfoPage";
import RewardHistoryPage from "./pages/RewardPage/RewardHistoryPage";
import RewardHistoryInfoPage from "./pages/RewardPage/RewardHistoryInfoPage";
import TXsPage from "./pages/TXPage/TXsPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import EditStudentProfilePage from "./pages/EditStudentProfilePage/EditStudentProfilePage";

const useStyles = makeStyles((theme) => ({
  navBar: {
    overflow: "hidden",
    position: "fixed",
    bottom: 0,
    width: "100%",
    zIndex: 1
  },
  hideNavBar: {
    display: "none"
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

function App() {
  const classes = useStyles();
  const routes = ["/", "recycle-location", "reward", "donation"];
  const [value, setValue] = useState(routes[0]);
  const [isShouldShowBottomNav, setIsShouldShowBottomNav] = useState(false);

  useEffect(() => {
    document.title = "หน้าเเรก | Sri Ayudhya School - We Re(cycle)"
  }, [])

  const MyBottomNavigation = () => {
    let history = useHistory();

    useEffect(() => {
      history.listen((location) => {
        window.scrollTo(0, 0);
        let pathname = (location.pathname).substr(1)
        if (pathname.includes("recycle-location")) {
          setValue(routes[1])
        } else if (pathname.includes("reward")) {
          setValue(routes[2])
        } else if (pathname.includes("donation")) {
          setValue(routes[3])
        } else {
          setValue(routes[0])
        }

        if (!(pathname.includes("introduce")) && !(pathname.includes("register"))) {
          setIsShouldShowBottomNav(true);
        }
      })
    }, [history])

    return (
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          try {
            history.push("/" + newValue);
          } catch {
            history.push(newValue)
          }
          setValue(newValue);
        }}
        showLabels
        className={isShouldShowBottomNav ? classes.navBar : classes.hideNavBar}
      >
        <BottomNavigationAction
          label="หน้าเเรก"
          to="/"
          value={routes[0]}
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          label="จุดรีไซเคิล"
          to="/recycle-location"
          value={routes[1]}
          icon={<LocationOnIcon />}
        />
        <BottomNavigationAction
          label="ของรางวัล"
          to="/reward"
          value={routes[2]}
          icon={<CardGiftcardIcon />}
        />
        <BottomNavigationAction
          label="บริจาค"
          to="/donation"
          value={routes[3]}
          icon={<FavoriteIcon />}
        />
      </BottomNavigation>
    )
  }

  return (
    <ThemeProvider theme={customizedTheme}>
      <AuthProvider>
        <Router>
          <div>
            <header>
              <MyAppBar />
            </header>
            <Switch>
              <Route path="/" exact>
                <HomePage />
              </Route>

              <Route path="/edit-profile" exact>
                <EditStudentProfilePage />
              </Route>

              <Route path="/about" exact>
                <AboutPage />
              </Route>

              <Route path="/txs">
                <TXsPage />
              </Route>

              <Route path="/register">
                <RegisterPage />
              </Route>

              <Route path="/introduce" exact>
                <IntroducePage0 />
              </Route>
              <Route path="/introduce/0">
                <IntroducePage0 />
              </Route>
              <Route path="/introduce/1">
                <IntroducePage1 />
              </Route>
              <Route path="/introduce/2">
                <IntroducePage2 />
              </Route>

              <Route path="/learn" exact>
                <LearnHomePage />
              </Route>
              <Route path="/learn/about-5r" exact>
                <LearnAbout5RPage />
              </Route>

              <Route path="/learn/how-to-recycle" exact>
                <HowToRecycleHomePage />
              </Route>
              <Route path="/learn/how-to-recycle/0">
                <RecyclePlasticBottlePage />
              </Route>
              <Route path="/learn/how-to-recycle/paper">
                <RecyclePaperPage />
              </Route>
              <Route path="/learn/how-to-recycle/box">
                <RecycleBoxPage />
              </Route>
              <Route path="/learn/how-to-recycle/ice-cream-wrap">
                <RecycleIceCreamWrapPage />
              </Route>
              <Route path="/learn/how-to-recycle/milk-box-uht">
                <RecycleMilkBoxUHT />
              </Route>

              <Route path="/learn/how-good" exact>
                <LearnHowGoodPage />
              </Route>

              <Route path="/reward" exact>
                <RewardHomePage />
              </Route>
              <Route path="/reward/info/:rewardId">
                <RewardInfoPage />
              </Route>
              <Route path="/reward/history" exact>
                <RewardHistoryPage />
              </Route>
              <Route path="/reward/history/:redeemTXId">
                <RewardHistoryInfoPage />
              </Route>

              <Route path="/qr-code" exact>
                <QRCodePage />
              </Route>

              <Route path="/recycle-location" exact>
                <RecycleLocationHomePage />
              </Route>
              <Route path="/recycle-location/info/:recycleLocationId">
                <RecycleLocationInfoPage />
              </Route>

              <Route path="/donation" exact>
                <DonationHomePage />
              </Route>
              <Route path="/donation/0">
                <Donation0Page />
              </Route>
              <Route path="/donation/1">
                <Donation1Page />
              </Route>
              <Route path="/donation/2">
                <Donation2Page />
              </Route>
            </Switch>
            <div>
              <MyBottomNavigation />
            </div>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
