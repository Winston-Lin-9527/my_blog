import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined
} from "@mui/icons-material";
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Button, Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost, delPost } from "state";
import ReactMarkdown from 'react-markdown';
import { Editor, EditorState, convertToRaw, ContentState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import React from 'react';
import remarkGfm from 'remark-gfm'

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  postDate, // todo
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user ? state.user._id : null);   // if user isn't logged in, don't extract id
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const [editorState, setEditorState] = React.useState(
    () => EditorState.createEmpty(),
  );

  function MyEditor() {
    return <Editor editorState={editorState} onChange={setEditorState} />;
  }

  const patchLike = async () => {
    const response = await fetch(process.env.REACT_APP_SERVER_URL + `/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    // console.log(updatedPost)
    dispatch(setPost({ post: updatedPost }));
  };

  const patchContent = async () => {
    const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
    const updatedContent = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
    console.log(process.env.REACT_APP_SERVER_URL)
    const response = await fetch(process.env.REACT_APP_SERVER_URL + `/posts/${postId}/edit`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newContent: updatedContent }),
    });
    // console.log(updatedContent);
    // console.log(convertToRaw(editorState.getCurrentContent()).blocks);
    if (response.ok) {
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
    }
  };

  const deletePost = async () => {
    const response = await fetch(process.env.REACT_APP_SERVER_URL + `/posts/${postId}/delete`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    // console.log(updatedPost)
    dispatch(delPost({ post: updatedPost }));
  }

  return (
    <WidgetWrapper m="1rem 0">
      <Typography color={main}
        variant="h2"
        fontWeight="500"
        sx={{
          "&:hover": {
            color: palette.primary.light,
            cursor: "pointer",
          },
        }}>
        This is a example title
      </Typography>
      <Typography color={main} sx={{ mb: "1rem" }}>
        {new Date(parseInt(postDate)).toDateString()}
      </Typography>
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <ReactMarkdown
        children={description}
        remarkPlugins={[remarkGfm]}
      />
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={process.env.REACT_APP_SERVER_URL + `/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>
        {token && (
          <FlexBetween gap="1rem">
            <IconButton onClick={() => {
              deletePost()
            }}>
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={() => {
              setIsEdit(!isEdit);
              setEditorState(EditorState.createWithContent(
                ContentState.createFromText(description)));
            }}>
              <EditIcon />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>
      {token && isEdit && (
        <div>
          <Box
            width="100%"
            height="auto"
            sx={{
              borderRadius: "0.25rem",
              padding: '0.5rem',
              border: '0.1rem solid',
              borderColor: palette.primary.main
            }}>
            <MyEditor />
          </Box>
          <Box marginTop={'0.5rem'} display="flex" justifyContent="flex-end">
            <Button variant="contained" color="primary" onClick={() => patchContent()}>
              Save
            </Button>
          </Box>
        </div>
      )}
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
