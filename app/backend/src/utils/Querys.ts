const leaderBoardHome = `SELECT t.team_name as name,
SUM(CASE
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
SUM(m.home_team_goals - m.away_team_goals) AS goalsBalance,
ROUND((SUM(CASE
  WHEN m.home_team_goals > m.away_team_goals THEN 3
  WHEN m.home_team_goals = m.away_team_goals THEN 1
  ELSE 0 END) /
(COUNT(m.home_team + m.away_team) * 3)) *100, 2) AS efficiency
FROM TRYBE_FUTEBOL_CLUBE.matches as m
INNER JOIN TRYBE_FUTEBOL_CLUBE.teams as t
ON m.home_team = t.id
WHERE m.in_progress = 0
GROUP BY m.home_team
ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC, goalsOwn DESC;`;

export default {
  leaderBoardHome,
};
