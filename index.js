const Yelp_SEARCH_URL = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?';

function getDataFromApi(searchTerm, locationTerm, callback) {
  const settings = {
    url: Yelp_SEARCH_URL,
    data: {
      //key: 'hZqOo0Aj_JbEY46TQWJaHd1DEZ6Qq0gLtg2wukZJJY_B9yHcZ3rnY19ZnVc6UfKMxRtSBRa_0fZjIwHhLYlTZ05_87eSTOuTdgaiO9_cPqQSg6l0y3AA2Fb3cyLNW3Yx',
      q: `${searchTerm}`,
      location: `${locationTerm}`,
      categories: 'museums',
      sort_by: 'distance',
      limit: 50,
      offset: 51

    },
    headers: {
    'Authorization': 'Bearer usiWT_1-4jpxhSQScBGLOPtIEVnKLaRuacCuAJ__zbFv1H2WtU8DNt8fS2Zt1yjUr9qZX-uIks5cDsLEIZBumIqc6gg7aivVK3kkbDTg_jLEUoVWxbzHCUYmsXrSW3Yx'
    },
    dataType: 'json',
    type: 'GET',
    success: callback
  };
  //console.log(settings);
$.ajax(settings);
}

function homePage() { 
  $('.landingBox').on('click', function(event) {
  $('.landingBox').remove();
  $('.hiddenForm').css('display', 'block');
});
}



function displayResult(result) {
  return `
  <div class="col-6 formCss">
    <a href="${result.url}" target="_blank"><img src="${result.image_url}"></a>
      <section class="formCss3">
    <p>${result.name}</p>
    <p>${result.location.display_address}</p>
    <p>${result.phone}</p> 
    <p>${result.rating}</p>
    <form class="finalResults">
    <fieldset>
    <label for="answerOption">
    <input class="answerOption" type="checkbox" value="${result.name}" name="answer" >
    </label>
    </fieldset>
    </form>
    </section>
  </div> 
  `;
}

function displayYelpSearchResults(data) {
 const searchResults = data.businesses.map((item, index) => displayResult(item));
 $('.js-search-results').html(searchResults);
 // render another div
}

function selectedData(){
  $('.submitButton').on('click', function (event) {
    event.preventDefault();
    console.log('hello');

      // var values = new Array();
$.each($("input[name='answer']:not(:checked)"), function() {
  console.log('inside of each');
 // values.push($(this).val());
 
  $(this).closest('div').hide();
});
    })
  }
 

function watchSubmit() {
  homePage();
  $('.js-search-form').submit(function( event ) {
    event.preventDefault();
    let queryTarget = $(event.currentTarget).find('.js-query');
    let queryTarget1 = $(event.currentTarget).find('.js-query1');
    let query = queryTarget.val();
    let query1 = queryTarget1.val();
    queryTarget.val("");
    queryTarget1.val("");
    //console.log(event);
      showSubmitButton();  
    getDataFromApi(query, query1, displayYelpSearchResults);
    //selectedAnswer();

  });

}

function showSubmitButton() {
  $('.submitButton').css('display', 'block');
}

$(() => {
  watchSubmit();
  selectedData();
  //finalPage();
});
