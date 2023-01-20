import { Outlet, useLocation } from "react-router-dom";
import Aside from "./Aside";
import Header from "./Header";
import styled from "styled-components";
import { useEffect } from "react";

const Layout = ({
  open,
  setOpen,
  handleClickOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleClickOpen: () => void;
}) => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.includes("watch") && open === true) {
      setOpen(false);
    }
  }, [pathname]);

  return (
    <Container>
      <Header open={open} handleClickOpen={handleClickOpen} />
      <Aside open={open} setOpen={setOpen} />
      <main>
        <Outlet />
      </main>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;

export default Layout;
