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
import enFR from 'antd/lib/locale/fr_FR';
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
import Index from "./components/Index";
import Livraison from "./pages/flottes/livraison-modules/Livraison";

// Auth
import Login from "./pages/auth/Login";

// Home
import Home from "./pages/home/Index";
import Home1 from "./pages/home/home-modules/Home1";

// Cautions
import Cautions from "./pages/finance/caution-modules/Cautions";

// Project
import Projects from "./pages/project/project-modules/Projects";
import Kanban from "./pages/project/project-modules/kanban/Kanban";
//Timesheet
import Timesheet from "./pages/project/timesheet-modules/Timesheet";
//flottes
import FlottesContract from "./pages/flottes/contracts-modules/Contracts";
import FlottesClients from "./pages/flottes/clients-modules/Clients";
import Vehicules from "./pages/flottes/vehicules-modules/Vehicules";
//GRH
import Sessions from "./pages/ressourceshumaines/formations-modules/sessions/Sessions";
import { Session } from "inspector";
// check localstorage here
//console.log(`${process.env.REACT_APP_BASE_PUBLIC_URL}/`);

import Redirection from "./components/Redirection";
import { useDispatch } from "react-redux";
import Ticketing from "./pages/ticketing/ticketing-modules/Ticketing";
import Calendar from "./pages/calendrier/calendrier-modules/Calendar";
import InputTimesheet from "./pages/project/timesheet-modules/InputTimesheet";

export interface IApplicationProps {}

const App: React.FunctionComponent<IApplicationProps> = (props) => {
  const dispatch = useDispatch();
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
    <ConfigProvider direction="ltr" locale={enFR} >
      <IntlProvider
        messages={messages["fr"]}
        locale={"fr"}
        defaultLocale={locales.arabic}
      >
        <BrowserRouter>
          <Routes>
          <Route path={`/redirection/:token`} element={<Redirection/>} />
            <Route path={`*`} element={<Login />} />
            <Route path={`/*`} element={<Layout />}>
              {/* <Route element={<GuestPath />}> */}
              {/* </Route> */}
              <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
                {/* <Route path={`home`} element={<Home />} /> */}
              <Route path={`home/*`} element={<Index />}>
                <Route path={`*`} element={<Cautions />} />
              </Route>
              <Route path={`finance/*`} element={<Index />}>
                  <Route path={`*`} element={<Cautions />} />
              </Route>
              <Route path={`ticketing/*`} element={<Index />}>
                  <Route path={`*`} element={<Ticketing />} />
              </Route>
              <Route path={`calendrier/*`} element={<Index />}>
                  <Route path={`*`} element={<Calendar />} />
              </Route>
              <Route path={`flottes/*`} element={<Index />}>
                  <Route path={`*`} element={<FlottesContract />} />
                  <Route path={`gestion-des-contrats`} element={<FlottesContract />} />
                  <Route path={`gestion-des-clients`} element={<FlottesClients />} />
                  <Route path={`gestion-des-vehicules`} element={<Vehicules />} />
                  <Route path={`gestion-des-livraisons`} element={<Livraison />} />

              </Route>
              <Route path={`projets/*`} element={<Index />}>
                  <Route path={`*`} element={<Projects />} />
                  <Route path={`kanban`} element={<Kanban />} />
                  <Route path={`timesheet`} element={<Timesheet />} />
                  <Route path={`mes-timesheets`} element={<InputTimesheet />} />
              </Route>
              <Route path={`ressources-humaines/*`} element={<Index />}>
                  <Route path={`*`} element={<Sessions/>} />
                  <Route path={`formation/session`} element={<Sessions />} />
              </Route>
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
