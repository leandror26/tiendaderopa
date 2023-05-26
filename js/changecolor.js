import { WebIO } from '@gltf-transform/core';
import { KHRONOS_EXTENSIONS } from '@gltf-transform/extensions';
import { metalRough } from '@gltf-transform/functions';

$(document).ready(function(){
  //const io = new WebIO({credentials: 'include'});
const io = new WebIO().registerExtensions(KHRONOS_EXTENSIONS);

// Read.
let document;
document = io.read('#modelViewer');  // → Document
document = io.readBinary(glb);    // Uint8Array → Document

// convert
document.transform(metalRough());

// Write.
const glb = io.writeBinary(document); // Document → Uint8Array
  
/*var colorbox =$(document).getElementById("#color-controls");
document.querySelector('#color-controls').addEventListener('click', (Event) => { 
    var colorString=Event.target.dataset.color;
    console.log('Changing color to: ', color);
    var [material] = modelViewerColor.model.materials;
    material.pbrMetallicRoughness.setBaseColorFactor(colorString);
});

var modelViewer= $(document).querySelector("#model-viewer");
$(document).querySelector('#slides').addEventListener('click', (Event) => {
  
});*/

window.switchSrc = (element, name) => {
  var modelViewer=document.querySelector("#modelViewer"); 
  const base = "models/buzo-capucha.glb" + name;
  modelViewer.src = base + '.glb';
  modelViewer.poster = base + '.png';
  const slides = document.querySelectorAll(".slide");
  slides.forEach((element) => {element.classList.remove("selected");});
  element.classList.add("selected");
};

/*document.querySelector(".slider").addEventListener('beforexrselect', (ev) => {
  // Keep slider interactions from affecting the XR scene.
  ev.preventDefault();
});*/

$('#texture-select').click(function(){
  actualizarTextura();
});
function actualizarTextura()
{
  const modelViewer=document.querySelector('#modelViewer');

  if(modelViewer) 
  {
    modelViewer.addEventListener('load', () => {
      const textura=document.getElementById('#texture-select');

      for(const material of modelViewer.model.materials)
      {
        if(material.KHR_materials_pbrSpecularGlossiness.baseColorTexture) 
        {
          material.KHR_materials_pbrSpecularGlossiness.setBaseColorTexture(textura);
        }
      }
    });
  }
}
});
