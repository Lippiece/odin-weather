import "@adipiscing/image-slider";

import { css } from "@emotion/css";

import requestWeather from "./current-weather.js";

// import requestForecast from "./forecast.js";

const body    = document.querySelector( "body" )
  .addStyles( css`
  --color-fg: hsl( 15deg 100% 88% / 75% );
  --color-fg-muted: hsl( 15deg 100% 88% / 60% );
  --color-fg-subtle: hsl( 15deg 100% 88% / 45% );
  --color-fg-accent: hsl( 200deg 100% 70% / 100% );
  --color-fg-success: hsl( 130deg 50% 50% / 100% );
  --color-bg: hsl( 0deg 0% 13% );
  --color-bg-overlay: hsl( 0deg 0% 25% );
  --color-bg-emphasis: hsl( 0deg 0% 35% );

  width: 100vw;
  height: 100vh;

  color: var( --color-fg );

  font-family: Rubik, "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;

  background-color: var( --color-bg );
  ` );
const content = document.querySelector( "#content" )
  .addStyles( css`
  display: flex;
  flex-direction: column;
  gap: 2em;
  align-items: center;
  padding: 2em;

  * {
    font-family: inherit;
  }

  h1 {
    font-size: 2.5em;
  }

  h2 {
    font-size: 1.5em;
  }

  /* p {

  } */

  form {
    display: flex;
    gap: 1em;
    align-items: center;
    justify-content: center;

    button {
      padding: 0.5em;

      color: var( --color-fg );

      background-color: var( --color-bg-overlay );
      border: none;
      cursor: pointer;

      &:hover {
        color: var( --bg-closer );

        background-color: var( --color-bg-overlay );

        transition: transform 0.2s ease-in-out;

        &:active {
          transform: scale( 0.9 );

          transition: transform 0.2s ease-in-out;
        }
      }
    }

    input {
      width: 100%;
      padding: 0.5em;

      color: var( --primary );

      background-color: var( --color-bg-overlay );
      border: none;
    }
  }

  #results {
    display: flex;
    flex-direction: column;
    gap: 1em;
    align-items: center;
    justify-content: center;
  }

  #output {
    display: flex;
    flex-direction: column;

    font-size: 1.2em;
    font-variant: all-small-caps;

    img {

      margin-bottom: -2em;

      transform: scale( 0.5 );

      transition: transform 0.2s ease-in-out;

      &:hover {
        transform: scale( 0.6 );

        transition: transform 0.2s ease-in-out;
      }
    }
  }

  #current-details {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    align-items: center;
    justify-content: center;

    & :first-child {
      color: var( --color-fg-success );
      font-size: 1.5em;
      text-shadow: 0 0 0.25em var( --color-fg-success );
    }
  }
` );
const header  = document.createElement( "h1" )
  .addId( "header" )
  .appendTo( content );
header.append( "Weather" );
const description = document.createElement( "p" )
  .addId( "description" )
  .appendTo( content )
  .addStyles( css`
    text-align: center;
  ` );
description.append( "What's the weather like today?" );
const form       = document.createElement( "form" )
  .addId( "form" )
  .appendTo( content );
const queryInput = document.createElement( "input" )
  .addId( "query-input" )
  .appendTo( form );
queryInput.setAttribute( "type", "text" );
queryInput.setAttribute( "name", "query" );
queryInput.setAttribute( "placeholder", "City" );
const submitCurrentButton = document.createElement( "button" )
  .addId( "current-button" )
  .appendTo( form );
submitCurrentButton.append( "Now" );

/* const submitForecastButton = document.createElement( "button" )
     .addId( "forecast-button" )
     .appendTo( form );
   submitForecastButton.append( "Forecast" ); */
const weatherContainer = document.createElement( "div" )
  .addId( "weather-container" )
  .appendTo( content );
// current weather
const outputCurrent           = document.createElement( "div" )
  .addId( "output-current" )
  .appendTo( weatherContainer );
const weatherIconCurrent      = document.createElement( "div" )
  .addId( "weather-icon" )
  .appendTo( outputCurrent );
const detailsContainerCurrent = document.createElement( "div" )
  .addId( "current-details" )
  .appendTo( outputCurrent );
// forecast
const outputForecast = document.createElement( "div" )
  .addId( "output-forecast" )
  .appendTo( weatherContainer );
submitCurrentButton.addEventListener( "click", event => {

  event.preventDefault();
  requestWeather( queryInput.value, weatherContainer );

} );

// submitForecastButton.addEventListener( "click", event => {

/*   event.preventDefault();
     requestForecast( queryInput.value, weatherContainer ); */

// } );
