import { Routes, Route } from "react-router-dom";

import LocationPage from "../../pages/startPages/LocationPage";
import LoginPage from "../../pages/startPages/LoginPage";
import PreferCategoryPage from "../../pages/startPages/PreferCategoryPage";
import StartPage from "../../pages/startPages/StartPage";
import UserDataPage from "../../pages/startPages/UserDataPage";

export default function LoginMainRoutes() {
  return (
    <Routes>
      <Route path="/start" element={<StartPage />}></Route>
      <Route path="/start/login" element={<LoginPage />}></Route>
      <Route path="/start/user" element={<UserDataPage />}></Route>
      <Route path="/start/location" element={<LocationPage />}></Route>
      <Route path="/start/prefer" element={<PreferCategoryPage />}></Route>
    </Routes>
  );
}
