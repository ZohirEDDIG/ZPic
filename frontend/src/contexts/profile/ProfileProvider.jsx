import { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCurrentUserBookmarks, getCurrentUserUploads } from '../../api/user';
import useAuth from '../auth/useAuth';
import ProfileContext from './ProfileContext';

const ProfileProvider = ({ children }) => {
    const [activeTab, setActiveTab] = useState('uploads');

    const activeTabRef = useRef(null);
    const unactiveTabRef = useRef(null);

    const [activeTabStyles, setActiveTabStyles] = useState(null);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    useEffect(() => {
        if (activeTabRef, unactiveTabRef) {
            if (activeTab === 'uploads') {
                setActiveTabStyles({ left: 0, width: activeTabRef.current.offsetWidth });
            } else {
                setActiveTabStyles({ left: unactiveTabRef.current.offsetWidth + 24, width: activeTabRef.current.offsetWidth });
            }
        }

    }, [activeTabRef, unactiveTabRef, activeTab]);

    const { token, user } = useAuth();

    const getCurrentUserUploadsQuery = useQuery({ queryKey: ['current-user-uploads', user?._id], queryFn: () => getCurrentUserUploads(token) });
    const getCurrentUserBookmarksQuery = useQuery({ queryKey: ['current-user-bookmarks', user?._id], queryFn: () => getCurrentUserBookmarks(token) });

    const value = {
        activeTab, 
        setActiveTab,
        activeTabRef,
        unactiveTabRef,
        activeTabStyles,
        handleTabClick,
        getCurrentUserUploadsQuery,
        getCurrentUserBookmarksQuery
    };

    return (
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    );
};

export default ProfileProvider;