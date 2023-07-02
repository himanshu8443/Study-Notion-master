import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { updateAdditionalDetails, updatePassword, updatePfp,deleteAccount } from '../../../services/operations/profileAPI'
import {AiOutlineEyeInvisible} from 'react-icons/ai'
import {AiOutlineEye} from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'




const Settings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user=useSelector(state=>state.profile.user);


  //update profile picture
  const pfp=useSelector(state=>state.profile.user.image);
  const [profilePicture, setprofilePicture] = useState(pfp)
  const token= useSelector(state=>state.auth.token);


  const handleUpload = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    updatePfp(token,file);
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setprofilePicture(URL.createObjectURL(file));
  }





  //update additional info
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    contactNumber: "",
    about: "",
  })

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handelAdditionalDetails = (e) => {
    e.preventDefault()
    updateAdditionalDetails(token,formData);
  }






  //update password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleOnChangePassword = (e) => {
    setPassword((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handlePassword = (e) => {
    e.preventDefault()
    const {newPassword, confirmPassword } = password;
    if (newPassword === confirmPassword) {
      updatePassword(token,password);
    } else {
      alert("Password does not match")
    }
  }






  //delete account
  const onDeleteAccount = () => {
    if(window.confirm
      ("Are you sure you want to delete your account?")){
        deleteAccount(token,dispatch,navigate);
      }

  }



  return (
    <div>
      <div className=' flex-1 overflow-auto'>
        <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
        <h1 className="mb-14 text-3xl font-medium text-richblack-5">Edit Profile</h1>

        {/* update profile picture */}
        <div className='flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 md:p-8 md:px-12 px-3 py-3 text-richblack-5'>
          <div className='flex items-center gap-x-4'>
            <img className='aspect-square w-[78px] rounded-full object-cover'  src={profilePicture}></img>
            <div className='space-y-2'>
            <p>Change Profile Picture</p>
            <form onSubmit={handleUpload}>
            <div className='flex flex-row gap-3'>
              <label className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50'" htmlFor="upload">Select
            <input id='upload' type="file" onChange={handleFileChange} className="hidden" accept="image/png, image/gif, image/jpeg"/></label>
             <button type='submit' className='flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 undefined'>Upload</button>
            </div>
            </form>
            </div>
          </div>
        </div>
        

         {/* update additional info */}
        <form onSubmit={handelAdditionalDetails}>
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
          <h2 className="text-lg font-semibold text-richblack-5">Profile Information</h2>
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="firstName" className=" text-richblack-50">First Name</label>
              <input defaultValue={user.firstName || null} type="text" name="firstName" id="firstName" placeholder="Enter first name" className="form-style" onChange={handleOnChange}/>
              </div>
              <div className="flex flex-col gap-2 lg:w-[48%]">
                <label htmlFor="lastName" className="text-richblack-50">Last Name</label>
                <input defaultValue={user.lastName || null} type="text" name="lastName" id="lastName" placeholder="Enter first name" className="form-style" onChange={handleOnChange}/>
                </div>
                </div>
                <div className="flex flex-col gap-5 lg:flex-row">
                  <div className="flex flex-col gap-2 lg:w-[48%]">
                    <label htmlFor="dateOfBirth" className="text-richblack-50">Date of Birth</label>
                    <input defaultValue={user?.additionalDetails.dateOfBirth || null} type="date" name="dateOfBirth" id="dateOfBirth" className="form-style" onChange={handleOnChange}/>
                    </div>
                    <div className="flex flex-col gap-2 lg:w-[48%]">
                      <label htmlFor="gender" className="text-richblack-50">Gender</label>
                      <select defaultValue={user?.additionalDetails.gender || null} type="text" name="gender" id="gender" className="form-style" onChange={handleOnChange}>
                      <option value="Prefer not to say">Prefer not to say</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Non-Binary">Non-Binary</option>
                        <option value="Other">Other</option>
                        </select>
                        </div>
                        </div>
                        <div className="flex flex-col gap-5 lg:flex-row">
                          <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="contactNumber" className="text-richblack-50">Contact Number</label>
                            <input defaultValue={user?.additionalDetails.contactNumber || null} type="tel" name="contactNumber" id="contactNumber" placeholder="Enter Contact Number" className="form-style" onChange={handleOnChange}/>
                            </div>
                            <div className="flex flex-col gap-2 lg:w-[48%]">
                              <label htmlFor="about" className="text-richblack-50">About</label>
                              <input defaultValue={user?.additionalDetails.about || null} type="text" name="about" id="about" placeholder="Enter Bio Details" className="form-style" onChange={handleOnChange}/>
                </div>
              </div>
          </div>
          <div className="flex justify-end gap-2"><button className="flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 undefined" type="submit">Save</button></div>
          </form>



             {/* update Password */}
          <form onSubmit={handlePassword}>
          <div >
                                <div className=' relative mt-4'>
                                    <label className="w-full"><p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Old Password <sup className="text-pink-200">*</sup></p>
                                    <input
                                       required
                                       type={showPassword ? "text" : "password"}
                                       name="oldPassword"
                                       value={password.oldPassword}
                                       onChange={handleOnChangePassword}
                                       placeholder="Enter Password"
                                       style={{
                                         boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                       }}
                                       className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
                                     /></label>
                                     <span
                                       onClick={() => setShowPassword((prev) => !prev)}
                                       className="absolute right-3 top-9 z-[10] cursor-pointer"
                                     >
                                       {showPassword ? (
                                         <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" color="white" className='' />
                                       ) : (
                                         <AiOutlineEye fontSize={24} fill="#AFB2BF" color="white" />
                                       )}
                                     </span>
                                </div>
                                   <div className=' relative mt-4'>
                                    <label className="w-full"><p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">New Password <sup className="text-pink-200">*</sup></p>
                                    <input
                                       required
                                       type={showConfirmPassword ? "text" : "password"}
                                       name="newPassword"
                                       value={ password.newPassword}
                                       onChange={handleOnChangePassword}
                                       placeholder="Enter Password"
                                       style={{
                                         boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                       }}
                                       className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
                                     /></label>
                                     <span
                                       onClick={() => setShowConfirmPassword((prev) => !prev)}
                                       className="absolute right-3 top-9 z-[10] cursor-pointer"
                                     >
                                       {showConfirmPassword ? (
                                         <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" color="white" className='' />
                                       ) : (
                                         <AiOutlineEye fontSize={24} fill="#AFB2BF" color="white" />
                                       )}
                                     </span>
                                </div>
                                <div className=' relative mt-4'>
                                    <label className="w-full"><p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Confirm New Password <sup className="text-pink-200">*</sup></p>
                                    <input
                                       required
                                       type={showConfirmPassword ? "text" : "password"}
                                       name="confirmPassword"
                                       value={password.confirmPassword}
                                       onChange={handleOnChangePassword}
                                       placeholder="Enter Password"
                                       style={{
                                         boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                       }}
                                       className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
                                     /></label>
                                     <span
                                       onClick={() => setShowConfirmPassword((prev) => !prev)}
                                       className="absolute right-3 top-10 z-[10] cursor-pointer"
                                     >
                                       {showConfirmPassword ? (
                                         <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" color="white" className='' />
                                       ) : (
                                         <AiOutlineEye fontSize={24} fill="#AFB2BF" color="white" />
                                       )}
                                     </span>
                                </div>
                                </div>
                                <div className="flex justify-end gap-2 mt-3"><button className="flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 undefined" type="submit">Save</button></div>
                                </form>






           {/* Delete Account */}
          <div className="my-10 flex flex-row gap-x-5 rounded-md border-[1px] border-pink-700 bg-pink-900 p-3 md:p-8 md:px-12"><div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700">
          <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-3xl text-pink-200" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
          </div>
          <div className="flex flex-col space-y-2 w-full">
            <h2 className="text-lg font-semibold text-richblack-5">Delete Account</h2>
            <div className="md:w-3/5 text-pink-25"><p>Would you like to delete account?</p>
            <p>This account may contain Paid Courses. Deleting your account is permanent and will remove all the contain associated with it.
            </p>
            </div><button type="button" onClick={onDeleteAccount} className="w-fit cursor-pointer italic text-pink-300">I want to delete my account.</button>
            </div>
            </div>


       </div>
      </div>
    </div>
  )
}

export default Settings