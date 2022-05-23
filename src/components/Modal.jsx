import React from 'react';

export default function ({open, releases, onClose, name}) {
    if(!open){
          return null;
    }

  return (
      <div className=''>
            <div className='modal'>
                <div className="overlay"></div>
                    <div className="modal-content">
                        <button className='close-modal'  onClick={onClose}>x</button>
                        <h1>Releases of {name}</h1>

                        { releases.length ? (
                            releases.map((el) =>(
                                <p className='info' key={el.id}>{el.name !== '' ? el.name : 'NO ENTRY' }</p>
                            ))
                        ) : (
                            <p>There is no information about releases</p>
                        )}

            </div>
        </div>
    </div>
  )
}
