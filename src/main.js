import "@adipiscing/image-slider";

import {
  css,
  injectGlobal,
} from "@emotion/css";

import requestWeather from "./current-weather.js";

injectGlobal`
  :root {
    --color-fg: hsl( 15deg 100% 88% / 75% );
    --color-fg-muted: hsl( 15deg 100% 88% / 60% );
    --color-fg-subtle: hsl( 15deg 100% 88% / 45% );
    --color-fg-accent: hsl( 200deg 100% 70% / 100% );
    --color-fg-success: hsl( 130deg 50% 50% / 100% );

    --color-bg: hsl( 0deg 0% 13% );
    --color-bg-overlay: hsl( 0deg 0% 25% );
    --color-bg-emphasis: hsl( 0deg 0% 35% );
    font-family: 'Rubik', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
`;

const body    = document.querySelector( "body" )
  .addStyles( css`
    width: 100vw;
    height: 100vh;

    color: var( --color-fg );

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
` );
const header  = document.createElement( "h1" )
  .addId( "header" )
  .appendTo( content );
header.append( "Hello World" );
const description = document.createElement( "p" )
  .addId( "description" )
  .appendTo( content )
  .addStyles( css`
    text-align: center;
  ` );
description.append( "This is a simple example of a web application." );
const form       = document.createElement( "form" )
  .addId( "form" )
  .appendTo( content );
const queryInput = document.createElement( "input" )
  .addId( "query-input" )
  .appendTo( form );
queryInput.setAttribute( "type", "text" );
queryInput.setAttribute( "name", "query" );
queryInput.setAttribute( "placeholder", "Search..." );
const submitButton = document.createElement( "button" )
  .addId( "submit-button" )
  .appendTo( form );
submitButton.append( "Submit" );
const results = document.createElement( "div" )
  .addId( "results" )
  .appendTo( content );
submitButton.addEventListener( "click", event => {

  event.preventDefault();
  requestWeather( queryInput.value, results );

} );
