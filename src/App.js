import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';
import Footer from './components/Footer';

function App() {
//citas en local Storage

let citasIniciales = JSON.parse(localStorage.getItem('citas'));
if(!citasIniciales){
  citasIniciales = [];
}

  //arreglo de citas
const [citas, guardarCitas]= useState(citasIniciales);

// useEffect para realiar ciertas operaciones cuando el state cambia
useEffect( () => {
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  
 if(citasIniciales){
   localStorage.setItem('citas', JSON.stringify(citas));
 }else{
   localStorage.setItem('citas', JSON.stringify([]))
 }
}, [citas] );

//funcion ue tome las citas actuaales y agregue la nueva
// const [error, actualizarError] = useState(false);
const crearCita = cita => {
  guardarCitas([
    ...citas,
    cita
  ]);
}

//funcion que elimina una cita por su id
const eliminarCita = id => {
  const nuevasCitas = citas.filter(cita => cita.id !== id);
  guardarCitas(nuevasCitas);
}

//mensaje condicional
const titulo = citas.length === 0 ?  'No hay citas' : 'Administra tus citas';




  return (
<Fragment>
<div className="background-overlay">

    <h1>Administrador de Pacientes</h1>

    <div className="container">
      <div className="row">
         <div className="one-half column">
           <Formulario 
           crearCita={crearCita}
           />      
         </div>
         <div className="one-half column">
           <h2>{titulo}</h2>
          {citas.map(cita => (
             <Cita
             key={cita.id}
              cita={cita}
              eliminarCita={eliminarCita}
              
             />

          ))}

          </div>
      </div>
    </div>
    <Footer/>
    </div>
</Fragment>

  );
}

export default App;
