function searchMovie(){
    $('#movie-list').html('');
    
    $.ajax({
        type: "get",
        url: "http://omdbapi.com",
        data: {
            'apikey':  '6037a178',
            's' : $('#search-input').val()
        },
        dataType: "json",
        success: function (result) {
            if(result.Response == "True"){
                let movies = result.Search;
                console.log(movies);
                
                $.each(movies, function (i, data) { 
                    $('#movie-list').append(`
                        <div class="col-md-4">
                            <div class="card mb-3">
                                <img src="` + data.Poster + `" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">` + data.Title + `</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">` + data.Year + `</h6>
                                    <a href="#" class="card-link see-detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="` + data.imdbID + `">See detail</a>
                                </div>
                            </div>
                        </div>
                    `);
                });
                
                // $('#search-input').val('');
                
            } else {
                $('#movie-list').html(`
                
                <div class="col">
                    <h1 class="text-center">` + response.Error + `</h1>
                </div>

                `);
            }
        }
    });
}

$('#search-button').click(function (e) { 
    e.preventDefault();
    
    searchMovie();
});

$('#search-input').keyup(function (e) { 
    if(e.keyCode == 13){
        searchMovie();
    }
});

$('#movie-list').on('click', '.see-detail', function (e) { 
    e.preventDefault();
    
    $.ajax({
        type: "get",
        url: "http://omdbapi.com",
        data: {
            'apikey':  '6037a178',
            'i' : $(this).data('id')
        },
        dataType: "json",
        success: function (movie) {
            if(movie.Response == "True"){
                
                $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="` + movie.Poster + `" class="img-fluid">
                            </div>

                            <div class="col-md-8">
                                <ul class="list-group">
                                    <li class="list-group-item"><h3>` + movie.Title + `</h3></li>
                                    <li class="list-group-item">Release : ` + movie.Released + `</li>
                                    <li class="list-group-item">Genre : ` + movie.Genre  + `</li>
                                    <li class="list-group-item">Director : ` + movie.Director  + `</li>
                                    <li class="list-group-item">Actors : ` + movie.Actors  + `</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `);
            }
        }
    });
});