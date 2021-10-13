import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
     country:'in',
     pageSize:8,
     category: 'general'
  }
  static propTypes = {
    name: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  constructor(props) {   
    super(props);   // first of all we have to use super and only after that we can use this else it will show the refernce error
    this.state = {
      articles: [],
      loading: false,
      page:1,
      totalResults:0
    };
    document.title = `${this.props.category} - TrueNews`;
  }

  async updateNews(){
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1e78c7201cb847a69a32bb4dc8919e76&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({
    articles: parsedData.articles,
    totalResults: parsedData.totalResults,
    loading: true
    })
    }
    
  async componentDidMount(){  //this is a lifecycle method
    // let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1e78c7201cb847a69a32bb4dc8919e76&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true});
    // let data = await fetch(url);   //fetch API
    // let parsedData= await data.json()
    // console.log(parsedData);
    // this.setState({articles: parsedData.articles, 
    //   totalResults: parsedData.totalResults,
    //   loading:false
    // })
    this.updateNews();
  }
  
    handlePrevClick =  async ()=>{
    
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1e78c7201cb847a69a32bb4dc8919e76&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    //   this.setState({loading:true});
    //   let data = await fetch(url);
    //   let parsedData = await data.json()
    //   console.log(parsedData);
    //   this.setState({
    //   page: this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading: false
    
    // })
    this.setState({page: this.state.page - 1});
    this.updateNews();
    
      }
       
  handleNextClick= async ()=>{
    // if ( !(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
    //   let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1e78c7201cb847a69a32bb4dc8919e76&page= ${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //   this.setState({loading:true});
    //   let data = await fetch(url);   //fetch API
    //   let parsedData= await data.json()
    //    this.setState({
    //      page: this.state.page + 1,
    //      articles: parsedData.articles,
    //      loading: false
    //    })
    // }

    this.setState({page: this.state.page + 1});
    this.updateNews();
    
  }
  fetchMoreData = async () =>{
    this.setState({page: this.state.page + 1})
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1e78c7201cb847a69a32bb4dc8919e76&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({
    articles: this.state.articles.concat(parsedData.articles),
    totalResults: parsedData.totalResults,
    loading: false
    })

  };
      

  render() {
    return (
      <div >
        <h1 className="text-center" style={{margin: '33px 0px'}}>TrueNews - Top {this.props.category} Headlines </h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
       <div className="container">
         
  
        <div className="row">
          {/* {!this.state.loading &&*/} {this.state.articles.map((element) => {  //this whole is to iterate through news and !this.state.loading wali line is helping to erase the content while 
            return <div className="col-md-4" key={element.url}>
              <NewsItem
        
                title={element.title?element.title.slice(0,45):""}
                description={element.description?element.description.slice(0,88):""}  //we used slice to control size of news cards
                imageUrl={element.urlToImage}
                author={element.author}
                date={element.publishedAt}
                source={element.source.name}
                newsUrl={element.url}
              />
            </div>;
          })}
        </div>
        </div>

        </InfiniteScroll>

        

      </div>
    );
  }
}

// first of all constructor will run  after that render will run and then componentdidmount
//<div className="container d-flex justify-content-between">
  //       <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button> {/* &larr; is used for left arrow button inside html and &rarr is used for right arrow */}
//       <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
// </div> */}
