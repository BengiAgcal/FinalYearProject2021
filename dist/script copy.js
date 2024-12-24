const TRAY = document.getElementById('js-tray-slide');
var theModel;
//Startisnn

var activeOption = "T111";
var oldOption="T111";
var oldNewMTl;

const colors = [
 //



{
    color: 'FFFFFF'
},
{
    color: '99F8F2'
},
{
    color: '3E4242'
},
{
    color: 'F899C1'
},

{
    color: 'F8F599'
} , 
{
    texture: 'https://res.cloudinary.com/bagcal/image/upload/v1616835580/pattern__v6avju.jpg',
    size: [8, 8, 8],
    shininess: 10
},


{
    texture: 'https://res.cloudinary.com/bagcal/image/upload/v1616829839/Screen_Shot_2021-03-27_at_3.23.43_PM_rlgytl.png',
    size: [6, 6, 6],
    shininess: 0
},

{
    texture: 'https://res.cloudinary.com/bagcal/image/upload/v1616835880/Screen_Shot_2021-03-27_at_5.03.41_PM_wotrmj.png',
    size: [6, 6, 6],
    shininess: 0
},
{
    texture: 'https://res.cloudinary.com/bagcal/image/upload/v1617420001/pattern_ua0krk.png',
    size: [6, 6, 6],
    shininess: 0
},
{
    texture: 'https://res.cloudinary.com/bagcal/image/upload/v1617420000/prtp_fgmkg9.jpg',
    size: [6, 6, 6],
    shininess: 0
},

];



const BACKGROUND_COLOR = 0xFCFCFC;


//const MODEL_PATH =  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/chair.glb";
 const MODEL_PATH = "https://raw.githubusercontent.com/bagcal/cxk/main/Tpose.glb";
// Init the scene
const scene = new THREE.Scene();

const canvas = document.querySelector('#c');

// Init the renderer
const renderer = new THREE.WebGLRenderer({canvas, antialias: true});


renderer.shadowMap.enabled = true;
renderer.sortObjects = true;

renderer.setPixelRatio(window.devicePixelRatio); 
document.body.appendChild(renderer.domElement);

//Init th camera
var cameraFar = 3; // distance of the camera
var aspect = window.innerHeight / window.innerWidth;
var frustumSize = 5;
// Add a camera
//var camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000);

//var camera = new THREE.OrthographicCamera( -5, 5, 2.25, -2.75, 1, 100 );
var camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000);
//var camera =  new THREE.OrthographicCamera( frustumSize  / - 2, frustumSize / 2, frustumSize * aspect / 2, frustumSize * aspect / - 2, -1, 1000 );
camera.position.z = cameraFar+1;
//camera.position.z = 1 ;
camera.position.x = 0;
camera.position.y = 0;



// Initial material
const INITIAL_MTL0 = new THREE.MeshPhongMaterial( { color: 0xffffff, shininess: 10} );
//const INITIAL_MTL = new THREE.MeshPhongMaterial( { color: 0xffffff, shininess: 10, transparent: true, opacity: 0 } );
const INITIAL_MTL = new THREE.MeshPhysicalMaterial( { color: 0xffffff, visible:false } );
const INITIAL_MTL2 = new THREE.MeshPhongMaterial( { color: 0x1c1c1c, shininess: 100 } ); 
// 0x1c1c1c
const INITIAL_MTL3 = new THREE.MeshStandardMaterial( { color: 0xfff000, metalness :0, roughness: 0.5  } );
const INITIAL_MTL4 = new THREE.MeshStandardMaterial( { color: 0xffffff, metalness :0.08, roughness: 0.5  } );
oldNewMTl= INITIAL_MTL4;
/*

INITIAL_MTL3.depthWrite = true;
INITIAL_MTL.depthWrite = false;
*/

INITIAL_MTL2.depthWrite = false;
INITIAL_MTL3.depthWrite = true;

const INITIAL_MAP = [
  
  {childID: "T111", mtl: INITIAL_MTL4},
  {childID: "T112", mtl: INITIAL_MTL},
  {childID: "T121", mtl: INITIAL_MTL},
  {childID: "T122", mtl: INITIAL_MTL},
  {childID: "T131", mtl: INITIAL_MTL},
  {childID: "T132", mtl: INITIAL_MTL},
  {childID: "T211", mtl: INITIAL_MTL},
  {childID: "T212", mtl: INITIAL_MTL},
  {childID: "T221", mtl: INITIAL_MTL},
  {childID: "T222", mtl: INITIAL_MTL},
  {childID: "T231", mtl: INITIAL_MTL},
  {childID: "T232", mtl: INITIAL_MTL},
  {childID: "mannequin", mtl: INITIAL_MTL2}
  
 
];

// Set background
scene.background = new THREE.Color(BACKGROUND_COLOR );
scene.fog = new THREE.Fog(BACKGROUND_COLOR, 20, 100);


// Init the object loader
var loader = new THREE.GLTFLoader();





//loader.load( 'https://raw.githubusercontent.com/bagcal/cxk/main/Tpose.glb%201.22.48%20PM', function(gltf) {  'https://raw.githubusercontent.com/bagcal/cxk/main/untitled.glb //'https://raw.githubusercontent.com/bagcal/koko/main/Zrig.glb?token=AOAPNXZ7TBJLLAW5DUUUJZTAIB52I',
  loader.load(  'https://res.cloudinary.com/bagcal/image/upload/v1616829920/TopFix_axvlfu.glb', function(gltf) {
  theModel = gltf.scene;

  theModel.traverse(o => {
  if (o.isMesh) {
    if (o.name== "mannequin"){o.renderOrder=0;}
    else{o.renderOrder=1;}
    o.castShadow = true;
    o.receiveShadow = true;
    }
  });

// Set the models initial scale   
  theModel.scale.set(2/20,2/20,2/20);
  
  // Offset the y position a bit
  theModel.position.y = -2.5;
  theModel.position.x = 0;
  theModel.position.z = 0;
  // Set initial textures
  
  for (let object of INITIAL_MAP) {
      initColor(theModel, object.childID, object.mtl);
  }

  // Add the model to the scene
  scene.add(theModel);

 
  

}, undefined, function(error) {
  console.error(error)
});



//------------------------------------------

// Function - Add the textures to the models
function initColor(parent, type, mtl) {
  parent.traverse(o => {
    if (o.isMesh) {
      if (o.name.includes(type)) {
        o.material = mtl;
        o.nameID = type; // Set a new property to identify this object
      }
    }
  });
}


//----------------------------------------


// Add lights
var hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.61 );
    hemiLight.position.set( 0, 50, 0 );
// Add hemisphere light to scene   
scene.add( hemiLight );

var dirLight = new THREE.DirectionalLight( 0xffffff, 0.54 );
    dirLight.position.set( -8, 12, 8 );
    dirLight.castShadow = true;
    dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
// Add directional Light to scene    
    scene.add( dirLight );

// Floor
var floorGeometry = new THREE.PlaneGeometry(5000, 5000, 1, -0.1);
var floorMaterial = new THREE.MeshPhongMaterial({
  color: 0xfeef70,
  shininess: 0
});

var floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -0.5 * Math.PI;
floor.receiveShadow = true;
floor.position.y = -1;
scene.add(floor);

// Add controls
var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.maxPolarAngle = Math.PI / 2;
controls.minPolarAngle = Math.PI / 3;
controls.enableDamping = true;
controls.enablePan = false;
controls.dampingFactor = 0.1;
controls.autoRotate = false; // Toggle this if you'd like the chair to automatically rotate
controls.autoRotateSpeed = 0.2; // 30

function animate() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
  
  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
}

animate();


function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  var width = window.innerWidth;
  var height = window.innerHeight;
  var canvasPixelWidth = canvas.width / window.devicePixelRatio;
  var canvasPixelHeight = canvas.height / window.devicePixelRatio;

  const needResize = canvasPixelWidth !== width || canvasPixelHeight !== height;
  if (needResize) {
    
    renderer.setSize(width, height, false);
  }
  return needResize;
}

// Function - Build Colors
function buildColors(colors) {
  for (let [i, color] of colors.entries()) {
    let swatch = document.createElement('div');
    swatch.classList.add('tray__swatch');

      //swatch.style.background = "#" + color.color;

      if (color.texture)
    {
      swatch.style.backgroundImage = "url(" + color.texture + ")";   
    } else
    {
      swatch.style.background = "#" + color.color;
    }

    swatch.setAttribute('data-key', i);
    TRAY.append(swatch);
  }
}

buildColors(colors);

// Select Option
const options = document.querySelectorAll(".option");

for (const option of options) {
  option.addEventListener('click',selectOption);
}

function selectOption(e) {
  let option = e.target;

  oldOption= activeOption;
  
  
  //activeOption = e.target.dataset.option;
  if(e.target.dataset.option.length==1){
    

    let st= String(activeOption[0]) +String(activeOption[1]) + String(activeOption[2])+String(e.target.dataset.option)  ;
    
    st[3]= String(e.target.dataset.option);

     
    activeOption= st;
    console.log( activeOption + "ofofofo");
  }

  if(e.target.dataset.option.length==2){
    console.log(e.target.dataset.option + "GGGGofofofo");

    let st= String(activeOption[0]) +String(activeOption[1]) +String(e.target.dataset.option[0]) +String(activeOption[3]);
    
    st[3]= String(e.target.dataset.option);

     
    activeOption= st;

    console.log(activeOption + "2ofofofo");
  }

  if(e.target.dataset.option.length==3){
    console.log(e.target.dataset.option + "GGGGofofofo");

    let st= String(activeOption[0]) +String(e.target.dataset.option[0]) +String(activeOption[2])  +String(activeOption[3]);
    
    st[3]= String(e.target.dataset.option);

     
    activeOption= st;

    console.log(activeOption + "3ofofofo");
  }

  

  setMaterial(theModel, activeOption, oldNewMTl);
  if(activeOption!= oldOption){
    setMaterial(theModel, oldOption, INITIAL_MTL);
  }
  




  for (const otherOption of options) {
    otherOption.classList.remove('--is-active');
  }
  option.classList.add('--is-active');
}

// Swatches
const swatches = document.querySelectorAll(".tray__swatch");

for (const swatch of swatches) {
  swatch.addEventListener('click', selectSwatch);
}



function selectSwatch(e) {
     let color = colors[parseInt(e.target.dataset.key)];
    
     let new_mtl;

      /*new_mtl = new THREE.MeshPhongMaterial({
          color: parseInt('0x' + color.color),
          shininess: color.shininess ? color.shininess : 10
          
        }); */

      if (color.texture) {
      
      let txt = new THREE.TextureLoader().load(color.texture);
      
      txt.repeat.set( color.size[0], color.size[1], color.size[2]);
      txt.wrapS = THREE.RepeatWrapping;
      txt.wrapT = THREE.RepeatWrapping;
      
      new_mtl = new THREE.MeshPhongMaterial( {
        map: txt,
        shininess: color.shininess ? color.shininess : 10
      });    
    } 
    else
    {
      new_mtl = new THREE.MeshPhongMaterial({
          color: parseInt('0x' + color.color),
          shininess: color.shininess ? color.shininess : 10
          
        });
    }
  //***
    oldNewMTl= new_mtl;
    setMaterial(theModel, activeOption, new_mtl);
    
     if(activeOption!= oldOption){
    setMaterial(theModel, oldOption, INITIAL_MTL);
  }
   //setMaterial(theModel,"T132", new_mtl);
}

function setMaterial(parent, type, mtl) {
  parent.traverse((o) => {
   if (o.isMesh && o.nameID != null) {

     if (o.nameID == type) {
          mtl.depthWrite = false;
          mtl.opacity=0;
         // mtl.transparent=true;
          
          o.material = mtl;
       }

       
     
   }
 });
}



