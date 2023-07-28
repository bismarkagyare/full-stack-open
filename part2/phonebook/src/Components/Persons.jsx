/* eslint-disable react/prop-types */
const Persons = ({ persons, filterValue }) => {
  return (
    <div>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(filterValue.toLowerCase())
        )
        .map((person) => {
          return (
            <p key={person.id}>
              {person.name} {person.number}
            </p>
          );
        })}
    </div>
  );
};

export default Persons;
