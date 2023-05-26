import { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
  AdminPanelSettings,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout, setCurrentSearch } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const currentSearch = useSelector((state) => state.currentSearch);
  const [tempSearch, setTempSearch] = useState(''); // uncommited search
  const isLogin = user !== null;
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = isLogin ? `${user.firstName} ${user.lastName}` : `Guest`;

  useEffect(() => { // this thing eliminates the search query persistancy which bugs the app
    let ignore = false; // 'This ensures your code doesn’t suffer from “race conditions”: network responses may arrive in a different order than you sent them.'
    if (!ignore) {
      dispatch(setCurrentSearch({ currentSearch: '' }));
      console.log(`cleared: ${currentSearch}`);
    }
    // fetchBio(person).then(result => {
    //   if (!ignore) {
    //     setBio(result);
    //   }
    // });
    return () => { // cleanup function
      ignore = true;
    };
  }, []);

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/")}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          Yet another blog
        </Typography>
        {/* {isNonMobileScreens && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )} */}
      </FlexBetween>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            <InputBase
              placeholder="Search..."
              onChange={(event) => dispatch(setCurrentSearch({ currentSearch: event.target.value }))}
            // onChange={(event) => setTempSearch(event.target.value)}
            />
            <IconButton
            // onClick={() => dispatch(setCurrentSearch({ currentSearch: tempSearch }))}
            >
              <Search />
            </IconButton>
          </FlexBetween>
          <Tooltip title="Toggle darkmode">
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
          </Tooltip>
          <Message sx={{ fontSize: "25px" }} />
          <Notifications sx={{ fontSize: "25px" }} />
          <Tooltip title="Admin Panel">
            <IconButton onClick={() => navigate('/admin')}>
              <AdminPanelSettings sx={{ fontSize: "25px" }} />
            </IconButton>
          </Tooltip>
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              {isLogin ? (
                <MenuItem onClick={() => {
                  dispatch(setLogout());
                  navigate('/');
                }}>
                  <Typography>Log Out</Typography>
                  {/* <Typography>Log Out</Typography> */}
                </MenuItem>
              ) : (
                <MenuItem onClick={() => {
                  navigate('/login');
                  //navigate(0); // this refreshes the page 
                }}>
                  <Typography>Log in</Typography>
                </MenuItem>
              )}
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <>
          <Box
            position="fixed"
            right="0"
            bottom="0"
            height="100%"
            zIndex="10"
            maxWidth="500px"
            minWidth="300px"
            backgroundColor={background}
          >
            <Box display="flex" justifyContent="flex-end" p="1rem">
              <InputBase
                placeholder="Search..."
                // onChange={(event) => setTempSearch(event.target.value)}
                onClick={() => dispatch(setCurrentSearch({ currentSearch: tempSearch }))}
              />
              <IconButton
              // onClick={() => dispatch(setCurrentSearch({ currentSearch: tempSearch }))}
              >
                <Search />
              </IconButton>
              <IconButton
                onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
              >
                <Close />
              </IconButton>
            </Box>

            {/* MENU ITEMS */}
            <FlexBetween
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="3rem"
            >
              <IconButton
                onClick={() => dispatch(setMode())}
                sx={{ fontSize: "25px" }}
              >
                {theme.palette.mode === "dark" ? (
                  <DarkMode sx={{ fontSize: "25px" }} />
                ) : (
                  <LightMode sx={{ color: dark, fontSize: "25px" }} />
                )}
              </IconButton>
              <Message sx={{ fontSize: "25px" }} />
              <Notifications sx={{ fontSize: "25px" }} />
              <Tooltip title="Admin Panel">
                <IconButton onClick={() => navigate('/admin')}>
                  <AdminPanelSettings sx={{ fontSize: "25px" }} />
                </IconButton>
              </Tooltip>
              <FormControl variant="standard" value={fullName}>
                <Select
                  value={fullName}
                  sx={{
                    backgroundColor: neutralLight,
                    width: "150px",
                    borderRadius: "0.25rem",
                    p: "0.25rem 1rem",
                    "& .MuiSvgIcon-root": {
                      pr: "0.25rem",
                      width: "3rem",
                    },
                    "& .MuiSelect-select:focus": {
                      backgroundColor: neutralLight,
                    },
                  }}
                  input={<InputBase />}
                >
                  <MenuItem value={fullName}>
                    <Typography>{fullName}</Typography>
                  </MenuItem>
                  {isLogin ? (
                    <MenuItem onClick={() => dispatch(setLogout())}>
                      <Typography>Log Out</Typography>
                      {/* <Typography>Log Out</Typography> */}
                    </MenuItem>
                  ) : (
                    <MenuItem onClick={() => dispatch(setLogout())}>
                      <Typography>Log in</Typography>
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
            </FlexBetween>
          </Box>
        </>
      )}
    </FlexBetween>
  );
};

export default Navbar;
