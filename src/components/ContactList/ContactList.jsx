import { useDispatch, useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import styles from "./ContactList.module.css";
import { deleteContact, selectContacts } from "../../redux/contactsSlice";
import { selectNameFilter } from "../../redux/filtersSlice";

const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectNameFilter);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteContact(id));
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <ul className={styles.list}>
      {filteredContacts.map(({ id, name, number }) => (
        <Contact
          key={id}
          name={name}
          number={number}
          onDelete={() => handleDelete(id)}
        />
      ))}
    </ul>
  );
};

export default ContactList;
