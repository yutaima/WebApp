function success(data) {
  var container = document.createElement("div");
  
  for (var i in data) {
    var img = document.createElement("img");
    img.src = data[i].url;
    container.appendChild(img);
  }
  document.body.appendChild(container);

}
 
function error(err) {
  if (err.code === err.CAPTURE_INTERNAL_ERR) {
    alert("The capture failed due to an internal error.");
  }
  else {
    alert("Other error occured.");
  }
}
 
navigator.device.capture.captureImage(success, error, { limit: 1 });