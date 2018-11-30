import React from 'react';

const UnderConstruction = () => {
    return (
        <div className="d-flex flex-grow-1 align-items-center justify-content-center flex-column text-white bg-dark">
            <span className="jam jam-alert-f pb-5  text-warning" style={{ fontSize: 150 }}></span>
            <h1>Ups, This Area is under construction!</h1>
        </div>
    );
}

export default UnderConstruction;