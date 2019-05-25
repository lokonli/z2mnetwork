import React from 'react';

class Graphviz extends React.Component {
    constructor(props) {
      super(props);
      this.renderer = null;
      this.updateGraph = this.updateGraph.bind(this);
    }

    updateGraph(graph) {
        if(this.renderer) {
            this.renderer.engine(this.props.params.renderer).renderDot(graph);
        }
    }
  
    componentDidMount() {
        this.renderer=window.d3.select(".graph").graphviz({height:"700px", fit:true});
        console.log(this.renderer);
    }

    render() {
        console.log("render graphviz");
//        this.updateGraph("digraph { a -> b;c; d -> c; a -> d; }");
        this.updateGraph(this.props.dot);
        return (
          <div className="Z2mnetwork">    
              <div className="graph">
                  hallo z2mnetwork
              </div>
          </div>
        );
    }
}

export default Graphviz;
  