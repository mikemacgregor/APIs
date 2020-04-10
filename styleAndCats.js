// COMP1073 Assignment 5, To-Do List w/ APIs
// Mike MacGregor #200232817
// April 9, 2020

// available styles in order from select
let availableStyles = ['darkly', 'journal', 'lumen', 'lux', 'pulse', 'sketchy', 'superhero', 'united'];

// drop-down to change style
let styleSelector = document.getElementById('styleSelector');

// add event listener for change event
styleSelector.addEventListener('change', function() {
  setStyle(styleSelector.value);
});

// update style and set localStorage
function setStyle(style) {
  // get current stylesheet url
  let bootswatch = document.getElementById('bootswatch');

  // change the style
  bootswatch.href = 'https://stackpath.bootstrapcdn.com/bootswatch/4.4.1/' + style + '/bootstrap.min.css'

  // update update selected
  styleSelector.options[availableStyles.indexOf(style)].selected = 'selected';

  // update local storage for next time
  localStorage.setItem('style',style);

}

// --------------
// random cat pic
// --------------

function ajax_get(url, callback) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      // console.log('responseText:' + xmlhttp.responseText);
      try {
        var data = JSON.parse(xmlhttp.responseText);
      } catch (err) {
        console.log(err.message + " in " + xmlhttp.responseText);
        return;
      }
      callback(data);
    }
  };

  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

ajax_get('https://api.thecatapi.com/v1/images/search?size=full', function(data) {
  document.getElementById("id").innerHTML = data[0]["id"];
  document.getElementById("url").innerHTML = data[0]["url"];

  var html = '<img style="max-width: 200px;" src="' + data[0]["url"] + '">';
  document.getElementById("image").innerHTML = html;
});
