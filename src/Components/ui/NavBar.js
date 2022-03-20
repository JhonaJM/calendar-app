import React from 'react';

export const NavBar = () => {
  return (
    <div className='navbar navbar-dark bg-dark mb-4'>
        <span className='navbar-brand'>
            Jhona JM
        </span>

        <button className='btn btn-outline-danger'>
            <span className='fas fa-sign-out-alt'> Salir</span>
        </button>

    </div>

  );
};
