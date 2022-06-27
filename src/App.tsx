import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Contact from "./components/Contact";
import ContactsList from "./components/ContactsList";
import CreateContact from "./components/CreateContact";
import "./App.css";

const App = () => {
  const [showContact, setShowContact] = useState(false);
  const [showAddContact, setShowAddContact] = useState(false);
  const [contact, setContact] = useState({});
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setShowContact(false);
      }
    });
  }, []);

  const closeModal = () => {
    setShowContact(false);
    setShowAddContact(false);
  };

  const openContact = (contactToOpen: any, event: any) => {
    setContact(contactToOpen);
    setShowContact(true);
  };

  const createContact = () => {
    setShowAddContact(true);
  };

  return (
    <div className="App">
      Welcome to Veliki CRM
      {showContact && (
        <Contact
          closeModal={closeModal}
          contactInfo={contact}
          refresh={() => {
            setRefresh(false);
            setRefresh(true);
          }}
        />
      )}
      {showAddContact && (
        <CreateContact
          closeModal={closeModal}
          refresh={() => {
            setRefresh(false);
            setRefresh(true);
          }}
        />
      )}
      <div
      //   className={classes.btn}
      >
        <Button onClick={createContact} variant="contained" sx={{ m: 2 }}>
          Add Contact
        </Button>
      </div>
      {refresh && <ContactsList openContact={openContact} />}
    </div>
  );
};

export default App;
