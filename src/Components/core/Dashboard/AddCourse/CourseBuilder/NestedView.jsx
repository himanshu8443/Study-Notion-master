import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { VscAdd, VscEdit } from 'react-icons/vsc';
import { VscTrash } from 'react-icons/vsc';
import { VscTriangleDown } from 'react-icons/vsc';
import { useState } from 'react';
import ConfirmationModal from ".././../../.././common/ConfirmationModal"
import SubSectionModal from './SubsectionModal';
import { deleteSection, deleteSubSection } from '../../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../../slices/courseSlice';
import {RxDropdownMenu} from 'react-icons/rx'
const NestedView = ({handelChangeEditSectionName}) => {
    const {token} = useSelector(state => state.auth);
    const {course} = useSelector(state => state.course);
    const dispatch = useDispatch();

    const [viewSubSection, setviewSubSection] = useState(null);
    const [addSubSection, setAddSubSection] = useState(null);
    const [editSubsection, setEditSubsection] = useState(null);
    

    const [confirmationModal, setConfirmationModal] = useState(null);





    const handeldeleteSection = async (sectionId) => {
        const result = await deleteSection({sectionId,courseId:course._id},token);
        if(result){
            dispatch(setCourse(result));
            setConfirmationModal(null);
        }
    }

    const handeldeleteSubSection = async (subSectionId,sectionId) => {
        const result = await deleteSubSection({subSectionId,courseId:course._id,sectionId},token);
        if(result){
            dispatch(setCourse(result));
            setConfirmationModal(null);
        }
    }

    const handelChangeEditSubSectionName = (subSectionId,subSection) => {
    }
    // console.log(course.courseContent);
  return (
    <div>
        <div>
            {
                course.courseContent.map((section) => (
                    <details key={section._id} className='mt-4'>
                        <summary className='flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2'>
                            <div className='flex items-center gap-x-3'>
                                <RxDropdownMenu size={25} className=' text-richblack-50'/>
                                <p className='font-semibold text-richblack-50' >{section.sectionName}</p>
                                </div>
                                <div className='flex items-center gap-x-3'>
                                    <button>
                                        <VscEdit className='text-lg text-richblack-50 ' onClick={() => {
                                            handelChangeEditSectionName(section._id,section.sectionName);
                                        }}/>
                                    </button>
                                    <button>
                                        <VscTrash className='text-lg text-richblack-50' onClick={() => {
                                            setConfirmationModal({
                                                text1: "Delete this Section?",
                                                text2: "All the lectures in this section will be deleted",
                                                btn1Text: "Delete",
                                                btn2Text:"Cancel",
                                                btn1Handler: () => handeldeleteSection(section._id),
                                                btn2Handler: () => setConfirmationModal(null),
                                            })
                                        }}/>
                                    </button>
                                    <span className="font-medium text-richblack-300">|</span>
                                    <VscTriangleDown className='text-lg text-richblack-50' />
                                </div>
                        </summary>

                        <div className='px-6 pb-4'>
                            {
                                section.subSection.map((subSection) => (
                                    <div onClick={(e) => {if(e.currentTarget != e.target ) return;setviewSubSection(subSection);}} key={subSection._id} className='flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2 z-0'>
                                        <div className='flex items-center gap-x-3'>
                                        <RxDropdownMenu size={25} className=' text-richblack-50'/>
                                        <p className='font-semibold text-richblack-50' >{subSection.title}</p>
                                        </div>
                                        <div className='flex items-center gap-x-3'>
                                            <button>
                                                <VscEdit className='text-lg text-richblack-50 z-50' onClick={
                                                    () => {
                                                        setEditSubsection(subSection);
                                                    }
                                                } />
                                            </button>
                                            <button>
                                                <VscTrash className='text-lg text-richblack-50 z-50' size={21} onClick={() => {
                                                    setConfirmationModal({
                                                        text1: "Delete this Sub-Section?",
                                                        text2: "Selected lecture will be deleted",
                                                        btn1Text: "Delete",
                                                        btn2Text:"Cancel",
                                                        btn1Handler: () => handeldeleteSubSection(subSection._id,section._id),
                                                        btn2Handler: () => setConfirmationModal(null),
                                                    })
                                                }} />
                                            </button>
                                            </div>
                                    </div>
                                ))
                            }
                            <button onClick={() => setAddSubSection(section._id)} className='mt-3 flex items-center gap-x-1 text-yellow-50 font-bold'>
                                <VscAdd className='text-lg text-yellow-50 ' />
                                <p>Add Lecture</p>
                            </button>
                        </div>
                 
                 </details>
                ))
            }
        </div>
        {
           addSubSection ? <SubSectionModal modalData={addSubSection} setModalData={setAddSubSection}  add={true} /> : 
              editSubsection ? <SubSectionModal modalData={editSubsection} setModalData={setEditSubsection} edit={true} /> : 
                viewSubSection ? <SubSectionModal modalData={viewSubSection} setModalData={setviewSubSection} view={true} /> : null
        }
        {
            confirmationModal ? <ConfirmationModal modalData={confirmationModal} setConfirmationModal={setConfirmationModal} /> : null
        }
    </div>
  )
}

export default NestedView