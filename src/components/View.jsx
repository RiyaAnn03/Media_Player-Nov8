import React, { useEffect, useState } from 'react'
import { Row,Col } from 'react-bootstrap'
 import VideoCard from './VideoCard'
import { getAllVideosAPI, saveVideoAPI, updateCategoryAPI } from '../services/allAPI'

const View = ({addResponseFromHome,deleteResponseFromCategory,setDeleteResponseFromView}) => {
  const [deleteVideoRespondFromVideoCart,setDeleteVideoRespondFromVideoCart]=useState("")
  const [allVideos,setAllVideos]=useState([])
 useEffect(()=>{
getallVideos()
  },[addResponseFromHome,deleteVideoRespondFromVideoCart,deleteResponseFromCategory])
  console.log(allVideos);
  

  const getallVideos=async()=>{
    try{
      const result=await getAllVideosAPI()
      console.log(result);
      
      if(result.status>=200 && result.status<300){
        setAllVideos(result.data);

      }
        

    }catch(err){
      console.log(err);
      

    }
  }
   const dragOverView=(e)=>{
    e.preventDefault()
   }
   const categoryVideoDragOverView= async(e)=>{
    console.log("inside categoryVideoDragOverView");
     const {video,categoryDetails}= JSON.parse(e.dataTransfer.getData("dragData"))
    console.log(video,categoryDetails);
    const updateCategoryVideoList=categoryDetails?.allVideos?.filter(item=>item.id!=video?.id)
    const updatedCategory={...categoryDetails,allVideos:updateCategoryVideoList}
    console.log(updatedCategory);
    
    // upating the category by delete video from category using api
const result =await updateCategoryAPI(updatedCategory)
    // use state lifting to communicate data from view to category
setDeleteResponseFromView(result)
    // use api to upload video
    await saveVideoAPI(video)
    // call getAllVideos function 
    getallVideos()
    
   }
  return (
    <>
    <Row droppable="true" onDragOver={dragOverView} onDrop={e=>categoryVideoDragOverView(e)}>
    
 {
  allVideos?.length>0?
  
allVideos?.map(video=>(
  <Col key={video?.id} className='mb-2' sm={12} md={6} lg={4}>
  <VideoCard setDeleteVideoRespondFromVideoCart={setDeleteVideoRespondFromVideoCart} displayData={video}  />
  </Col>
))
  :
  <div className='fw-bolder text-danger fs-5'>No videos are not uploaded</div>
 }
 
  

    </Row>
    </>
  )
}

export default View
