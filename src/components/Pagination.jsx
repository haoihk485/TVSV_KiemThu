import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';

const Pagination = ({ page, totalPage, handlePagination }) => {
    return (
        <div className="flex justify-center my-5">
            <nav className="flex items-center space-x-2" aria-label="Pagination">
                {(page !== 0) &&
                    <button onClick={() => { handlePagination(0) }} className="bg-secondary text-white py-2 px-4 rounded-l-lg"><FirstPageIcon></FirstPageIcon></button>
                }
                {(page !== 0) &&
                    <button onClick={() => { handlePagination(page - 1) }} className="bg-secondary text-white py-2 px-4">{page}</button>
                }
                <button className="bg-cerise text-white py-2 px-4">{page + 1}</button>
                {(page !== totalPage - 1) && (totalPage !== 0) &&
                    <button onClick={() => { handlePagination(page + 1) }} className="bg-secondary text-white py-2 px-4">{page + 2}</button>
                }
                {(page !== totalPage - 1) && (totalPage !== 0) &&
                    <button onClick={() => { handlePagination(totalPage - 1) }} className="bg-secondary text-white py-2 px-4 rounded-r-lg"><LastPageIcon></LastPageIcon></button>
                }

            </nav>
        </div >
    )
}

export default Pagination