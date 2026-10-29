var lista = document.getElementById("l");

document.getElementById("b").addEventListener("click", function () {
  var li = document.createElement("li");
  li.textContent = document.getElementById("n").value + " (" + document.getElementById("c").value + ") ";
  var x = document.createElement("a");
  x.href = "#";
  x.textContent = "x";
  x.addEventListener("click", function () { li.remove(); });
  li.appendChild(x);
  lista.appendChild(li);
});

document.getElementById("t").addEventListener("click", function () {
  lista.innerHTML = "";
});
