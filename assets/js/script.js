/*
Object & Persistence
*/

var animalDefaultObj = [
    //Mammals
    {id: 0, klass: 'mammals', name: 'whale', completed: false },
    {id: 1, klass: 'mammals', name: 'zebra', completed: false },
    {id: 2, klass: 'mammals', name: 'platypus', completed: false },
    {id: 3, klass: 'mammals', name: 'polar_bear', completed: false },
    {id: 4, klass: 'mammals', name: 'wombat', completed: false },
    //Fish
    {id: 5, klass: 'fish', name: 'piranha', completed: false },
    {id: 6, klass: 'fish', name: 'whale_shark', completed: false },
    {id: 7, klass: 'fish', name: 'jellyfish', completed: false },
    {id: 8, klass: 'fish', name: 'blob_fish', completed: false },
    {id: 9, klass: 'fish', name: 'anglerfish', completed: false },
    //Insects
    {id: 10, klass: 'insects', name: 'ant', completed: false },
    {id: 11, klass: 'insects', name: 'stick_bug', completed: false },
    {id: 12, klass: 'insects', name: 'firefly', completed: false },
    {id: 13, klass: 'insects', name: 'cockroach', completed: false },
    {id: 14, klass: 'insects', name: 'praying_mantis', completed: false },
    //Birds
    {id: 15, klass: 'birds', name: 'hummingbird', completed: false },
    {id: 16, klass: 'birds', name: 'golden_eagle', completed: false },
    {id: 17, klass: 'birds', name: 'toucan', completed: false },
    {id: 18, klass: 'birds', name: 'pink_flamingo', completed: false },
    {id: 19, klass: 'birds', name: 'ostrich', completed: false },
    //Reptiles
    {id: 20, klass: 'reptiles', name: 'komodo_dragon', completed: false },
    {id: 21, klass: 'reptiles', name: 'king_cobra', completed: false },
    {id: 22, klass: 'reptiles', name: 'crocodile', completed: false },
    {id: 23, klass: 'reptiles', name: 'tortoise', completed: false },
    {id: 24, klass: 'reptiles', name: 'anaconda', completed: false },
];

//Get animal object from localStorage
function getAnimals() {
    var animalObj = JSON.parse(localStorage.getItem('animals')) || animalDefaultObj;
    return animalObj;
}

//Set animal object to localStorage
function setAnimals(animalObj) {
    localStorage.setItem('animals', JSON.stringify(animalObj));
}

//App Initializer
async function animalInit(){

    // Get Animals from localStorage
    var animalObj = getAnimals();

    //Sample Animal Request
    // var animalData = await getAnimalByAnimalName(animalObj[0].name);

    //Log animalObj and sample animalData
    // console.log("animalObj:", animalObj, "animalData:", animalData);
}

async function updateModalByAnimalName(animalName) {
    var animal = await getAnimalByAnimalName(animalName);

    if (animal) {
        console.log('updateModalByAnimalName', animalName, animal.wiki, animal.giphy, animal.image);

        $('#animalTitle').html(humanize(animalName));
        $('#animalWiki').html(animal.wiki);
        $('#animalGiphy').html(animal.giphy);
        $('#animalImg').attr('src', animal.image);

        $('.modal').show();
    }
}

//Input animal_name, fetch wiki data, and return text string
function getWikiByAnimalName(animal_name) {
    var fetchData = fetch("http://en.wikipedia.org/w/api.php?origin=*&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=" + animal_name + "&format=json")
    .then((response) => response.json())
    .then(function(data){

        //Getting the first element within the pages object
        page = data.query.pages[Object.keys(data.query.pages)[0]]
        return page.extract;
    });
    return fetchData;
}

//Input animal_name, fetch giphy data, and return html string
function getGiphyByAnimalName(animal_name) {
    var fetchData = fetch('http://api.giphy.com/v1/gifs/search?q=' + animal_name + '&api_key=wrXSrUy02o5zN56E5cFhtNzijtmeWcKe&limit=1')
    .then((response) => response.json())
    .then(function(data){
        
        html = '<div style="width:100%;height:0;padding-bottom:56%;position:relative;">';
        html += '<iframe src="'+data.data[0].embed_url+'" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>';
        html += '</div>';
        return html;
    });
    return fetchData;
}

//Input animal_name, fetch pixabay data, and return url string
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

//Get separate animal data and create single data object
async function getAnimalByAnimalName(animal_name) {
    const wiki = await getWikiByAnimalName(animal_name);
    const giphy = await getGiphyByAnimalName(animal_name);
    const image = await getImageByAnimalName(animal_name);

    var animalData = {
        'wiki': wiki,
        'giphy': giphy,
        'image': image
    };
    
    return animalData;
}


$('.startButton').on('click', function() {
    //hides start page
    $('.startPage').hide();
    //shows classification page
    $('.classification').show();
    console.log('Start Button was clicked');
})


var createAnimal = function(){
    $('.animal').hide();
    $('<button/>', {
        id: 'some-id',
        dataType: 'animal',
        text: 'ANIMAL NAME HERE',
        "class": 'some-class',
    }).appendTo('#content-head');
};

function getAnimalType(type, name = false) {
    
    var selection = animalDefaultObj.filter(animalData => {
        if (type == 'klass') {
            if (animalData.klass == name) {
                return animalData;
            }
        }  else if (type == 'animal') {
            if (animalData.name == name) {
                return animalData;
            }
        } 
    });
    
    return selection;
}

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

$('.selectionItem').on('click', async function() {
    var selectionType = $(this).data('type');
    var selectionName = $(this).data('name');

    if (selectionType == 'klass') {
        var selectionArr = getAnimalType(selectionType, selectionName);

        //Loop Through Each .selectionItem and update with new selectionArr
        $('.selectionItem').each(function(i, el){
        
            //Remove class name + Add new class name
            var attr = $(this).attr('class').split(' ');
            $(el).removeClass(attr[1]).addClass(selectionArr[i].name);

            //Update Data Attributes
            $(el).data('type', 'animal');
            $(el).data('name', selectionArr[i].name);

            //Update Button Text
            $(el).html(humanize(selectionArr[i].name));

            //If Animal is completed, update button with completed class
            if (selectionArr[i].completed == true) {
                $(el).addClass('completed');
            }
        });
    } else if (selectionType == 'animal') {
        //Display Modal
        console.log("modal", selectionName);
        $('.modal').hide();
        updateModalByAnimalName(selectionName);
    }
    
    
});


$('.backToSelection').on('click', function(e){
    var selectionArr = ['mammals', 'fish', 'reptiles', 'insects', 'birds'];

    //Loop Through Each .selectionItem and update with new selectionArr
    $('.selectionItem').each(function(i, el){
        
        //Remove current class name + Add new class name
        var attr = $(this).attr('class').split(' ');
        $(el).removeClass(attr[1]).addClass(selectionArr[i]);

        //Update Data Attributes
        $(el).data('type', 'klass');
        $(el).data('name', selectionArr[i]);

        //Update Button Text
        $(el).html(selectionArr[i]);
    });
})


// REPLACE CLASS 
$('#closeSelection').on('click', function() {
    $('.modal').hide();
    /*
        Hide Modal
        Remove Modal Content from DOM
        Display Current Animal Classifcation Menu
    */
})

// REPLACE CLASS 
// $('.completeBtn').on('click', function() {

//     /*
//         Hide Modal
//         Set animalObject[animal].completed = "true"
//         Remove Modal Content from DOM
//         Display Current Animal Classification Menu
//     */
    
// })





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

function apiWikiTest() {
    fetch("http://en.wikipedia.org/w/api.php?origin=*&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Zebra&format=json")
    .then((response) => response.json())
    .then(function(data){

        //Getting the first element within the pages object
        page = data.query.pages[Object.keys(data.query.pages)[0]]

        //Setting Page Extract To HTML Element
        $("#wiki-test").html(page.extract);

        //Logging the raw data response
        console.log("Wikipedia Query Response", data);

        
    })
}

function apiGiphyTest() {
    //API KEY: wrXSrUy02o5zN56E5cFhtNzijtmeWcKe
    fetch("http://api.giphy.com/v1/gifs/search?q=zebra&api_key=wrXSrUy02o5zN56E5cFhtNzijtmeWcKe&limit=1")
    .then((response) => response.json())
    .then(function(data){
        
        html = '<div style="width:100%;height:0;padding-bottom:56%;position:relative;">';
        html += '<iframe src="'+data.data[0].embed_url+'" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>';
        html += '</div>';

        $("#giphy-test").html(html);

        //Logging the raw data response
        console.log("Giphy Query Response", data);
    })
}

function apiPixabayTest() {
    var apiKey = '22691826-3e6bf0771812c9d2424ab24b4';
    var perPage = 200;
    fetch('https://pixabay.com/api/?key='+ apiKey +'&image_type=photo&order=popular&per_page=' + perPage + '&q=zebra')
    .then((response) => response.json())
    .then(function(data){

        //Get First Image From Result
        var image = data.hits[0].largeImageURL;
        var imageHTML = '<img src="' + image + '" alt="" height="100"/>';

        $("#pixabay-test").html(imageHTML);

        console.log("Pixabay Query Response", data);
    });
}

animalInit();

