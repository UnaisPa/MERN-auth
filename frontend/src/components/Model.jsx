import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'rgb(148 163 184)',
  boxShadow: 24,
  p: 4,
};

export default function Model({handleClose,setOpen,open}) {

  return (
    
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="rounded-md" sx={style}>
          <Typography className='font-semibold text-2xl uppercase' id="modal-modal-title" variant="" component="h2">
          MERN Auth Platform
          </Typography>
          <Typography className='' id="modal-modal-description" sx={{ mt: 2 }}>
          Introducing our MERN Auth Platform: a streamlined solution for building modern web applications with MongoDB, Express.js, React.js, and Node.js. Leveraging JWT for secure authentication, it offers seamless user registration, login, and logout functionalities.
          </Typography>
        </Box>
      </Modal>
  );
} 