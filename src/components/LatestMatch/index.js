import './index.css'

const LatestMatch = ({latestMatch}) => {
  const {
    competing_team: competingTeam,
    date,
    venue,
    result,
    first_innings: firstInnings,
    second_innings: secondInnings,
    man_of_the_match: manOfTheMatch,
    umpires,
    competing_team_logo: competingTeamLogo,
  } = latestMatch

  return (
    <div className="latest-match">
      <h3 className="latest-match-heading">Latest Match</h3>
      <img
        className="competing-team-logo"
        src={competingTeamLogo}
        alt={`latest match ${competingTeam}`}
      />
      <p className="competing-team">{competingTeam}</p>
      <p className="match-date">{date}</p>
      <p className="venue">{venue}</p>
      <p className="result">{result}</p>
      <p className="first-innings">First Innings: {firstInnings}</p>
      <p className="second-innings">Second Innings: {secondInnings}</p>
      <p className="man-of-the-match">Man of the Match: {manOfTheMatch}</p>
      <p className="umpires">Umpires: {umpires}</p>
    </div>
  )
}

export default LatestMatch
