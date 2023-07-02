import React, { useEffect, useState } from 'react'
import RatingStars from '../../common/RatingStars'
import GetAvgRating from '../../../utils/avgRating';
import { Link } from 'react-router-dom';

const Course_Card = ({course, Height}) => {

    const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect(()=> {
        const count = GetAvgRating(course.ratingAndReviews);
        setAvgReviewCount(count);
    },[course])


    
  return (
    <div className=' mb-4 hover:scale-[1.03] transition-all duration-200 z-50 '>
        <Link to={`/courses/${course._id}`}>
            <div>
                <div>
                    <img 
                        src={course?.thumbnail}
                        alt='course thumbnail'
                        className={`${Height}  rounded-xl object-cover`}
                    />
                </div>
                <div className='flex flex-col gap-2 px-1 py-3'>
                    <p className='text-sm md:text-xl text-richblack-5'>{course?.courseName}</p>
                    <p className='text-[12px] md:text-xl text-richblack-5'>By <span className='text-yellow-50'>{course?.instructor?.firstName} {course?.instructor?.lastName}</span></p>
                    <div className='flex gap-x-3'>
                        <span className='text-yellow-50'>{avgReviewCount || 0}</span>
                        <RatingStars Review_Count={avgReviewCount} />
                        <span className=' md:block hidden md:text-xl text-richblack-5'>{course?.ratingAndReviews?.length} Ratings</span>
                    </div>
                    <p className='text-sm md:text-xl text-richblack-5'>Rs. {course?.price}</p>
                </div>
            </div>
        </Link>

      
    </div>
  )
}

export default Course_Card
