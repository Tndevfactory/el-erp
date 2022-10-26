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
import Index from "./components/Index";


// Auth
import Login from "./pages/auth/Login";

// Home
import Home from "./pages/home/Index";
import Home1 from "./pages/home/home-modules/Home1";

// Cautions
import Cautions from "./pages/cautions/caution-modules/Cautions";

// Project
import Projects from "./pages/project/project-modules/Projects";

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
              </Route>
              
              <Route path={`cautions/*`} element={<Index />}>
                  <Route path={`*`} element={<Cautions />} />
              </Route>
              <Route path={`projects/*`} element={<Index />}>
                  <Route path={`*`} element={<Projects />} />
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
