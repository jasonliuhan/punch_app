import { HomeView } from "./views/home/home";
import { OpenView } from "./views/open/open";
import { InvitationView } from "./views/invitation/invitation";
import { UndertakeView } from "./views/undertake/undertake";
import React, { Component } from "react";
import { Routes, Route, BrowserRouter,HashRouter } from "react-router-dom";
class Router extends Component {
  render() {
    return (
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/gogame" element={<OpenView />} />
          <Route path="/invitation" element={<InvitationView />} />
          <Route path="/undertake" element={<UndertakeView />} />
        </Routes>
      </HashRouter>
    );
  }
}
export default Router;
