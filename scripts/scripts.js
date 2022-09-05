let turno = Math.floor(Math.random() + 1);
let Misturno=[];
let blanco=[];

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
    descripcionTurno() {
        return (`${this.turno} - ${this.especialidad} - ${this.doctores}`)
    }
    TengoTurno(){
        this.turnoSacado = true;
    }
}

window.addEventListener("load", ()=> {
    let baseDatos = JSON.parse(localStorage.getItem("Miturno"));
    console.log(baseDatos);
})


fetch('./scripts/comentarios.json')
    .then( (res) => res.json() )
    .then( (data) => {
    console.log(data)
    data.forEach((comentario) =>{
    const containerComentarios = document.createElement('div');
    const comentarios = document.getElementById('comentarios')
    containerComentarios.innerHTML= `
            <div class="card m-12" style="width: 18rem; background-color: #15599E; color:black;">
                <div class="card-body">
                    <h5 class="card-title">${comentario.name}</h5>
                    <p class="card-text">${comentario.body}</p>
                    <p class="card-text"><small class="text-muted">${comentario.email}</small></p>
                </div>
            </div>
            `
            ;
        comentarios.append(containerComentarios);
})
})




//Datos del Formulario



let pediatria = ["Hercules Martinez", "Ornella Deneri", "Ximena, Ortega", "Vanesa, Hernandez"];
let anestesiologia = ["Marina Diaz", "Tomas Petinari", "Mario, Rodriguez", "Esteban Morales", "Cretina Fernandez K"];
let quimioterapia = ["Marcos Juarez", "Rosario Acuña", "Carmen Mernez"];
let clinicaMedica = ["Hercules Martinez", "Antonio Perez", "Luciano Moran", "Mateo Muller", "Jose Maria Luciani"];
let cardiologia = ["Maria Dominguez", "Javier Mileia", "Alberzo Fernandez"];


//Opciones a elegir

let lasEspecialidades = ['Pediatria', 'Anestesiologia', 'Clinica Medica', 'Cardiologia', 'Quimioterapia'];

let losDoctores = ["Hercules Martinez", "Ornella Deneri", "Marina Diaz", "Tomas Petinari", "Marcos Juarez", "Antonio Perez", "Maria Dominguez"];





//Funcion que muestra las opciones a elegir y las elegidas

let formulario = document.getElementById("form");
let selectEsp = document.getElementById('select-especialidad');
let selectDoc = document.getElementById('select-doctores');

function mostrarSelect(array, lugar){
    let elementos = '<option selected disables>--Seleccione--</option>'

    for(let i = 0; i < array.length; i++){
        elementos += '<option value="'+array[i]+'">'+array[i]+'</option>'
    }
    lugar.innerHTML=elementos
}

mostrarSelect(blanco, selectDoc);
mostrarSelect(lasEspecialidades, selectEsp);

selectEsp.addEventListener('change', ()=>{
    let valor = selectEsp.value;

    if(valor=="Anestesiologia"){
        mostrarSelect(anestesiologia, selectDoc);
    }else if(valor=="Clinica Medica"){
        mostrarSelect(clinicaMedica, selectDoc);
    }else if(valor=="Quimioterapia"){
        mostrarSelect(quimioterapia, selectDoc);
    }else if(valor=="Cardiologia"){
        mostrarSelect(cardiologia, selectDoc);
    }else{
        mostrarSelect(pediatria, selectDoc);
    }
    

})

//Evento que se produce al precionar el boton de pedir

formulario.addEventListener('submit', (event) => {
    event.preventDefault();


    console.dir(event.target.children);
    let valorSubmit = event.target.children;


    let Turnos = new Turno(valorSubmit[0].value, valorSubmit[1].value);

    formulario.reset()
    
    if (Turnos) {

        Turnos.SetTurno(turno);
        turno = turno + Math.floor(Math.random() + 1);
        Misturno.push(Turnos);
        console.log(Misturno)
        localStorage.setItem("Miturno", JSON.stringify(Misturno));

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




const generarLista = () => {
    let contenedor = document.getElementById("container__lista");
    Misturno.map( el => contenedor.innerHTML += `
    <div class="card" id="${el.turno}" style="width: 18rem;">
        <ul class="list-group list-group-flush">
        <li class="list-group-item">${el.turno}</li>
        <li class="list-group-item">${el.especialidad}</li>
        <li class="list-group-item">${el.doctores}</li>
        </ul>
    </div>
`
)}



//Funcion que elimina el turno

function eliminarTurno(){

    if(TendreMiTurno()){
        verTurno();
        let TurnoId = parseInt(prompt("Ingrese el numero del turno que desea cancelar:"));
        console.log(TurnoId);
        if (TurnoId) {
            let TurnoEncontrado = Misturno.find((turno)=> turno.turno == TurnoId);
            Swal.fire({
                title: 'seguro que quieres eliminar?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Borrar',
                denyButtonText: `Conservar`,
              }).then((result) => {
                
                if (result.isConfirmed) {
                    Misturno=Misturno.filter((turno)=> turno.turno != TurnoId);
                    eliminarStorage();
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


//Borra del Storage segun el id
function eliminarStorage (TurnoId) {
    let Misturno = JSON.parse(localStorage.getItem("Miturno"));
    let MisturnoEnStorage = Misturno.findIndex(el => el.turno === TurnoId);
    Misturno.splice(MisturnoEnStorage, 1);
    let MisturnoJSON = JSON.stringify(Misturno);
    localStorage.setItem("Miturno", MisturnoJSON);
}


//Funcion para vel el turno guardado

function TendreMiTurno(){
    if (Misturno.length == 0){
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
    
    Misturno.forEach((doctor) => {
        mensaje += doctor.descripcionTurno() + "\n"});
        Swal.fire(mensaje);
}





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

