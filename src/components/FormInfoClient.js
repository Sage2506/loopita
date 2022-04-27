import React from 'react';

export const FormInfoClient = (
  {
    handleSubmit,
    handleChangeInput,
    nameClient,
    email,
    tel,
    camp
  }
) => {

  return (
    <div>
      <p className="title__form"> Vas en grande con Loopita </p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre completo</label>
          <input
            type="text"
            className={`form-control form-control-sm`}
            name="nameClient"
            value={nameClient}
            onChange={handleChangeInput}
          />
        </div>

        <div className="form-group">
          <label>Correo electrónico</label>
          <input
            type="email"
            className={`form-control form-control-sm `}
            name="email"
            value={email}
            onChange={handleChangeInput}
          />
        </div>

        <div className="form-group">
          <label>Teléfono</label>
          <input
            type="text"
            className={`form-control form-control-sm`}
            name="tel"
            value={tel}
            onChange={handleChangeInput}
          />
        </div>
        <hr />
        <div className="form-group ">
          <label>Nombre de campaña</label>
          <input
            type="text"
            className={`form-control form-control-sm `}
            name="camp"
            value={camp}
            onChange={handleChangeInput}
          />
        </div>
      </form>
    </div>
  )
}