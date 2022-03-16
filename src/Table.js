import React from "react";
import "./table.css";
function Table({ countriess }) {
  return (
    <div className="table">
      {countriess.map((country) => (
        <tr>
          <td>{country.country}</td>
          <td>
            <strong>{country.cases}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
