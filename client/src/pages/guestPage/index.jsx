import { Box } from "@mui/system"
import { Divider } from "@mui/material";
import Navbar from "components/Navbar"
import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";

import UserWidget from "pages/widgets/UserWidget";
import PostsWidget from "pages/widgets/PostsWidget";
import IntroBanner from "components/IntroBanner";

const GuestPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  //const { _id, picturePath } = useSelector((state) => state.user);
  const admin_id = 9527;

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="middle"
        flexDirection="row"
      >
        {/* <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
              <UserWidget userId={_id} picturePath={picturePath} />
            </Box> */}
        <Box
          flexBasis={isNonMobileScreens ? "74%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <IntroBanner
            name="Winston Lin"
            title="Student at UNSW"
            description="This is my blog, i write something here from time to time"
          />
          {/* <MyPostWidget picturePath={picturePath} /> */}
          <Divider sx={{ margin: "1.25rem 0" }} />
          <PostsWidget userId={admin_id} />
        </Box>
        {/* {isNonMobileScreens && (
              <Box flexBasis="26%">
                <AdvertWidget />
                <Box m="2rem 0" />
                <FriendListWidget userId={_id} />
              </Box>
            )} */}
      </Box>
    </Box>
  );
}

export default GuestPage