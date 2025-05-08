import React, {Component, useState, useEffect} from 'react';
function PaginationWithInput({suffix,totalPages, onPageChange} )
{
    const [currentPage, setCurrentPage] = useState(1);
    const [inputPage, setInputPage] = useState("");
    useEffect(()=>{ setCurrentPage(1)},[suffix])
    const handlePageChange = (page) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
        onPageChange(page);
        setInputPage("");
      }
    };
  
    const handleInputChange = (e) => {
      setInputPage(e.target.value);
    };
  
    const handleInputSubmit = () => {
      const page = parseInt(inputPage, 10);
      if (!isNaN(page)) handlePageChange(page);
    };
  
    return (
      <div className="pagination">
        <span>
           &lt;&lt; 
          <button style={{marginLeft: "5px"}} onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
             Previous
          </button>  <span>| </span>
        </span>
  
        <span>
            Page [ {currentPage} ] of {totalPages} |
        </span>
  
        <input
          type="text"
          value={inputPage}
          onChange={handleInputChange}
          placeholder="Go"
          style={{ width: "50px", margin: "0 10px" }}
        />
  
        <button onClick={handleInputSubmit}>Go</button> |
  
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button> <span>&gt;&gt;</span>
      </div>
    );

}
export default PaginationWithInput