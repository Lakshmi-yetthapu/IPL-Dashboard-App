// Write your code here
import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import './index.css'

class TeamMatches extends Component {
  state = {
    teamData: null,
    isLoading: true,
  }

  componentDidMount() {
    this.fetchTeamData()
  }

  fetchTeamData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    this.setState({teamData: data, isLoading: false})
  }

  render() {
    const {teamData, isLoading} = this.state

    if (isLoading) {
      return (
        <div data-testid="loader">
          <Loader type="Oval" color="#ffffff" height={50} width={50} />
        </div>
      )
    }

    return (
      <div>
        <img src={teamData.team_banner_url} alt="team banner" />
        <LatestMatch latestMatch={teamData.latest_match_details} />
        <ul>
          {teamData.recent_matches.map(match => (
            <MatchCard key={match.id} match={match} />
          ))}
        </ul>
      </div>
    )
  }
}

export default withRouter(TeamMatches)
