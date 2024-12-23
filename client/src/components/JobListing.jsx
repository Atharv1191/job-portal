import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { assets, JobCategories, JobLocations } from '../assets/assets';
import JobCard from './JobCard';

const JobListing = () => {
    const { isSearched, searchFillter, setSearchFillter, jobs } = useContext(AppContext);
    const [showFillter, setShowFillter] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [filteredJobs, setFillteredJobs] = useState(jobs);

    const handleCategoryChange = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
        );
    };

    const handleLocationChange = (location) => {
        setSelectedLocations((prev) =>
            prev.includes(location) ? prev.filter((c) => c !== location) : [...prev, location]
        );
    };
    useEffect(()=>{
        const matchesCategory = job =>selectedCategories.length === 0 || selectedCategories.includes(job.category)
        const matchesLocation = job=>selectedLocations.length ===0 || selectedLocations.includes(job.location)

        const matchesTitle = job=>searchFillter.title === ''|| job.title.toLowercase().includes(searchFillter.title.toLowercase())
        const MatchesSearchLocation = job => searchFillter.location === '' ||job.location.toLowercase().includes(searchFillter.location.toLowercase())

        const newFillterJobs = jobs.slice().reverse().filter(
            job => matchesCategory(job) && matchesLocation(job) && matchesTitle(job) && MatchesSearchLocation(job)
        )
        setFillteredJobs(newFillterJobs)
        setCurrentPage(1)
    },[jobs,selectedCategories,selectedLocations,searchFillter])

    return (
        <div className="container 2xl:px-20 mx-auto flex-col lg:flex-row max-lg:space-y-8 py-8">
            {/* ---SIDEBAR-------- */}
            <div className="w-full lg:w-1/4 bg-white px-4">
                {/* ----------search filter for hero component---------- */}
                {isSearched && (searchFillter.title !== "" || searchFillter.location !== "") && (
                    <>
                        <h3 className="font-medium text-lg mb-4">Current Search</h3>
                        <div className="mb-4 text-gray-600">
                            {searchFillter.title && (
                                <span className="inline-flex items-center gap-2.5 border-blue-200 px-4 py-1.5 rounded bg-blue-50">
                                    {searchFillter.title}
                                    <img
                                        onClick={(e) => setSearchFillter((prev) => ({ ...prev, title: "" }))}
                                        src={assets.cross_icon}
                                        className="cursor-pointer"
                                    />
                                </span>
                            )}
                            {searchFillter.location && (
                                <span className="ml-2 inline-flex items-center gap-2.5 border-red-200 px-4 py-1.5 rounded bg-red-50">
                                    {searchFillter.location}
                                    <img
                                        onClick={(e) => setSearchFillter((prev) => ({ ...prev, location: "" }))}
                                        src={assets.cross_icon}
                                        className="cursor-pointer"
                                    />
                                </span>
                            )}
                        </div>
                    </>
                )}
                <button
                    onClick={(e) => setShowFillter((prev) => !prev)}
                    className="px-6 py-1.5 rounded border border-gray-400 lg:hidden"
                >
                    {showFillter ? 'Close' : 'Filters'}
                </button>
                {/* ----------category filter---------- */}
                <div className={showFillter ? '' : 'max-lg:hidden'}>
                    <h4 className="font-medium text-lg py-4">Search by Categories</h4>
                    <ul className="space-y-4 text-gray-600">
                        {JobCategories.map((category, index) => (
                            <li className="flex gap-3 items-center" key={index}>
                                <input
                                    onChange={() => handleCategoryChange(category)}
                                    className="scale-125"
                                    type="checkbox"
                                    checked={selectedCategories.includes(category)}
                                />
                                {category}
                            </li>
                        ))}
                    </ul>
                </div>
                {/* ----------Location filter---------- */}
                <div className={showFillter ? '' : 'max-lg:hidden'}>
                    <h4 className="pt-14 font-medium text-lg py-4">Search by Locations</h4>
                    <ul className="space-y-4 text-gray-600">
                        {JobLocations.map((location, index) => (
                            <li className="flex gap-3 items-center" key={index}>
                                <input
                                    className="scale-125"
                                    type="checkbox"
                                    onChange={() => handleLocationChange(location)}
                                    checked={selectedLocations.includes(location)}
                                />
                                {location}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {/* ------------JOB LISTINGS---------- */}
            <section className="w-full lg:w-3/4 text-gray-800 max-lg:px-4">
                <h3 className="font-medium text-3xl py-2" id="job-list">Latest Jobs</h3>
                <p className="mb-8">Get your desired job from top companies</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filteredJobs.slice((currentPage - 1) * 6, currentPage * 6).map((job, index) => (
                        <JobCard key={index} job={job} />
                    ))}
                </div>
                {/* -----------pagination-------- */}
                {filteredJobs.length > 0 && (
                    <div className="flex items-center justify-center space-x-2 mt-10">
                        <a  href="#job-list">
                            <img
                                onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                                src={assets.left_arrow_icon}
                                alt=""
                            />
                        </a>
                        {Array.from({ length: Math.ceil(filteredJobs.length / 6) }).map((_, index) => (
                            <a href="#job-list" key={index}>
                                <button
                                    onClick={() => setCurrentPage(index + 1)}
                                    className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded ${
                                        currentPage === index + 1 ? 'bg-blue-100 text-blue-500' : 'text-gray-500'
                                    }`}
                                >
                                    {index + 1}
                                </button>
                            </a>
                        ))}
                        <a href="#job-list">
                            <img
                                onClick={() => setCurrentPage(Math.min(currentPage + 1, Math.ceil(filteredJobs.length / 6)))}
                                src={assets.right_arrow_icon}
                                alt=""
                            />
                        </a>
                    </div>
                )}
            </section>
        </div>
    );
};

export default JobListing;
