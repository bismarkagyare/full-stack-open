/* eslint-disable react/prop-types */
const Persons = ({ persons, filterValue, handleDelete }) => {
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
              <button onClick={() => handleDelete(person.id)}>delete</button>
            </p>
          );
        })}
    </div>
  );
};

export default Persons;
