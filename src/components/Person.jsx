const Person = ({ filteredPerson, removePerson }) => {
  return (
    <div>
      {filteredPerson.map((person) => (
        <div key={person.name}>
          <p key={person.name}>
            {person.name}: {person.number}
          </p>
          <button onClick={() => removePerson(person.id, person.name)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};
export default Person;
