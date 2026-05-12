import React from "react";
import { Grid, Typography, Card, Box, Button } from "@material-ui/core/";
import styles from "./Search.module.css";

const PurchaseCard = ({
  setSelected,
  setSellSelected,
  balance,
}) => {
  return (
    <Grid item xs={12} sm component={Card} className={styles.card}>
      <br />
      <br />

      <Typography
        color="textSecondary"
        align="center"
        className={styles.addMargin}
      >
        Your Cash Balance:
      </Typography>

      <Typography variant="h6" align="center">
        {balance
          ? balance.toLocaleString("en-IN", {
              style: "currency",
              currency: "INR",
            })
          : "Balance Unavailable"}
      </Typography>

      <br />
      <br />

      <Typography
        variant="body2"
        align="center"
        className={styles.addMargin}
      >
        You have sufficient funds to trade this stock.
      </Typography>

      <Box
        display="flex"
        justifyContent="center"
        style={{ gap: "15px" }}
      >
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={styles.submit}
          onClick={() => setSelected(true)}
        >
          Buy Stock
        </Button>

        <Button
          type="submit"
          variant="contained"
          className={styles.submit}
          style={{
            backgroundColor: "#dc2626",
            color: "white",
          }}
          onClick={() => setSellSelected(true)}
        >
          Sell Stock
        </Button>
      </Box>
    </Grid>
  );
};

export default PurchaseCard;