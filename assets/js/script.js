
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

apiWikiTest();
apiGiphyTest();
