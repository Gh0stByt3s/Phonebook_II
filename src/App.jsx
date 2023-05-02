import { useState, useEffect } from "react";
import personService from "./services/persons";
import Search from "./components/Search";
import Form from "./components/Form";
import Person from "./components/Person";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showPerson, setShowPerson] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addName = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
    };

    const personExists = persons.map((person) => person.name.toLowerCase());
    const numberExists = persons.map((person) => person.number);

    if (
      personExists.includes(nameObject.name.toLowerCase()) ||
      numberExists.includes(nameObject.number)
    ) {
      if (
        window.confirm(
          `${nameObject.name} is already added to phonebook. Replace old number with new number?`
        )
      ) {
        const contact = persons.find(
          (person) => person.name === nameObject.name
        );
        const changedContact = { ...contact, number: newNumber };

        personService
          .update(contact.id, changedContact)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== contact.id ? person : returnedPerson
              )
            );
            setNewName("");
            setNewNumber("");
          });
      }
    } else {
      personService.create(nameObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handlePersonChange = (event) => {
    setShowPerson(event.target.value);
  };

  const removePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  const personToShow = persons.filter(({ name }) =>
    name.toLowerCase().includes(showPerson)
  );

  return (
    <div>
      <h2>Phonebook</h2>

      <Search value={showPerson} onChange={handlePersonChange} />

      <h3>Add a new contact</h3>

      <Form
        addName={addName}
        newName={newName}
        onNameChange={handleNameChange}
        newNumber={newNumber}
        onNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Person filteredPerson={personToShow} removePerson={removePerson} />
    </div>
  );
};

export default App;
