
const loadPlayer = async () => { 
  try {
    const searchField = document.getElementById('search-input');
    const playerName = searchField.value;
    searchField.value = '';
    document.getElementById('players').textContent = '';
    
    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${playerName}`;
  
    const response = await fetch(url);
    const data = await response.json();
    const {player} = data
    displayPlayer(player);  
    
    document.querySelectorAll('.err-div').forEach(el => {
      el.classList.add('d-none');
    });
  } 
  catch (error) {
    const playersContainer = document.getElementById('players-container');

    const div = document.createElement('div');
    div.classList.add('err-div')
    div.innerHTML = `
      <p class="h3 text-center text-danger mt-5">No Players Found</p>
    `;

    playersContainer.appendChild(div);
  }
  
}

const displayPlayer = player => {
  const playersContainer = document.getElementById('players');
  
  player.forEach(player => {
    const playerDiv = document.createElement('div');
    playerDiv.classList.add('col');
  
    playerDiv.innerHTML = `
      <div class="card h-100">
       <img src="${player.strThumb ? player.strThumb : ''}" class="card-img-top" alt="player-photo">
       <div class="card-body">
        <h5 class="card-title">${player.strPlayer}</h5>
        <p class="card-text">Nationality: ${player.strNationality}</p>
        <p class="card-text">Sport: ${player.strSport}</p>
       </div>
       <div class="card-footer bg-white border-0 d-flex justify-content-center mb-3">
         <button onclick="displayDetail(${player.idPlayer})" class="btn btn-primary">Learn More</button>
       </div>
      </div>
    `;

    playersContainer.appendChild(playerDiv);
  }); 
}

const displayDetail = async (id) => {
  const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${id}`;

  const response = await fetch(url);
  const data = await response.json();
   
  document.getElementById('players-container').style.display = 'none';

  const playerDetailsContainer = document.getElementById('player-details');

  const div = document.createElement('div');

  div.innerHTML = `
    <h1 class="text-center">Messi</h1>
    <h4 class="text-center mb-5">Argentina</h4>
    <table class="table table-dark table-striped w-75 mx-auto">
      <thead>
        <tr>
          <th scope="col">Params</th>
          <th scope="col">Data</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Born</th>
          <td>Mark</td>
        </tr>
        <tr>
          <th scope="row">Birth-place</th>
          <td>dhaka</td>
        </tr>
        <tr>
          <th scope="row">Sports Name</th>
          <td>cric</td>
        </tr>
        <tr>
          <th scope="row">Gender</th>
          <td>male</td>
        </tr>
        <tr>
          <th scope="row">Position</th>
          <td>forwd</td>
        </tr>
        <tr>
          <th scope="row">Team</th>
          <td>Chelsea</td>
        </tr>
        <tr>
          <th scope="row">Height</th>
          <td>6</td>
        </tr>
        <tr>
          <th scope="row">Weight</th>
          <td>66</td>
        </tr>
        <tr>
          <th scope="row">Kit</th>
          <td>Adidas</td>
        </tr>
      </tbody>
    </table>
  `;
}

