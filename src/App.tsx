import * as React from "react";
import "./style/app.less";
import { useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

// ltr rtl
import { ConfigProvider } from "antd";
// translator
import { IntlProvider } from "react-intl";

// i18n translted document
import { locales } from "./i18n/locales";
import arabic from "./i18n/languages/ar.json";
import english from "./i18n/languages/en.json";
import french from "./i18n/languages/fr.json";

//  path controller components
import Missing from "./components/Missing";
import RequireAuth from "./components/RequireAuth";
import Unauthorized from "./components/Unauthorized";
import GuestPath from "./components/GuestPath";
import Layout from "./components/Layout";

// Auth
import Login from "./pages/auth/Login";

// Home
import Home from "./pages/home/Index";
import Home1 from "./pages/home/home-modules/Home1";
import SiteA from "./pages/home/home-modules/SiteA";
import SiteB from "./pages/home/home-modules/SiteB";
import SiteC from "./pages/home/home-modules/SiteC";

// Achat
import Achat from "./pages/achats/Index";
import Achat1 from "./pages/achats/achat-modules/Achat1";
import Achatgql from "./pages/achats/AchatGraphql";

// Projets
import Projet from "./pages/projets/Index";
import Projet1 from "./pages/projets/projets-modules/Projet1";

// immo
import Immo from "./pages/immobilisation/Index";
import Immo1 from "./pages/immobilisation/immo-modules/Immo1";
// finance
import Finance from "./pages/map/Index";
import Finance1 from "./pages/map/map-modules/MapOutdoor";

// Rh
import Rh from "./pages/rh/Index";
import Rh1 from "./pages/rh/rh-modules/Rh1";

// Account
import Account from "./pages/account/Index";
import Account1 from "./pages/account/account-modules/Account1";

// Config
import Config from "./pages/profile/Index";
import Config1 from "./pages/profile/config-modules/Config1";

// Positions
import Positions from "./pages/positions/Index";
import Positions1 from "./pages/positions/positions-modules/Positions1";

// Configuration
import Configuration from "./pages/configuration/Index";
import Configuration1 from "./pages/configuration/configuration-modules/Configuration1";

// check localstorage here
//console.log(`${process.env.REACT_APP_BASE_PUBLIC_URL}/`);

export interface IApplicationProps {}

const App: React.FunctionComponent<IApplicationProps> = (props) => {
  const messages = {
    en: english,
    fr: french,
    ar: arabic,
  };

  const ROLES = {
    ADMIN: "user",
    USER: "user",
  };

  return (
    <ConfigProvider direction="ltr">
      <IntlProvider
        messages={messages["fr"]}
        locale={"fr"}
        defaultLocale={locales.arabic}
      >
        <BrowserRouter>
          <Routes>
            <Route path={`/*`} element={<Layout />}>
              <Route element={<GuestPath />}>
                <Route path={`*`} element={<Login />} />
              </Route>
              <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
                {/* <Route path={`home`} element={<Home />} /> */}
              </Route>

              <Route path={`home/*`} element={<Home />}>
                <Route path={`*`} element={<Home1 />} />
                <Route path={`dashboard1`} element={<Home1 />} />
                <Route path={`site-a`} element={<SiteA />} />
                <Route path={`site-b`} element={<SiteB />} />
                <Route path={`site-c`} element={<SiteC />} />
              </Route>

              <Route path={`positions/*`} element={<Positions />}>
                <Route path={`*`} element={<Positions1 />} />
                <Route path={`positions1`} element={<Positions1 />} />
              </Route>
              <Route path={`configuration/*`} element={<Configuration />}>
                <Route path={`*`} element={<Configuration1 />} />
                <Route path={`home1`} element={<Configuration1 />} />
              </Route>
              <Route path={`achat/*`} element={<Achat />}>
                <Route path={`*`} element={<Achat1 />} />
                <Route path={`achat1`} element={<Achat1 />} />
              </Route>
              <Route path={`projet/*`} element={<Projet />}>
                <Route path={`*`} element={<Projet1 />} />
                <Route path={`projet1`} element={<Projet1 />} />
              </Route>
              <Route path={`rh/*`} element={<Rh />}>
                <Route path={`*`} element={<Rh1 />} />
                <Route path={`rh1`} element={<Rh1 />} />
              </Route>
              <Route path={`ticketing/*`} element={<Rh />}>
                <Route path={`*`} element={<Rh1 />} />
                <Route path={`rh1`} element={<Rh1 />} />
              </Route>
              <Route path={`immo/*`} element={<Immo />}>
                <Route path={`*`} element={<Immo1 />} />
                <Route path={`immo1`} element={<Immo1 />} />
              </Route>
              <Route path={`finance/*`} element={<Finance />}>
                <Route path={`*`} element={<Finance1 />} />
                <Route path={`finance1`} element={<Finance1 />} />
              </Route>
              <Route path={`account/*`} element={<Account />}>
                <Route path={`*`} element={<Account1 />} />
                <Route path={`account1`} element={<Account1 />} />
              </Route>
              <Route path={`config/*`} element={<Config />}>
                <Route path={`*`} element={<Config1 />} />
                <Route path={`config1`} element={<Config1 />} />
              </Route>
            </Route>
            <Route path={`unauthorized`} element={<Unauthorized />} />
            {/* <Route path={`*`} element={<Missing />} /> */}
          </Routes>
        </BrowserRouter>
      </IntlProvider>
    </ConfigProvider>
  );
};

export default App;
