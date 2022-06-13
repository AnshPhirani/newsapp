import React, {useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default function News(props) {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  // document.title = `${capitalize(props.category)} - NewsMonkey`;

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // runs after render method
  useEffect(() => {
    fetchMoreData();
    document.title = `${capitalize(props.category)} - NewsMonkey`;
    // eslint-disable-next-line
  }, [])


  const fetchMoreData = async () => {
    if(page === 0){
      props.setProgress(10);
    }

    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page}`;
    let data = await fetch(url);
    if(page === 0){
      props.setProgress(40);
    }
    let parsedData = await data.json();
    if(page === 0){
      props.setProgress(70);
    }
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setLoading(false);

    if(page === 0){
      props.setProgress(100);
    }
    setPage(page+1);
  };
  

    return (
      <>
        <h1 className="text-center" style={{margin : "35px 0px", marginTop : "90px"}}>
          NewsMonkey - Top {capitalize(props.category)} Headlines
        </h1>
        {loading && <Spinner/> }

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length < totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {articles.map((element, idx) => {
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


 News.defaultProps = {
  country: "in",
  pageSize: 9,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};