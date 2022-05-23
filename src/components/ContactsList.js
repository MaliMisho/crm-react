import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

const ContactsList = (props) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContactsHandler();
  }, []);

  const fetchContactsHandler = async () => {
    const response = await fetch(`/api/findall`);
    const data = await response.json();
    const rows = [];

    Object.keys(data).forEach((contact) => {
      const {
        contact_id,
        company,
        first_name,
        last_name,
        phone,
        email,
        address,
        city,
        state,
        zip,
        initial_contact,
        notes,
      } = data[contact];

      rows.push({
        id: contact_id,
        company: company,
        first_name: first_name,
        last_name: last_name,
        phone: phone,
        email: email,
        address: address,
        city: city,
        state: state,
        zip: zip,
        initial_contact:
          initial_contact !== null
            ? formatDate(initial_contact)
            : "Not Yet Contacted",
        notes: notes,
      });
    });

    setContacts(rows);
  };

  const columns = [
    { field: "company", headerName: "Company", width: 200 },
    { field: "first_name", headerName: "First Name", width: 200 },
    { field: "last_name", headerName: "Last Name", width: 200 },
    { field: "phone", headerName: "Phone", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "initial_contact", headerName: "Initial Contact", width: 200 },
  ];

  const formatDate = (date) => {
    if (date !== null) {
      const t = date.slice(0, 19).replace("T", " ").split(/[- :]/);
      const jsDate = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]));
      return `${jsDate.toLocaleDateString()}`;
    } else {
      return "Not Yet Contacted";
    }
  };

  return (
    <div className="App">
      <DataGrid
        rows={contacts}
        columns={columns}
        rowHeight={30}
        pageSize={10}
        rowsPerPageOptions={[10]}
        autoHeight
        onRowDoubleClick={(param, event) => {
          props.openContact(param.row);
        }}
        sx={{ width: "90%", m: "auto" }}
      />
    </div>
  );
};

export default ContactsList;
