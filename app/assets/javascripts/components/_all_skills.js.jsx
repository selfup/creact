var AllSkills = React.createClass({
  getInitialState() {
    return { skills: [] }
  },
  
  componentDidMount() {
    $.getJSON('/api/v1/skills.json', (response) => { this.setState({ skills: response }) });
    console.log('Component Did Mount!');
  },

  render() {
    var skills = this.state.skills.map((skill) => {
      return (
        <div>
          <h3>{skill.name}</h3>
          <p><strong>Level:</strong> {skill.level}</p>
          <p>{skill.details}</p>
        </div>
      )
    });

    return(
      <div>
        {skills}
      </div>
    )
  }
})
