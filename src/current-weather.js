const key = "1c9287e01c2d0b797dcff3a182cab997";
/**
 * It fetches the weather data for
 * a given place and then displays the conditions
 * @param place - The name of the city to get the weather for.
 * @param parent - The parent element to append the data to.
 */
const requestWeather = async function( place, parent ) {

  try {

    const response = await fetch( `https://api.openweathermap.org/data/2.5/weather?q=${ place }&units=metric&appid=${ key }` );
    await displayConditions( response, parent );

  } catch ( error ) { console.error( error ) }

};
/**
 * It takes the response from the API, and then it
 * creates a bunch of HTML elements and appends them to the DOM
 * @param response - the response object from the fetch request
 * @param parent - the parent element to which apply the results
 */
const displayConditions = async function( response, parent ) {

  /* Getting the data out */
  const {
    weather,
    main,
    wind,
    name: cityName,
  } = await response.json();
  const {
    temp: temperature,
    feels_like: feelsLike,
    humidity: humidityPercentage,
  } = main;
  const weatherDescription = weather[0].description;
  const windSpeed          = wind.speed;
  const weatherIconElement = createWeatherIcon( weather, weatherDescription );
  packResultsToNode(
    parent,
    cityName,
    weatherIconElement,
    weatherDescription,
    temperature,
    feelsLike,
    humidityPercentage,
    windSpeed
  );
  /**
   * append the above elements to a container
   * and append that to the parent
   */

};
/**
 * It takes a bunch of weather data, and returns a DOM node containing that data
 * @returns An object with two properties: resultNodes and results.
 */
const packResultsToNode = function( parent, cityName, weatherIconElement, weatherDescription, temperature, feelsLike, humidityPercentage, windSpeed ) {

  const outputCurrent = document.createElement( "div" )
    .addId( "output-current" );
  const resultStrings = [
    String( cityName ),
    String( weatherDescription ),
    `Temperature: ${ temperature }°C`,
    `Feels like ${ feelsLike }°C`,
    `Humidity: ${ humidityPercentage }%`,
    `Wind speed: ${ windSpeed }m/s`,
  ];
  const resultNodes   = resultStrings.map( string => {

    const result = document.createElement( "p" );
    result.append( string );

    return result;

  } );
  const detailsContainer = document.createElement( "div" )
    .addId( "current-details" );
  detailsContainer.replaceChildren( ...resultNodes );
  parent.querySelector( "#weather-icon" )
    .replaceWith( weatherIconElement );
  parent.querySelector( "#current-details" )
    .replaceWith( detailsContainer );

  return { outputCurrent, resultNodes };

};
const createWeatherIcon = function( weather, weatherDescription ) {

  const weatherIcon        = weather[0].icon;
  const weatherIconUrl     = `http://openweathermap.org/img/wn/${ weatherIcon }@2x.png`;
  const weatherIconElement = document.createElement( "img" )
    .addId( "weather-icon" );
  weatherIconElement.setAttribute( "src", weatherIconUrl );
  weatherIconElement.setAttribute( "alt", weatherDescription );

  return weatherIconElement;

};
export default requestWeather;
