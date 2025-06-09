import { Route } from "react-router-dom";

import LocationPage from "../../pages/startPages/LocationPage";
import LoginPage from "../../pages/startPages/LoginPage";
import PreferCategoryPage from "../../pages/startPages/PreferCategoryPage";
import StartPage from "../../pages/startPages/StartPage";
import UserDataPage from "../../pages/startPages/UserDataPage";
import LoginCallbackPage from "../../pages/startPages/LoginCallbackPage";

export default function LoginMainRoutes() {
  return (
    <>
      <Route path="/start" element={<StartPage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/signup" element={<UserDataPage />}></Route>
      <Route path="/location" element={<LocationPage />}></Route>
      <Route path="/prefer" element={<PreferCategoryPage />}></Route>
      <Route path="/oauth/callback" element={<LoginCallbackPage />}></Route>
    </>
  );
}
