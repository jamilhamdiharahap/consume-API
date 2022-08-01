const Search = (props) => {
  return (
    <input
      type="text"
      onKeyUp={props.KeyUp}
      placeholder="Type any country name"
      className="w-10/12 text-lg h-20 rounded-md border-none bg-transparent  outline-none"
      onFocus={props.Focus}
      onBlur={props.Focus}
    />
  );
};

export default Search;
