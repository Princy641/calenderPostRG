import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import './CreatePostSlider.css';

const CreatePostSlider = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="slider-container">
            <div className="slider-header">
                <h2 className="slider-title">Create Post</h2>
                <button onClick={onClose}>
                    <X className="slider-close-icon" />
                </button>
            </div>

            <div className="slider-content">
                {/* Event & Location */}
                <div className="event-details">
                    <div className="event-title">London School District - Spring Break Concert</div>
                    <div>Fri, 24 Jan 2025 · Olympia London, London</div>
                </div>

                {/* Suggested Post */}
                <div className="suggested-post">
                    <div className="suggested-label">SUGGESTED POST - AI POWERED</div>
                    <img src="/picnic.jpg" alt="Suggested" className="suggested-image" />
                    <div className="suggested-description">
                        <div className="suggested-header">
                            <h3 className="suggested-title">Summer Festival</h3>
                            <div className="social-icons">
                                <img src="/facebook-icon.svg" alt="Facebook" className="icon" />
                                <img src="/instagram-icon.svg" alt="Instagram" className="icon" />
                            </div>
                        </div>
                        <p className="suggested-text">
                            Lorem ipsum dolor sit amet, consectetur sadipscing elitr, sed diam nonumy eirmod tempor...
                        </p>
                        <p className="suggested-note">50 characters or fewer perform the best</p>
                    </div>
                </div>

                {/* Similar Campaigns */}
                <div>
                    <h4 className="similar-title">Similar Campaigns</h4>
                    <div className="similar-campaigns">
                        {[
                            { title: 'Soak in Summer', percent: 50 },
                            { title: 'Summer Festival', percent: 40 },
                            { title: 'Enjoy', percent: 35 },
                        ].map(({ title, percent }, i) => (
                            <div key={i} className="campaign-item">
                                <img src={`/suggested-${i + 1}.jpg`} alt={title} className="campaign-image" />
                                <div>
                                    <div>{title}</div>
                                    <div className="campaign-note">Similar Campaign Conversion {percent}%</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Campaign Details */}
                <div className="campaign-details">
                    <div><span className="font-medium">Start Campaign On:</span> 20 Jan 2025, 10 AM</div>
                    <div><span className="font-medium">Target Audience:</span> Age 18 - 60, Living in UK</div>
                    <div><span className="font-medium">Tags:</span> music lovers, outdoor, activity, festival, spring</div>
                </div>

                {/* Action Buttons */}
                <div className="action-buttons">
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button className="publish-button">Publish</Button>
                </div>
            </div>
        </div>
    );
};

export default CreatePostSlider;
