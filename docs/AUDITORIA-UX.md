# Auditoría UX de app-notas

Pantalla auditada: **app-notas** (versión original en la carpeta [`antes/`](../antes/), versión rediseñada en la raíz del repositorio).

Página publicada: https://TU-USUARIO.github.io/TU-REPOSITORIO/

## 1. Las cinco heurísticas de Nielsen

| Heurística | Problema de la pantalla original | Solución aplicada | Gravedad |
|---|---|---|---|
| Visibilidad del estado | Al pulsar «+» o «x» no aparece ningún aviso: no sé si la nota se guardó o se borró. | Mensaje visible con `role="status"` después de cada acción («Nota agregada en Estudio.», «Nota eliminada.») y contador «(N notas)». | Alta |
| Coincidencia con el mundo real | Botones «+» y «x», título «APP NOTAS v1» y categorías «p, e, t, o, x, y»: lenguaje de sistema. | Textos de persona: «Agregar nota», «Eliminar», «Mis notas» y categorías Personal, Estudio y Trabajo. | Media |
| Control y libertad | «x» y «BORRAR TODO» borran al instante, sin confirmar ni poder deshacer. | Botón «Deshacer» durante 8 segundos tras eliminar y confirmación antes de «Borrar todas las notas». | Alta |
| Prevención de errores | Se pueden agregar notas vacías o solo con espacios. | El botón «Agregar nota» está desactivado hasta que haya texto (`trim()`), `required`, `maxlength="200"` con contador y validación de respaldo en JavaScript. | Alta |
| Reconocer, no recordar | El campo solo tiene `placeholder` «nota...»: desaparece al escribir. | `label` visible en cada campo, categoría escrita en cada grupo de notas. | Media |

Filas adicionales del laboratorio:

| Criterio | Problema de la pantalla original | Solución aplicada | Gravedad |
|---|---|---|---|
| Accesibilidad | Texto gris `#b5b5b5` (menos de 2:1), `outline: none`, imagen sin `alt`, página sin `lang`, botones de 9px. | Contraste mayor a 4.5:1, `:focus-visible` naranja de 3px, `alt` descriptivo, `lang="es"`, botones de 44px o más. | Alta |
| Principios visuales | Todo el texto mide casi lo mismo (11 a 12px): no hay jerarquía. | Un solo `h1` de 28px, `h2` de 20px, texto de 16px, botón principal relleno y secundarios con borde. | Media |

## 2. Leyes de usabilidad

| Ley | Cambio | Justificación |
|---|---|---|
| Fitts | «Agregar nota» ocupa todo el ancho (48px de alto) y «Borrar todas las notas» queda separado 24px. | Lo más usado es fácil de alcanzar y lo destructivo no se pulsa por error. |
| Hick | Solo 3 categorías (antes 6 letras sin sentido) y una única acción por nota («Eliminar»). | Menos opciones por pantalla significan decidir más rápido. |
| Miller | El formulario va en un bloque de 2 campos y las notas se agrupan en 3 categorías con su cantidad. | Bloques cortos reducen la carga de memoria (unos 7 elementos). |

## 3. Accesibilidad y Lighthouse

| Medición | Antes | Después |
|---|---|---|
| Accesibilidad (Lighthouse, Desktop) | _tu puntaje_ | _tu puntaje (90 o más)_ |

Capturas (guárdalas en `docs/img/`):

![Lighthouse antes](img/lighthouse-antes.png)

![Lighthouse después](img/lighthouse-despues.png)

## 4. Prueba de teclado

Recorrí toda la página solo con Tab, Shift + Tab y Enter: siempre se ve el borde naranja y se puede agregar, eliminar y deshacer sin mouse.

## 5. Commits

1. `Agrega version original de app-notas en la carpeta antes`
2. `Redisena app-notas aplicando heuristicas de Nielsen y accesibilidad`
3. `Agrega auditoria UX en docs/AUDITORIA-UX.md`
