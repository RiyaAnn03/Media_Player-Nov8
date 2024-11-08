
import React,{useEffect, useState} from 'react'
import { Modal,Form,FloatingLabel,Button } from 'react-bootstrap'
import { deleteCategoryAPI, getAllCategoryAPI,  removeVideoAPI,  saveCategoryAPI, updateCategoryAPI } from '../services/allAPI';
import VideoCard from './VideoCard';
const Category = ({setDeleteResponseFromCategory,deleteResponseFromView}) => {
  const [allCatergories,setAllCatergories]=useState([])
  const [categoryName,setCategoryName]=useState("")
  const [show, setShow] = useState(false);
  useEffect(()=>{
       getAllCategories()
  },[deleteResponseFromView])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSaveCategory= async()=>{
    if(categoryName){
      const categoryDetails={categoryName,allVideos:[]}
      try {
        const result=await saveCategoryAPI(categoryDetails)
        if(result.status>=200 && result.status<300){
          alert("Category Created!!")
          getAllCategories()
          handleClose()
        }
      } catch (error) {
        console.log(error);
        
        
      }

    }else{
      alert("plz provide a name to your category")
    }
  }
  const getAllCategories=async () => {
    try {
      const result=await getAllCategoryAPI()
      if(result.status>=200 && result.status<300){
          setAllCatergories(result.data)
      }
    } catch (err) {
      console.log(err);
      
    }
  }
  console.log(allCatergories);

  const removeCategory=async(id)=>{
    try{
      await deleteCategoryAPI(id)
      getAllCategories()

    }catch(err){
      console.log(err);
      
    }

  }
  const dragOverCategory=(e)=>{
    e.preventDefault()
  }
  const videoCardDropOverCategory= async(e,categoryDetails)=>{
    console.log("Inside  videoCardDropOverCategory");
    console.log(categoryDetails);
    const videoDetails=JSON.parse(e.dataTransfer.getData("videoDetails"))
    console.log(videoDetails);
    // update category by add  video  to its allVideo
      categoryDetails.allVideos.push(videoDetails)
      console.log(categoryDetails);
      // api call to make update the category
      await updateCategoryAPI(categoryDetails)
      getAllCategories()
     const result= await removeVideoAPI(videoDetails.id)
     setDeleteResponseFromCategory(result)

    
  }
   const categoryVideoDragStarted=(e,dragVideoDetails,categoryDetails)=>{
    console.log("Inside categoryVideoDragStarted");
    let dragData ={video:dragVideoDetails,categoryDetails}
    e.dataTransfer.setData ("dragData",JSON.stringify(dragData))
    
  }

  return (
    <>
      <div className="d-flex justify-content-around">
        <h3>All Categories</h3>
        <button onClick={handleShow} className='btn btn-warning ms-3 rounded-circle fw-bolded fs-5'>+</button>
     </div>
     {/* display all Category */}
     <div className="container-fluid mt-3">
      {/* single category view */}
     {
      allCatergories?.length>0?
     allCatergories?.map(categoryDetails=>( 
     <div droppable="true" onDragOver={dragOverCategory} onDrop={e=>videoCardDropOverCategory(e,categoryDetails)} key={categoryDetails?.id} className="border rounded p-3 mb-3">
      <div className="d-flex justify-content-between">
        <h5>{categoryDetails?.categoryName}</h5>
        <button onClick={()=>removeCategory(categoryDetails?.id)}   className='btn'><i className="fa-solid fa-trash text-danger"></i></button>
      </div>
      {/* display category videos */}
      <div className="row mt-2">
       {
        categoryDetails?.allVideos?.length>0 && categoryDetails?.allVideos?.map(video=>(
          <div draggable={true} onDragStart={e=>categoryVideoDragStarted(e,video,categoryDetails)} key={video?.id} className="col-lg-4">
          {/* video card */}
          <VideoCard insideCategory={true} displayData={video}/>
        </div>
        ))
       }
      </div>
    </div>))
    :
    <div className='fw-bolder text-danger'>No categories are added yet!!</div>
     }

     </div>
      <Modal  centered show={show} onHide={handleClose} backdrop="static" keyboard={false}  >
        <Modal.Header closeButton>
          <Modal.Title> Add Category Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <FloatingLabel controlId="floatingCategoryName" label="Category Name">
        <Form.Control onChange={e=>setCategoryName(e.target.value)} type="Text" placeholder="Category Name" />
      </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSaveCategory} variant="btn btn-info">Add</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Category
