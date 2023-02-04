import React,{useEffect,useState} from 'react'
import Loader from './Loader';
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News =(props)=> {

    const [articles, setarticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalarticles, setTotalarticles] = useState(0);


    const capilalise = (str) => {
        let lower = str.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }

    

    const update = async (pageno) => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.api}&page=${pageno}&pageSize=${props.pageSize}`;
        
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(30);
        data = await data.json();
        props.setProgress(70);
        setarticles(data.articles);
        setTotalarticles(data.totalResults);
        setPage(pageno);
        setLoading(false);
        props.setProgress(100);
    }

    // document.title = `NewsMonkey-${this.capilalise(props.category)}`
    useEffect(() => {
      update(page);
      document.title = `NewsMonkey-${capilalise(props.category)}`
    }, [])
    

    // async componentDidMount() {
    //     this.update(this.state.page);
    // }


    const fetchMoreData =async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.api}&page=${page + 1}&pageSize=${props.pageSize}`;
        setPage(page+1);
        setLoading(true);
        let data = await fetch(url);
        data = await data.json();
        setarticles(articles.concat(data.articles));
        setTotalarticles(data.totalResults);
        
        setLoading(false);

      };


    
        return (

            <>
                {/* //to give the component some space */}
                <h2 className='text-center'style={{margin:"75px 0px"}} >Top-Headlines on {capilalise(props.category)}</h2>
                {/* toget the loader at starting of the first load */}
                {loading && <Loader/>}
                
                <InfiniteScroll
                        dataLength={articles.length}
                        next={fetchMoreData}
                        hasMore={articles.length!==totalarticles}
                        loader={<Loader/>}
                    >
                <div className="container">
                <div className='row'>
                    {/* //to create a row */}
                    
                    {articles.map((element) => {
                        let l = element.title.length;
                        return <div className='col-md-4 my-2' key={element.url}>
                            {/* //in bootstrap there is 12 girds for a row so 4 grids this //element occupied */}
                            <NewsItem title={element.title} description={(element.description != null) ? element.description.slice(0, 200 - l) : " "} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                        </div>
                    })}
                
                </div>
                </div>
                </InfiniteScroll>
                
            </ >
        )
    
}

News.defaultProps = {
    country: "in",
    pageSize: 5,
    category: "general"
}

News.propsTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News
