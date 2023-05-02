const Form = ({
  addName,
  newName,
  onNameChange,
  newNumber,
  onNumberChange,
}) => {
  return (
    <form onSubmit={addName}>
      <div>
        <label>
          name: <input value={newName} onChange={onNameChange} required />
        </label>
        <label>
          number: <input value={newNumber} onChange={onNumberChange} required />
        </label>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
export default Form;
