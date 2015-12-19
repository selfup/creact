const Skill = React.createClass({
  getInitialState() {
    return { editable: false }
  },

  handleEdit() {
    if (this.state.editable) {
      let name    = this.refs.name.value
      let details = this.refs.details.value
      console.log('in handleEdit', this.state.editable, name, details)
    }

    this.setState({ editable: !this.state.editable })
  },

  onUpdate() {
    if (this.state.editable) {
      let skill   = { id: this.props.skill.id,
                      name: this.refs.name.value,
                      details: this.refs.details.value,
                      level: this.props.skill.level }

      this.props.handleUpdate(skill);
    }

    this.setState({ editable: !this.state.editable })
  },

  handleLevelChange(action) {
    let levels  = ['bad', 'halfbad', 'fantastic'];
    let level   = levels.indexOf(this.props.skill.level);

    if (this.levelCanBeChanged(action, level)) {
      let skill = this.updatedSkill()
      this.props.handleUpdate(skill);
    }
  },

  levelCanBeChanged(action, limit) {
    return action === 'up' && limit < 2 ||  action === 'down' && limit > 0;
  },

  updatedSkill(action, index) {
    let id       = this.props.skill.id;
    let name     = this.props.skill.name;
    let details  = this.props.skill.details;
    let levels   = ['bad', 'halfbad', 'fantastic'];
    let change   = action === 'up' ? 1 : - 1;
    console.log(this.props.skill.level);
    let newLevel = action ? levels[index + change] : this.props.skill.level;

    return {id: id, name: name, details: details, level: newLevel}
  },

  getNewLevel(action, index) {
    let levels   = ['bad', 'halfbad', 'fantastic'];
    let change   = action === 'up' ? 1 : - 1;

    return action ? levels[index + change] : this.props.skill.level;
    console.log(this.props.skill.level);
  },

  onUpdateLevel(action) {
    if (this.canChangeLevel(action)) {
      console.log(this.props.skill.level);
      let level = this.getNewLevel(action)
      let skill = {id: this.props.skill.id, level: level }

      this.props.handleUpdate(skill);
    }
  },

   render() {
    let name = this.state.editable ? <input type='text'
                                            ref='name'
                                            defaultValue={this.props.skill.name} />
                                   : <h3>{this.props.skill.name}</h3>

    let details = this.state.editable ? <textarea type='text'
                                                  ref='details'
                                                  defaultValue={this.props.skill.details}>
                                                  </textarea>
                                      : <p>{this.props.skill.details}</p>
    return (
      <div>
        {name}

        <div className='skill-level'>
          <button type="button"
                  className="btn btn-default btn-sm"
                  onClick={this.handleLevelChange.bind(this, 'down')}>
            <span className="glyphicon glyphicon-triangle-bottom"></span>
          </button>
          <p><strong>Level: {this.props.skill.level} </strong></p>

          <button type="button"
                  className="btn btn-default btn-sm"
                  onClick={this.handleLevelChange.bind(this, 'up')}>
            <span className="glyphicon glyphicon-triangle-top"></span>
          </button>
        </div>

        {details}

        <button onClick={this.props.handleDelete}>
          Delete
        </button>

        <button onClick={this.onUpdate}>{this.state.editable ? 'Submit' : 'Edit' }</button>
      </div>
    )
  }
})
