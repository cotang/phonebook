import React from 'react';

const PhonebookList = ({ list, onEdited }) => {
  const rows = list.map((item, i) => {
    const { id, name, phone } = item;
    return (
      <tr key={id}>
        <th scope="row">{i + 1}</th>
        <td>{name}</td>
        <td>{phone}</td>
        <td>
          <button
            className="btn btn-secondary"
            type='button'
            onClick={() => onEdited(id)}>Edit details</button>
        </td>
      </tr>
    );
  });

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Phone</th>
          <th scope="col">Handle</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
};

export default PhonebookList;