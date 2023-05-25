import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";
import { Grid, Pagination, Typography } from "@mui/material";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const currentSearch = useSelector((state) => state.currentSearch);

  const [pageNumber, setPageNumber] = useState(0); // current page index 

  const postsPerPage = 5;
  const postsVisited = pageNumber * postsPerPage;

  const getPosts = useCallback(async () => {
    const response = await fetch(process.env.REACT_APP_SERVER_URL + "/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data.reverse() }));
  }, []);

  const getUserPosts = async () => {
    const response = await fetch(
      process.env.REACT_APP_SERVER_URL + `/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data.reverse() }));
  };

  const getPostsWithSearch = useCallback(async (substr) => { // conditional query
    // const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/posts/search?query=${encodeURIComponent(substr)}`, {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/posts/search?` + new URLSearchParams(
      {
        query: substr
      }), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        // "Content-Type": "application/json" 
      },
      // body: JSON.stringify({search: search})
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data.reverse() }));
  }, []);

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
      // getPostsWithSearch('relu');
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (currentSearch !== '') {
      getPostsWithSearch(currentSearch);
      // setPageNumber(Math.floor(posts.length / postsPerPage));
      // console.log(Math.floor(posts.length / postsPerPage));
    }
    else {
      getPosts();
    }
    setPageNumber(0); // set to page 0 no matter what
  }, [currentSearch])

  return (
    <>
      {posts.slice(postsVisited, postsVisited + postsPerPage).map(
        ({ // de-structure each post 
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          createdAt,
          updatedAt,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            createdAt={createdAt}
            updatedAt={updatedAt}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
      <Grid
        container
        justifyContent='center'
        alignItems="center"
        flexDirection='column'
        spacing='1rem'
      // sx={{direction: 'row', justifyContent: 'center'}}
      >
        <Grid item>
          <Pagination
            count={Math.ceil(posts.length / postsPerPage)}
            variant="outlined"
            color="primary"
            shape="rounded"
            page={pageNumber + 1}
            onChange={(event, value) => setPageNumber(value - 1)} // our actual page index starts at 0, but Pagination number starts at 1
          />
        </Grid>
        <Grid item>
          <Typography variant="subtitle1">
            Winston Lin 2023
          </Typography>
        </Grid>
      </Grid>
    </> // latest to earliest
  );
};

export default PostsWidget;
