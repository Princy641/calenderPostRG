import React from 'react';
import SidebarNavigation from './Sidebar/SidebarNavigation';
import SocialListeningGraph from './SocialListeningGraph';
import './SocialListening.css';

const SocialListening = () => {
  return (
    <div className="page-layout">
      <div className="sidebar">
        <SidebarNavigation />
      </div>
      <div className="socialListening-Container">
        <h1>SocialListening</h1>
        <p>This is the new SocialListening page.</p>
        <SocialListeningGraph />
      </div>
    </div>
  );
};

export default SocialListening;
