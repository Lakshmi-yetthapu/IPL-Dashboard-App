import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'
import './index.css'

const teamsApiUrl = 'https://apis.ccbp.in/ipl'
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      teams: [],
      isLoading: true,
    }
  }

  componentDidMount() {
    this.fetchTeams()
  }

  fetchTeams = async () => {
    const response = await fetch(teamsApiUrl)
    const data = await response.json()
    this.setState({teams: data.teams, isLoading: false})
  }

  render() {
    const {teams, isLoading} = this.state
    return (
      <div>
        <h1>IPL Dashboard</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
          alt="ipl logo"
        />
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <ul>
            {teams.map(team => (
              <li key={team.id}>
                <Link to={`/team-matches/${team.id}`}>
                  <TeamCard team={team} />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default Home
