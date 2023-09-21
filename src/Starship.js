import React from 'react';

const Starship = ({ name, films, modelName, hyperdrive}) => {
    const upperName = name.split(' ').map(c => c.charAt(0).toUpperCase() + c.slice(1)).join(' ');
    const computedHyperdrive = (hyperdrive > 0 || !isNaN(hyperdrive)) ? ((hyperdrive / 6) * 100) : 0;
  
    return (
      <table className="starship">
        <tbody>
            <tr>
                <td className="heading">Name</td>
                <td>{upperName}</td>
            </tr>
            <tr>
                <td className="heading">No of Films</td>
                <td>{films}</td>
            </tr>
            <tr>
                <td className="heading">Model Name</td>
                <td>{modelName}</td>
            </tr>
            <tr>
                <td className="heading">Hyperdrive Class</td>
                <td>
                  <progress max="100" value={computedHyperdrive}></progress>
                </td>
            </tr>
        </tbody>
  </table>
    );
  }

  export default Starship;