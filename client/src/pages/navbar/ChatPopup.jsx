import { Message } from "@mui/icons-material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Button, IconButton, Popover, Stack } from "@mui/material";
import Modal from "components/Modal";
import UserImage from "components/UserImage";
import FriendListWidget from "pages/widgets/FriendsList";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setChatOpen } from "state";

const chats = [
  {
    name: "John Doe",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyKpQUy8JP90MAZxFjU0P9bPqkUWL35fd8Ag&usqp=CAU",
  },
  {
    name: "John Moe",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyKpQUy8JP90MAZxFjU0P9bPqkUWL35fd8Ag&usqp=CAU",
  },
  {
    name: "John Soe",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyKpQUy8JP90MAZxFjU0P9bPqkUWL35fd8Ag&usqp=CAU",
  },
  {
    name: "John Hoe",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyKpQUy8JP90MAZxFjU0P9bPqkUWL35fd8Ag&usqp=CAU",
  },
];

function ChatPopup({ name, avatar }) {
  const { _id, picturePath } = useSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <IconButton
        aria-describedby={id}
        // variant="contained"
        onClick={handleClick}
      >
        <Message sx={{ fontSize: "25px" }} />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={{
          minWidth: "500px",
        }}
      >
        {/* <Modal> */}
        <FriendListWidget userId={_id} onClose={handleClose} />
        {/* {chats.map((chat, i) => (
            <>
              <Modal.Open opens={chat.name}>
                <Button
                  sx={{ display: "block" }}
                  // onClick={() => {
                  //   dispatch(setChatOpen({ open: true, receiver: chat.name }));
                  // }}
                  // onMouseUp={handleClose}
                >
                  <Stack
                    direction={"row"}
                    gap={"8px"}
                    sx={{ padding: "16px 16px" }}
                    key={i}
                  >
                    <UserImage image={chat.avatar} size="24px" />
                    <span>{chat.name}</span>
                    <ChevronRightIcon
                      sx={{ fontSize: "20px", marginLeft: "50px" }}
                    />
                  </Stack>
                </Button>
              </Modal.Open>
              <Modal.Window name={chat.name}>
                <div style={{ padding: "100px", backgroundColor: "white" }}>
                  {chat.name}
                </div>
              </Modal.Window>
            </>
          ))} */}
        {/* </Modal> */}
      </Popover>
    </div>
  );
}

export default ChatPopup;
