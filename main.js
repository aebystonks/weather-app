function addCity(city) {
	favoriteCities.push(city)
}

function getElementById(id) {
	return document.getElementById(id)
}

function getWeatherInfo(tempValue, cityValue, icon) {
	temperature.textContent = Math.round(tempValue)
	city.textContent = cityValue
	weatherImg.src = `https://openweathermap.org/img/wn/${icon}@4x.png`
	searchInput.value = ''
}

const searchForm = getElementById('search')
const searchInput = getElementById('search-input')
const weather = getElementById('weather')
const temperature = getElementById('temperature')
const city = getElementById('city')
const like = getElementById('like-img')
const locations = getElementById('locations')
const locationList = getElementById('locations-list')

const weatherImg = document.querySelector('.weather-img')

let favoriteCities = []

function favoriteCitiesRender() {
	locationList.textContent = ''
	favoriteCities.forEach(element => {
		let newLi = document.createElement('li')
		let deleteButton = document.createElement('button')
		newLi.className = 'location'
		newLi.textContent = element
		deleteButton.className = 'remove-location-btn'
		deleteButton.textContent = '❌'

		newLi.appendChild(deleteButton)
		locationList.appendChild(newLi)

		deleteButton.addEventListener('click', () => {
			favoriteCities = favoriteCities.filter(item => {
				console.log(item), item !== newLi.childNodes[0]
			})
			console.log(favoriteCities)
		})
	})
}
like.addEventListener('click', () => {
	addCity(city.textContent)
	favoriteCitiesRender()
	console.log(favoriteCities)
})

function weatherData() {
	const serverUrl = 'http://api.openweathermap.org/data/2.5/weather'
	const cityName = searchInput.value
	const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f'
	const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`

	fetch(url)
		.then(response => {
			if (!response.ok) {
				throw new Error('Такого города не существует!')
			}
			return response.json()
		})
		.then(response => {
			getWeatherInfo(
				response.main.temp,
				response.name,
				response.weather[0].icon
			)
		})
		.catch(error => {
			alert(error.message)
		})
}

searchForm.addEventListener('submit', event => {
	event.preventDefault()

	weatherData()
	likeButton()
	console.log(cities)
})
