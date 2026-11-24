import React, {useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';
import AddArticle from './AddArticle'

const News = (props)=> {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    const [hasMore, setHasMore] = useState(true);
     
    const  capitalizeFirstLetter=(str)=> {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

const upadateNews = async () =>{
    props.setProgress(10);
    const url = props.searchQuery
  ? "http://localhost:5000/articles?q=" + props.searchQuery
  : "http://localhost:5000/articles?category=" + props.category;
    // props.searchQuery
    // ? `https://newsapi.org/v2/everything?q=${props.searchQuery}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
    // : `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
     props.setProgress(40);
    let parsedDate = await data.json()
     props.setProgress(70);
     setArticles(parsedDate)
     setLoading( false)
     setTotalResults(parsedDate.length)
     setHasMore(false)
     props.setProgress(100);
  }

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    setLoading(true);
    document.title =  props.searchQuery
        ? `Search: ${props.searchQuery} - NewsLion`
        : `${capitalizeFirstLetter(props.category)} - NewsLion`;

    upadateNews();
    // eslint-disable-next-line
  }, [props.searchQuery, props.category]) ;

  // const handlePrevClick = async()=>{
  //   setPage(-1)
  //   upadateNews();
  // }

  // const handleNextClick = async()=>{
  //  setPage(+1)
  //  upadateNews();
  // }

/* const fetchMoreData = async () => {
    const url = props.searchQuery
        ? `https://newsapi.org/v2/everything?q=${props.searchQuery}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`
        : `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parsedDate = await data.json();
    console.log(parsedDate);
    setArticles(articles.concat(parsedDate.articles));
    setTotalResults(parsedDate.totalResults);
};*/

const fetchMoreData = async () => {
    if (loading || !hasMore) return;

    const nextPage = page + 1;

    const url = props.searchQuery
      ? "http://localhost:5000/articles?q=" + props.searchQuery
      :"http://localhost:5000/articles";
    // props.searchQuery
    //     ? `https://newsapi.org/v2/everything?q=${props.searchQuery}&apiKey=${props.apiKey}&page=${nextPage}&pageSize=${props.pageSize}`
    //     : `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${nextPage}&pageSize=${props.pageSize}`;

    setLoading(true);

    try {
        const data = await fetch(url);
        const parsedDate = await data.json();
        const newArticles = parsedDate.articles || [];

        if (newArticles.length === 0) {
            setHasMore(false);
            return;
        }

        setArticles(prev => [...prev, ...newArticles]);
        setPage(nextPage);

        setHasMore(
            articles.length + newArticles.length < parsedDate.totalResults
        );
    } catch (error) {
        console.error("Error fetching news:", error);
    } finally {
        setLoading(false);
    }
};


    return (
      <>
      <h1 className="text-center" style={{margin:'30px 0px', paddingTop: '90px'}}>
        NewsLion - {props.searchQuery ? `Search results for "${props.searchQuery}"` : `Top Headlines of ${capitalizeFirstLetter(props.category)}`}
      </h1>

      <AddArticle onAdded={upadateNews} />

    <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={hasMore && <Spinner />}
          >

            <div className="container">

          <div className="row">
           {articles.filter(element => element).map((element, index)=>{
             return <div className="col-md-4 mb-3" key={element.url + element.publishedAt + index}>
                <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.sourceName} category={props.category} darkMode={props.darkMode}/>
              </div>
            })}
          </div>

          </div>

          </InfiniteScroll>
 
      </>
    )
  }

News.defaultProps = {
        country : 'in',
        pageSize : 8,
        category : 'general'
      }

News.propTypes = {
        country : PropTypes.string,
        pageSize : PropTypes.number,
        category : PropTypes.string,
        searchQuery : PropTypes.string,
        darkMode : PropTypes.bool,
        setProgress : PropTypes.func,
        apiKey : PropTypes.string,
      }


export default News

