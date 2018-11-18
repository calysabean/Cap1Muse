const Yelp_SEARCH_URL = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?';

function getDataFromApi(searchTerm, locationTerm, callback) {
  const settings = {
    url: Yelp_SEARCH_URL,
    data: {
      q: `${searchTerm}`,
      location: `${locationTerm}`,
      categories: 'museums',
      sort_by: 'distance',
      limit: 50,

    },
    headers: {
    'Authorization': 'Bearer usiWT_1-4jpxhSQScBGLOPtIEVnKLaRuacCuAJ__zbFv1H2WtU8DNt8fS2Zt1yjUr9qZX-uIks5cDsLEIZBumIqc6gg7aivVK3kkbDTg_jLEUoVWxbzHCUYmsXrSW3Yx',
    },
    dataType: 'json',
    type: 'GET',
    success: callback
  };
$.ajax(settings);
}

// Opening page, hide on click
function homePage() { 
  $('.landingBox').on('click', function(event) {
  $('.landingBox').remove();
  $('.hiddenForm').css('display', 'block');
});
}

// Template for form
function displayResult(result) {
  let phoneFormat = result.phone.replace(/(\d{1})(\d{3})(\d{3})(\d{4})/, '$1-$2-$3-$4');
  let phoneFormat2 = result.phone.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
  return `
  <div class="viewPort formCss">
  <section class="formCss3">
  <form class="finalResults">
    <fieldset>
    <label for="answerOption">
    <input class="answerOption" type="checkbox" value="${result.name}" name="answer" >
    </label>
    </fieldset>
    </form>
  <a href="${result.url}" target="_blank"><img class="thumbnail-image" src="${result.image_url}"></a>  
    <p>${result.name}</p>
    <p>${result.location.display_address}</p>
    <p class="phone">${phoneFormat}</p> 
    <p>Rating: ${result.rating}</p>
    </section>
  </div> 
  `;
}

// Display template
function displayYelpSearchResults(data) {
 const searchResults = data.businesses.map((item, index) => displayResult(item));
 $('.js-search-results').html(searchResults);
}

// Search submit button on click hide any "not" clicked div's
function selectedData(){
  $('.submitButton').on('click', function (event) {
    event.preventDefault();

    $.each($("input[name='answer']:not(:checked)"), function() {
  $(this).closest('div').hide();
    });
    })
    }
 
 // Second page search button, process values and show submit button   
function watchSubmit() {
  homePage();
  $('.js-search-form').submit(function( event ) {
    event.preventDefault();
    let queryTarget = $(event.currentTarget).find('.js-query');
    let queryTarget1 = $(event.currentTarget).find('.js-query1');
    let query = queryTarget.val();
    let query1 = queryTarget1.val();
    queryTarget.val("museums");
    queryTarget1.val("");
    showSubmitButton();  
    getDataFromApi(query, query1, displayYelpSearchResults);
  });
}

function showSubmitButton() {
  $('.submitButton').css('display', 'block');
}

$(() => {
  watchSubmit();
  /*phoneFormat()*/
  selectedData();
});
