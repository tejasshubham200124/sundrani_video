import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import ReactPaginate from "react-paginate";

function UserList() {
  const [post, setPost] = useState([]);
  const [number, setNumber] = useState(1); // No of pages
  const [postPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.post('https://apidev.sundranifilms.co.in/admin/get_all_users')
    .then(response => {
      if (response.data.result && response.data.result.length > 0) {
        setPost(response.data.result);
      }
    })
    .catch(error => {
      console.error(error);  
    });
  }, []);

  const lastPost = number * postPerPage;
  const firstPost = lastPost - postPerPage;

  const handleSearch = e => {
    setSearchQuery(e.target.value);
  };

  const filteredPosts = post
  ? post.filter(post =>
      post.first_name && post.first_name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  : [];


  const currentPost = filteredPosts.slice(firstPost, lastPost);
  const PageCount = Math.ceil(filteredPosts.length / postPerPage);
  const ChangePage = ({ selected }) => {
    setNumber(selected + 1);
  };

  return (
    <div className='App'>
      <div className='row'>
        <div className='col-8'>
          <h1 style={{ fontSize: "23px" , fontWeight:"500"}}>User List</h1>
        </div>
        <div className='col-4 text-end'>
          <input type="text" value={searchQuery} onChange={handleSearch} placeholder='search users' className='form-control w-30%' />
        </div>

      </div>
      <Table striped bordered hover className='mt-4'>
        <thead>
          <tr>
            <th>ID </th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Subscribed</th>
            <th>Subscribed Start Date</th>
            <th>Subscribed Expiry Date</th>
          </tr>
        </thead>
        <tbody>
        {post.length > 0 ? (
          currentPost.map((users) => {
            return (
              <tr key={users.id}>
                <td>{users.id}</td>
                <td>{users.first_name}</td>
                <td>{users.email}</td>
                <td>{users.mobile}</td>
                <td>{users.is_subscribe}</td>
                <td>{users.subs_date}</td>
                <td>{users.last_date}</td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan="7">Loading...</td>
          </tr>
        )}
        </tbody>
      </Table>

      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        pageCount={PageCount}
        onPageChange={ChangePage}
        containerClassName={"paginationBttns"}
        activeClassName={"paginationActive"}
        disableInitialCallback={true}
        initialPage={0}
      ></ReactPaginate>
    </div>
  );
}

export default UserList;
