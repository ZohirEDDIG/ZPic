import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import AccounContext from './AccountContext';
import { useAuth, useDarkTheme } from '../index';
import { editCurrentUser } from '../../api/user';
import { customToast } from '../../utils';

const AccounProvider = ({ children }) => {
    const { token, user, getCurrentUserQuery } = useAuth();
    const [userData, setUserData] = useState({ username: '', website: '', about: '', avatarPreview: { avatarPreviewFile: null, avatarPreview: '' }});
    const [userDataErrors, setUserDataErrors] = useState({ username: '', website: '', about: '', sameData: '' });

    useEffect(() => {
        if (token && user?._id) {
            setUserData({ username: user.username, avatarPreview: { avatarPreviewFile: null, avatarPreview: user.avatar }, website: user.website, about: user.about });
        } else {
            setUserData({ username: '', website: '', about: '', avatarPreview: { avatarPreviewFile: null, avatarPreview: '' }});
        }
    }, [token, user?._id]);


    const handleChangeUsername = (e) => {
        if (userDataErrors.username) setUserDataErrors((prev) => ({ ...prev, username: '' }));

        const username = e.target.value;
        if (username.startsWith(' ') || username.endsWith('  ')) return;
        setUserData((prev) => ({...prev, username: username }));

        setUserDataErrors((prev) => ({ ...prev, sameData: '' }));
    };

    const handleChangeAvatarPreview = (e) => {
        const avatarPreviewFile = e.target.files[0];
        const avatarPreview = URL.createObjectURL(avatarPreviewFile);
        setUserData((prev) => ({ ...prev, avatarPreview: { avatarPreviewFile, avatarPreview }}));

        setUserDataErrors((prev) => ({ ...prev, sameData: '' }));
    }; 

    const handleChangeWebsite = (e) => {
        if (userDataErrors.website) setUserDataErrors((prev) => ({ ...prev, website: '' }));

        const website = e.target.value;
        if (website.startsWith(' ') || website.endsWith('  ')) return;
        setUserData((prev) => ({ ...prev, website: website }));

        setUserDataErrors((prev) => ({ ...prev, sameData: '' }));
    };

    const handleChangeAbout = (e) => {
        if (userDataErrors.about) setUserDataErrors((prev) => ({ ...prev, about: '' }));

        const about = e.target.value;
        if (about.startsWith(' ') || about.endsWith('  ')) return;
        setUserData((prev) => ({ ...prev, about: about }));

        setUserDataErrors((prev) => ({ ...prev, sameData: '' }));
    };

    console.log(user)

    const editCurrentUserMutation = useMutation({ mutationFn: editCurrentUser });

    const handleSaveChanges = () => { 
        setUserDataErrors((prev) => ({ ...prev, sameData: '' }));

        setUserDataErrors({ username:  '', website: '', about: '', avatarPreview: '' });

        if (!userData.username.trim()) {
            setUserDataErrors({ ...userDataErrors, username: 'username_is_required' });
        } else {
            const usernameRegExp = /^[a-zA-Z0-9.-_@]{3,}$/;
            if (!usernameRegExp.test(userData.username)) {
                setUserDataErrors({ ...userDataErrors, username: 'invalid_username_format' });
            }
        }

        if(userData.website.trim()) {
            const websiteRegExp = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;
            if (!websiteRegExp.test(userData.website)) {
                setUserDataErrors({ ...userDataErrors, website: 'invalid_website_format' });
            }
        }

        if(userData.about.trim()) {
            if (userData.about.length > 120) {
                setUserDataErrors({ ...userDataErrors, about: 'about_is_too_long' });
            }
        }

        if (userDataErrors.username || userDataErrors.website || userDataErrors.about) {
            return;
        }

        const formData = new FormData();

        if (userData.username.trim() && userData.username !== user.username) {
            formData.append('username', userData.username.trim());
        };

        if (userData.avatarPreview.avatarPreviewFile) {
            formData.append('avatar', userData.avatarPreview.avatarPreviewFile);
        };

        if (userData.website.trim() && userData.website !== user.website) {
            formData.append('website', userData.website.trim());
        };

        if (userData.about.trim() && userData.about !== user.about) {
            formData.append('about', userData.about.trim());
        };

        if (user.username === userData.username.trim() && user.website === userData.website.trim() && user.about === userData.about.trim() && user.avatar === userData.avatarPreview.avatarPreview) {
            setUserDataErrors((prev) => ({ ...prev, sameData: 'no_changes_to_save' }));
            return;
        };

        editCurrentUserMutation.mutate({ token,  data: formData });
    };


    const { t } = useTranslation();
    const { isDarkTheme } = useDarkTheme();

    useEffect(() => {
        if (editCurrentUserMutation.isSuccess) {
            customToast(t(editCurrentUserMutation.data.data.message), '✅', isDarkTheme);
            getCurrentUserQuery.refetch();
        }
    }, [editCurrentUserMutation.isSuccess, editCurrentUserMutation.isError]);

    const value = {
        user,
        userData, setUserData, 
        userDataErrors, 
        handleChangeUsername,
        handleChangeAvatarPreview,
        handleChangeWebsite,
        handleChangeAbout,
        handleSaveChanges, 
        editCurrentUserMutation
    };

    return (
        <AccounContext.Provider value={value}>
            {children}
        </AccounContext.Provider>
    );
};

export default AccounProvider;