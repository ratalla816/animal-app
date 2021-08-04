/*
Object & Persistence
*/

var animalDefaultObj = [
    //Mammals
    {id: 0, klass: 'mammal', name: 'whale', completed: false },
    {id: 1, klass: 'mammal', name: 'zebra', completed: false },
    {id: 2, klass: 'mammal', name: 'platypus', completed: false },
    {id: 3, klass: 'mammal', name: 'polar_bear', completed: false },
    {id: 4, klass: 'mammal', name: 'wombat', completed: false },
    //Fish
    {id: 5, klass: 'fish', name: 'piranha', completed: false },
    {id: 6, klass: 'fish', name: 'whale_shark', completed: false },
    {id: 7, klass: 'fish', name: 'jellyfish', completed: false },
    {id: 8, klass: 'fish', name: 'blob_fish', completed: false },
    {id: 9, klass: 'fish', name: 'anglerfish', completed: false },
    //Insects
    {id: 10, klass: 'insect', name: 'ant', completed: false },
    {id: 11, klass: 'insect', name: 'stick_bug', completed: false },
    {id: 12, klass: 'insect', name: 'firefly', completed: false },
    {id: 13, klass: 'insect', name: 'cockroach', completed: false },
    {id: 14, klass: 'insect', name: 'praying_mantis', completed: false },
    //Birds
    {id: 15, klass: 'bird', name: 'hummingbird', completed: false },
    {id: 16, klass: 'bird', name: 'golden_eagle', completed: false },
    {id: 17, klass: 'bird', name: 'toucan', completed: false },
    {id: 18, klass: 'bird', name: 'pink_flamingo', completed: false },
    {id: 19, klass: 'bird', name: 'ostrich', completed: false },
    //Reptiles
    {id: 20, klass: 'reptile', name: 'komodo_dragon', completed: false },
    {id: 21, klass: 'reptile', name: 'king_cobra', completed: false },
    {id: 22, klass: 'reptile', name: 'crocodile', completed: false },
    {id: 23, klass: 'reptile', name: 'tortoise', completed: false },
    {id: 24, klass: 'reptile', name: 'anaconda', completed: false },
];

console.log(animalDefaultObj);

//(({ a, c })
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

    //Get Animals from localStorage
    var animalObj = getAnimals();

    //Sample Animal Request
    var animalData = await getAnimalByAnimalName(animalObj[0].name);

    //Test Adding to HTML
    contentTest(animalData);

    //Log animalObj and sample animalData
    console.log("animalObj:", animalObj, "animalData:", animalData);
}

//Test to parse animalData and display on frontend
//Not needed in final submission
function contentTest(animalData){
    var wiki = animalData.wiki;
    var giphy = animalData.giphy;
    var image = animalData.image;
    
    var html = "<div>";
        html += "<p>" + wiki + "</p";
        html += giphy;
        html += "<img src=" + image + "alt= />";
        html += "</div>";
    
    $('#content-test').html(html);
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
    var fetchData = fetch("http://api.giphy.com/v1/gifs/search?q=zebra&api_key=wrXSrUy02o5zN56E5cFhtNzijtmeWcKe&limit=1")
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
    var fetchData = fetch('https://pixabay.com/api/?key='+ apiKey +'&image_type=photo&order=popular&per_page=' + perPage + '&q=zebra')
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


/*

    * The HTML for a selection now looks like the below. When the ".selectionItem" gets clicked, 
    * we need to get the data attributes and use them to display the correct selection.
    
    <div class="selectionWrapper">
        <button class="selectionItem" data-type="" data-name="">
            <div class="selectionTitle">
                Lorem Ipsum
            </div>
            <div class="selectionBG">
                <img src="#" alt="Some image" />
            </div>
        </button>
    </div>

    * data-type is either "klass" or "animal". 
        o If the button is for a classification, data-type="klass". 
        o If the button is for an animal, data-type="animal"
    * data-name is either the name of the classification or the animal name

*/


$('.startButton').on('click', function() {
    //hides start page
    $('.startPage').hide();
    //shows classification page
    $('.classification').show();
    console.log('Start Button was clicked');
})

var listLength = 5;
console.log(animalDefaultObj[0].id);

var createAnimalList = function(){
    $('.classification').hide();
    $('.animalsList').show();

        for(var i=0; i<3; i++){
            var html = '<div class="column is-4">' + 
               '<button class="button is-large is-rounded is-fullwidth is-primary is-outlined selectionItem" data-type="animal">'
               + animalDefaultObj[i].name +
               '</button>' +
           '</div>';

           $('.animals3').append(html);
        }
        for(var i=0; i<2; i++){
            var html1 = '<div class="column is-6">' + 
               '<button class="button is-large is-rounded is-fullwidth is-primary is-outlined selectionItem" data-type="animal">'
               + animalDefaultObj[i].name +
               '</button>' +
           '</div>';

           $('.animals2').append(html1);
        }

<<<<<<< HEAD
var createAnimal = function(){
    $('.animal').hide();
    $('<button/>', {
        id: 'some-id',
        dataType: 'animal',
        text: 'ANIMAL NAME HERE',
        "class": 'some-class',
    }).appendTo('#content-head');

    
=======
>>>>>>> feature/jqueryNew
};

// var html = '<div class="column is-4">' + 
//                '<button class="button is-large is-rounded is-fullwidth is-primary is-outlined selectionItem" data-type="animal">'
//                '</button>' +
//            '</div>';

/*
    Ive consolidated the animalType and animalSelection class to selectionItem. We need to rewrite
    an event handler to listen for clicks on ".selectionItem"
    
    After being clicked, we need to get the "data-type" and "data-name" attributes from the ".selectionItem"
    DOM Element
        If the data-type="klass",
            Get animals with data-type="klass_name"
            Update HTML with selection animal classification
        If the data-type="animal"
            Get animalData
            Set animalData within Modal HTML
            Trigger Modal
*/

// giving attribute 
    //$(this).attr('data-','7')

$('.selectionItem').on('click',function() {
    console.log('class clicked');

    var dataType = $(this).data('type');
    console.log(dataType);
    var dataName = $(this).data('name');
    console.log(dataName);
    
    //need to make sure it appends the right name to the button
    if(dataName == 'mammals'){
        console.log('true');
        // 
    }
    else{
        console.log('false')
    }


    createAnimalList();
});

$('.animalSelection').on('click',function() {
    //alert('second button was clicked');
    // call function for api here to display information about specific animal
    // redirects to modal page

    // show information base on which actuall animal is clicked
    // interacts with api
    // use logic to fire up modal
});

// REPLACE CLASS 
$('.closeBtn').on('click', function() {
    /*
        Hide Modal
        Remove Modal Content from DOM
        Display Current Animal Classifcation Menu
    */
})

// REPLACE CLASS 
$('.completeBtn').on('click', function() {

    /*
        Hide Modal
        Set animalObject[animal].completed = "true"
        Remove Modal Content from DOM
        Display Current Animal Classification Menu
    */
    
})

/*
    We need to create an event handler for when "#selectionBack" is clicked, we update the HTML with
    the animal selection menu.

    - Remove animal selection HTML from DOM
    - Add animal classification HTML to DOM
*/

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
        // var random = Math.floor(Math.random() * data.hits.length);
        // var image = data.hits[random].pageURL;

        //Get First Image From Result
        var image = data.hits[0].largeImageURL;
        var imageHTML = '<img src="' + image + '" alt="" height="100"/>';

        $("#pixabay-test").html(imageHTML);

        console.log("Pixabay Query Response", data);
    });
}

animalInit();
// apiWikiTest();
// apiGiphyTest();
// apiPixabayTest();
// change only works with input,textarea, & select elements
// some edit


