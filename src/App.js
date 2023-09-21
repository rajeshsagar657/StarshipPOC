import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Starship from './Starship';
import Button from '@mui/material/Button';
import { AppBar, CircularProgress, Grid, Toolbar, Typography } from '@mui/material';

const CONSTANTS = {
  next: 'next',
  prev: 'previous'
}

const App = () => {
  const [starships, setStarships] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [prevButtonState, setPrevButtonState] = useState(false);
  const [nextButtonState, setNextButtonState] = useState(false);

  const handlePageClick = (action) => {
    setIsLoading(true);
    let currentPageNumber = action === CONSTANTS.next ? currentPage + 1 : currentPage - 1;
    setCurrentPage(currentPageNumber);
  }

  useEffect(() => {
    if (isLoading) {
      axios.get(`https://swapi.dev/api/starships/?page=${currentPage}`)
        .then(response => {
          const data = response.data;

          document.title = `Starships - Page ${currentPage}`;
          setStarships(data.results);
          setIsLoading(false);
          setPrevButtonState(data.previous === null ? true : false);
          setNextButtonState(data.next ? false : true);
        });
    }
  });

  const sortedStarShips = [...starships].sort((a, b) =>
    a.crew > b.crew ? 1 : -1,
  );

  const starShipsWithCrewFilter = sortedStarShips.filter(ship => ship.crew <= 10);

  console.log(starShipsWithCrewFilter);

  return (
    isLoading ? <CircularProgress color="secondary" className='loader' /> :
      <div className="App">
        <AppBar component="nav">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              Star Ships
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="list grid">
          {
            starShipsWithCrewFilter.map((ship, index) =>
              <Grid container spacing={2} key={index}>
                <Starship
                  key={index}
                  name={ship.name}
                  modelName={ship.model}
                  films={ship?.films?.length}
                  hyperdrive={ship.hyperdrive_rating} />
              </Grid>)
          }
        </div>
        <footer>
          <div className="grid">
            <Button
              variant="contained"
              onClick={() => handlePageClick(CONSTANTS.prev)}
              disabled={prevButtonState}
              className="btn-prev">Previous</Button>
            <Button
              variant="contained"
              onClick={() => handlePageClick(CONSTANTS.next)}
              disabled={nextButtonState}
              className="btn-next">Next</Button>
          </div>
        </footer>
      </div>
  );
}

export default App;
