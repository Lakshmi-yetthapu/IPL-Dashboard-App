// Write your code here
import './index.css'

const TeamCard = ({team}) => (
  <div>
    <img src={team.team_image_url} alt={team.name} />
    <p>{team.name}</p>
  </div>
)

export default TeamCard
