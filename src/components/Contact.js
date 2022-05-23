import React, { useState } from "react";
import "../App.css";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import Typography from "@mui/material/Typography";

const Contact = (props) => {
  const [notes, setNotes] = useState(props.contactInfo.notes);
  const [showSave, setShowSave] = useState(false);
  const [value, setValue] = useState(null);

  const saveInfo = () => {
    fetch(`/api/updatenotes`, {
      method: "POST",
      headers: {
        notes: `${notes
          .replace(/\\/g, "\\\\")
          .replace(/"/g, '\\"')
          .replace(/(?:\r\n|\r|\n)/g, "\\n")}`,
        contact_id: props.contactInfo.id,
      },
    }).then(() => {
      setShowSave(false);
      props.refresh();
    });
  };

  const updateDate = (contactDate) => {
    fetch(`/api/updatedate`, {
      method: "POST",
      headers: {
        contact_id: props.contactInfo.id,
        initial_contact: contactDate,
      },
    }).then(() => {
      props.refresh();
    });
  };

  // const formatDate = (date) => {
  //   if (date !== null) {
  //     const t = date.slice(0, 19).replace("T", " ").split(/[- :]/);
  //     const jsDate = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]));
  //     return `${jsDate.toLocaleDateString()}`;
  //   } else {
  //     return "Not Yet Contacted";
  //   }
  // };

  return (
    <div
      className="modal"
      // onClick={props.closeModal}
    >
      <div
        className="modalContent"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div onClick={props.closeModal} className="close">
          <CloseIcon />
        </div>
        <h2>Contact</h2>
        <Box sx={{ width: "95%" }}>
          <List>
            <ListItem>
              <ListItemIcon>
                <BusinessRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={props.contactInfo.company} />
            </ListItem>

            <ListItem sx={{ mt: -2 }}>
              <ListItemIcon>
                <PersonOutlineOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                primary={`${props.contactInfo.first_name} ${props.contactInfo.last_name}`}
              />
            </ListItem>

            <ListItem sx={{ mt: -2 }}>
              <ListItemIcon>
                <LocalPhoneOutlinedIcon />
              </ListItemIcon>
              <a href={`tel:${props.contactInfo.phone}`}>
                {props.contactInfo.phone}
              </a>
            </ListItem>

            <ListItem sx={{ mt: -2 }}>
              <ListItemIcon>
                <EmailOutlinedIcon />
              </ListItemIcon>
              <a
                href={`mailto:${
                  props.contactInfo.email
                }?subject=eConsult&body=Hi ${
                  props.contactInfo.first_name
                } ${props.contactInfo.last_name},%0A%0A`}
              >
                {props.contactInfo.email}
              </a>
            </ListItem>

            <ListItem sx={{ mt: -2 }}>
              <ListItemIcon>
                <LocationOnOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={props.contactInfo.address} />
            </ListItem>
            <ListItem>
              <ListItemIcon></ListItemIcon>
              <ListItemText
                primary={`${props.contactInfo.city}, ${props.contactInfo.state} ${props.contactInfo.zip}`}
                sx={{ mt: -2 }}
              />
            </ListItem>
          </List>
        </Box>

        <div
          style={{
            width: "95%",
            textAlign: "left",
            marginBottom: 30,
          }}
        >
          <Typography variant="body1" component="span" gutterBottom>
            Contacted:{" "}
            {props.contactInfo.initial_contact === "Not Yet Contacted" ? (
              <div style={{ marginTop: 10 }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Date"
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);
                      updateDate(
                        newValue.getFullYear() +
                          "-" +
                          (newValue.getMonth() + 1) +
                          "-" +
                          newValue.getDate()
                      );
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </div>
            ) : (
              props.contactInfo.initial_contact
            )}
          </Typography>
        </div>

        <TextField
          id="notes"
          label="Notes"
          multiline
          rows={10}
          fullWidth
          value={notes}
          onChange={(e) => {
            setShowSave(true);
            setNotes(e.target.value);
          }}
          sx={{ width: "95%", mb: 2 }}
        />
        {showSave ? (
          <div
          //   className={classes.btn}
          >
            <Button
              onClick={saveInfo}
              variant="contained"
              size="small"
              endIcon={<SaveOutlinedIcon />}
              sx={{ mb: 2 }}
            >
              Save
            </Button>
          </div>
        ) : (
          <div
          //   className={classes.btn}
          >
            <Button
              onClick={saveInfo}
              variant="disabled"
              size="small"
              endIcon={<SaveOutlinedIcon />}
              sx={{ mb: 2 }}
            >
              Save
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;
