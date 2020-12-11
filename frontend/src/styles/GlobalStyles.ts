import { create } from "domain";
import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    html{
        min-height: 100%auto;
        background: var(--primary);
    }
    *, button, input{
        border: 0;
        background: none;
        font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
        color: var(--black);
    }
    ul {
        list-style: none;
    }
    :root {
        --primary: #fff;
        --black: #1b1f23;
        --gray: #586069;
        --gray-light: #6a737d;
        --gray-dark: #24292e;
        --orange: #f9826c;
        --logo: #fff;
        --header: #24292e;
        --icon: #6a737d;
        --link: #0366d6;
        --border: #e1e4e8;
        --ticker: rgba(209,213,218, .5);
        
        --segunda: #f1e05a;
        --terça: #2b7489;
        --quarta: #992DEC;
        --quinta:#2979DC;
        --sexta: #E7944B;
        --sabado: #C33562;
        --domingo: #F6F93F;
    }




`;
