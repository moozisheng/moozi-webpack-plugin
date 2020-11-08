function number() {
  var div = document.createElement("div");
  div.setAttribute("id", "number");
  div.innerHTML = 13000000000000;
  document.body.appendChild(div);
}

export default number;
