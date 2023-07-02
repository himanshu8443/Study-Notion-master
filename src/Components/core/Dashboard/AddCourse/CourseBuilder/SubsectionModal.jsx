import React from 'react'
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { createSubSection, updateSubSection } from '../../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../../slices/courseSlice';
import { RxCross1 } from 'react-icons/rx';
import Upload from './Upload'
import IconBtn from '../../../../common/IconBtn';
import { useState } from 'react';


const SubsectionModal = ({
    modalData,
    setModalData,
    add=false,
    edit=false,
    view=false
}) => {
    const { token } = useSelector((state) => state.auth);
    const { course } = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();
    useEffect (() => {
        if (view || edit) {
            setValue("lecture", modalData.title);
            setValue("lectureDesc", modalData.description);
            setValue("lectureVideo", modalData.videoUrl);
            // console.log("useeffect modalData", modalData);
        }
    },[view,edit]);

    const isFormUpdated = () => {
        const currentValues = getValues();
        if(currentValues.lecture !== modalData.title ||
             currentValues.lectureDesc !== modalData.description ||
              currentValues.lectureVideo !== modalData.videoUrl) {
            return true;
        }
        return false;
    }

    const handelEditSubsection = async (data) => {
        const currentValues = getValues();
        const formData = new FormData();
        formData.append("SubsectionId", modalData._id);
        if (currentValues.lecture !== modalData.title) {
            formData.append("title", data.lecture);
        }
        if (currentValues.lectureDesc !== modalData.description) {
            formData.append("description", data.lectureDesc);
        }
        if (currentValues.lectureVideo !== modalData.videoUrl) {
        formData.append("videoFile", data.lectureVideo);
        }

        formData.append("courseId", course._id);
        // console.log("formdata", [...formData]);
        const result = await updateSubSection(formData, token);
        if (result) {
            dispatch(setCourse(result));
        }
        setModalData(null);
    }

    const onSubmit = async (data) => {
        if (view) {
            return;
        }
        if(edit) {
            if (!isFormUpdated()) {
                toast.error("No changes made");
            }
            else {
                handelEditSubsection(data);
            }
            return;
        }

        const formData = new FormData();
        formData.append("sectionId", modalData);
        formData.append("title", data.lecture);
        formData.append("description", data.lectureDesc);
        formData.append("videoFile", data.lectureVideo);
        formData.append("courseId", course._id);

        console.log("formdata", [...formData]);
        const result = await createSubSection(formData, token);
        console.log("result", result);
        if (result) {

            dispatch(setCourse(result));
        }
        setModalData(null);
    }
            

  return (
    <div className='fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
        <div className='my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800'>
            <div className='flex items-center justify-between rounded-t-lg bg-richblack-700 p-5'>
                <p className='text-xl font-semibold text-richblack-5'>{view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture</p>
                <button onClick={() => (!loading ? setModalData(null): {})}>
                    <RxCross1 size={20} color={"white"} />
                </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 px-8 py-10">
                <Upload 
                    name="lectureVideo"
                    label="lectureVideo"
                    register={register}
                    setValue={setValue}
                    errors={errors}
                    video={true}
                    viewData={view ? modalData.videoUrl: null}
                    editData={edit ? modalData.videoUrl: null}
                />
                <div className='flex flex-col space-y-2'>
                    <label className='text-sm text-richblack-5' htmlFor='lecture'>Lecture Title</label>
                    <input disabled={view}
                        id='lecture'
                        placeholder='Enter Lecture Title'
                        {...register("lecture", {required:true})}
                        className='form-style w-full'
                    />
                    {errors.lectureTitle && (<span className='ml-2 text-xs tracking-wide text-pink-200'>
                        Lecture Title is required
                    </span>)}
                </div>
                <div className='flex flex-col space-y-2'>
                    <label className='text-sm text-richblack-5'>Lecture Description</label>
                    <textarea disabled={view}
                        id='lectureDesc'
                        placeholder='Enter Lecture Description'
                        {...register("lectureDesc", {required:true})}
                        className='form-style resize-x-none min-h-[130px] w-full'
                    />
                    {
                        errors.lectureDesc && (<span className='ml-2 text-xs tracking-wide text-pink-200'>
                            Lecture Description is required
                        </span>)
                    }
                </div>

                {
                    !view && (
                        <div className='flex justify-end'>
                            <IconBtn 
                                text={loading ? "Loading...": edit ? "Save Changes" : "Save"}
                            />
                        </div>
                    )
                }
            </form>
        </div>
    </div>
  )
}

export default SubsectionModal