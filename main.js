$(document).ready(function() {


$('.my_button').click(function() {


  var ricerca = $('.searchbar .my_input').val()
  console.log(ricerca);
  $('.vetrina .film').remove()
  $.ajax({
    url: 'https://api.themoviedb.org/3/search/movie?api_key=e1cd6fed3cf1a6213a3fd2941b25d0fc',
    type: 'GET',
    data: {
      // key: 'e1cd6fed3cf1a6213a3fd2941b25d0fc',
      query: ricerca,
    },
    success: function(data) {
    console.log("success");


    var risultato = data
    // console.log(risultato);
    var films = data.results
    console.log(films);

    for (var i = 0; i < films.length; i++) {
      var copy = $('.templates .film').clone();
      $('.vetrina').append(copy)
    }
    $('.vetrina .film').each(function(index) {
      $(this).find('h1').text(films[index]['title'])
      $(this).find('h2').text(films[index]['original_title'])
      $(this).find('h3').text(films[index]['vote_average'])
      $(this).find('h4').text(films[index]['original_language'])

    });
    //pulisco quello che c era scritto nella ricerca
    $('.searchbar input').val('')
    },
    error: function() {
    console.log("error");
    }
  })





});





















});


//api key: e1cd6fed3cf1a6213a3fd2941b25d0fc
