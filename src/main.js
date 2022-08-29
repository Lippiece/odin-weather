import "@adipiscing/image-slider";

import {
  css,
  injectGlobal,
} from "@emotion/css";

injectGlobal`
  @import '@primer/css/utilities/index.scss';

  :root {
    font-family: 'Rubik', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
`;

const body    = document.querySelector( "body" )
  .addStyles( css`
    width: 100vw;
    height: 100vh;

    color: var( --color-fg-default );

    background-color: var( --color-bg-default );
  ` );
const content = document.querySelector( "#content" )
  .addStyles( css`
  display: flex;
  flex-direction: column;
  gap: 2em;
  align-items: center;
  padding: 2em;

  * {
    /* color: inherit; */
    font-family: inherit;
  }

  h1 {
    font-size: 1.5em;
  }

  /* input {
    width: 30%;
  } */

  form {
    display: flex;
    gap: 1em;
    align-items: center;
    justify-content: center;

    button {
      padding: 0.5em;

      color: var( --color-fg-default );

      background-color: var( --color-bg-overlay );
      border: none;
      border-radius: var( --border-radius );
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
      border-color: var( --color-fg-default );
      border-radius: var( --border-radius-1 );
    }
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
