fetch("/api/picks")
  .then(res => res.json())
  .then(data => {
    renderPick("cs2", data.cs2);
    renderPick("football", data.football);
    renderPick("nba", data.nba);
  })
  .catch(() => {
    document.body.innerHTML = "<h2>Error loading picks</h2>";
  });

function renderPick(id, pick) {
  document.getElementById(id).innerHTML = `
    <h2>${pick.title}</h2>
    <p><strong>Pick:</strong> ${pick.pick}</p>
    <p><strong>Odds:</strong> ${pick.odds}</p>
    <p><strong>Confidence:</strong> ${pick.confidence}</p>
    <p>${pick.reasoning}</p>
  `;
}
