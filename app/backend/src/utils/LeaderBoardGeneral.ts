const learderBoardGeneral = `SELECT name, SUM(totalPoints) AS totalPoints,
SUM(totalGames) AS totalGames,
SUM(totalVictories) AS totalVictories, SUM(totalDraws) AS totalDraws,
SUM(totalLosses) AS totalLosses, SUM(goalsFavor) AS goalsFavor, SUM(goalsOwn) AS goalsOwn,
SUM(goalsBalance) AS goalsBalance,
ROUND((SUM(totalPoints) / (SUM(totalGames) * 3)) * 100 ,2) AS efficiency from (
SELECT t.team_name as name, SUM(CASE
  WHEN m.away_team_goals > m.home_team_goals THEN 3
  WHEN m.away_team_goals = m.home_team_goals THEN 1
  ELSE 0 END) AS totalPoints,
COUNT(m.home_team + m.away_team) as totalGames,
SUM(CASE
  WHEN m.away_team_goals > m.home_team_goals THEN 1
  ELSE 0 END) AS totalVictories,
SUM(CASE
  WHEN m.away_team_goals = m.home_team_goals THEN 1
  ELSE 0 END) as totalDraws,
SUM(CASE
  WHEN m.away_team_goals < m.home_team_goals THEN 1
  WHEN m.home_team_goals > m.away_team_goals THEN 1
  ELSE 0 END) as totalLosses,
SUM(m.away_team_goals) AS goalsFavor,
SUM(m.home_team_goals) AS goalsOwn,
SUM(m.away_team_goals - m.home_team_goals) AS goalsBalance
FROM TRYBE_FUTEBOL_CLUBE.matches as m
INNER JOIN TRYBE_FUTEBOL_CLUBE.teams as t
ON m.away_team = t.id
WHERE m.in_progress = 0
GROUP BY m.away_team
UNION
SELECT t.team_name as name, SUM(CASE
  WHEN m.home_team_goals > m.away_team_goals THEN 3
  WHEN m.home_team_goals = m.away_team_goals THEN 1
  ELSE 0 END) AS totalPoints,
COUNT(m.home_team + m.away_team) as totalGames,
SUM(CASE
  WHEN m.home_team_goals > m.away_team_goals THEN 1
  ELSE 0 END) AS totalVictories,
SUM(CASE
  WHEN m.home_team_goals = m.away_team_goals THEN 1
  ELSE 0 END) as totalDraws,
SUM(CASE
  WHEN m.home_team_goals < m.away_team_goals THEN 1
  WHEN m.away_team_goals > m.home_team_goals THEN 1
  ELSE 0 END) as totalLosses,
SUM(m.home_team_goals) AS goalsFavor,
SUM(m.away_team_goals) AS goalsOwn,
SUM(m.home_team_goals - m.away_team_goals) AS goalsBalance
FROM TRYBE_FUTEBOL_CLUBE.matches as m
INNER JOIN TRYBE_FUTEBOL_CLUBE.teams as t
ON m.home_team = t.id
WHERE m.in_progress = 0
GROUP BY m.home_team) AS query
GROUP BY name
ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC, goalsOwn DESC;`;

export default learderBoardGeneral;
