const Search = ({ value, onChange }) => {
  return (
    <label>
      <p>
        filter shown with:
        <input value={value} onChange={onChange} />
      </p>
    </label>
  );
};
export default Search;
