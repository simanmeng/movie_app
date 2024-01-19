//Build an application that uses jQuery to do the following:

//Contains a form with two inputs for a title and rating along with a button to submit the form.
//When the form is submitted, capture the values for each of the inputs and append them to the DOM along with a button to remove each title and rating from the DOM.
//When the button to remove is clicked, remove each title and rating from the DOM.

//- Ensure that the rating of a movie can only be between 0 and 10.
//Ensure that a title has at least 2 characters in it.
//Allow users to sort alphabetically by the title of the movie or by the rating of the movie from lowest to highest and vice versa.

//capture the input values on submit
const $movies = [];
$('form').on('submit', formHandler)
$('ul').on('click','.removeBtn',removeBtnHandler)

function formHandler (evt) {
    evt.preventDefault()
    let $title = $('.form-control').eq(0).val();
    let $rating = $('.form-control').eq(1).val();
    $movies.push({title:$title, rating:$rating});

    createMovie($title,$rating);
    if(!$('.sort').children().length) {
        createSort()
    }
}

function createMovie (title, rating) {

    let $newLi = $(`<li>${title}: ${rating} <button class="removeBtn">Remove</button></li>`);
    $newLi.addClass(`${rating}`);
    $('ul').append($newLi)
    $('li').css('list-style-type','none');
}

function removeBtnHandler (evt) {
    let removeIdx = 0
    let buttons = document.getElementsByClassName('removeBtn')
    for(let i=0; i<buttons.length; i++) {
        if(buttons[i] === evt.target) {
            removeIdx = i
        }
    }
    $movies.splice(removeIdx,1)
    evt.target.parentElement.remove();
}

function createSort () {
    const $sortAlph = $('<button class="sort-alphabet">Sort alphabetically</button>');
    const $sortRating = $('<button class="sort-rating">Sort by rating</button>');

    $sortAlph.on('click',sortByAlphabet);
    $sortRating.on('click',sortByRating);

    $('.sort').append($sortAlph).append($sortRating);
}

function sortByAlphabet (evt) {
    let sortedLi = [];
    $movies.sort(function (a,b) {
        if(a.title.toLowerCase() < b.title.toLowerCase()) {
            return -1;
            } 
            else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1;
            } 
            else {
                return 0;
            }
        })
    for(let i=0; i<$movies.length; i++) {
        sortedLi.push(`<li class="${$movies[i].rating.toString()}">${$movies[i].title}: ${$movies[i].rating} <button class="removeBtn">Remove</button></li>`)
    }
    $('ul').get(0).innerHTML =  sortedLi.join('');
    $('li').css('list-style-type','none');
}


function sortByRating (evt) {
    let sortedLi = [];
    $movies.sort((first,second) => second.rating - first.rating)
    for(let i=0;i<$movies.length;i++){
        sortedLi.push(`<li class="${$movies[i].rating.toString()}">${$movies[i].title}: ${$movies[i].rating} <button class="removeBtn">Remove</button></li>`);
    }
    $('ul').get(0).innerHTML =  sortedLi.join('');
    $('li').css('list-style-type','none');
}   
