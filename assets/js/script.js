/*
Object & Persistence
*/

var animalDefaultObj = [
    //Mammals
    {id: 0, klass: 'mammals', name: 'whale', completed: false },
    {id: 1, klass: 'mammals', name: 'zebra', completed: false },
    {id: 2, klass: 'mammals', name: 'baboon', completed: false },
    {id: 3, klass: 'mammals', name: 'polar_bear', completed: false },
    {id: 4, klass: 'mammals', name: 'wombat', completed: false },
    //Fish
    {id: 5, klass: 'fish', name: 'piranha', completed: false },
    {id: 6, klass: 'fish', name: 'whale_shark', completed: false },
    {id: 7, klass: 'fish', name: 'jellyfish', completed: false },
    {id: 8, klass: 'fish', name: 'clownfish', completed: false },
    {id: 9, klass: 'fish', name: 'anglerfish', completed: false },
    //Insects
    {id: 10, klass: 'insects', name: 'ant', completed: false },
    {id: 11, klass: 'insects', name: 'grasshopper', completed: false },
    {id: 12, klass: 'insects', name: 'lady_bug', completed: false },
    {id: 13, klass: 'insects', name: 'roaches', completed: false },
    {id: 14, klass: 'insects', name: 'praying_mantis', completed: false },
    //Birds
    {id: 15, klass: 'birds', name: 'hummingbird', completed: false },
    {id: 16, klass: 'birds', name: 'eagle', completed: false },
    {id: 17, klass: 'birds', name: 'toucan', completed: false },
    {id: 18, klass: 'birds', name: 'pink_flamingo', completed: false },
    {id: 19, klass: 'birds', name: 'ostrich', completed: false },
    //Reptiles
    {id: 20, klass: 'reptiles', name: 'komodo_dragon', completed: false },
    {id: 21, klass: 'reptiles', name: 'rattlesnake', completed: false },
    {id: 22, klass: 'reptiles', name: 'crocodile', completed: false },
    {id: 23, klass: 'reptiles', name: 'tortoise', completed: false },
    {id: 24, klass: 'reptiles', name: 'anaconda', completed: false },
];

//Get animal object from localStorage
function getAnimals() {
    var animalObj = JSON.parse(localStorage.getItem('animals')) || animalDefaultObj;

    // for(var i=0; i<animalObj.length; i++){
    //     if(animalObj[i].completed){
    //         $('#completeSelection').removeClass('is-warning');
    //         $('#completeSelection').addClass("is-completed");
            
    //     }
    //     else{
    //         //console.log('NOT COMPLETED')
    //     }
    // }
    return animalObj;
}




//Set animal object to localStorage
function setAnimals(animalObj) {
    localStorage.setItem('animals', JSON.stringify(animalObj));
}

//App Initializer
async function animalInit(){

    contentEl = document.getElementById('content');
    //If height of elements is less than window height, set body height
    if (window.innerHeight > contentEl.offsetHeight) {
        //Set Body to window height
        contentEl.style.height = window.innerHeight + 'px';
    } 
}

function updateCompletedAnimal(animalName) {
    var animals = getAnimals();

    for (var i = 0; i< animals.length; i++){
        if (animals[i].name == animalName) {
            animals[i].completed = true;
            if (animals[i].completed){              
                
                $('#completeSelection').removeClass('is-warning');
                $('#completeSelection').addClass("is-completed");
            }
        }
    }

    setAnimals(animals);
}



// Renders layout to select animal types
function renderAnimalTypeOptions() {
    var animalPrompt = "Which Type of Animal Do You Want to Explore?";
    var selectionArr = ['mammals', 'fish', 'reptiles', 'insects', 'birds'];
    var html = "";
    

    for (var i = 0; i< selectionArr.length; i++){
        html += '<div class="column is-one-third">';
        html += '<button class="selectionItem '+selectionArr[i]+'" data-type="klass" data-name="'+selectionArr[i]+'">' + humanize(selectionArr[i]);
        html += '</button>';
        html += '</div>';
    }

    $('#appPrompt').html(animalPrompt);
    $('#appActions').html(html);
}

// Renders layout to select animals
function renderAnimalOptions(klass) {
    var html = "";
    var animalsByType = getAnimalsByType(klass);
    for (var i = 0; i < animalsByType.length; i++){
        var status = "";

        if (animalsByType[i].completed) {
            
            status = " completed"
        }

        html += '<div class="column is-one-third">';
        html += '<button class="selectionItem '+ animalsByType[i].name + status+ '" data-type="animal" data-name="'+animalsByType[i].name+'">' + humanize(animalsByType[i].name);
        html += '</button>';
        html += '</div>';
    }

    var button = '<div class="column is-full has-text-centered"><button class="backToSelection button is-large">Back To Animal Types</button></div></div>';
    
    $('#appActions').html(html+button);
}

// Step 1: It makes sense that we would want to create some logic that piggy backs off this idea and adds a class to the “#completeSelection” element that says 
// “is-completed” or “completed.” Part of the object returned from “getAnimalByAnimalName” is a “completed” property. 
// Within renderAnimalModel, test for animal.completed and you can add a special css class to the “#completeSelection” to denote its status.
// 	Step 2: Within CSS, create a class for “.is-completed” or “.completed” and specify the color or styling changes there.

    async function renderAnimalModal(animalName) {

    var animal = await getAnimalByAnimalName(animalName);

    
    if (animal) {
        $('#animalTitle').html(humanize(animalName));
        $('#animalWiki').html(animal.wiki);
        $('#animalGiphy').html(animal.giphy);
        $('#animalImg').attr('src', animal.image);
        $('#completeSelection').attr('data-name', animalName);
        // $('#completeSelection').addClass("is-completed");
        $('.modal').show();
    }

}

function getAnimalsByType(klass) {
    var animals = getAnimals();
    var animalsByType = animals.filter(animalData => {
            if (animalData.klass == klass) {
                return animalData;
            }
    });
    return animalsByType ;
    
}

// Get separate api data and create single animal object
async function getAnimalByAnimalName(animal_name) {
    var wiki = await getWikiByAnimalName(animal_name);
    var giphy = await getGiphyByAnimalName(animal_name);
    var image = await getImageByAnimalName(animal_name);

    var animalData = {
        'wiki': wiki,
        'giphy': giphy,
        'image': image
    };
    return animalData;
}

// Sub function called from getAnimalByAnimalName
// Input animal_name, fetch wiki data, and return text string
function getWikiByAnimalName(animal_name) {
    var fetchData = fetch("https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=" + animal_name + "&format=json")
    .then((response) => response.json())
    .then(function(data){

        //Getting the first element within the pages object
        page = data.query.pages[Object.keys(data.query.pages)[0]]
        return page.extract;
    });
    return fetchData;
}

// Sub function called from getAnimalByAnimalName
// Input animal_name, fetch giphy data, and return html string
function getGiphyByAnimalName(animal_name) {
    var fetchData = fetch('https://api.giphy.com/v1/gifs/search?q=' + animal_name + '&rating=G' + '&api_key=wrXSrUy02o5zN56E5cFhtNzijtmeWcKe&limit=1')
    .then((response) => response.json())
    .then(function(data){
        
        html = '<div style="width:100%;height:0;padding-bottom:56%;position:relative;">';
        html += '<iframe src="'+data.data[0].embed_url+'" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>';
        html += '</div>';
        return html;
    });
    return fetchData;
}

// Sub function called from getAnimalByAnimalName
// Input animal_name, fetch pixabay data, and return url string
function getImageByAnimalName(animal_name) {
    var apiKey = '22691826-3e6bf0771812c9d2424ab24b4';
    var perPage = 200;
    var fetchData = fetch('https://pixabay.com/api/?key='+ apiKey +'&image_type=photo&order=popular&per_page=' + perPage + '&q=' + animal_name)
    .then((response) => response.json())
    .then(function(data){

        //Get First Image From Result
        var imageURL = data.hits[0].largeImageURL;
        return imageURL;
    });

    return fetchData;
}

// Utilities
function humanize(str) {
    //Convert String to Array
    var masterArr = str.split(",");
    var masterOutput = [];

    for(let i = 0; i < masterArr.length; i++) {
        var subStr = masterArr[i].split("_");
        var subOutput = [];
        for(let i = 0; i < subStr.length; i++) {
            var subCaps = subStr[i].charAt(0).toUpperCase() + subStr[i].slice(1);
            subOutput.push(subCaps);
        }
        masterOutput.push(subOutput.join(" "));
    }

    return masterOutput.join(" ");
}


// Event Handling

// When the .startButton is clicked
$('#appActions').on('click', '.startButton', function() {
    renderAnimalTypeOptions();
    $(".monkey").addClass("hide-monkey");
})

//When a .selectionItem is clicked
$('#appActions').on('click', '.selectionItem', async function(e){
    
    //Get data from element
    var selectionType = $(this).data('type');
    var selectionName = $(this).data('name');

    if (selectionType == 'klass') {

        //If its an animal type selection, display animals matching that type
        $('#appActions').html('');
        renderAnimalOptions(selectionName);

    } else if (selectionType == 'animal') {

        //If its an animal, display animal in modal
        renderAnimalModal(selectionName);

    }
});

//When .backToSelection is clicked;
$('#appActions').on('click', '.backToSelection', async function(e){
    renderAnimalTypeOptions();
})


// REPLACE CLASS 
$('#closeSelection').on('click', function() {
    $('.modal').hide();
    /*
        Hide Modal
        Remove Modal Content from DOM
        Display Current Animal Classifcation Menu
    */
});

$('#completeSelection').on('click', function(e) {
    $('.modal').hide();
    updateCompletedAnimal($(this).attr('data-name'));
   
});

animalInit();
/* 
Basic Wikipedia API Notes
Base URL: 'http://en.wikipedia.org/w/api.php?'
To Prevent CORS Errors: '&origin=*'
Action:

    '&action=parse': To Use Wiki Parsing API

        '&page={STRING}': Gets All Properties of Page {String}

            '&prop=text': Gets Text Property Of Page WikiApi
            
    '&action=query': To Use Wiki Query API
            '&prop=extracts': Returns Formatted Text of Entire Wiki Page
                
            '&prop=extracts&exintro': Returns Formatted Text of Intro from Wiki Page

            'prop=extracts&explaintext: Returns String of Plaintext from Wiki Page

Format: '&format=json' 
*/

// Retrieve contents by titles and Query API
// This test has been most successful in returning usable data from a Wikipedia Page
// This test is retreiving an article by the Title Zebra, to get a different article we change the value of '&titles='

// function apiWikiTest() {
//     fetch("http://en.wikipedia.org/w/api.php?origin=*&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Zebra&format=json")
//     .then((response) => response.json())
//     .then(function(data){

//         //Getting the first element within the pages object
//         page = data.query.pages[Object.keys(data.query.pages)[0]]

//         //Setting Page Extract To HTML Element
//         $("#wiki-test").html(page.extract);

//         //Logging the raw data response
//         console.log("Wikipedia Query Response", data);

        
//     })
// }

// function apiGiphyTest() {
//     //API KEY: wrXSrUy02o5zN56E5cFhtNzijtmeWcKe
//     fetch("http://api.giphy.com/v1/gifs/search?q=zebra&api_key=wrXSrUy02o5zN56E5cFhtNzijtmeWcKe&limit=1")
//     .then((response) => response.json())
//     .then(function(data){
        
//         html = '<div style="width:100%;height:0;padding-bottom:56%;position:relative;">';
//         html += '<iframe src="'+data.data[0].embed_url+'" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>';
//         html += '</div>';

//         $("#giphy-test").html(html);

//         //Logging the raw data response
//         console.log("Giphy Query Response", data);
//     })
// }

// function apiPixabayTest() {
//     var apiKey = '22691826-3e6bf0771812c9d2424ab24b4';
//     var perPage = 200;
//     fetch('https://pixabay.com/api/?key='+ apiKey +'&image_type=photo&order=popular&per_page=' + perPage + '&q=zebra')
//     .then((response) => response.json())
//     .then(function(data){

//         //Get First Image From Result
//         var image = data.hits[0].largeImageURL;
//         var imageHTML = '<img src="' + image + '" alt="" height="100"/>';

//         $("#pixabay-test").html(imageHTML);

//         console.log("Pixabay Query Response", data);
//     });
// }
