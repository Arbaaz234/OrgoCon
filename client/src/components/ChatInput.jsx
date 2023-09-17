import { Grid, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };
  return (
    <Grid
      container
      direction="row"
      // justifyContent="end"
      alignItems="center"
      sx={{ p: "16px", backgroundColor: "#eee" }}
    >
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <Grid item xs={11}>
          <TextField
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            style={{ background: "white", width: "100%" }}
            onChange={(e) => setMsg(e.target.value)}
            value={msg}
          />
        </Grid>
        <Grid item xs={1}>
          <button
            style={{
              border: "none",
              background: "none",
              cursor: "pointer",
            }}
            type="submit"
          >
            <SendIcon sx={{ fontSize: "25px" }} />
          </button>
        </Grid>
      </form>
    </Grid >
  );
}

export default ChatInput;
