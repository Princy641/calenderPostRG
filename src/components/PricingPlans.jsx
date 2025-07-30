"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import "./PricingPlans.css"
import {
    BarChart2,
    Calendar,
    Users,
    MessageSquare,
    FileText,
    ExternalLink,
    CheckSquare,
    Settings,
    ChevronRight,
} from "react-feather"

const PricingPlans = () => {
    const [showSidebar, setShowSidebar] = useState(false)
    const location = useLocation()

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar)
    }

    const bcvLogoUrl = "https://upload.wikimedia.org/wikipedia/commons/e/ef/BCV-Blue-RGB.png"

    // Check if the current path matches the menu item path
    const isActive = (path) => {
        return location.pathname === path
    }

    return (
        <div className="pricing-container">
            {/* Header */}
            <div className="header">
                <img src={bcvLogoUrl || "/placeholder.svg"} alt="logo" className="logo" />
                <span className="onboarding-text">ONBOARDING</span>
            </div>

            {/* Sidebar */}
            <div className="sidebar-wrapper open">
                <div className="sidebar">
                    <div className="sidebar-content">
                        <ul className="sidebar-menu">
                            <li className={isActive("/dashboard") ? "active" : ""}>
                                <Link to="/dashboard">
                                    <BarChart2 size={20} />
                                    <span>Dashboard</span>
                                </Link>
                            </li>
                            <li className={isActive("/calendar") ? "active" : ""}>
                                <Link to="/calendar">
                                    <Calendar size={20} />
                                    <span>Calendar</span>
                                </Link>
                            </li>
                            <li className={isActive("/social-listening") ? "active" : ""}>
                                <Link to="/social-listening">
                                    <Users size={20} />
                                    <span>Social Listening</span>
                                </Link>
                            </li>
                            <li className={isActive("/reputation-management") ? "active" : ""}>
                                <Link to="/reputation-management">
                                    <MessageSquare size={20} />
                                    <span>Reputation Management</span>
                                </Link>
                            </li>
                            <li className={isActive("/posts") ? "active" : ""}>
                                <Link to="/posts">
                                    <FileText size={20} />
                                    <span>Posts</span>
                                </Link>
                            </li>
                            <li className={isActive("/ads") ? "active" : ""}>
                                <Link to="/ads">
                                    <ExternalLink size={20} />
                                    <span>Ads</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="sidebar-footer">
                        <ul className="sidebar-menu">
                            <li className={isActive("/task-assignment") ? "active" : ""}>
                                <Link to="/task-assignment">
                                    <CheckSquare size={20} />
                                    <span>Task Assignment</span>
                                </Link>
                            </li>
                            <li className={isActive("/settings") ? "active" : ""}>
                                <Link to="/settings">
                                    <Settings size={20} />
                                    <span>Settings</span>
                                </Link>
                            </li>
                            <li className="user-profile">
                                <Link to="/profile">
                                    <div className="user-avatar">
                                        <span>JM</span>
                                    </div>
                                    <div className="user-info">
                                        <span className="user-name">John Mathew</span>
                                        <span className="user-status">50% Pending</span>
                                    </div>
                                    <ChevronRight size={20} className="chevron-icon" />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Overlay */}
            {showSidebar && <div className="overlay" onClick={toggleSidebar}></div>}
        </div>
    )
}

export default PricingPlans
