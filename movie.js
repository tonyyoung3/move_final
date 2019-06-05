(function () {
  const genres = {
    "1": "Action",
    "2": "Adventure",
    "3": "Animation",
    "4": "Comedy",
    "5": "Crime",
    "6": "Documentary",
    "7": "Drama",
    "8": "Family",
    "9": "Fantasy",
    "10": "History",
    "11": "Horror",
    "12": "Music",
    "13": "Mystery",
    "14": "Romance",
    "15": "Science Fiction",
    "16": "TV Movie",
    "17": "Thriller",
    "18": "War",
    "19": "Western"
  }
  const BASE_URL = 'https://movie-list.alphacamp.io'
  const INDEX_URL = BASE_URL + '/api/v1/movies/'
  const POSTER_URL = BASE_URL + '/posters/'
  const dataPanel = document.getElementById('data-panel')
  const category = document.getElementById('category')
  const data = []
  let prevCategory = ''


  axios.get(INDEX_URL).then((response) => {
    data.push(...response.data.results)
    // console.log(data)

    let categoryContent = ""
    for (i in genres) {
      categoryContent += `<li class="list-group-item">${genres[i]}</li>`
      // console.log(genres[i])
    }

    category.innerHTML = categoryContent

    // displayDataList(data)
    displayDataList(data)

  }).catch((err) => console.log(err))


  category.addEventListener('click', (event) => {
    // console.log(event.target.innerText)
    let filter = ''
    let filterData = []

    if (prevCategory) {
      prevCategory.classList.remove("active")
    }


    filter = event.target.innerText
    console.log(filter)
    filterData = data.filter((movie) => {
      // console.log(movie.title)
      let movieGenre = []
      for (index in movie.genres) {
        // console.log(movie.genres[index],genres[movie.genres[index]])
        movieGenre.push(genres[movie.genres[index]])
      }
      return movieGenre.includes(filter)
    })

    prevCategory = event.target
    event.target.classList.add("active")
    console.log(filterData)
    displayDataList(filterData)
  })


  function displayDataList(data) {
    let htmlContent = ''
    data.forEach(function (item, index) {
      let moviegenres = []

      for (i in item.genres) {

        moviegenres.push(genres[item.genres[i]])
      }

      let movieBasic = `
        <div class="col-3">
          <div class="card mb-2">
            <img class="card-img-top " src="${POSTER_URL}${item.image}" alt="Card image cap">
            <div class="card-body movie-item-body" id='card-body'>
              <h6 class="card-title">${item.title}</h5>
            </div>
             <div class='card-footer'>
              <div class='row'>
              `

      let movieTag = ''

      let footer = `
            </div>
            </div>
             </div>
          </div>
        </div>
          `

      for (i in item.genres) {
        movieTag += `
              <div class="card mb-2 genre">${genres[item.genres[i]]}</div> 
          `
      }

      let content = movieBasic + movieTag + footer


      htmlContent += content

    })
    dataPanel.innerHTML = htmlContent
  }

})()