const Filter = (props) => {
  return (
    <div>
      <label htmlFor="filter">Filter shown with</label>
      <input id="filter" {...props} />
    </div>
  );
};

export default Filter;
