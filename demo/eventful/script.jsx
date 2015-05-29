var Root = Eventful.createClass({
  getInitialState: function() {
    return {
      color: 'blue',
      value: 'dark'
    };
  },
  componentDidMount: function() {
    this.on('color',this.colorClickHandler);
    this.on('value',this.valueClickHandler);
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
        <ControlPanel />
      </div>
    );
  }
});

var Viewport = Eventful.createClass({
  render: function() {
    var className = ['viewport',this.props.data.color,this.props.data.value].join(' ');
    return (
      <div className={className}></div>
    );
  }
});

var ControlPanel = Eventful.createClass({
  render: function() {
    return (
      <div className="control-panel">
        <ColorPanel />
        <ValuePanel />
      </div>
    );
  }
});

var ColorPanel = Eventful.createClass({
  render: function() {
    return (
      <div className="color-panel panel">
        <PanelButton type="color" data="red" />
        <PanelButton type="color" data="green" />
        <PanelButton type="color" data="blue" />
      </div>
    );
  }
});

var ValuePanel = Eventful.createClass({
  render: function() {
    return (
      <div className="value-panel panel">
        <PanelButton type="value" data="bright" />
        <PanelButton type="value" data="medium" />
        <PanelButton type="value" data="dark" />
      </div>
    );
  }
});

var PanelButton = Eventful.createClass({
  clickHandler: function() {
    this.emit(this.props.type,this.props.data);
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
