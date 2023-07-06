import React from 'react'
import { useEffect } from 'react'
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CoursesTable from './CoursesTable'

const MyCourses = () => {
    const navigate = useNavigate();
    const {token} = useSelector((state) => state.auth);
    const [courses, setCourses] = React.useState(null);    
    const fetchedCourses = async ()=>{ 
        const result = await fetchInstructorCourses(token);
        if(result){
            setCourses(result);
        }
        }

    useEffect(() => {
        fetchedCourses();
    },[])
  return (
    <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
        <div>
            <div className='mb-14 flex items-center justify-between'>
                <h1 className='text-3xl font-medium text-richblack-5' >MY Courses</h1>
                <button onClick={()=>{navigate('/dashboard/add-course')}} className='flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-2 md:px-5 font-semibold text-richblack-900 undefined'>
                    <p>Add Course</p>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-richblack-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round"  strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                </button>
            </div>
            <div>
            {courses && <CoursesTable courses={courses} setCourses={setCourses} />}
            </div>
        </div>
    </div>
  )
}

export default MyCourses