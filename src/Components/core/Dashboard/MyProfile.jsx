import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconBtn from '../../common/IconBtn'
import {FiEdit} from "react-icons/fi"

const MyProfile = () => {

    const {user} = useSelector((state) => state.profile)
    const navigate = useNavigate();
  return (
    <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
        <div className='py-10'>
        <h1 className='mb-14 text-3xl font-medium text-richblack-5'>
            My Profile
        </h1>
        
        {/* section 1 */}
        <div className='flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-3 md:p-8 md:px-12'>
            <div className='flex items-center gap-x-4 '>
                <img 
                src={user?.image}
                alt={`profile-${user?.firstName}`}
                className='aspect-square w-[78px] rounded-full object-cover' />
                <div className='space-y-1'>
                    <p className='text-lg font-semibold text-richblack-5'> {user?.firstName + " " + user?.lastName} </p>
                    <p className=' text-[11px] md:text-sm text-richblack-300 md:max-w-full max-w-[220px] break-words'> {user?.email}</p>
                </div>
            </div>
            <div className="hidden md:block">
            <IconBtn
                text="Edit"
                onclick={() => {
                    navigate("/dashboard/settings")
                }} >
            </IconBtn>
            </div>
        </div>

        {/* section 2 */}
        <div className='my-10 flex flex-col gap-y-3 md:gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-3 md:p-8 md:px-12'>
            <div className='flex w-full items-center justify-between'>
                <p className='text-lg font-semibold text-richblack-5'>About</p>
                <div >
                <IconBtn 
                text="Edit"
                onclick={() => {
                    navigate("/dashboard/settings")
                }} />
                </div>
            </div>
            <p className='text-richblack-400 text-sm font-medium'> {user?.additionalDetails?.about  ??  "Write Something about Yourself"}</p>
        </div>

        {/* section 3 */}
        <div className='my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-3 md:p-8 md:px-12'>
            <div className='flex w-full items-center justify-between'>
                <p className='text-lg font-semibold text-richblack-5'>Personal Details</p>
                <div className=''>
                <IconBtn
                text="Edit"
                onclick={() => {
                    navigate("/dashboard/settings")
                }} />
                
                </div>
            </div>
            <div className='flex gap-y-5 md:flex-row flex-col max-w-[500px] justify-between'>
                <div className='flex flex-col gap-y-5'>
                <div>
                    <p className='mb-2 text-sm text-richblack-100'>First Name</p>
                    <p className='text-sm font-medium text-richblack-5'>{user?.firstName}</p>
                </div>
                <div>
                    <p className='mb-2 text-sm text-richblack-100'>Email</p>
                    <p className='text-sm font-medium text-richblack-5 break-words'>{user?.email}</p>
                </div>
                <div>
                    <p className='mb-2 text-sm text-richblack-100'>Gender</p>
                    <p className='text-sm font-medium text-richblack-5'>{user?.additionalDetails?.gender ?? "Add Gender"}</p>
                </div>
                </div>


                <div className='flex flex-col gap-y-5'>
                <div>
                    <p className='mb-2 text-sm text-richblack-100'>Last Name</p>
                    <p className='text-sm font-medium text-richblack-5'>{user?.lastName}</p>
                </div>
                <div>
                    <p className='mb-2 text-sm text-richblack-100'>Phone Number</p>
                    <p className='text-sm font-medium text-richblack-5'>{user?.additionalDetails?.contactNumber ?? "Add Contact Number"}</p>
                </div>
                <div>
                    <p className='mb-2 text-sm text-richblack-100'>Date of Birth</p>
                    <p className='text-sm font-medium text-richblack-5'>{user?.additionalDetails?.dateOfBirth ?? "Add Date of Birth"}</p>
                </div>
            </div>
        </div>

      </div>
    </div>
    </div>
    
  )
}

export default MyProfile
