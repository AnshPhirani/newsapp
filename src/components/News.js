import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 9,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  constructor(props) {
    super(props);
    console.log("Hello I am constructor from news component");
    this.state = {
      articles: [],
      loading: true,
      page: 0,
      totalResults: 0,
    };

    document.title = `${this.capitalize(this.props.category)} - NewsMonkey`;
  }

  async updateNews() {
    this.setState({ loading: true });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=887e944d56824055b14f6b491ec54722&pageSize=${this.props.pageSize}&page=${this.state.page}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

  // runs after render method
  async componentDidMount() {
    console.log("cdm");

    // this.updateNews();
    this.fetchMoreData();
  }

  fetchMoreData = async () => {

    if(this.state.page === 1){
      this.props.setProgress(10);
    }

    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&page=${this.state.page}`;
    let data = await fetch(url);
    if(this.state.page === 1){
      this.props.setProgress(40);
    }
    let parsedData = await data.json();
    if(this.state.page === 1){
      this.props.setProgress(70);
    }
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    });
    if(this.state.page === 1){
      this.props.setProgress(100);
    }
    this.setState({
      page: this.state.page + 1,
    });
  };

  render() {
    return (
      <>
        <h1 className="text-center my-4">
          NewsMonkey - Top {this.capitalize(this.props.category)} Headlines
        </h1>
        {/* {this.state.loading && <Spinner/> } */}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element, idx) => {
                return (
                  <div className="col-md-4" key={idx}>
                    <NewsItem
                      title={
                        element.title
                          ? element.title.slice(0, 45) + ". . ."
                          : ". . ."
                      }
                      description={
                        element.description
                          ? element.description.slice(0, 90) + ". . ."
                          : ". . ."
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}
