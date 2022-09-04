const key = "1c9287e01c2d0b797dcff3a182cab997";
/**
 * It fetches the forecast data from the OpenWeatherMap API,
 * extracts the data we need, and packs it into the container
 *
 * @param query - the city name
 * @param container - the container where the forecast will be displayed
 */
const requestForecast = async( query, container ) => {

  try {

    const response = await fetch( `https://api.openweathermap.org/data/2.5/forecast?q=${ query }&units=metric&appid=${ key }` );
    const { list } = await response.json();

    packToContainer( container, extractData( list ) );

  } catch ( error ) { console.error( error ) }

};
const extractData = list => list.map( ( {
  dt_txt: dateTime,
  main:{ temp:temperature, feels_like: feelsLike, temp_min: temperatureMin, temp_max: temperatureMax, pressure, humidity },
  weather:[{ description, icon }],
  wind:{ speed },
  clouds: { all: cloudiness },
  pop: rainProbability,
  rain = "no data",
  snow = "no data",
} ) => ( {
  cloudiness,
  dateTime,
  description,
  feelsLike,
  humidity,
  icon,
  pressure,
  rain: { "3h": rain = "no data" },
  rainProbability,
  snow: { "3h": snow = "no data" },
  speed,
  temperature,
  temperatureMax,
  temperatureMin,
} ) );
/**
 * It takes a container and a data object, and then replaces
 * the container's children with a new div that contains the data
 *
 * @param container - the container element that will hold the forecast
 * @param data - an array of objects, each object containing the weather data for a specific time stamp
 */
const packToContainer = ( container, data ) => {

  const outputForecast = document.createElement( "div" )
    .addId( "output-forecast" );
  data.map( timeStamp => displayTimestamp( timeStamp, outputForecast ) );
  container.querySelector( "#output-forecast" )
    .replaceWith( outputForecast );

};
const displayTimestamp = function displayTimestamp( timeStamp, outputForecast ) {

  const container     = document.createElement( "div" )
  .appendTo( outputForecast )
  container.classList.add( "timestamp-container" );
  const icon          = createWeatherIcon( timeStamp.icon, timeStamp.description )
    .appendTo( container );
  const resultStrings = [
    String( timeStamp.dateTime.replace() ),
    `Description: ${ String( timeStamp.description ) }`,
    `Temperature: ${ String( timeStamp.temperature ) }`,
    `Feels like: ${ String( timeStamp.feelsLike ) }`,
    `Temperature range: ${ String( timeStamp.temperatureMin ) }-${ String( timeStamp.temperatureMax ) }`,
    `Pressure: ${ String( timeStamp.pressure ) }`,
    `Humidity: ${ String( timeStamp.humidity ) }`,
    `Wind speed: ${ String( timeStamp.speed ) }`,
    `Cloudiness: ${ String( timeStamp.cloudiness ) }`,
    `Rain probability: ${ String( timeStamp.rainProbability ) }`,
    `3-hours rain volume ${ String( timeStamp.rain["3h"] ) }`,
    `3-hours snow volume ${ String( timeStamp.snow["3h"] ) }`,
  ];
  resultStrings.map( string => {

    if ( string.includes( "no data" ) ) return;

    return document.createElement( "p" )
      .appendTo( container )
      .chainAppend( string );

  } );

};
const createWeatherIcon = function createWeatherIcon( icon, description ) {

  const weatherIconElement = document.createElement( "img" );
  weatherIconElement.src   = `http://openweathermap.org/img/wn/${ icon }@2x.png`;
  weatherIconElement.alt   = description;

  return weatherIconElement;

};
export default requestForecast;
