// Write your code here
const MatchCard = ({match}) => (
  <li>
    <p>{match.date}</p>
    <p>{match.venue}</p>
    <p>{match.result}</p>
    <img
      src={match.competing_team_logo}
      alt={`competing team ${match.competing_team}`}
    />
    <p>{match.competing_team}</p>
    <p>Match Status: {match.match_status}</p>
  </li>
)

export default MatchCard
