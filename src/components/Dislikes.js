import React from 'react';

class MouseTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove = (event) => {
    this.setState({ x: event.clientX, y: event.clientY });
  };

  render() {
    return (
      <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>
        {this.props.render(this.state)}
      </div>
    );
  }
}

// A MouseTracker komponenst használó példa
class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Mouse Tracker App</h1>
        <MouseTracker render={mousePosition => (
          <p>Az egér pozíciója: ({mousePosition.x}, {mousePosition.y})</p>
        )} />
      </div>
    );
  }
}

export default App;
