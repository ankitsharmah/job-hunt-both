import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'
import { JOB_API_END_POINT } from '@/utils/constants'
import { useNavigate } from 'react-router-dom'

const AppliedJobTable = () => {
    const {appliedJobs} = useSelector(store=>store.jobs);
    const navigate = useNavigate();
    return (
        <div>
            <Table>
                <TableCaption>A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        appliedJobs.length <= 0 ? <span>You haven't applied any job yet.</span> :appliedJobs.map((appliedJob) => (
                            <TableRow key={appliedJob._id} className={"cursor-pointer"} onClick={()=>navigate(`/description/${appliedJob.job._id}`)}> 
                                <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                                <TableCell>{appliedJob.job?.title}</TableCell>
                                <TableCell>{appliedJob.job?.company?.name}</TableCell>
                                <TableCell className="text-right"><Badge className={`${appliedJob?.status === "rejected" ? 'bg-red-400' : appliedJob.status === 'pending' ? 'bg-gray-400 hover:bg-gray-500' : 'bg-green-400 hover:bg-green-500'}`}>{appliedJob.status.toUpperCase()}</Badge></TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable