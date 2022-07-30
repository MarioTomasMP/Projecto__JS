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


// let btnPedir = document.getElementById('btnPedirTurno');

// let btnEliminar = document.getElementById('btnEliminarTurno');


// let btnMostrar = document.getElementById('btnMostrarTurno');


// let btnSalir = document.getElementById('btnSalirTurnero');


// let Turnito = document.createElement('ul');




const Medicos = [{Especialidad: "clinica medica", Doctor: "oscar, rodriguez"},
    {Especialidad: "anestesiologia", Doctor: "rosa, marcello"},
    {Especialidad: "quimioterapia", Doctor: "ana, marquez"},
    {Especialidad: "clinica medica", Doctor: "marcelo, sanchez"},
    {Especialidad: "pediatria", Doctor: "antonio, muñoz"},
    {Especialidad: "anestesiologia", Doctor: "panda, martinez"},
    {Especialidad: "pediatria", Doctor: "hercules, martinez"},
    {Especialidad: "pediatria", Doctor: "jose, muller"}];

const ObraSocial= ["osam", "osde", "sancor", "sadop"];

// let bucle = true;

// alert("Bienvenidos al sanatorio de tomi");

// while(bucle) {
//     let pregunta = "Que desea hacer?: ";
//     pregunta += "\n1. Sacar un Turno";
//     pregunta += "\n2. Dar de baja mi turno";
//     pregunta += "\n3. Mostrar mis turnos"; 
//     pregunta += "\n4. Salir del turnero";

//     let respuesta = parseInt(prompt(pregunta));

//     switch (respuesta) {

//         case 1:
//             sacarTurno();
//             pedirTurno();
//             break;
//         case 2:
//             eliminarTurno();
//             break;
//         case 3:
//             mostrarTurnos();
//             break;
//         case 4:
//             alert("Gracias por usar el turnero!");
//             bucle = false;
//             break;
//         default:
//             alert("No ingresaste una opcion valida");
//             break;
//     }
// }


//Funcion para cargar el turno



function pedirTurno(){
    let turnoNuevo = SolicitarTurnoNuevo();

    if (turnoNuevo) {

        turnoNuevo.SetTurno(turno);
        turno = turno + Math.floor(Math.random() + 1);
        Miturno.push(turnoNuevo);
        alert("Turno guardado")
    }else {
        alert("No se pudo guardar el turno");
    }
}


// funcion que solicita especialidad y nombre del doctor;

function SolicitarTurnoNuevo(){
    let pedido = true;

    while (pedido) {
        let mensaje = "";
        let especialidad = prompt("Ingrese al profesional que necesita: \npediatria \nclinica medica \nquinesiologia \nanestesiologia");
        let doctores = prompt("Ingrese el nombre del medico que quiera que lo atienda: \nPediatra: antonio, muños ; hercules, martinez; jose, muller. \nClinica medica: oscar, rodriguez; marcelo, sanchez. \nAnestesiologia: rosa, marcello; panda, martinez. \nQuimiterapia: ana, marquez.");

        if (!especialidad){
            mensaje += "Debe ingresar una especialida valida";
        }
        if (!doctores){
            mensaje += "Debe ingresar doctor valida";
        }
        if(mensaje !=""){
            alert(mensaje);
            pedido = confirm("Quieres cargar de nuevo los datos?");
        }else {
            return new Turno(especialidad, doctores);
        }
    }
}

//Funcion que elimina el turno

function eliminarTurno(){

    if(TendreMiTurno()){
        verTurno();
        let TurnoId = parseInt(prompt("Ingrese el numero del turno que desea cancelar:"));

        if (TurnoId) {
            let TurnoEncontrado = Miturno.find((turno)=> turno.turno == TurnoId);

            if (TurnoEncontrado) {
                let encontrado = confirm("Desea borrar el turno seleccionado");
                if (encontrado){
                    Miturno=Miturno.filter((turno)=> turno.turno != TurnoId);
                    alert("Turno eliminado");
                }
            }
        }
    }
}


//Funcion para vel el turno guardado

function TendreMiTurno(){
    if (Miturno.length == 0){
        alert("Usted no a sacado turno");
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
    let mensaje = "Sus turnos son:"

    Miturno.forEach(doctor => {
        mensaje += doctor.descricionTurno() + "\n"});
    alert(mensaje);
}


let btnPedirTurno = document.getElementById('btnPedirTurno');
function handleBtnPedirTurno () {
    return pedirTurno()
}


btnPedirTurno.onclick = handleBtnPedirTurno;

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

