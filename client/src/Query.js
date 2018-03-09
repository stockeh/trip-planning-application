class Query extends Component {
  constructor(props){
    super(props);
    this.state = {
      trip: { // default Query
        version : 2,
        type    : "query",
        query   : "",
        places  : []
      }
    };
  }


  render() {
    return(
      <div id="query" className="container">

      </div>
    )
  }
}

export default Query;