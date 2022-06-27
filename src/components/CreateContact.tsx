import React, { useState, useEffect } from "react";
import "../App.css";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";

const CreateContact = (props: any) => {
  const [enteredCompanyName, setEnteredCompanyName] = useState("");
  const [enteredFirstName, setEnteredFirstName] = useState("");
  const [enteredLastName, setEnteredLastName] = useState("");
  const [enteredPhone, setEnteredPhone] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredAddress, setEnteredAddress] = useState("");
  const [enteredState, setEnteredState] = useState("");
  const [enteredCity, setEnteredCity] = useState("");
  const [enteredZip, setEnteredZip] = useState("");

  useEffect(() => {
    // Find all contacts to display a list to choose from
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        props.closeModal();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitHandler = (event: any) => {
    event.preventDefault();
    fetch(`/api/create`, {
      method: "POST",
      headers: {
        company_name: enteredCompanyName,
        first_name: enteredFirstName,
        last_name: enteredLastName,
        phone: enteredPhone,
        email: enteredEmail,
        address: enteredAddress,
        city: enteredCity,
        state: enteredState,
        zip: enteredZip,
      },
    })
      .then(() => {
        props.refresh();
        props.closeModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="modal">
      <div
        className="modalContent"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div onClick={props.closeModal} className="close">
          <CloseIcon />
        </div>
        <h2>Create a New Contact</h2>
        <div>
          <Box
            component="form"
            autoComplete="on"
            onSubmit={submitHandler}
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
            }}
          >
            <TextField
              required
              label="Enter Company Name:"
              type="text"
              id="company_name"
              value={enteredCompanyName}
              onChange={(e) => setEnteredCompanyName(e.target.value)}
              sx={{ m: 1 }}
            />

            <TextField
              required
              label="Contact's First Name:"
              type="text"
              id="first_name"
              value={enteredFirstName}
              onChange={(e) => setEnteredFirstName(e.target.value)}
              sx={{ m: 1 }}
            />
            <TextField
              required
              label="Contact's last Name:"
              type="text"
              id="last_name"
              value={enteredLastName}
              onChange={(e) => setEnteredLastName(e.target.value)}
              sx={{ m: 1 }}
            />
            <TextField
              required
              label="Phone:"
              type="text"
              id="phone"
              value={enteredPhone}
              onChange={(e) => setEnteredPhone(e.target.value)}
              sx={{ m: 1 }}
            />
            <TextField
              required
              label="Email:"
              type="email"
              id="email"
              value={enteredEmail}
              onChange={(e) => setEnteredEmail(e.target.value)}
              sx={{ m: 1 }}
            />
            <TextField
              required
              label="Address:"
              type="text"
              id="address"
              value={enteredAddress}
              onChange={(e) => setEnteredAddress(e.target.value)}
              sx={{ m: 1 }}
            />
            <TextField
              required
              label="City:"
              type="text"
              id="city"
              value={enteredCity}
              onChange={(e) => setEnteredCity(e.target.value)}
              sx={{ m: 1 }}
            />
            <TextField
              required
              label="State:"
              type="text"
              id="state"
              value={enteredState}
              onChange={(e) => setEnteredState(e.target.value)}
              sx={{ m: 1 }}
            />
            <TextField
              required
              label="Zip:"
              type="text"
              id="zip"
              value={enteredZip}
              onChange={(e) => setEnteredZip(e.target.value)}
              sx={{ m: 1 }}
            />
            <br />
            <div className="submitBtn">
              <Button type="submit" variant="contained">
                Create New Contact
              </Button>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default CreateContact;
