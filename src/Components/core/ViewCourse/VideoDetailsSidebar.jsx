import React from 'react'
import { useState } from 'react'; 
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import IconBtn from '../../common/IconBtn'
import {FaChevronLeft} from 'react-icons/fa'
import {MdOutlineKeyboardArrowDown} from 'react-icons/md'
import {FaAngleDoubleRight} from 'react-icons/fa'

const VideoDetailsSidebar = ({setReviewModal}) => {
  const [activeStatus, setActiveStatus] = useState("");
  const [videoActive, setVideoActive] = useState("");
  const {courseId,sectionId,subsectionId} = useParams();
  // console.log("sectionId", sectionId, "SubSectionId", subsectionId);
  const {courseSectionData, courseEntireData, completedLectures, totalNoOfLectures} = useSelector(state => state.viewCourse);
  // console.log(courseSectionData);
  const navigate = useNavigate();
  const[showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    ;(() => {
      if(!courseSectionData) return;
      const currentSectionIndex = courseSectionData.findIndex((section) => section._id === sectionId);
      // console.log("currentSectionIndex", currentSectionIndex);
      const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex((subSection) => subSection?._id === subsectionId);
      // console.log("currentSubSectionIndex", currentSubSectionIndex);
      if(currentSectionIndex === -1 || currentSubSectionIndex === -1) return;
      const activesubsectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex]._id;
      setActiveStatus(courseSectionData[currentSectionIndex]._id);
      setVideoActive(activesubsectionId);
      // console.log("activeSubsectionId", activesubsectionId);
      // console.log("activeSectionId", courseSectionData[currentSectionIndex]._id);
    })();
  }, [courseSectionData, sectionId, subsectionId]);



    

  return (
    <>
     <div className={`${showSidebar?"":"hidden"} w-6 h-72 md:hidden relative `}>
      <FaAngleDoubleRight onClick={()=>{setShowSidebar(!showSidebar);}} className={` md:hidden z-10 cursor-pointer text-2xl text-richblack-900 m-2 bg-richblack-100 rounded-full p-1 top-3 absolute -left-1 `} />
      </div>
    <div className={ `${showSidebar?"h-0 w-0":"h-[calc(100vh-3.5rem)] w-[320px]"} transition-all duration-700 z-20 relative offSidebar1`}>
      <div className={`${showSidebar?"hidden":""} transition-all origin-right duration-500 flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 offSidebar2`}>
        <div className={`${showSidebar?"hidden":""} mx-5   flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25 offSidebar2`}>
          <div className='flex w-full items-center justify-between '>
            <div className='flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90'>
              <FaChevronLeft className=' cursor-pointer md:hidden' onClick={()=>{setShowSidebar(true)}}/>
              <FaChevronLeft className=' cursor-pointer hidden md:block' onClick={()=>{
                navigate(`/dashboard/enrolled-courses`);
              }}/>
            </div>
            <IconBtn text={"Review"} onclick={()=>{setReviewModal(true)}}/>
          </div>
          <div className='flex flex-col'>
            <p>My Courses</p>
            <p className='text-sm font-semibold text-richblack-500'>
              {completedLectures?.length} of {totalNoOfLectures} Lectures Completed
            </p>
          </div>
        </div>
        <div className='h-[calc(100vh - 5rem)] overflow-y-auto px-2'>
          {
            courseSectionData?.map((section, index) => (
              <details key={index} className=' appearance-none text-richblack-5 detailanimatation'>
                <summary className='mt-2 cursor-pointer text-sm text-richblack-5 appearance-none'>
                  <div className='flex flex-row justify-between bg-richblack-600 px-5 py-4'>
                    <p className='w-[70%] font-semibold'>{section?.sectionName}</p>
                    <div className='flex items-center gap-3'>
                      <MdOutlineKeyboardArrowDown className='arrow'/>
                    </div>
                  </div>
                </summary>
                {
                  section?.subSection.map((subSection, index) => (
                    <div  key={subSection?._id} className='transition-[height] duration-500 ease-in-out'>
                      <div onClick={()=>{
                        setShowSidebar(true);
                        navigate(`/dashboard/enrolled-courses/view-course/${courseId}/section/${section?._id}/sub-section/${subSection?._id}`);
                      }} className={`${subSection?._id === videoActive? ("bg-yellow-200"):("bg-richblack-50") } cursor-pointer items-baseline  flex gap-3  px-5 py-2 font-semibold text-richblack-800 relative border-b-[1px] border-richblack-600 `}>
                      {/* <input type='checkbox' className=' '/> */}
                      <div className="checkbox-wrapper-19 absolute bottom-1">
                        <input readOnly={true} checked={
                          completedLectures?.includes(subSection?._id)
                        }  type="checkbox" />
                        <label className="check-box">
                        </label>
                        </div>
                      <p className=' ml-6'>{subSection?.title}</p>
                      </div>
                    </div>
                  ))
                }
                </details>
            ))
          }
        </div>
      </div>     
    </div>
    <div onClick={()=>{setShowSidebar(true)}} className={`${showSidebar?"hidden":""} fixed top-0 left-0 w-full h-full bg-richblack-900 bg-opacity-50 z-10 offSidebar3`}></div>
    </>
  )
}

export default VideoDetailsSidebar