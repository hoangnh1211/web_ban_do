import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { nav_icon, test1 } from '../../image/images';
import { Link , useLocation} from "react-router-dom";

const pages = [
  {
    to: '/',
    name: 'Trang chủ'
  },
  {
    to: '/new-map',
    name: 'Bản đồ'
  },
  {
    to: '/data',
    name: 'Dữ liệu quy hoạch'
  },
  {
    to: '/danh-gia-quy-hoach',
    name: 'Đánh giá quy hoạch'
  },
  {
    to: '/quy-hoach-khac',
    name: 'Quy hoạch khác'
  },
  {
    to: '/contract',
    name: 'Liên hệ'
  },
];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Header() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <div>
      <AppBar position={(location.pathname ==  '/quy-hoach-khac' ||location.pathname ==   '/danh-gia-quy-hoach') ? "fixed" : "static"}>
        <Container maxWidth="maxwithnav">
          <Toolbar disableGutters>
            <Avatar sx={{width:"70px", height:'66px'}} alt="Remy Sharp" src={nav_icon} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#"
              sx={{
                display: { xs: 'none', md: 'flex' },
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
                fontSize: '16px',
                lineHeight: '21.8px'
              }}
            >
              TRANG THÔNG TIN QUẢN LÝ QUY HOẠCH THỦY LỢI
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }}}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                // transformOrigin={{
                //   vertical: 'top',
                //   horizontal: 'left',
                // }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                  justifyContent : { xs: 'flex-end', md: 'none' }
                }}
              >
                {pages.map(page => (
                  <Link to={page.to} key={page.to}>
                    <MenuItem key={page.to} onClick={handleCloseNavMenu} sx={{ textTransform: 'none' }}>
                      <Typography textAlign="center" sx={{ textTransform: 'none' }}>{page.name}</Typography>
                    </MenuItem>
                  </Link>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              sx={{
                mr: 3,
                ml: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
                fontSize: '16px',
                lineHeight: '21.8px',
                textAlign: 'left'
              }}
            // sx={{
            //   mr: 2,
            //   display: { xs: 'none', md: 'flex' },
            //   fontFamily: 'Noto Serif',
            //   fontWeight: 700,
            //   color: 'inherit',
            //   textDecoration: 'none',
            //   fontSize: '16px',
            //   lineHeight: '21.8px'
            // }}
            >
              TRANG THÔNG TIN QUẢN LÝ QUY HOẠCH THỦY LỢI
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } , justifyContent:'flex-end'}}>
              {pages.map((page) => (
                <Link to={page.to}>
                <Button
                  key={page.to}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, fontWeight: 700,marginRight:'20px', display: 'block' ,textTransform: 'none',color: isActive(page.to) ? '#0B47A2' : '#FFFFFF', }}
                >
                  {page.name}
                </Button>
                </Link>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0, marginLeft: '30px' }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={test1} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                // transformOrigin={{
                //   vertical: 'top',
                //   horizontal: 'right',
                // }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default Header;
