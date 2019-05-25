import React from 'react';

class Z2mclient extends React.Component {
    constructor(props) {
      super(props);
      this.onConnect = this.onConnect.bind(this);
      this.onMessage = this.onMessage.bind(this);
      this.client = null;
      this.prevGraph = null;
    }

    componentDidMount() {
        //this.state.renderer.renderDot(mygraph);
        this.client = window.mqtt.connect("ws://"+this.props.config.server);
        this.client.subscribe("zigbee2mqtt/bridge/networkmap/graphviz")
        this.client.on("message", this.onMessage);          
        this.client.on('connect', this.onConnect);
      
    }

  onConnect() {
    console.log('Connected');
    this.client.publish("zigbee2mqtt/bridge/networkmap", "graphviz");
    this.props.config.onConnect();
  }

  onMessage(topic, payload) {
    console.log("z2mcl received");
    var graph = new TextDecoder("utf-8").decode(payload);
//    console.log(graph);
    this.props.config.onMessage(topic, graph);
      setTimeout( function() {
        this.client.publish("zigbee2mqtt/bridge/networkmap", "graphviz");  
      }.bind(this), 10000);

  }

  render() {
    console.log("render z2mclient");
    return null
  }
}

export default Z2mclient;
