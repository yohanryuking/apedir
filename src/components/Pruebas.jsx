import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';

export default function Pruebas() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClick}>Open Snackbar</Button>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Note archived"
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
              X
            </Button>
          </React.Fragment>
        }
      />
    </div>
  );
}