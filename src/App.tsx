import React, {useEffect, useState} from 'react';
import './App.css';
import {
    AppBar,
    Toolbar,
    Typography
} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import {ThemeProvider, createTheme} from "@mui/material/styles";
import VisitorForm from "./components/visitorForm";
import VisitorTable from "./components/visitorTable";

let theme = createTheme({
    palette: {
        primary: {
            main: "#EF5742",
        }
    }
});

theme = createTheme(theme, {
    palette: {
        blue: theme.palette.augmentColor({
            color: {
                main: "#2196F3"
            }, name: "blue"
        })
    }
});

export interface VisitorType {
    id: string
    visitor: string
    email: string
    department: string
}

function App() {
    const localStorageVisitors = localStorage.getItem("visitors") ? JSON.parse(localStorage.getItem("visitors") || "[]") : []
    const [visitorArray, setVisitorArray] = useState(localStorageVisitors)

    useEffect(() => {
        localStorage.setItem('visitors', JSON.stringify(visitorArray))
    }, [visitorArray])

    return (
        <ThemeProvider theme={theme}>
            <main className="App">
                <AppBar position="static">
                    <Toolbar>
                        <FavoriteIcon sx={{mr: 2}}/>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            Awesome Guestbook
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className="content">
                    <VisitorForm visitorArray={visitorArray} setVisitorArray={setVisitorArray}/>
                    <VisitorTable visitorArray={visitorArray} setVisitorArray={setVisitorArray}/>
                </div>
            </main>
        </ThemeProvider>
    );
}

export default App;
