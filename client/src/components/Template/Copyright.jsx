import React from "react";
import { Typography, Link } from "@material-ui/core/";

const Copyright = () => {
  return (
    <div>
      <Typography
  variant="body2"
  align="center"
  style={{ color: "white" }}
>
  The simulator is not representative of real-world trading conditions and
  the data is not guaranteed to be accurate.
</Typography>
    </div>
  );
};

export default Copyright;
