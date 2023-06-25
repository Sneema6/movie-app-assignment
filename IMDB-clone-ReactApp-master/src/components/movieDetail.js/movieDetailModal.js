// import React from 'react';
// import {Modal, Box} from '@mui/material'

// function movieDetailModal() {
//   return (
//     <Modal
//   open={open}
//   onClose={handleClose}
//   aria-labelledby="modal-modal-title"
//   aria-describedby="modal-modal-description"
// >
//   <Box sx={style}>
//     <Typography id="modal-modal-title" variant="h6" component="h2">
//       Text in a modal
//     </Typography>
//     <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//       Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
//     </Typography>
//   </Box>
// </Modal>
//   )
// }

// export default movieDetailModal

import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function movieDetailModal() {
  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default movieDetailModal;
