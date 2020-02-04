function fnFavorate(btn) {
  let i = btn.childNodes[0];
  let toggle = i.dataset.toggle;
  i.dataset.toggle = toggle === "true" ? "false" : "true";
}
