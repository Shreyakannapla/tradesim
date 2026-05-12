import React, { useState, useContext } from "react";
import UserContext from "../../context/UserContext";
import styles from "../Template/PageTemplate.module.css";

import {
  Typography,
  IconButton,
  Box,
  Button,
  TextField,
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
} from "@material-ui/core";

import { motion } from "framer-motion";
import CloseIcon from "@material-ui/icons/Close";

import Axios from "axios";
import config from "../../config/Config";

const SaleModal = ({
  setSaleOpen,
  stock,
  purchasedStocks,
  setPurchasedStocks,
}) => {
  return (
    <motion.div
      className={styles.backdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      id="backdrop"
    >
      <Container>
        <motion.div animate={{ opacity: 1, y: -20 }}>
          <SaleModalContent
            setSaleOpen={setSaleOpen}
            stock={stock}
            purchasedStocks={purchasedStocks}
            setPurchasedStocks={setPurchasedStocks}
          />
        </motion.div>
      </Container>
    </motion.div>
  );
};

const SaleModalContent = ({
  setSaleOpen,
  stock,
  purchasedStocks,
  setPurchasedStocks,
}) => {
  const { userData, setUserData } = useContext(UserContext);

  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(
  Number(stock.currentPrice)
);
  const handleQuantityChange = (e) => {
  if (
    !isNaN(e.target.value) &&
    Number(e.target.value) <= stock.quantity
  ) {
    setQuantity(e.target.value);

    setTotal(
      Math.round(
        (
          Number(stock.currentPrice) *
            Number(e.target.value) +
          Number.EPSILON
        ) * 100
      ) / 100
    );
  }
};
  const handleClick = () => {
    setSaleOpen(false);
  };

  const sellStock = async (e) => {
    e.preventDefault();

    try {
      const headers = {
        "x-auth-token": userData.token,
      };

      const data = {
        stockId: stock.id,
        quantity: Number(quantity),
        userId: userData.user.id,
        price: Number(stock.currentPrice),
      };

      const url = config.base_url + `/api/stock`;

      const response = await Axios.patch(url, data, {
        headers,
      });

      if (response.data.status === "success") {
        // Update balance instantly
        setUserData({
          token: userData.token,
          user: response.data.user,
        });

        // Update purchased stocks instantly
        const updatedStocks = purchasedStocks
          .map((item) => {
            if (item.id === stock.id) {
              return {
  ...item,

  originalQuantity:
    item.originalQuantity || item.quantity,

  soldQuantity:
    (item.soldQuantity || 0) +
    Number(quantity),

  quantity:
    Number(item.quantity) - Number(quantity),

  status:
    Number(item.quantity) - Number(quantity) <= 0
      ? "SOLD"
      : "ACTIVE",
};
            }

            return item;
          })

        // Update dashboard
        setPurchasedStocks(updatedStocks);

        // Close modal
        setSaleOpen(false);
      } else {
        alert("Failed to sell stock");
      }
    } catch (err) {
      alert("Something went wrong while selling stock");
    }
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh" }}
    >
      <Box width="60vh" boxShadow={1}>
        <Card>
          <CardHeader
            action={
              <IconButton
                aria-label="Close"
                onClick={handleClick}
              >
                <CloseIcon />
              </IconButton>
            }
          />

          <CardContent>
            <Typography
              component="h1"
              variant="h6"
              align="center"
            >
              Sell Stock
            </Typography>

            <form
              className={styles.form}
              onSubmit={(e) => e.preventDefault()}
            >
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                disabled
                id="name"
                label="Name"
                value={stock.name}
              />

              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                disabled
                id="price"
                label="Current Price"
                value={stock.currentPrice}
              />

              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                disabled
                id="owned"
                label="Owned Quantity"
                value={stock.quantity}
              />

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="quantity"
                label="Sell Quantity"
                value={quantity}
                onChange={handleQuantityChange}
              />
            </form>

            <br />
<Typography
  variant="body2"
  align="center"
  className={styles.addMargin}
>
  Estimated Total ={" "}
  {total.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  })}
</Typography>

<br />
            <Box display="flex" justifyContent="center">
              <Button
                type="submit"
                variant="contained"
                style={{
                  backgroundColor: "#dc2626",
                  color: "white",
                }}
                className={styles.confirm}
                onClick={sellStock}
              >
                Confirm Sell
              </Button>
            </Box>

            <br />
            <br />
          </CardContent>
        </Card>
      </Box>
    </Grid>
  );
};

export default SaleModal;