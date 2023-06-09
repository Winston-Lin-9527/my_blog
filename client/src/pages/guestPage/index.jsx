import { Box } from "@mui/system"
import { Divider } from "@mui/material";
import Navbar from "components/Navbar"
import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";

import UserWidget from "pages/widgets/UserWidget";
import PostsWidget from "pages/widgets/PostsWidget";
import IntroBanner from "components/IntroBanner";
import ChatWidget from "pages/widgets/ChatWidget";

const GuestPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  //const { _id, picturePath } = useSelector((state) => state.user);
  const admin_id = 9527;

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="1rem 3%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="1rem"
        justifyContent="middle"
        flexDirection="row"
      >
        {/* <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
              <UserWidget userId={_id} picturePath={picturePath} />
            </Box> */}
        <Box
          flexBasis={isNonMobileScreens ? "80%" : '60%'}
          mt={isNonMobileScreens ? undefined : "2rem"}
          // margin={}
        >
          <IntroBanner
            name="Winston Lin"
            title="Student at UNSW"
            description="Welcome to my blog, I write things on here from time to time. This is written in ReactJS and uses MERN."
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
          <ChatWidget flexBasis={isNonMobileScreens ? "80%" : '60%'}/>
      </Box> 
    </Box>
  );
}

export default GuestPage