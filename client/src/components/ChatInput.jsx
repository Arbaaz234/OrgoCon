import { Grid, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

function ChatInput() {
  return (
    <Grid
      container
      direction="row"
      // justifyContent="end"
      alignItems="center"
      sx={{ p: "16px", backgroundColor: "#eee" }}
    >
      <Grid item xs={11}>
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          style={{ background: "white", width: "100%" }}
        />
      </Grid>
      <Grid item xs={1}>
        <button
          style={{
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
        >
          <SendIcon sx={{ fontSize: "25px" }} />
        </button>
      </Grid>
    </Grid>
  );
}

export default ChatInput;
