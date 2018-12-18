$(document).ready(function() {

//lingue

var languages = [
  {
    lang: 'en',
    img: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/1920px-Flag_of_the_United_Kingdom.svg.png'
  },
  {
    lang: 'it',
    img: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Flag_of_Italy.svg/1280px-Flag_of_Italy.svg.png'
  },
  {
    lang: 'ru',
    img: 'https://upload.wikimedia.org/wikipedia/en/archive/f/f3/20120812153730%21Flag_of_Russia.svg'
  },
  {
    lang: 'es',
    img: 'https://i.ebayimg.com/images/g/yeYAAOSw7XBY8PPv/s-l300.jpg'
  },
  {
    lang: 'fr',
    img: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/1200px-Flag_of_France.svg.png'
  },
  {
    lang: 'de',
    img: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1280px-Flag_of_Germany.svg.png'
  },
  {
    lang: 'no',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Norway.svg/2000px-Flag_of_Norway.svg.png'
  },
  {
    lang: 'zh',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/255px-Flag_of_the_People%27s_Republic_of_China.svg.png'
  },
  {
    lang: 'ja',
    img: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Flag_of_Japan.svg/1280px-Flag_of_Japan.svg.png'
  }
]

//funzione principale
function my_query(ricerca) {

  $('.vetrina .film').remove()

  //chiamata per FILM
  $.ajax({
    url: 'https://api.themoviedb.org/3/search/movie?api_key=e1cd6fed3cf1a6213a3fd2941b25d0fc',
    type: 'GET',
    data: {
      query: ricerca,
    },
    success: function(data) {
      console.log("success");

      var risultato = data
      // console.log(risultato);
      var films = data.results
      console.log(films);

      //creo un numero di cartoline uguale al numero di film trovati dal DB
      for (var i = 0; i < films.length; i++) {
        var copy = $('.templates .film').clone();
        $('.vetrina').append(copy)
      }

      //inserisco tutti i valori del film presi dal DB
      $('.vetrina .film').each(function(index) {
        var voto_10 = films[index]['vote_average']
        var voto_5 = Math.floor(voto_10/2)

        var lingua = films[index]['original_language']
        for (var i = 0; i < languages.length; i++) {
          if (lingua === languages[i].lang) {
            $(this).find('.lingua img').attr('src', languages[i].img);
          }
        }

        var immagine_copertina = films[index]['poster_path']

        $(this).find('h1').text(films[index]['title'])
        $(this).find('h2').text(films[index]['original_title'])
        $(this).find('h3').text(voto_5)
        $(this).find('h4').text(lingua)
        $(this).find('.img_copertina').attr('src', 'https://image.tmdb.org/t/p/' + 'w185' + immagine_copertina);
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
      //chiamata per SERIE TV
      if (films.length == 0) {
        $.ajax({
          url: 'https://api.themoviedb.org/3/search/tv?api_key=e1cd6fed3cf1a6213a3fd2941b25d0fc',
          type: 'GET',
          data: {
            query: ricerca,
          },
          success: function(data) {
            console.log("success");

            var risultato = data
            // console.log(risultato);
            var films = data.results
            console.log(films);

            //creo un numero di cartoline uguale al numero di film trovati dal DB
            for (var i = 0; i < films.length; i++) {
              var copy = $('.templates .film').clone();
              $('.vetrina').append(copy)
            }

            //inserisco tutti i valori del film presi dal DB
            $('.vetrina .film').each(function(index) {
              var voto_10 = films[index]['vote_average']
              var voto_5 = Math.floor(voto_10/2)

              var lingua = films[index]['original_language']
              for (var i = 0; i < languages.length; i++) {
                if (lingua === languages[i].lang) {
                  $(this).find('.lingua img').attr('src', languages[i].img);
                }
              }

              $(this).find('h1').text(films[index]['name'])
              $(this).find('h2').text(films[index]['original_name'])
              $(this).find('h3').text(voto_5)
              $(this).find('h4').text(lingua)
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

//document ready
});


//api key: e1cd6fed3cf1a6213a3fd2941b25d0fc
