import { useState, useEffect } from 'react';
import { ContactForm } from './Form/Form';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import Container from './Container/Container';

export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmitForm = contact => {
    contacts.find(
      item => item.name.toLowerCase() === contact.name.toLowerCase()
    )
      ? alert(` ${contact.name} is already in contacts`)
      : setContacts(prevContacts => [contact, ...prevContacts]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const onDeleteContact = contactID => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactID)
    );
  };

  const normalFilter = filter.toLowerCase();
  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalFilter)
  );

  return (
    <Container>
      <h2>Phonebook</h2>

      <ContactForm onSubmit={handleSubmitForm} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />

      {contacts.length === 0 ? (
        <h3>Please, add new contact</h3>
      ) : (
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={onDeleteContact}
        />
      )}
    </Container>
  );
};
