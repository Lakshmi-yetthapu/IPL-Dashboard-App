import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {PieChart, Pie, Tooltip, Legend, ResponsiveContainer} from 'recharts'
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

    this.setState({isLoading: true})

    try {
      const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
      const data = await response.json()
      this.setState({teamData: data, isLoading: false})
    } catch (error) {
      console.error('Error fetching team data:', error)
      this.setState({isLoading: false})
    }
  }

  handleBackClick = () => {
    const {history} = this.props
    history.push('/')
  }

  getMatchStatistics = teamData => {
    const won = teamData.recent_matches.filter(match => match.result === 'won')
      .length
    const lost = teamData.recent_matches.filter(
      match => match.result === 'lost',
    ).length
    const drawn = teamData.recent_matches.filter(
      match => match.result === 'draw',
    ).length

    return [
      {name: 'Won', value: won},
      {name: 'Lost', value: lost},
      {name: 'Drawn', value: drawn},
    ]
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

    if (!teamData) {
      return null
    }

    const {
      latest_match_details: {
        umpires,
        first_innings: firstInnings,
        second_innings: secondInnings,
        man_of_the_match: manOfTheMatch,
      },
    } = teamData

    return (
      <div>
        <button onClick={this.handleBackClick}>Back</button>

        <img src={teamData.team_banner_url} alt="team banner" />

        <LatestMatch latestMatch={teamData.latest_match_details} />

        <p>{umpires}</p>

        <p>{firstInnings}</p>

        <p>{secondInnings}</p>

        <p>{manOfTheMatch}</p>

        <div>
          <h2>Match Statistics</h2>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={this.getMatchStatistics(teamData)}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              />
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <ul>
          {teamData.recent_matches.map(match => (
            <li key={match.id}>
              <MatchCard match={match} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default withRouter(TeamMatches)
