import React from "react";
import MainNavigator from "./navigators/main";
import "./App.css";
import {theme} from "./styles/theme";
import {ThemeProvider} from "styled-components";

const App: React.FC = () => {

    return (
        <ThemeProvider theme={theme}>
            <MainNavigator/>
        </ThemeProvider>

    );
};

export default App;
