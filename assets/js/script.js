// change only works with input,textarea, & select elements

// init page
$('.startBtn').on('click', function() {
    // starts app and redirects to classification page
   // $(this).hide(); should hide main page
})

$('.animalType').on('click',function() {
    alert('first button was clicked');
    // call function to display animals of classification clicked by user
    // redirects to animal selection page

    // if mammals select then show mammals option
    // if fish select then show fish option
    // if insects select then show insects option
    // if birds select then show birds option
    // if reptiles select then show reptiles option
});

$('.animalSelection').on('click',function() {
    alert('second button was clicked');
    // call function for api here to display information about specific animal
    // redirects to modal page

    // show information base on which actuall animal is clicked
    // interacts with api
    // use logic to fire up modal
});

// REPLACE CLASS 
$('.closeBtn').on('click', function() {
    // closes page after user done with specific animal 
})

// REPLACE CLASS 
$('.completeBtn').on('click', function() {
    // allows user to mark THIS animal as complete
})
