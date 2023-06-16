import MenuBar from "../shared/MenuBar";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <>
      <MenuBar />
      <Outlet />
    </>
  );
}

export default RootLayout;
