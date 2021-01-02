# MOVIE-SWAP
* **
### Instructions
##### 1) Setting up the database (server side)
```movies-swap```.
    
* ```createdb movies-swap```
    
* ```psql -d movies-swap -f db/movies-swap.sql```

That should set up an empty database with the name ```movies-swap```.
One can manage ```movies-swap``` using ```console.py```

#### 2) Setting up the client (react js)
```npm install```

### Brief
The user randomly sees movies one-by-one and selects which one has seen/liked/disliked. The user can filter which movies are being showed to them by the following filters: year-range, score-range and genre. The user can add/remove friends, and sync with them in order to see which movies are liked by both (common liked movies). 



### APIs used:
* https://api.themoviedb.org/3
* IMDB api







