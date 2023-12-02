import React from 'react';
import CounsellorCard from './CounsellorCard';

const CounsellorList = ({ counsellorList, handleButtonClick }) => {
    return (
        counsellorList && <div className="container mx-auto mt-8">
            <h2 className="text-xl font-bold mb-4">Danh sách nhân viên</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {counsellorList.map((counsellor, index) => (
                    <CounsellorCard key={index} counsellor={counsellor} handleButtonClick={handleButtonClick} />
                ))}
            </ul>
        </div>
    );
};

export default CounsellorList;
