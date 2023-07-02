import React from 'react'
import { FaCheck } from 'react-icons/fa';
import { useSelector } from 'react-redux'
import CourseBuilderForm from './CourseBuilder/CourseBuilderForm';
import CourseInformationForm from './CourseInformation/CourseInformationForm';
import PublishCourse from '../PublishCourse/PublishCourse';

const RenderSteps = () => {

    const {step} = useSelector((state)=> state.course);
    const steps = [
        {
            id:1,
            title: "Course Information",
        },
        {
            id:2,
            title: "Course Builder",
        },
        {
            id:3,
            title: "Publish Course",
        },
    ]

  return (
    <>
    <div className=' flex flex-col'>
        <div className=' ml-10 relative mb-2 flex w-full justify-center'>
            {steps.map( (item) => (
                <div key={item.id} className=' flex w-full justify-between'>
                    <div className='flex flex-col items-center'>
                        <div className={  `grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px] ${step === item.id 
                        ? "bg-yellow-900 border-yellow-50 text-yellow-50" 
                        : "border-richblack-700 bg-richblack-800 text-richblack-300"}`}>
                        {
                            step > item.id ? (<FaCheck/>) :(item.id)
                        }
                        </div>
                    </div>
                    {item.id <3 && (
                    <div className={`h-[calc(34px/2)] w-[100%]  border-dashed border-b-2 ${step > item.id ? "border-yellow-50" : "border-richblack-700"}
                    }`}></div>
                    )}
                </div>
            ) )}
        </div>
        <div className='relative mb-16 flex w-full select-none justify-start gap-14'>
            {steps.map((item) => (
                <>
                    <div key={item.id} className='flex min-w-[130px] flex-col items-center gap-y-2'>
                        <p className='text-sm text-richblack-5'>{item.title}</p>
                    </div>
                </>
            ))}
        </div>
        </div>

        {step === 1 && <CourseInformationForm />}
        {step === 2 && <CourseBuilderForm/>}
        {step===3 && <PublishCourse/>}
    </>
  )
}

export default RenderSteps
