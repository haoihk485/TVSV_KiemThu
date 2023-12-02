const PaginationModal = ({ page, totalPage, handlePagination }) => {
    return (
        totalPage && <div className="w-full justify-center flex">
            {page !== 0 &&
                <button
                    className="rounded-md bg-secondary p-1 text-white w-8 mx-1"
                    onClick={() => handlePagination(page - 1)}>{page}</button>}
            <button className="rounded-md bg-cerise p-1 text-white w-8 mx-1">{page + 1}</button>
            {totalPage - 1 !== page &&
                <button
                    className="rounded-md bg-secondary p-1 text-white w-8 mx-1"
                    onClick={() => handlePagination(page + 1)}>{page + 2}</button>}
        </div>
    )
}

export default PaginationModal