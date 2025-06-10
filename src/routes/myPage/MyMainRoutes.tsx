import { Route } from "react-router-dom";

import MyMainPage from "../../pages/myPages/MyMainPage";
import ProfileEditPage from "../../pages/myPages/ProfileEditPage";
import LocationPage from "../../pages/myPages/LocationPage";
import MyGongguPage from "../../pages/myPages/MyGongguPage";
import InterestPage from "../../pages/myPages/InterestPage";

export default function MyMainRoutes() {
  return (
    <>
      <Route path="/mypage" element={<MyMainPage />}></Route>
      <Route path="/mypage/edit" element={<ProfileEditPage />}></Route>
      <Route path="/mypage/location" element={<LocationPage />}></Route>
      <Route path="/mypage/myGonggu" element={<MyGongguPage />}></Route>
      <Route path="/mypage/interest" element={<InterestPage />}></Route>
    </>
  );
}
