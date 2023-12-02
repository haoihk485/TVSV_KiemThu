import React from 'react';
import AddHomeIcon from '@mui/icons-material/AddHome';
import blankAvt from '../../assets/img/blank_avt.png'

const CounsellorCard = ({ counsellor, handleButtonClick }) => {
  // const [counsellorInfor, setCounsellorInfor] = {
  //   id: '', name: '', avatarUrl: '', email: ''
  // }
  // if (counsellor) {
  //   setCounsellorInfor({
  //     id: counsellor.id,
  //     name: counsellor.name,
  //     avatarUrl: counsellor.avatarUrl,
  //     email: counsellor.email
  //   })
  // }


  return (
    <li className="bg-white p-4 rounded-md shadow-md border w-96">
      <div className="flex items-center mb-4 w-full">
        <img src={blankAvt} alt={counsellor?.name ? counsellor.name : ''} className="w-12 h-12 rounded-md mr-4" />
        <div className='flex justify-between w-full'>
          <div>
            <h3 className="text-lg font-semibold">{counsellor?.name ? counsellor.name : 'Chưa có trưởng phòng ban'}</h3>
            <p className="text-gray-500">{counsellor?.email ? counsellor.email : ''}</p>
          </div>
          {handleButtonClick && <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            onClick={() => handleButtonClick(counsellor.id)}
          >
            <AddHomeIcon></AddHomeIcon>
          </button>}
        </div>
      </div>
    </li>
  );
};

export default CounsellorCard;
