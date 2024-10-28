import { useState, useEffect } from "react";
import ContactForm from "./components/ContactForm/ContactForm";
import SearchBox from "./components/SearchBox/SearchBox";
import ContactList from "./components/ContactList/ContactList";
import styles from "./App.module.css";

const initialContacts = [
  { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
  { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
  { id: "id-3", name: "Eden Clements", number: "645-17-79" },
  { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
];

function App() {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem("contacts");
    return savedContacts ? JSON.parse(savedContacts) : initialContacts;
  });

  const [filter, setFilter] = useState("");

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (newContact) => {
    setContacts([...contacts, newContact]);
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const getFilteredContacts = () => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  console.log(contacts);
  return (
    <div className={styles.appContainer}>
      <h1 className={styles.title}>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <SearchBox value={filter} onChange={handleFilterChange} />
      <ContactList
        contacts={getFilteredContacts()}
        onDeleteContact={deleteContact}
      />
    </div>
  );
}

export default App;
