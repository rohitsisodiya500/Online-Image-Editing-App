// ============= FOR-LOAD-IMAGE ===========

const fileInput = document.querySelector(".Input-file"),
previewImage = document.querySelector(".ImageContainer img"),
chooseImageBtn = document.querySelector(".Choose-Image");

// ============= FOR ADJUSTMENT SLIDER & INPUTS ===========

const LightName = document.querySelector(".Slider-Status-Lights #name"),
LightValue = document.querySelector(".Slider-Status-Lights #value"),
LightSlider = document.querySelector(".Slider-Info-Lights input"),
LightOptions = document.querySelectorAll(".Light-Types div");

// ============= FOR-EDITOR-TABS ===========

const editorTabs = document.querySelectorAll(".Editor-tabs div"),
SubTabContainer = document.querySelectorAll(".TabContainer .SubTabContainer");

let brightness = 100, saturation = 100, inversion = 0; grayscale = 0, contrast = 100;
let rotate = 0, flipHorizontal = 1, flipVertical = 1;

// ============= FOR ROTATE AND FLIP ===========

const rotateOptions = document.querySelectorAll(".Crop-and-Rotate div button");

// ============= FOR RESET FILTER ===========

const resetBtn = document.querySelector(".ResetImage");

// *************************************************************

// ============= FOR ACTIVE EDITOR-TABS ===========

editorTabs.forEach((tab, index) =>{
    tab.addEventListener('click', ()=>{
        editorTabs.forEach(constant =>{
            constant.classList.remove("active");
        });
        SubTabContainer.forEach(tab =>{
            tab.classList.remove("active");
        });
        editorTabs[index].classList.add("active");
        SubTabContainer[index].classList.add("active");
    });
});


function getLightName(option){
    if(option.id == 'brightness'){
        return "Brightness";
    }
    else if(option.id == 'saturation'){
        return "Saturation";
    }
    else if(option.id == 'inversion'){
        return "Inversion";
    }
    else if(option.id == 'grayscale'){
        return "Greyscale";
    }
    else if(option.id == 'contrast'){
        return "Contrast";
    }
}

// ============= FOR ACTIVE LIGHT-TYPES ===========

LightOptions.forEach(option=>{
    option.addEventListener('click', ()=>{
        console.log(option);
        document.querySelector(".Light-Types .isActive").classList.remove("isActive");
        option.classList.add("isActive");
        LightName.innerText = getLightName(option);

        if(option.id === "brightness"){
            LightSlider.max = "200";
            LightSlider.value = brightness;
            LightValue.innerText = `${brightness} %`;
        }
        else if(option.id === "saturation"){
            LightSlider.max = "200";
            LightSlider.value = saturation;
            LightValue.innerText = `${saturation} %`;
        }
        else if(option.id === "inversion"){
            LightSlider.max = "100";
            LightSlider.value = inversion;
            LightValue.innerText = `${inversion} %`;
        }
        else if(option.id === "contrast"){
            LightSlider.max = "200";
            LightSlider.value = contrast;
            LightValue.innerText = `${contrast} %`;
        }
        else{
            LightSlider.max = "100";
            LightSlider.value = grayscale;
            LightValue.innerText = `${grayscale} %`;
        }
    });
});

//To add filter images....>
const filterImagas = document.querySelectorAll(".Filter-Type div img");

// ============= LOAD-IMAGE ===========
const loadImage = () =>{
    let file = fileInput.files[0];
    if(!file) return;
    previewImage.src = URL.createObjectURL(file);
    
    filterImagas.forEach(option =>{
        option.src = URL.createObjectURL(file);
        console.log(option);
    })
}

//for save the current filtered image
let flagLights = 0;
let flagFilters = 0;

function addFilterLights(){
    flagLights = 1;
    flagFilters = 0;
    return `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%) contrast(${contrast}%)`;
}

// ============= applyLights() ===========

const applyLights = () =>{
    previewImage.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;

    previewImage.style.filter = addFilterLights();
}
// ============= RESET - FILTER ===========

resetBtn.addEventListener("click", ()=>{
    brightness = 100, saturation = 100, inversion = 0, grayscale = 0, 
    rotate = 0, flipHorizontal = 1, flipVertical = 1;
    applyLights();
})



// ============= UPDATE FILTER ===========

const updateFilter = () =>{
    LightValue.innerText = `${LightSlider.value} %`;
    const SelectedLight = document.querySelector(".Light-Types .isActive");

    if(SelectedLight.id === "brightness"){
        brightness = LightSlider.value;
    }
    else if(SelectedLight.id === "saturation"){
        saturation = LightSlider.value;
    }
    else if(SelectedLight.id === "inversion"){
        inversion = LightSlider.value;
    }
    else if(SelectedLight.id === "contrast"){
        contrast = LightSlider.value;
    }
    else{
        grayscale = LightSlider.value;
    }

    applyLights();
}

rotateOptions.forEach(option =>{
    option.addEventListener("click", ()=>{
        // console.log(option);
        if(option.id === "left"){
            rotate -= 90;
        }
        else if(option.id === "right"){
            rotate += 90;
        }
        else if(option.id === "vertical"){
            flipVertical = flipVertical === 1 ? -1 : 1;
        }
        else{
            flipHorizontal = flipHorizontal === 1 ? -1 : 1;
        }
        applyLights();
    })
})

// =============== INITIAL FUNCTIONALITY ==============

fileInput.addEventListener('change', loadImage);
chooseImageBtn.addEventListener('click', ()=> fileInput.click());
LightSlider.addEventListener('input', updateFilter);


// =============== FILTER TYPES ==============

const filterOptions = document.querySelectorAll(".Filter-Type div");

function addFilters(option){
    flagLights = 0;
    flagFilters = 1;

    // console.log(option);
    if(option.id === 'original' || option.id === 'imgOriginal'){
        // previewImage.style.filter = "blur(0px)";
        return "blur(0px)";
    }
    else if(option.id === 'blur' || option.id === 'imgBlur'){
        // previewImage.style.filter = "blur(10px)"; 
        return "blur(2px)"; 
    }
    else if(option.id === 'bright' || option.id === 'imgBright'){
        // previewImage.style.filter = "brightness(130%)";
        return "brightness(150%)";
    }
    else if(option.id === 'contrast' || option.id === 'imgContrast'){
        // previewImage.style.filter = "contrast(50%)";
        return "contrast(30%)";
    }
    else if(option.id === 'grayscaled' || option.id === 'imgGrayscaled'){
        // previewImage.style.filter = "grayscale(50%)";
        return "grayscale(50%)";
    }
    else if(option.id === 'hue-rotate' || option.id === 'imgHue'){
        // previewImage.style.filter = "hue-rotate(60deg)";
        return "hue-rotate(60deg)";
    }
    else if(option.id === 'inverted' || option.id === 'imgInverted'){
        // previewImage.style.filter = "invert(20%)";
        return "invert(20%)";
    }
    else if(option.id === 'opacity' || option.id === 'imgOpacity'){
        // previewImage.style.filter = "opacity(60%)";
        return "opacity(60%)";
    }
    else if(option.id === 'saturated' || option.id === 'imgSaturated'){
        // previewImage.style.filter = "saturate(0%)";
        return "saturate(0%)";
    }
    else if(option.id == 'sepia' || option.id === 'imgSepia'){
        // previewImage.style.filter = "sepia(100%)";
        return "sepia(100%)";
    }
}

let addedFilter;
//to add filters on user input image...>
filterOptions.forEach(option =>{
    option.addEventListener("click", ()=>{
        previewImage.style.filter = addFilters(option);
        addedFilter = previewImage.style.filter;
    });
});

//for adding finter example image....>
const filterOptions2 = document.querySelectorAll(".Filter-Type div img");

filterOptions2.forEach(option =>{
    option.style.filter = addFilters(option);
});

//checkStatus()
function checkStatus(){
    if(flagLights == 1 && flagFilters == 0){
        return addFilterLights();
    }
    if(flagLights == 0 && flagFilters == 1){
        return addedFilter;
    }
}


// ACTIVE THE SAVE BUTTON FUNTIONALITY....>
const saveImageBtn = document.querySelector(".SaveImage");

saveImageBtn.addEventListener("click", ()=>{
    const canvas = document.createElement("canvas"); // creating canvas element
    const ctx = canvas.getContext("2d"); //to get the drawing context on the canvas.

    canvas.width = previewImage.naturalWidth;
    canvas.height = previewImage.naturalHeight;

    // applying filters on canvas image
    // ctx.filter = previewImage.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%) contrast(${contrast}%)`;

    ctx.filter = previewImage.style.filter = checkStatus();

    //applying flips
    ctx.translate(canvas.width/2, canvas.height/2) //to translating canvas from center.
    ctx.scale(flipHorizontal, flipVertical);


    //rotate
    if(rotate != 0){
        // if yes then rotate the canvas
        ctx.rotate(rotate * Math.PI/180);
    }


    ctx.drawImage(previewImage, -canvas.width/2, -canvas.height/2, canvas.width, canvas.height);

    // document.body.appendChild(canvas);

    //Download image...>
    const link = document.createElement("a");
    link.download = "Image.jpg";
    link.href = canvas.toDataURL();
    link.click();
});



// const filterOptions2 = document.querySelectorAll(".Filter-Type div");
// const images = document.querySelectorAll(".Filter-Image img")

// filterOptions2.forEach((option)=>{
//     images.style.filter = addFilters(option);
// })


// ================ Mark - up ====================

// const canvas = document.querySelector(".ImageContainer img");

// let context = canvas.getContext();


// let drawColor = "black";
// let drawWidth = "2";
// let isDrawing = false;

// canvas.addEventListener("touchstart", start, false);
// canvas.addEventListener("touchmove", draw, false);
// canvas.addEventListener("mousedown", start, false);
// canvas.addEventListener("mousemove", draw, false);

// function start(event){
//     isDrawing = true;

// }