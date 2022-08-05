let turno= Math.floor(Math.random() + 1);
let Miturno=[];

class Turno {
    constructor(especialidad, doctores){
        this.especialidad = especialidad;
        this.doctores = doctores;
        this.turnoSacado = false;
        this.turno = -1;
    }
    SetTurno(nuevoTurno) {
        this.turno = nuevoTurno;
    }
    descricionTurno() {
        return (`${this.turno} - ${this.especialidad} - ${this.doctores}`)
    }
    TengoTurno(){
        this.turnoSacado = true;
    }
}




//toma los datos ingresados en el html

let formulario = document.getElementById("form");

formulario.addEventListener('submit', (event) => {
    event.preventDefault();
    console.dir(event.target.children);
    let valor = event.target.children;

    let Turnos = new Turno(valor[0].value, valor[1].value);

    formulario.reset()
    

    
    if (Turnos) {

        Turnos.SetTurno(turno);
        turno = turno + Math.floor(Math.random() + 1);
        Miturno.push(Turnos);
        localStorage.setItem("Misturno", JSON.stringify(Miturno));

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Su turno a sido guardado.',
            showConfirmButton: false,
            timer: 1200
          })
    }else {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Su turno no se a podido guardar, intentelo nuevamente.',
            showConfirmButton: false,
            timer: 1200
          })
    }
})






const Medicos = [{Especialidad: "clinica medica", Doctor: "oscar, rodriguez"},
    {Especialidad: "anestesiologia", Doctor: "rosa, marcello"},
    {Especialidad: "quimioterapia", Doctor: "ana, marquez"},
    {Especialidad: "clinica medica", Doctor: "marcelo, sanchez"},
    {Especialidad: "pediatria", Doctor: "antonio, muñoz"},
    {Especialidad: "anestesiologia", Doctor: "panda, martinez"},
    {Especialidad: "pediatria", Doctor: "hercules, martinez"},
    {Especialidad: "pediatria", Doctor: "jose, muller"}];

const ObraSocial= ["osam", "osde", "sancor", "sadop"];



//Funcion que elimina el turno

function eliminarTurno(){

    if(TendreMiTurno()){
        verTurno();
        let TurnoId = parseInt(prompt("Ingrese el numero del turno que desea cancelar:"));

        if (TurnoId) {
            let TurnoEncontrado = Miturno.find((turno)=> turno.turno == TurnoId);
            Swal.fire({
                title: 'seguro que quieres eliminar?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Borrar',
                denyButtonText: `Conservar`,
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    Miturno=Miturno.filter((turno)=> turno.turno != TurnoId);
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se ha borrado el turno con exito',
                        showConfirmButton: false,
                        timer: 1200
                      });
                } else if (result.isDenied) {
                  Swal.fire('Ha conservado el turno', '', 'info')
                }
            })

        }
    }
}


//Funcion para vel el turno guardado

function TendreMiTurno(){
    if (Miturno.length == 0){
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'No tiene turnos guardados.',
            showConfirmButton: false,
            timer: 1200
          })
        return false;
    }
    return true;
}

//Funcion para ver mis turnos

function mostrarTurnos(){
    if (TendreMiTurno()) {
        verTurno();
    }
}

//Funcion que recrorre mis turnos
function verTurno() {
    let mensaje = "Sus turnos son: "

    Miturno.forEach(doctor => {
        mensaje += doctor.descricionTurno() + "\n"});
        Swal.fire(mensaje);
}


// let btnPedirTurno = document.getElementById('btnPedirTurno');
// function handleBtnPedirTurno () {
//     return pedirTurno()
// }


// btnPedirTurno.onclick = handleBtnPedirTurno;

let btnEliminarTurno = document.getElementById('btnEliminarTurno');
function handleBtnEliminarTurno () {
    eliminarTurno()
}


btnEliminarTurno.onclick = handleBtnEliminarTurno;

let btnMostrarTurno = document.getElementById('btnMostrarTurno');
function handleBtnMostrarTurno () {
    mostrarTurnos()
}

btnMostrarTurno.onclick = handleBtnMostrarTurno;

