import commonAPI from "./commonAPI"
import SERVERURL from "./serverURL.JS"

// saveVideoAPI - post http rqst called Add Component When user click on add button
export const saveVideoAPI=async(videoDetails)=>{
 return await commonAPI("POST",`${SERVERURL}/uploadVideos`,videoDetails)

}
// getAllVideoAPI -get http rqst called View Component when component displayed in browser inside its useeffect hook
export const getAllVideosAPI=async()=>{
    return await commonAPI("GET",`${SERVERURL}/uploadVideos`,"")}

    // saveHistoryAPI - post http request http://localhost:3000/history called by videocard component when we play video
    export const saveHistoryAPI=async(historyDetails)=>{
        return await commonAPI("POST",`${SERVERURL}/history`,historyDetails)}
        // getAllHistoryAPI -get http rqsr=t to http://localhost:3000/history  called by history component when it open in browser
        export const getAllHistoryAPI=async()=>{
            return await commonAPI("GET",`${SERVERURL}/history`,"")}
 // deleteHistoryAPI -delete http rqsr=t to http://localhost:3000/history/id called by history component when user click on delete button
 export const deleteHistoryAPI=async(id)=>{
    return await commonAPI("DELETE",`${SERVERURL}/history/${id}`,{})}
    
// removeVideoAPI -delete http rqst called videocard Component when user click on delete button
export const removeVideoAPI=async(id)=>{
    return await commonAPI("DELETE",`${SERVERURL}/uploadVideos/${id}`,{})}

    // saveCategoryAPI- post http rqst to http://localhost:3000/categories calle by Category component when user click on add btn
    // categoryDetails={category,allVieos}
    export  const saveCategoryAPI=async(categoryDetails)=>{
        return await commonAPI("POST",`${SERVERURL}/categories`,categoryDetails)

    }
    // getAllCategoryAPI- post http rqst to http://localhost:3000/categories calle by Category component when component loaded in browser
    export  const getAllCategoryAPI=async()=>{
        return await commonAPI("GET",`${SERVERURL}/categories`,{})

    }
      // removeCategoryAPI -delete http rqst called category Component when user click on delete button
export const deleteCategoryAPI=async(id)=>{
    return await commonAPI("DELETE",`${SERVERURL}/categories/${id}`,{})}
    // updateCategoryAPI -put http request to http://localhost:3000/categories/id called by category component when video drop over the category
    export const updateCategoryAPI =async(categoryDetails)=>{
        return await commonAPI("PUT",`${SERVERURL}/categories/${categoryDetails.id}`,categoryDetails)
    }