import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  ellipse,
  square,
  triangle,
  home,
  cog,
  desktopOutline,
  camera,
  videocam,
  analytics,
  listOutline,
  power,
} from "ionicons/icons";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/core.css";
import "@ionic/react/css/ionic.bundle.css";
/* Theme variables */
import "./theme/variables.css";
import { Provider } from "react-redux";
import store from "./App/store";
import { useEffect, useState } from "react";
import Camera from "./pages/Camera";
import Analytics from "./pages/Analytics";
import "./App.css";
import "./theme/variables.css";
import System from "./pages/System";
import checkCacheAndReload from "./App/CacheBuster";
setupIonicReact();

const App: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("home");
  // const isProd = process.env.NODE_ENV === "production";
  useEffect(() => {
    
    checkCacheAndReload();
  }, []);
  
  const isProd = false;
  return (
    <Provider store={store}>
      <IonApp color-theme="dark">
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/home">
                <Home />
              </Route>
              <Route exact path="/settings">
                <Settings />
              </Route>
              <Route path="/camera">
                <Camera />
              </Route>
              <Route path="/analytics">
                <Analytics />
              </Route>
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
              {/* <Route exact path="/logs">
                <Logs />
              </Route> */}
              <Route exact path="/system">
                <System />
              </Route>
            </IonRouterOutlet>
            <IonTabBar
              slot="top"
              style={{
                backgroundColor: "#244d9a",
              }}
            >
              <IonTabButton
                tab="tab1"
                href="/home"
                style={
                  selectedTab == "home"
                    ? {
                        backgroundColor: "rgba(255, 255, 255, 0.3)",
                        borderBottom: "2px solid white",
                      }
                    : { backgroundColor: "#244d9a" }
                }
                onClick={() => setSelectedTab("home")}
              >
                <IonIcon
                  style={{
                    color: "white",
                  }}
                  aria-hidden="true"
                  icon={home}
                />
                <IonLabel
                  style={{
                    color: "white",
                  }}
                >
                  Home
                </IonLabel>
              </IonTabButton>
              <IonTabButton
                tab="settings"
                href="/settings"
                style={
                  selectedTab == "settings"
                    ? {
                        backgroundColor: "rgba(255, 255, 255, 0.3)",
                        borderBottom: "2px solid white",
                      }
                    : { backgroundColor: "#244d9a" }
                }
                onClick={() => setSelectedTab("settings")}
              >
                <IonIcon
                  style={{
                    color: "white",
                  }}
                  aria-hidden="true"
                  icon={cog}
                />
                <IonLabel
                  style={{
                    color: "white",
                  }}
                >
                  Settings
                </IonLabel>
              </IonTabButton>
              <IonTabButton
                style={
                  selectedTab == "camera"
                    ? {
                        backgroundColor: "rgba(255, 255, 255, 0.3)",
                        borderBottom: "2px solid white",
                      }
                    : { backgroundColor: "#244d9a" }
                }
                onClick={() => setSelectedTab("camera")}
                tab="camera"
                href="/camera"
              >
                <IonIcon
                  style={{
                    color: "white",
                  }}
                  aria-hidden="true"
                  icon={videocam}
                />
                <IonLabel
                  style={{
                    color: "white",
                  }}
                >
                  View
                </IonLabel>
              </IonTabButton>
              <IonTabButton
                style={
                  selectedTab == "analytics"
                    ? {
                        backgroundColor: "rgba(255, 255, 255, 0.3)",
                        borderBottom: "2px solid white",
                      }
                    : { backgroundColor: "#244d9a" }
                }
                onClick={() => setSelectedTab("analytics")}
                tab="analytics"
                href="/analytics"
              >
                <IonIcon
                  style={{
                    color: "white",
                  }}
                  aria-hidden="true"
                  icon={analytics}
                />
                <IonLabel
                  style={{
                    color: "white",
                  }}
                >
                  Analytics
                </IonLabel>
              </IonTabButton>
              {/*              
              <IonTabButton
                style={
                  selectedTab == "logs"
                    ? {
                        backgroundColor: "rgba(255, 255, 255, 0.3)",
                        borderBottom: "2px solid white",
                      }
                    : { backgroundColor: "#244d9a" }
                }
                onClick={() => setSelectedTab("logs")}
                tab="log"
                href="/logs"
              >
                <IonIcon
                  style={{
                    color: "white",
                  }}
                  aria-hidden="true"
                  icon={listOutline}
                />
                <IonLabel
                  style={{
                    color: "white",
                  }}
                >
                  Log
                </IonLabel>
              </IonTabButton> */}
              <IonTabButton
                style={
                  selectedTab == "system"
                    ? {
                        backgroundColor: "rgba(255, 255, 255, 0.3)",
                        borderBottom: "2px solid white",
                      }
                    : { backgroundColor: "#244d9a" }
                }
                onClick={() => setSelectedTab("system")}
                tab="system"
                href="/system"
              >
                <IonIcon
                  style={{
                    color: "white",
                  }}
                  aria-hidden="true"
                  icon={power}
                />
                <IonLabel
                  style={{
                    color: "white",
                  }}
                >
                  System
                </IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonApp>
    </Provider>
  );
};
export default App;
