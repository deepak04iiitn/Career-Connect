import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table, Tooltip, Pagination } from 'flowbite-react';

const truncateDescription = (description, wordLimit) => {
    if (typeof description !== "string" || !description.trim() || description === "Not Available") {
        return "No description available";
    }

    const words = description.split(" ");
    if (words.length > wordLimit) {
        return words.slice(0, wordLimit).join(" ") + "...";
    }
    return description;
};

export default function JobTable() {
    const [jobs, setJobs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [jobsResponse] = await Promise.all([
                    axios.get("http://localhost:3000/backend/naukri"),
                ]);

                const jobsData = jobsResponse.data.map(item => ({
                    ...item,
                    _id: item._id,
                    job_title: item.job_title || "Unknown",
                    min_exp: item.min_exp,
                    max_exp: item.max_exp,
                    company: item.company,
                    location: Array.isArray(item.location) ? item.location[0] || "Unknown" : item.location || "Unknown",
                    jd: item.full_jd,
                    date: item.time,
                }));

                // Sort jobs by date (latest first)
                jobsData.sort((a, b) => new Date(b.date) - new Date(a.date));

                setJobs(jobsData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    // Paginate jobs
    const startIndex = (currentPage - 1) * jobsPerPage;
    const endIndex = startIndex + jobsPerPage;
    const currentJobs = jobs.slice(startIndex, endIndex);

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className='p-4 bg-gray-100 dark:bg-gray-900 mt-20'>
            {jobs.length > 0 ? (
                <>
                    <Table hoverable className='shadow-lg bg-white dark:bg-gray-800 rounded-lg overflow-hidden'>
                        <Table.Head className='bg-blue-800 text-gray-900'>
                            <Table.HeadCell>Job Title</Table.HeadCell>
                            <Table.HeadCell>Company</Table.HeadCell>
                            <Table.HeadCell>Location</Table.HeadCell>
                            <Table.HeadCell>Date & Time</Table.HeadCell>
                            <Table.HeadCell>Minimum Experience</Table.HeadCell>
                            <Table.HeadCell>Maximum Experience</Table.HeadCell>
                            <Table.HeadCell>Apply Here</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className='divide-y'>
                            {currentJobs.map((job) => (
                                <Table.Row key={job._id} className='transition-transform duration-300 hover:bg-blue-50 dark:hover:bg-gray-700'>

                                    <Table.Cell className='p-4 text-gray-900 dark:text-gray-100'>
                                        <Tooltip content={truncateDescription(job.jd, 5)}>
                                            {job.title}
                                        </Tooltip>
                                    </Table.Cell>

                                    <Table.Cell className='p-4 text-gray-900 dark:text-gray-100'>
                                        <Tooltip content={truncateDescription(job.jd, 5)}>
                                            {job.company}
                                        </Tooltip>
                                    </Table.Cell>

                                    <Table.Cell className='p-4 text-gray-900 dark:text-gray-100'>
                                        <Tooltip content={truncateDescription(job.jd, 5)}>
                                            {job.location}
                                        </Tooltip>
                                    </Table.Cell>

                                    <Table.Cell className='p-4 text-gray-900 dark:text-gray-100'>
                                        <Tooltip content={truncateDescription(job.jd, 5)}>
                                            {job.date}
                                        </Tooltip>
                                    </Table.Cell>

                                    <Table.Cell className='p-4 text-gray-900 dark:text-gray-100'>
                                        <Tooltip content={truncateDescription(job.jd, 5)}>
                                            {job.min_exp}
                                        </Tooltip>
                                    </Table.Cell>

                                    <Table.Cell className='p-4 text-gray-900 dark:text-gray-100'>
                                        <Tooltip content={truncateDescription(job.jd, 5)}>
                                            {job.max_exp}
                                        </Tooltip>
                                    </Table.Cell>

                                    <Table.Cell className='p-4'>
                                        <Tooltip content={truncateDescription(job.jd, 5)}>
                                            <Button className='apply-button'>
                                                Apply Here
                                            </Button>
                                        </Tooltip>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>

                    {/* Pagination Component */}
                    <div className="flex justify-center mt-4">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={Math.ceil(jobs.length / jobsPerPage)}
                            onPageChange={handlePageChange}
                            className='bg-blue-500 text-white rounded-lg'
                        />
                    </div>
                </>
            ) : (
                <p className='text-center text-gray-600 dark:text-gray-400'>No jobs on the board yet!</p>
            )}
            {/* Inline CSS for Truncation */}
            <style jsx>{`
                .truncate {
                    display: -webkit-box;
                    -webkit-line-clamp: 1; /* Number of lines to show */
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: normal;
                }
                .apply-button {
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    display: inline-block;
                    padding: 0.5rem 1rem;
                    border-radius: 0.375rem;
                    background-color: #3b82f6; /* Blue color */
                    color: #ffffff;
                    border: none;
                    cursor: pointer;
                    transition: background-color 0.3s ease, transform 0.3s ease;
                }
                .apply-button:hover {
                    background-color: #2563eb; /* Darker blue */
                    transform: scale(1.05);
                }
                .apply-button:focus {
                    outline: none;
                    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5); /* Blue shadow */
                }
            `}</style>
        </div>
    );
}
