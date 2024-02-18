import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const HomeComp = () => {
  const events = [
    { id: 1, title: 'Event 1', date: '2022-01-01' },
    { id: 2, title: 'Event 2', date: '2022-02-01' },
    { id: 3, title: 'Event 3', date: '2022-03-01' },
  ];

  const recommendedProducts = [
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
    { id: 3, name: 'Product 3', price: 30 },
  ];

  return (
    <Box>
      <Typography variant="h2">Events</Typography>
      <List>
        {events.map((event) => (
          <ListItem key={event.id}>
            <ListItemText primary={event.title} secondary={`Date: ${event.date}`} />
          </ListItem>
        ))}
      </List>

      <Typography variant="h2">Recommended Products</Typography>
      <List>
        {recommendedProducts.map((product) => (
          <ListItem key={product.id}>
            <ListItemText primary={product.name} secondary={`Price: $${product.price}`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default HomeComp;