const CLAVE = "notas-ux:v1";
const CATEGORIAS = ["Personal", "Estudio", "Trabajo"];
const TIEMPO_DESHACER = 8000;

const formulario = document.getElementById("formulario");
const texto = document.getElementById("texto");
const categoria = document.getElementById("categoria");
const botonAgregar = document.getElementById("agregar");
const contador = document.getElementById("contador");
const mensaje = document.getElementById("mensaje");
const botonDeshacer = document.getElementById("deshacer");
const botonBorrarTodas = document.getElementById("borrar-todas");
const listado = document.getElementById("listado");
const total = document.getElementById("total");

let notas = cargar();
let eliminadas = null; // lo que se puede deshacer: [{ nota, indice }]
let temporizador = null;

function cargar() {
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE));
    return Array.isArray(guardado) ? guardado : [];
  } catch (error) {
    return [];
  }
}

function guardar() {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(notas));
  } catch (error) {
    /* sin almacenamiento: la app sigue funcionando en memoria */
  }
}

function mostrarMensaje(textoMensaje, tipo, conDeshacer) {
  clearTimeout(temporizador);
  mensaje.textContent = textoMensaje;
  mensaje.className = "mensaje " + tipo;
  botonDeshacer.hidden = !conDeshacer;
  if (conDeshacer) {
    temporizador = setTimeout(function () {
      eliminadas = null;
      botonDeshacer.hidden = true;
    }, TIEMPO_DESHACER);
  } else {
    eliminadas = null;
  }
}

function actualizarFormulario() {
  const largo = texto.value.length;
  contador.textContent = largo + "/200 caracteres";
  // Prevención: sin texto no se puede agregar la nota.
  botonAgregar.disabled = texto.value.trim() === "";
}

function dibujar() {
  listado.textContent = "";

  CATEGORIAS.forEach(function (nombre) {
    const deLaCategoria = notas.filter(function (nota) {
      return nota.categoria === nombre;
    });
    if (deLaCategoria.length === 0) return;

    const grupo = document.createElement("section");
    const titulo = document.createElement("h3");
    titulo.textContent = nombre + " (" + deLaCategoria.length + ")";
    grupo.appendChild(titulo);

    deLaCategoria.forEach(function (nota) {
      const item = document.createElement("div");
      item.className = "nota";

      const parrafo = document.createElement("p");
      parrafo.className = "nota-texto";
      parrafo.textContent = nota.texto;

      const eliminar = document.createElement("button");
      eliminar.type = "button";
      eliminar.className = "boton-eliminar";
      eliminar.textContent = "Eliminar";
      eliminar.dataset.id = nota.id;
      eliminar.setAttribute("aria-label", "Eliminar nota: " + nota.texto.slice(0, 40));

      item.appendChild(parrafo);
      item.appendChild(eliminar);
      grupo.appendChild(item);
    });

    listado.appendChild(grupo);
  });

  if (notas.length === 0) {
    const vacio = document.createElement("p");
    vacio.className = "vacio";
    vacio.textContent = "Aún no tienes notas. Escribe la primera arriba.";
    listado.appendChild(vacio);
  }

  total.textContent = "(" + notas.length + (notas.length === 1 ? " nota)" : " notas)");
  botonBorrarTodas.disabled = notas.length === 0;
}

texto.addEventListener("input", actualizarFormulario);

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();
  const limpio = texto.value.trim();

  if (limpio === "") {
    mostrarMensaje("Escribe algo antes de agregar la nota.", "error");
    texto.focus();
    return;
  }

  notas.push({ id: Date.now(), texto: limpio, categoria: categoria.value });
  guardar();
  dibujar();

  texto.value = "";
  actualizarFormulario();
  texto.focus();
  mostrarMensaje("Nota agregada en " + categoria.value + ".", "exito");
});

listado.addEventListener("click", function (evento) {
  const boton = evento.target.closest(".boton-eliminar");
  if (!boton) return;

  const indice = notas.findIndex(function (nota) {
    return String(nota.id) === boton.dataset.id;
  });
  if (indice === -1) return;

  const nota = notas.splice(indice, 1)[0];
  eliminadas = [{ nota: nota, indice: indice }];
  guardar();
  dibujar();
  mostrarMensaje("Nota eliminada.", "info", true);
  botonDeshacer.focus();
});

botonBorrarTodas.addEventListener("click", function () {
  if (notas.length === 0) return;

  if (!confirm("¿Seguro que quieres borrar las " + notas.length + " notas?")) {
    mostrarMensaje("Cancelado: tus notas siguen ahí.", "info");
    return;
  }

  const respaldo = notas.map(function (nota, indice) {
    return { nota: nota, indice: indice };
  });
  notas = [];
  guardar();
  dibujar();
  mostrarMensaje("Todas las notas fueron borradas.", "info", true);
  eliminadas = respaldo;
  botonDeshacer.focus();
});

botonDeshacer.addEventListener("click", function () {
  if (!eliminadas) return;

  eliminadas.forEach(function (registro) {
    notas.splice(registro.indice, 0, registro.nota);
  });
  guardar();
  dibujar();
  mostrarMensaje("Listo: recuperaste tus notas.", "exito");
  texto.focus();
});

actualizarFormulario();
dibujar();
