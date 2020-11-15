var base_url = "https://api.football-data.org/";

function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}

function json(response) {
  return response.json();
}

function error(error) {
  console.log("Error : " + error);
}


function getStandings() {
  if ('caches' in window) {
    caches.match(base_url + "v2/competitions/2001/standings").then(function (response) {
      if (response) {
        response.json().then(function (data) {
          var standingsHTML = "";

          standingsHTML += `
          <div class="card-panel">
            <div class="row">
              <span>Last Update : ${data.competition.lastUpdated}</span>
            </div>
            <div class="row">
              <span>Season Start : ${data.season.startDate}</span>
            </div>
            <div class="row">
              <span>Season End : ${data.season.endDate}</span>
            </div>
          </div>
          `;

          data.standings.forEach(function (standing) {
            if (standing.type == "TOTAL") {
              standingsHTML += `
              <div class="card">
                <div class="card-content">
                  <span class="card-title">${standing.group}</span>
              `;


              standing.table.forEach(function (tabl) {
                standingsHTML += `
                <a href="./team.html?id=${tabl.team.id}">
                    <div class="row valign-wrapper standing-info">
                        <div class="col s2">
                            <img class="responsive-img" src="${tabl.team.crestUrl}" />
                        </div>

                        <div class="col s10">
                            <div class="row">
                                <div class="col s12">
                                    <span>Name : ${tabl.team.name}</span><br>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col s6 l3">
                                    <span>Played Games : ${tabl.playedGames}</span>
                                </div>
                                <div class="col s6 l3">
                                    <span>Won : ${tabl.won}</span>
                                </div>
                                <div class="col s6 l3">
                                    <span>Draw : ${tabl.draw}</span>
                                </div>
                                <div class="col s6 l3">
                                    <span>Lost : ${tabl.lost}</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col s6 l3">
                                    <span>Goals For : ${tabl.goalsFor}</span>
                                </div>
                                <div class="col s6 l3">
                                    <span>Goals Against : ${tabl.goalsAgainst}</span>
                                </div>
                                <div class="col s6 l3">
                                    <span>Goals Difference : ${tabl.goalDifference}</span>
                                </div>
                                <div class="col s6 l3">
                                    <span>Points : ${tabl.points}</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </a>                  
                `;
              });

              standingsHTML += `
                </div>
              </div>
              `;
            }
          });

          document.getElementById("standings").innerHTML = standingsHTML;
        })
      }
    })
  }

  fetch(base_url + "v2/competitions/2001/standings", {
    method: 'GET',
    headers: {
      'X-Auth-Token': '886341565da1476bbdf6b5c10b14a978'
    }
  })
    .then(status)
    .then(json)
    .then(function (data) {
      var standingsHTML = "";

      standingsHTML += `
      <div class="card-panel">
        <div class="row">
          <span>Last Update : ${data.competition.lastUpdated}</span>
        </div>
        <div class="row">
          <span>Season Start : ${data.season.startDate}</span>
        </div>
        <div class="row">
          <span>Season End : ${data.season.endDate}</span>
        </div>
      </div>
      `;

      data.standings.forEach(function (standing) {
        if (standing.type == "TOTAL") {
          standingsHTML += `
          <div class="card">
            <div class="card-content">
              <span class="card-title">${standing.group}</span>
          `;


          standing.table.forEach(function (tabl) {
            standingsHTML += `
            <a href="./team.html?id=${tabl.team.id}">
                <div class="row valign-wrapper standing-info">
                    <div class="col s2">
                        <img class="responsive-img" src="${tabl.team.crestUrl}" />
                    </div>

                    <div class="col s10">
                        <div class="row">
                            <div class="col s12">
                                <span>Name : ${tabl.team.name}</span><br>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col s6 l3">
                                <span>Played Games : ${tabl.playedGames}</span>
                            </div>
                            <div class="col s6 l3">
                                <span>Won : ${tabl.won}</span>
                            </div>
                            <div class="col s6 l3">
                                <span>Draw : ${tabl.draw}</span>
                            </div>
                            <div class="col s6 l3">
                                <span>Lost : ${tabl.lost}</span>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col s6 l3">
                                <span>Goals For : ${tabl.goalsFor}</span>
                            </div>
                            <div class="col s6 l3">
                                <span>Goals Against : ${tabl.goalsAgainst}</span>
                            </div>
                            <div class="col s6 l3">
                                <span>Goals Difference : ${tabl.goalDifference}</span>
                            </div>
                            <div class="col s6 l3">
                                <span>Points : ${tabl.points}</span>
                            </div>
                        </div>

                    </div>
                </div>
            </a>                  
            `;
          });

          standingsHTML += `
            </div>
          </div>
          `;
        }
      });

      document.getElementById("standings").innerHTML = standingsHTML;
    })
    .catch(error);
}

function getTeamById() {
  return new Promise(function (resolve, reject) {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

    if ('caches' in window) {
      caches.match(base_url + "v2/teams/" + idParam).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            var teamHTML = "";

            teamHTML += `
            <div class="card">
              <div class="card-image waves-effect waves-block waves-light">
                  <img class="image-team" src="${data.crestUrl}">
              </div>
              <div class="card-content">
                  <span id="team-name" class="card-title grey-text text-darken-4">${data.name}</span>

                  <div class="row">
                      <div class="col s3">
                          <span>Short Name</span>
                      </div>
                      <div class="col s9">
                          <span>: ${data.shortName}</span>
                      </div>
                  </div>
                  <div class="row">
                      <div class="col s3">
                          <span>Address</span>
                      </div>
                      <div class="col s9">
                          <span>: ${data.address}</span>
                      </div>
                  </div>
                  <div class="row">
                      <div class="col s3">
                          <span>Phone</span>
                      </div>
                      <div class="col s9">
                          <span>: ${data.phone}0</span>
                      </div>
                  </div>
                  <div class="row">
                      <div class="col s3">
                          <span>Website</span>
                      </div>
                      <div class="col s9">
                          <span>: ${data.website}</span>
                      </div>
                  </div>
                  <div class="row">
                      <div class="col s3">
                          <span>Email</span>
                      </div>
                      <div class="col s9">
                          <span>: ${data.email}</span>
                      </div>
                  </div>
                  <div class="row">
                      <div class="col s3">
                          <span>Founded</span>
                      </div>
                      <div class="col s9">
                          <span>: ${data.founded}</span>
                      </div>
                  </div>
                  <div class="row">
                      <div class="col s3">
                          <span>Venue</span>
                      </div>
                      <div class="col s9">
                          <span>: ${data.venue}</span>
                      </div>
                  </div>
              </div>
            </div>
            `;

            teamHTML += `
            <div class="card">
              <div class="card-content">
                  <span class="card-title">Player Squad</span>

                  <table class="striped responsive-table">
                      <thead>
                          <tr>
                              <th>Name</th>
                              <th>Position</th>
                              <th>Date of Birth</th>
                              <th>Nationality</th>
                          </tr>
                      </thead>

                      <tbody>                
            `

            data.squad.forEach(function (squa) {
              if (squa.role == "PLAYER") {
                teamHTML += `
                <tr>
                  <td>${squa.name}</td>
                  <td>${squa.position}</td>
                  <td>${squa.dateOfBirth}</td>
                  <td>${squa.nationality}</td>
                </tr>                
                `
              }
            });

            teamHTML += `
                      </tbody>
                  </table>
              </div>
            </div>                
            `
            document.getElementById("body-content").innerHTML = teamHTML;
            resolve(data);
          });
        }
      });
    }

    fetch(base_url + "v2/teams/" + idParam, {
      method: 'GET',
      headers: {
        'X-Auth-Token': '886341565da1476bbdf6b5c10b14a978'
      }
    })
      .then(status)
      .then(json)
      .then(function (data) {
        console.log(data);
        var teamHTML = "";

        teamHTML += `
        <div class="card">
          <div class="card-image waves-effect waves-block waves-light">
              <img class="image-team" src="${data.crestUrl}">
          </div>
          <div class="card-content">
              <span id="team-name" class="card-title grey-text text-darken-4">${data.name}</span>

              <div class="row">
                  <div class="col s3">
                      <span>Short Name</span>
                  </div>
                  <div class="col s9">
                      <span>: ${data.shortName}</span>
                  </div>
              </div>
              <div class="row">
                  <div class="col s3">
                      <span>Address</span>
                  </div>
                  <div class="col s9">
                      <span>: ${data.address}</span>
                  </div>
              </div>
              <div class="row">
                  <div class="col s3">
                      <span>Phone</span>
                  </div>
                  <div class="col s9">
                      <span>: ${data.phone}0</span>
                  </div>
              </div>
              <div class="row">
                  <div class="col s3">
                      <span>Website</span>
                  </div>
                  <div class="col s9">
                      <span>: ${data.website}</span>
                  </div>
              </div>
              <div class="row">
                  <div class="col s3">
                      <span>Email</span>
                  </div>
                  <div class="col s9">
                      <span>: ${data.email}</span>
                  </div>
              </div>
              <div class="row">
                  <div class="col s3">
                      <span>Founded</span>
                  </div>
                  <div class="col s9">
                      <span>: ${data.founded}</span>
                  </div>
              </div>
              <div class="row">
                  <div class="col s3">
                      <span>Venue</span>
                  </div>
                  <div class="col s9">
                      <span>: ${data.venue}</span>
                  </div>
              </div>
          </div>
        </div>
        `;

        teamHTML += `
        <div class="card">
          <div class="card-content">
              <span class="card-title">Player Squad</span>

              <table class="striped responsive-table">
                  <thead>
                      <tr>
                          <th>Name</th>
                          <th>Position</th>
                          <th>Date of Birth</th>
                          <th>Nationality</th>
                      </tr>
                  </thead>

                  <tbody>                
        `

        data.squad.forEach(function (squa) {
          if (squa.role == "PLAYER") {
            teamHTML += `
            <tr>
              <td>${squa.name}</td>
              <td>${squa.position}</td>
              <td>${squa.dateOfBirth}</td>
              <td>${squa.nationality}</td>
            </tr>                
            `
          }
        });

        teamHTML += `
                  </tbody>
              </table>
          </div>
        </div>                
        `
        document.getElementById("body-content").innerHTML = teamHTML;
        resolve(data);
      });
  });
}


function getSavedTeams() {
  getAll().then(function (teams) {
    console.log(teams);
    var teamsHTML = "";
    teams.forEach(function (team) {
      teamsHTML += `
        <div class="card-panel">
          <div class="row valign-wrapper">
            <div class="col s2 l3">
              <img class="responsive-img saved-image-team" src="${team.crestUrl}" />  
            </div>
            <div class="col s7 l9">
              <a href="./team.html?id=${team.id}&saved=true">
                <h4>${team.name}</h4>
              </a>
            </div>
            <div class="col s3 l2">
              <a href="javascript:deleteSavedTeamById(${team.id})" class="waves-effect waves-light btn indigo darken-4">DELETE</a>
            </div>
          </div>
        </div>
      `;
    });
    document.getElementById("teams").innerHTML = teamsHTML;
  });
}

function deleteSavedTeamById(teamId) {
  deleteById(teamId);
  getSavedTeams();
}

function getSavedTeamById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");

  getById(idParam).then(function (data) {
    var teamHTML = "";

    teamHTML += `
    <div class="card">
      <div class="card-image waves-effect waves-block waves-light">
          <img class="image-team" src="${data.crestUrl}">
      </div>
      <div class="card-content">
          <span id="team-name" class="card-title grey-text text-darken-4">${data.name}</span>

          <div class="row">
              <div class="col s3">
                  <span>Short Name</span>
              </div>
              <div class="col s9">
                  <span>: ${data.shortName}</span>
              </div>
          </div>
          <div class="row">
              <div class="col s3">
                  <span>Address</span>
              </div>
              <div class="col s9">
                  <span>: ${data.address}</span>
              </div>
          </div>
          <div class="row">
              <div class="col s3">
                  <span>Phone</span>
              </div>
              <div class="col s9">
                  <span>: ${data.phone}0</span>
              </div>
          </div>
          <div class="row">
              <div class="col s3">
                  <span>Website</span>
              </div>
              <div class="col s9">
                  <span>: ${data.website}</span>
              </div>
          </div>
          <div class="row">
              <div class="col s3">
                  <span>Email</span>
              </div>
              <div class="col s9">
                  <span>: ${data.email}</span>
              </div>
          </div>
          <div class="row">
              <div class="col s3">
                  <span>Founded</span>
              </div>
              <div class="col s9">
                  <span>: ${data.founded}</span>
              </div>
          </div>
          <div class="row">
              <div class="col s3">
                  <span>Venue</span>
              </div>
              <div class="col s9">
                  <span>: ${data.venue}</span>
              </div>
          </div>
      </div>
    </div>
    `;

    teamHTML += `
    <div class="card">
      <div class="card-content">
          <span class="card-title">Player Squad</span>

          <table class="striped responsive-table">
              <thead>
                  <tr>
                      <th>Name</th>
                      <th>Position</th>
                      <th>Date of Birth</th>
                      <th>Nationality</th>
                  </tr>
              </thead>

              <tbody>                
    `

    data.squad.forEach(function (squa) {
      if (squa.role == "PLAYER") {
        teamHTML += `
        <tr>
          <td>${squa.name}</td>
          <td>${squa.position}</td>
          <td>${squa.dateOfBirth}</td>
          <td>${squa.nationality}</td>
        </tr>                
        `
      }
    });

    teamHTML += `
              </tbody>
          </table>
      </div>
    </div>                
    `
    document.getElementById("body-content").innerHTML = teamHTML;
  });
}