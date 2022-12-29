import { AppBar, Toolbar } from "@mui/material";

const Header = () => {
  return (
    <AppBar position="static" style={{ backgroundColor: "#000000" }}>
      <Toolbar>
        <a href="/">
          <img
            src="https://marsquai.com/media/original_images/iconfinder_React.js_logo_1174949_0azkeSk.png"
            width="80px"
          ></img>
        </a>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
