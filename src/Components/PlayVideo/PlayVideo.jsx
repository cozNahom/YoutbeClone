import React, { useEffect, useState } from 'react'
import './playvideo.css'
import like from '../../assets/like.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import user_profile from '../../assets/user_profile.jpg'
import jack from '../../assets/jack.png'
import dislike from '../../assets/dislike.png'
import { API_KEY, valueConvertor } from '../../data'
import moment from 'moment/moment'
import { useParams } from 'react-router-dom'
const PlayVideo = () => {
    const {videoId}=useParams();

    const [apiData,setApiData]=useState(null);
    const [channelData,setChannelData]=useState(null);
    const [commentData,setCommentData]=useState([]);

    const  fetchVideoData = async ()=> {
        const videoDetails_url=`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY} `;
        await fetch(videoDetails_url).then(res=>res.json()).then(data=>setApiData(data.items[0]));
    }
    const fetchOtherData = async ()=>{
        const channelData_url=`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
        await fetch(channelData_url).then(res=>res.json()).then(data=>setChannelData(data.items[0]));
        
        const commentData_url = ` https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`;
        await fetch(commentData_url).then(res=>res.json()).then(data=>setCommentData(data.items));
    }


    useEffect(()=>{
        fetchVideoData();
    },[videoId])
    useEffect(()=>{
        fetchOtherData();
    },[apiData])
    return (
    <div className='play-video'>
       {/*<video src={video1} controls autoPlay muted></video> */}
       <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} title="" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
       <h3>{apiData?apiData.snippet.title:'Title here'}</h3>
            <div className="play-video-info">
                <p>{apiData?valueConvertor(apiData.statistics.viewCount):'12M'} &bull; views {apiData? moment(apiData.snippet.publishedAt).fromNow():'2 days ago'} </p>
                <div>
                    <span><img src={like} alt="" />{apiData?valueConvertor(apiData.statistics.likeCount):"1234"}</span>
                    <span><img src={share} alt="" />share</span>
                    <span><img src={save} alt="" />save</span>
                </div>
            </div>
            <hr/>
            <div className="publisher">
                <img src={channelData?channelData.snippet.thumbnails.default.url:''} alt="" />
                <div>
                    <p>{apiData?apiData.snippet.channelTitle:'channel name'}</p>
                    <span>{channelData?valueConvertor(channelData.statistics.subscriberCount):"123"}</span>
                </div>
                <button>Subscribe</button>
            </div>
            <div className="vid-description">
                <p>{apiData?apiData.snippet.description.slice(0,250):'Description'}</p>
                
                <hr />
                <h4>{apiData?valueConvertor(apiData.statistics.commentCount):"1234"}comments</h4>
                {commentData.map((item,index)=>{
                    return (
                        <div key ={index} className="comment">
                            <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                            <div>
                                <h3>{item.snippet.topLevelComment.snippet.authorDisplayName}</h3>
                                <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                                <div className="comment-action">
                                    <img src={like} alt="" />
                                    <span>{valueConvertor(item.snippet.topLevelComment.snippet.likeCount)}</span>
                                    <img src={dislike} alt="" />
                                </div>
                            </div>
                        </div>
               )} ) } 
            </div>
    </div>
  )
}

export default PlayVideo