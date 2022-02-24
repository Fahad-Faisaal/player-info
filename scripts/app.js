// handler for search button
const loadPlayer = async () => { 
  try {
    // Clearing infos from previous learn more results
    document.getElementById('player-details').classList.add('d-none');
    document.getElementById('player-details').textContent='';

    // clearing field and prev search
    document.getElementById('players-container').style.display = 'block';
    const searchField = document.getElementById('search-input');
    const playerName = searchField.value;
    searchField.value = '';
    document.getElementById('players').textContent = '';
    
    // fetching data to show search results
    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${playerName}`;
    const response = await fetch(url);
    const data = await response.json();
    const {player} = data
    displayPlayer(player);  
    
    // removing prev error msg from ui
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
  };
  
};

// helping function for display results
const displayPlayer = player => {
  const playersContainer = document.getElementById('players');
  
  // generating result for each players
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

// handler for learn more button
const displayDetail = async (id) => {
  // look-up for player using id
  const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${id}`;
  const response = await fetch(url);
  const data = await response.json();
  const playerInfo = data.players[0];
   
  // removing search results from ui
  document.getElementById('players-container').style.display = 'none';

  // generating info results
  const playerDetailsContainer = document.getElementById('player-details');
  const div = document.createElement('div');

  div.innerHTML = `
    <h1 class="text-center">${playerInfo.strPlayer}</h1>
    <h4 class="text-center mb-5">${playerInfo.strNationality}</h4>
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
          <td>${playerInfo.dateBorn}</td>
        </tr>
        <tr>
          <th scope="row">Birth-place</th>
          <td>${playerInfo.strBirthLocation}</td>
        </tr>
        <tr>
          <th scope="row">Sports Name</th>
          <td>${playerInfo.strSport}</td>
        </tr>
        <tr>
          <th scope="row">Gender</th>
          <td>${playerInfo.strGender}</td>
        </tr>
        <tr>
          <th scope="row">Position</th>
          <td>${playerInfo.strPosition}</td>
        </tr>
        <tr>
          <th scope="row">Team</th>
          <td>${playerInfo.strTeam}</td>
        </tr>
        <tr>
          <th scope="row">Height</th>
          <td>${playerInfo.strHeight}</td>
        </tr>
        <tr>
          <th scope="row">Weight</th>
          <td>${playerInfo.strWeight}</td>
        </tr>
        <tr>
          <th scope="row">Kit</th>
          <td>${playerInfo.strKit}</td>
        </tr>
      </tbody>
    </table>
  `;

  playerDetailsContainer.appendChild(div);

  //showing info on ui 
  playerDetailsContainer.classList.remove('d-none');  
}

