import React from 'react';
import SidebarNavigation from '../Sidebar/SidebarNavigation';
import PostTrendsChart from './PostTrendsChart';
import './Posts.css';
// fix this


const Posts = () => {
    return (
        <div className="page-layout">
            <div className="sidebar">
                <SidebarNavigation />
            </div>
            <div className="post-Container">
                <h1>Post</h1>
                <p>This is the new Post page.</p>
                <PostTrendsChart />
            </div>
        </div>
    );
};

export default Posts;
