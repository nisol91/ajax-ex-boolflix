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
    url: 'https://api.themoviedb.org/3/search/multi?api_key=e1cd6fed3cf1a6213a3fd2941b25d0fc',
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

      //****
      //dal momento che la ricerca multi mi cerca anche 'persone', di cui non mi frega un cazzo,
      //le elimino dall array con splice
      for (var i = 0; i < films.length; i++) {
        if (films[i]['media_type'] == 'person') {
          console.log(films[i]);
          films.splice(i, 1);
        }
      }
      for (var i = 0; i < films.length; i++) {
        if (films[i]['media_type'] == 'person') {
          console.log(films[i]);
          films.splice(i, 1);
        }
      }
      for (var i = 0; i < films.length; i++) {
        if (films[i]['media_type'] == 'person') {
          console.log(films[i]);
          films.splice(i, 1);
        }
      }
      console.log(films);
      //so che e' una follia, ma ne ho fatti tre per far ripassare l array piu volte in cerca di person,
      //perche con un solo ciclo , andando a eliminare alcune posizioni, l indice i saltava certe posizioni
      //dell array che erano persone.
      //****
      



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


        if (films[index]['media_type'] == 'movie') {
          $(this).find('h1').text(films[index]['title'])
          $(this).find('h2').text(films[index]['original_title'])
          $(this).find('h3').text(voto_5)
          $(this).find('h4').text(lingua)
          $(this).find('h5').text(films[index]['release_date'])
          $(this).find('.over p').text(films[index]['overview'])

        } else if  (films[index]['media_type'] == 'tv') {
          $(this).find('h1').text(films[index]['name'])
          $(this).find('h2').text(films[index]['original_name'])
          $(this).find('h5').text(films[index]['first_air_date'])
          $(this).find('.over p').text(films[index]['overview'])
          $(this).find('#tipo').text('Serie Tv')


          // chiamata ajax per gli attori dentro a credit(SERIE TV)
          var codice = films[index]['id']
          console.log(codice);

          $.ajax({
            url: 'https://api.themoviedb.org/3/tv/' + codice + '/credits?api_key=e1cd6fed3cf1a6213a3fd2941b25d0fc',
            type: 'GET',
            data: {
            },
            success: function(data) {
              console.log("success");
              for (var i = 0; i < 5; i++) {
                var attori = data.cast[i]['name']
                console.log(attori);
                if (i < 4) {
                  vetrina_film.find('.credits .attori_tv').append(attori + ', ')
                } else {
                  vetrina_film.find('.credits .attori_tv').append(attori + '.')
                }
              }
            },
            error: function() {
              console.log("error");
            }
          });
        }




        //molto importante! perche se non creo questa variabile, il this nell ajax qua sotto diventa
        //la chiamata stessa!!!
        var vetrina_film = $(this)

        //chiamata ajax per i generi
        var generis = []
        var gen = films[index]['genre_ids']
        for (var i = 0; i < gen.length; i++) {
          generis.push(gen[i])
        }
        console.log(generis);

        $.ajax({
          url: 'https://api.themoviedb.org/3/genre/movie/list?api_key=e1cd6fed3cf1a6213a3fd2941b25d0fc',
          type: 'GET',
          data: {
          },
          success: function(data) {
            console.log("success");
            var miei_generi = data.genres
            console.log(miei_generi);
            var count = 0
            for (var i = 0; i < miei_generi.length; i++) {
              if (generis.includes(miei_generi[i]['id'])) {
                count += 1
                vetrina_film.find('.generi .genres').append('<p>Genere ' + count + ': ' + miei_generi[i]['name'] + '</p>')
              }
            }
          },
          error: function() {
            console.log("error");
          }
        });



        //chiamata ajax per gli attori dentro a credit
        if (films[index]['media_type'] == 'movie') {

          var codice = films[index]['id']
          console.log(codice);

          $.ajax({
            url: 'https://api.themoviedb.org/3/movie/' + codice + '/credits?api_key=e1cd6fed3cf1a6213a3fd2941b25d0fc',
            type: 'GET',
            data: {
            },
            success: function(data) {
              console.log("success");
              for (var i = 0; i < 5; i++) {
                var attori = data.cast[i]['name']
                console.log(attori);
                if (i < 4) {
                  vetrina_film.find('.credits .attori_movie').append(attori + ', ')
                } else {
                  vetrina_film.find('.credits .attori_movie').append(attori + '.')
                }
              }
            },
            error: function() {
              console.log("error");
            }
          });
        }
        //-----------
        //STILE VETRINA
        var immagine_copertina = films[index]['poster_path']
        console.log(immagine_copertina);
        $(this).find('.img_copertina').attr('src', 'https://image.tmdb.org/t/p/' + 'w185' + immagine_copertina);
        if (immagine_copertina == null) {
          $(this).find('.img_copertina').addClass('no_img')
        }

        for (var i = 0; i < voto_5; i++) {
          var copy_star = $('.templates .stelle_piene').clone();
          $(this).find('.stars').append(copy_star)
        }
        for (var i = 0; i < (5 - voto_5); i++) {
          var copy_star = $('.templates .stelle_vuote').clone();
          $(this).find('.stars').append(copy_star)
        }

        //nascondo le scritte
        $('.vetrina .film div').hide()
        //on hover mouse per mostrare le scritte
        $(document).on('mouseenter', '.vetrina .film .img_copertina', function(event) {
          $('.vetrina .film div').hide()
          $('.vetrina .film .img_copertina').show()
          $(this).fadeOut('slow');
          $(this).siblings('div').show()
        });
        $(document).on('mouseleave', '.vetrina .film', function(event) {
          $('.vetrina .film div').hide()
          $('.vetrina .film .img_copertina').fadeIn('slow');
          $(this).siblings('div').show()
        });

      });


      //pulisco quello che c era scritto nella ricerca
      $('.searchbar input').val('')

      //******************

      //chiamata per SERIE TV
      // if (films.length == 0) {
      //   $.ajax({
      //     url: 'https://api.themoviedb.org/3/search/tv?api_key=e1cd6fed3cf1a6213a3fd2941b25d0fc',
      //     type: 'GET',
      //     data: {
      //       query: ricerca,
      //     },
      //     success: function(data) {
      //       console.log("success");
      //
      //       var risultato = data
      //       // console.log(risultato);
      //       var films = data.results
      //       console.log(films);
      //
      //       //creo un numero di cartoline uguale al numero di film trovati dal DB
      //       for (var i = 0; i < films.length; i++) {
      //         var copy = $('.templates .film').clone();
      //         $('.vetrina').append(copy)
      //       }
      //
      //       //inserisco tutti i valori del film presi dal DB
      //       $('.vetrina .film').each(function(index) {
      //         var voto_10 = films[index]['vote_average']
      //         var voto_5 = Math.floor(voto_10/2)
      //
      //         var lingua = films[index]['original_language']
      //         for (var i = 0; i < languages.length; i++) {
      //           if (lingua === languages[i].lang) {
      //             $(this).find('.lingua img').attr('src', languages[i].img);
      //           }
      //         }
      //
      //         $(this).find('h1').text(films[index]['name'])
      //         $(this).find('h2').text(films[index]['original_name'])
      //         $(this).find('h3').text(voto_5)
      //         $(this).find('h4').text(lingua)
      //         $(this).find('h5').text(films[index]['first_air_date'])
      //         $(this).find('.over p').text(films[index]['overview'])
      //         $(this).find('#tipo').text('Serie Tv')
      //
      //
      //
      //         //molto importante! perche se non creo questa variabile, il this nell ajax qua sotto diventa
      //         //la chiamata stessa!!!
      //         var vetrina_film = $(this)
      //
      //
      //         //chiamata ajax per i generi
      //         var generis = []
      //         var gen = films[index]['genre_ids']
      //         for (var i = 0; i < gen.length; i++) {
      //           generis.push(gen[i])
      //         }
      //         console.log(generis);
      //
      //         $.ajax({
      //           url: 'https://api.themoviedb.org/3/genre/movie/list?api_key=e1cd6fed3cf1a6213a3fd2941b25d0fc',
      //           type: 'GET',
      //           data: {
      //           },
      //           success: function(data) {
      //             console.log("success");
      //             var miei_generi = data.genres
      //             console.log(miei_generi);
      //             var count = 0
      //             for (var i = 0; i < miei_generi.length; i++) {
      //               if (generis.includes(miei_generi[i]['id'])) {
      //                 count += 1
      //                 vetrina_film.find('.generi .genres').append('<p>Genere ' + count + ': ' + miei_generi[i]['name'] + '</p>')
      //               }
      //             }
      //           },
      //           error: function() {
      //             console.log("error");
      //           }
      //         });
      //
      //
      //         //chiamata ajax per gli attori dentro a credit(SERIE TV)
      //         var codice = films[index]['id']
      //         console.log(codice);
      //
      //         $.ajax({
      //           url: 'https://api.themoviedb.org/3/tv/' + codice + '/credits?api_key=e1cd6fed3cf1a6213a3fd2941b25d0fc',
      //           type: 'GET',
      //           data: {
      //           },
      //           success: function(data) {
      //             console.log("success");
      //             for (var i = 0; i < 5; i++) {
      //               var attori = data.cast[i]['name']
      //               console.log(attori);
      //               if (i < 4) {
      //                 vetrina_film.find('.credits .attori').append(attori + ', ')
      //               } else {
      //                 vetrina_film.find('.credits .attori').append(attori + '.')
      //               }
      //             }
      //           },
      //           error: function() {
      //             console.log("error");
      //           }
      //         });
      //
      //
      //         var immagine_copertina = films[index]['poster_path']
      //         $(this).find('.img_copertina').attr('src', 'https://image.tmdb.org/t/p/' + 'w342' + immagine_copertina);
      //         for (var i = 0; i < voto_5; i++) {
      //           var copy_star = $('.templates .stelle_piene').clone();
      //           $(this).find('.stars').append(copy_star)
      //         }
      //         for (var i = 0; i < (5 - voto_5); i++) {
      //           var copy_star = $('.templates .stelle_vuote').clone();
      //           $(this).find('.stars').append(copy_star)
      //         }
      //
      //         //nascondo le scritte
      //         $('.vetrina .film div').hide()
      //         //on hover mouse per mostrare le scritte
      //         $(document).on('mouseenter', '.vetrina .film .img_copertina', function(event) {
      //           $('.vetrina .film div').hide()
      //           $('.vetrina .film .img_copertina').show()
      //           $(this).fadeOut('slow');
      //           $(this).siblings('div').show()
      //         });
      //         $(document).on('mouseleave', '.vetrina .film', function(event) {
      //           $('.vetrina .film div').hide()
      //           $('.vetrina .film .img_copertina').fadeIn('slow');
      //           $(this).siblings('div').show()
      //         });
      //
      //       });
      //       //pulisco quello che c era scritto nella ricerca
      //       $('.searchbar input').val('')
      //     },
      //     error: function() {
      //       console.log("error");
      //     }
      //   })
      // }
      //fine chiamata serie tv
      //**************
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
