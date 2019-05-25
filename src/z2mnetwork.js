import React from 'react';
//import * as d3 from 'd3'
//import * as d3Graphviz from 'd3-graphviz';
import Graphviz from './graphviz.js';
import Z2mclient from './z2mclient.js';


class Z2mnetwork extends React.Component {
    constructor(props) {
      super(props);
      this.prevgraph = null;
      this.onConnect = this.onConnect.bind(this);
      this.onMessage = this.onMessage.bind(this);
      this.state = {
        status: 'idle',
        dot : null,
        dotparams: {
          renderer : this.props.config.renderer
        }
      };

      this.clientConfig = {
        onConnect: this.onConnect,
        onMessage: this.onMessage,
        server: this.props.config.mqttserver
      }
    }
    
    onConnect() {
      console.log('Connected');
      this.setState({status:"connected"});
    }

    onMessage(topic, payload) {
      console.log("z2mn received");
      if(payload!==this.prevgraph) {
        console.log('changed')
        this.prevgraph = payload;
        this.setState({
          dot: payload
        });
      }
    }

    render() {
      console.log("render z2mnetwork");
      return (
        <div>
          Renderer: {this.state.dotparams.renderer} Server: {this.clientConfig.server} Status: {this.state.status}
          <Z2mclient config={this.clientConfig}/>
          <Graphviz dot={this.state.dot} params={this.state.dotparams}/>
        </div> 
      );
    }
  }

  export default Z2mnetwork;