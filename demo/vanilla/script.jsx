var Root = React.createClass({
  getInitialState: function() {
    return {
      color: 'blue',
      value: 'dark'
    }
  },
  colorClickHandler: function(color) {
    this.setState({color: color});
  },
  valueClickHandler: function(value) {
    this.setState({value: value});
  },
  render: function() {
    return (
      <div id="root">
        <Viewport data={this.state} />
        <ControlPanel colorClickHandler={this.colorClickHandler} valueClickHandler={this.valueClickHandler} />
      </div>
    );
  }
});

var Viewport = React.createClass({
  render: function() {
    var className = ['viewport',this.props.data.color,this.props.data.value].join(' ');
    return (
      <div className={className}></div>
    );
  }
});

var ControlPanel = React.createClass({
  render: function() {
    return (
      <div className="control-panel">
        <ColorPanel clickHandler={this.props.colorClickHandler} />
        <ValuePanel clickHandler={this.props.valueClickHandler} />
      </div>
    );
  }
});

var ColorPanel = React.createClass({
  render: function() {
    return (
      <div className="color-panel panel">
        <PanelButton clickHandler={this.props.clickHandler} data="red" />
        <PanelButton clickHandler={this.props.clickHandler} data="green" />
        <PanelButton clickHandler={this.props.clickHandler} data="blue" />
      </div>
    );
  }
});

var ValuePanel = React.createClass({
  render: function() {
    return (
      <div className="value-panel panel">
        <PanelButton clickHandler={this.props.clickHandler} data="bright" />
        <PanelButton clickHandler={this.props.clickHandler} data="medium" />
        <PanelButton clickHandler={this.props.clickHandler} data="dark" />
      </div>
    );
  }
});

var PanelButton = React.createClass({
  clickHandler: function() {
    this.props.clickHandler(this.props.data);
  },
  render: function() {
    return (
      <div className="panel-button" onClick={this.clickHandler}>
        {this.props.data}
      </div>
    );
  }
});


React.render(<Root />, document.body);