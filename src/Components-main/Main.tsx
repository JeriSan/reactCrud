import React, { useState } from 'react';
import './Main.css'

const MainComponent = () => {
  const [data, setData] = useState([
    { id: 1, nombre: 'Juan', apellido: 'Perez', tipoDocumento: 'DNI', nroDocumento: '73775706', genero: 'MASCULINO', areaAsignada: 'CONTABILIDAD'},
    { id: 2, nombre: 'María', apellido: 'Gomez', tipoDocumento: 'CCE', nroDocumento: '20345405', genero: 'FEMENINO', areaAsignada: 'SISTEMAS'},
    { id: 3, nombre: 'Carlos', apellido: 'Lopez', tipoDocumento: 'DNI', nroDocumento: '34673567', genero: 'MASCULINO', areaAsignada: 'CONTABILIDAD'},
  ]);

  const [modalData, setModalData] = useState({id:0, nombre: '', apellido: '', tipoDocumento: '', nroDocumento: '', genero: '', areaAsignada: '' });
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState('');
  const [buscar, setBuscar] = useState('');

  const codVer = 'Visualizar';
  const openModal = (action, item) => {
    setActionType(action);
    const newItem = { ...item, id: parseInt(item.id) };
    setModalData(newItem);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalData({id:0, nombre: '', apellido: '', tipoDocumento: '', nroDocumento: '', genero: '', areaAsignada: '' });
  };

  const handleSubmit = () => {
    let esValido = true;
    if(!modalData.nombre || modalData.nombre.trim() === ''){
      esValido = false;
    }
    if(!modalData.apellido ||modalData.apellido.trim() === ''){
      esValido = false;
    }
    if(!modalData.tipoDocumento ||modalData.tipoDocumento.trim() === ''){
      esValido = false;
    }
    if(!modalData.nroDocumento ||modalData.nroDocumento.trim() === ''){
      esValido = false;
    }
    if(!modalData.genero ||modalData.genero.trim() === ''){
      esValido = false;
    }
    if(!modalData.areaAsignada ||modalData.areaAsignada.trim() === ''){
      esValido = false;
    }

    if(!esValido){
      alert("Debe ingresar todos los campos");
      return;
    }

    let dataEncontrada = data.filter((item, index) => item.nroDocumento === modalData.nroDocumento);
    if(dataEncontrada.length > 0){
      alert("El numero de documento ya se encuentra en uso");
      return;
    }

    

    if (actionType === 'Agregar') {
        modalData.id =data.length + 1;
      setData([...data, modalData]);
      alert("Se registro correctamente");
    } else if (actionType === 'Editar') {
      const updatedData = data.map(item => (item.id === modalData.id ? modalData : item));
      setData(updatedData);
    }
    console.log(data);
    closeModal();
  };


  const handleDelete = (id) => {
    if (confirm("Desea eliminar este usuario?")) {
      const newData = data.filter(item => item.id !== id);
      setData(newData);
    }
  };



  return (
    <div className="container">
      <p className='h1 font-weight-bold'>Mantenimiento de Registros</p>
      <div className="table-responsive">
      <div>
        <label htmlFor="buscar">Buscar:</label>
        <input type="text" className="form-control" id="buscar" value={buscar} onChange={(e) => setBuscar(e.target.value)} />
      </div>
      <div className="text-end mb-3">
        <button className="btn btn-primary mr-2" onClick={() => openModal('Agregar',{})}>Agregar Registro</button>
      </div>
        <table className="table table-striped">
          <thead className="table-primary">
            <tr>
              <th>Nro.</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Tipo Documento</th>
              <th>Nro Documento</th>
              <th>Genero</th>
              <th>Area asignada</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data
              .filter(item => {
                if(buscar.trim() === ''){
                  return true;
                }else{
                  if(
                    item.nombre.toLowerCase().includes(buscar.toLowerCase())
                    || item.nroDocumento.toLowerCase().includes(buscar.toLowerCase())
                    || item.areaAsignada.toLowerCase().includes(buscar.toLowerCase())
                  ){
                    return true;
                  }else{
                    return false;
                  }
                }
              })
              .map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.nombre}</td>
                <td>{item.apellido}</td>
                <td>{item.tipoDocumento}</td>
                <td>{item.nroDocumento}</td>
                <td>{item.genero}</td>
                <td>{item.areaAsignada}</td>
                <td>
                  <button className="btn btn-primary mx-2" onClick={() => openModal('Editar', item)}>Editar</button>
                  <button className="btn btn-danger mx-2" onClick={() => handleDelete(item.id)}>Eliminar</button>
                  {/*<button className="btn btn-success mx-2" onClick={() => openModal('Visualizar', item)}>Visualizar</button>*/}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {/* Modal */}
      {showModal && (
        <div className={`modal fade modal-bg-light ${showModal ? 'show' : ''}`} tabIndex={-1} role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content ">
              <div className="modal-header">
                <h5 className="modal-title">{actionType} Registro</h5>
                <button type="button" className="close" onClick={closeModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" className="form-control" id="nombre" disabled={actionType == codVer} value={modalData.nombre} onChange={(e) => setModalData({ ...modalData, nombre: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="apellido">Apellido</label>
                    <input type="text" className="form-control" id="apellido" disabled={actionType == codVer} value={modalData.apellido} onChange={(e) => setModalData({ ...modalData, apellido: e.target.value })} />
                  </div>
                  {/*}
                  <div className="form-group">
                    <label htmlFor="apellido">Tipo de Documento</label>
                    <input type="text" className="form-control" id="tipoDoc" disabled={actionType == codVer} value={modalData.tipoDocumento} onChange={(e) => setModalData({ ...modalData, tipoDocumento: e.target.value })} />
                  </div>
                  {*/}
                  <div>
                  <label htmlFor="apellido">Tipo de Documento</label>
                    <div>
                    <select value={modalData.tipoDocumento} onChange={(e) => setModalData({ ...modalData, tipoDocumento: e.target.value })}>
                    <option key={""} value={""}>SELECCIONE</option>
                    <option key={"DNI"} value={"DNI"}>DNI</option>
                    <option key={"CCE"} value={"CCE"}>CCE</option>
                    </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="apellido">Nro de Documento</label>
                    <input type="text" className="form-control" id="nroDoc" disabled={actionType == codVer} value={modalData.nroDocumento} onChange={(e) => setModalData({ ...modalData, nroDocumento: e.target.value })} />
                  </div>
                  {/*}
                  <div className="form-group">
                    <label htmlFor="apellido">Genero</label>
                    <input type="text" className="form-control" id="genero" disabled={actionType == codVer} value={modalData.genero} onChange={(e) => setModalData({ ...modalData, genero: e.target.value })} />
                  </div>
                  {*/}
                  <div>
                  <label htmlFor="apellido">Genero</label>
                    <div>
                    <input type="radio" id="genero-masculino" value="MASCULINO" name="genero" checked={modalData.genero === "MASCULINO"} onChange={(e) => setModalData({ ...modalData, genero: e.target.value })}/>
                    <label htmlFor="genero-masculino">MASCULINO</label>
                    &nbsp;
                    <input type="radio" id="genero-femenino" value="FEMENINO" name="genero" checked={modalData.genero === "FEMENINO"} onChange={(e) => setModalData({ ...modalData, genero: e.target.value })}/>
                    <label htmlFor="genero-femenino">FEMENINO</label>
                    </div>
                  </div>
                  <div>
                  <label htmlFor="apellido">Area asignada</label>
                    <div>
                    <select value={modalData.areaAsignada} onChange={(e) => setModalData({ ...modalData, areaAsignada: e.target.value })}>
                    <option key={""} value={""}>SELECCIONE</option>
                    <option key={"CONTABILIDAD"} value={"CONTABILIDAD"}>CONTABILIDAD</option>
                    <option key={"TESORERIA"} value={"TESORERIA"}>TESORERIA</option>
                    <option key={"SISTEMAS"} value={"SISTEMAS"}>SISTEMAS</option>
                    <option key={"PROYECTOS"} value={"PROYECTOS"}>PROYECTOS</option>
                    </select>
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Cerrar</button>
                <button type="button" className="btn btn-primary" hidden={actionType == codVer} onClick={handleSubmit}>Guardar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainComponent;
