import React, { useState } from 'react';
import { Box, Button, List, ListItem, ListItemText, Typography } from '@mui/material';

const ShoppingCart = () => {
  const [items, setItems] = useState([]);

  const addToCart = (item) => {
    setItems([...items, item]);
  };

  const removeFromCart = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <Box>
      <Typography variant="h2">Shopping Cart</Typography>
      {items.length === 0 ? (
        <Typography>Your cart is empty</Typography>
      ) : (
        <List>
          {items.map((item, index) => (
            <ListItem key={index}>
              <ListItemText primary={`${item.name} - $${item.price}`} />
              <Button variant="contained" color="secondary" onClick={() => removeFromCart(index)}>Remove</Button>
            </ListItem>
          ))}
        </List>
      )}
      <Button variant="contained" color="primary" onClick={clearCart}>Clear Cart</Button>
    </Box>
  );
};

export default ShoppingCart;