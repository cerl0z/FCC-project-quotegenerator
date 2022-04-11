// !! IMPORTANT README:

// You may add additional external JS and CSS as needed to complete the project, however the current external resource MUST remain in place for the tests to work. BABEL must also be left in place.

/***********
INSTRUCTIONS:
  - Select the project you would 
    like to complete from the dropdown 
    menu.
  - Click the "RUN TESTS" button to
    run the tests against the blank 
    pen.
  - Click the "TESTS" button to see 
    the individual test cases. 
    (should all be failing at first)
  - Start coding! As you fulfill each
    test case, you will see them go   
    from red to green.
  - As you start to build out your 
    project, when tests are failing, 
    you should get helpful errors 
    along the way!
    ************/

// PLEASE NOTE: Adding global style rules using the * selector, or by adding rules to body {..} or html {..}, or to all elements within body or html, i.e. h1 {..}, has the potential to pollute the test suite's CSS. Try adding: * { color: red }, for a quick example!

// Once you have read the above messages, you can delete all comments.
import React from "react";
import "./QuoteBox.css";
import { Button, Box, ButtonGroup, Link } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  status: {
    danger: "#eac4d5",
  },
  palette: {
    primary: {
      main: "#95b8d1",
    },
    dark: {
      main: "#809bce",
    },
  },
});
const INIT_FADE_DURATION = 500;
const FADE_DURATION = 800;

class QuoteBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: "",
      author: "",
      randomIndex: Math.floor(Math.random() * 1642),

      fadeState: "fade-in",
      fadeTransition: null,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const timeout = setTimeout(() => {
      fetch("https://type.fit/api/quotes")
        .then((res) => res.json())
        .then((quotesList) => {
          const idx = this.state.randomIndex;
          this.setState({
            quote: quotesList[idx].text,
            author:
              quotesList[idx].author === null
                ? "Unknown"
                : quotesList[idx].author,
            randomIndex: Math.floor(Math.random() * 1642),

            fadeState: "fade-in",
            fadeTransition: timeout,
          });
        });
    }, INIT_FADE_DURATION);

    clearTimeout(this.state.fadeTransition);

    this.setState({
      fadeState: "fade-out",
      fadeTransition: timeout,
    });
  }

  handleClick() {
    const timeout = setTimeout(() => {
      fetch("https://type.fit/api/quotes")
        .then((res) => res.json())
        .then((quotesList) => {
          const idx = this.state.randomIndex;
          this.setState({
            quote: quotesList[idx].text,
            author:
              quotesList[idx].author === null
                ? "Unknown"
                : quotesList[idx].author,
            randomIndex: Math.floor(Math.random() * 1642),

            fadeState: "fade-in",
            fadeTransition: timeout,
          });
        });
    }, FADE_DURATION);

    clearTimeout(this.state.fadeTransition);

    this.setState({
      fadeState: "fade-out",
      fadeTransition: timeout,
    });
  }

  render() {
    const tweetQuote = encodeURIComponent(this.state.quote);
    return (
      <ThemeProvider theme={theme}>
        <Box
          display="flex"
          flexDirection="column"
          margin="0 auto"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          id="quote-box"
          width="400px"
        >
          <Box
            className={`fade-wrapper ${this.state.fadeState}`}
            style={{ transitionDuration: `${FADE_DURATION}ms` }}
            backgroundColor="#b8e0d2"
            border={0}
            borderRadius={5}
            fontSize="1.5em"
            color={theme.palette.dark.main}
          >
            <p id="text">{this.state.quote}</p>
            <p id="author">-{this.state.author}</p>

            <ButtonGroup variant="outlined" size="small">
              <Box mr={3}>
                <Button
                  className="hoverStyle"
                  id="new-quote"
                  onClick={this.handleClick}
                  color="dark"
                >
                  New Quote
                </Button>
              </Box>
              <Link
                href={`https://twitter.com/intent/tweet?hashtags=quotes&text=${tweetQuote}`}
                id="tweet-quote"
                target="_blank"
                underline="none"
                rel="noopener"
              >
                {<TwitterIcon fontSize="large" />}
              </Link>
            </ButtonGroup>
          </Box>
        </Box>
      </ThemeProvider>
    );
  }
}
export default QuoteBox;
//ReactDOM.render(<QuoteBox/>, document.getElementById('root'));
