var AllSkills = React.createClass({
  getInitialState() {
    return { skills: [] }
  },
  componentDidMount() {
    $.getJSON('/api/v1/skills.json', (response) => { this.setState({ skills: response }) });
    console.log('Component Did Mount!');
  },
  render() {
    console.log(this.state)
    return (
      <div>
        <h1>All of the Skills</h1>
      </div>
    )
  }
})
