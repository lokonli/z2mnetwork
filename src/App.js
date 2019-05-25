import React from 'react';
import logo from './logo.svg';
import './App.css';
import Z2mnetwork from './z2mnetwork.js'


function getSearchParameters() {
  var prmstr = window.location.search.substr(1);
  return prmstr !== null && prmstr !== "" ? transformToAssocArray(prmstr) : {};
}

function transformToAssocArray( prmstr ) {
var params = {};
var prmarr = prmstr.split("&");
for ( var i = 0; i < prmarr.length; i++) {
    var tmparr = prmarr[i].split("=");
    params[tmparr[0]] = tmparr[1];
}
return params;
}

function extend(obj, src) {
Object.keys(src).forEach(function(key) { obj[key] = src[key]; });
return obj;
}
var params = getSearchParameters();

var setparams = {
renderer: 'dot',
mqttserver: '192.168.178.18:9001'
}

//extend(setparams, z2mvisConfig);
extend(setparams, params);

function App() {
  return (
    <div className="App">
      <Z2mnetwork config={setparams}/>
    </div>
  );
}

export default App;
