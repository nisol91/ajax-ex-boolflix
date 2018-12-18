$(document).ready(function() {

//funzione principale
function my_query(ricerca) {

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
        var voto_10 = films[index]['vote_average']
        var voto_5 = Math.floor(voto_10/2)



        $(this).find('h1').text(films[index]['title'])
        $(this).find('h2').text(films[index]['original_title'])
        $(this).find('h3').text(voto_5)
        $(this).find('h4').text(films[index]['original_language'])
        for (var i = 0; i < voto_5; i++) {
          var copy_star = $('.templates .stelle_piene').clone();
          $(this).find('.stars').append(copy_star)
        }
        for (var i = 0; i < (5 - voto_5); i++) {
          var copy_star = $('.templates .stelle_vuote').clone();
          $(this).find('.stars').append(copy_star)
        }

      });
      //pulisco quello che c era scritto nella ricerca
      $('.searchbar input').val('')
    },
    error: function() {
      console.log("error");
    }
  })
}



//click search
$('.my_button').click(function() {
  var ricerca = $('.searchbar .my_input').val()
  console.log(ricerca);
  var mia_query = my_query(ricerca)
});
//tasto invio
$('.my_input').keypress(function(event) {
  if (event.which == 13) {
    var ricerca = $('.searchbar .my_input').val()
    console.log(ricerca);
    var mia_query = my_query(ricerca)
  }
});




















});


//api key: e1cd6fed3cf1a6213a3fd2941b25d0fc
