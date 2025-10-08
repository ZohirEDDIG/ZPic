import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from '@tanstack/react-query';
import UploadContext from './UploadContext';
import { useAuth, useDarkTheme } from '../index';
import { uploadWallpaper } from '../../api/wallpaper';
import { customToast } from '../../utils';
import { getCategoryTags } from '../../api/tag';
import { getCategories } from '../../api/category';


const UploadProvider = ({ children }) => {
    const [wallpaper, setWallpaper] = useState({ file: null, preview: '' });
    const [wallpaperDetails, setWallpaperDetails] = useState({ name: '', resolution: '', size: '' });
    const [category, setCategory] = useState(null);
    const [tags, setTags] = useState([]);
    const [uploaodWallpaperErrors, setUploaodWallpaperErrors] = useState({ wallpaper: '', category: '', tags: '' });

    const getCategoriesQuery = useQuery({ queryKey: ['categories'], queryFn: getCategories });
    const getCategoryTagsQuery = useQuery({ queryKey: ['tags', category], queryFn: () => getCategoryTags(category), enabled: !!category });

    
    const handleDrop = (e) => {
        if (uploaodWallpaperErrors.wallpaper) setUploaodWallpaperErrors((prev) => ({ ...prev, wallpaper: '' }));

        const file = e.target.files[0];
        if (!file) return;

        const preview = URL.createObjectURL(file);

        const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);

        if (sizeInMB > 12) {
            setUploaodWallpaperErrors((prev) => ({ ...prev, wallpaper: 'maximum_file_size_12mb' }));
            return;
        }
            
        const img = new Image();
        img.onload = () => {
            const resolution = `${img.width}x${img.height}`;

            // const isLandscapeValid = img.width >= 3000 && img.height >= 1080;
            // const isPortraitValid = img.width >= 1080 && img.height >= 1920;

            // if (!isLandscapeValid && !isPortraitValid) {
            //     setUploaodWallpaperErrors((prev) => ({ ...prev, wallpaper: 'minimum_resolution_3000x1080_or_1080x1920' }));
            //     return;
            // }

            setWallpaper({ file, preview });
            setWallpaperDetails({ name: file.name, size: `${sizeInMB} MB`, resolution: resolution });
        };

        img.src = preview;
    };

    const handleChangeCategory = (e) => {
        if (uploaodWallpaperErrors.category) setUploaodWallpaperErrors((prev) => ({ ...prev, category: '' }));

        setCategory(e.target.value);
    };

    const handleAddTag = (tag) => {
        if (uploaodWallpaperErrors.tags) setUploaodWallpaperErrors((prev) => ({ ...prev, tags: '' }));

        setTags((prev) => [...prev, { id: tag._id , name: tag.name,  }]); 
    };

    const handleRemoveTag = (tag) => {
        setTags((prev) => prev.filter((t) => t.id !== tag.id));
    };


    const handleClear = () => {
        setWallpaper({ file: null, preview: '' });
        setWallpaperDetails({ name: '', resolution: '', size: '' });
        setCategory(null);
        setTags([]);
        setUploaodWallpaperErrors({ wallpaper: '', category: '', tags: '' });
    };

    const { token }  = useAuth();
 
    const uploadWallpaperMutation = useMutation({ mutationFn: uploadWallpaper });

    const handleUploadWallpaper = () => {
        setUploaodWallpaperErrors({ category: '', tags: '' });

        if (!category) {
            setUploaodWallpaperErrors((prev) => ({ ...prev, category: 'please_select_a_category' }));
        }

        if (tags.length === 0) {
            setUploaodWallpaperErrors((prev) => ({ ...prev, tags: 'please_specify_at_least_one_tag' }));
        }


        if (!category || tags.length === 0) return;

        const formData = new FormData();

        formData.append('wallpaper', wallpaper.file);
        formData.append('name', wallpaperDetails.name);
        formData.append('resolution', wallpaperDetails.resolution);
        formData.append('size', wallpaperDetails.size);
        formData.append('category', category);

        tags.forEach((tag) => formData.append('tags[]', tag.id));

        console.log({
            wallpaper: wallpaper.file,
            name: wallpaperDetails.name,
            resolution: wallpaperDetails.resolution,
            size: wallpaperDetails.size,
            category: category,
            tags: tags.map((tag) => tag.id)
        })
        
        uploadWallpaperMutation.mutate({ data: formData, token });
    };

    const { t, i18n } = useTranslation();
    const { isDarkTheme } = useDarkTheme();
    const { user }  = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (uploadWallpaperMutation.isSuccess) {
            customToast(t(uploadWallpaperMutation.data.data.message), '✅', isDarkTheme);
            navigate(`/${i18n.language}/profile/${user.username}`);
            handleClear();
        }
    }, [uploadWallpaperMutation.isSuccess]);

   
    const value = {
        wallpaper,
        setWallpaper,
        wallpaperDetails,
        setWallpaperDetails,
        category,
        setCategory,
        tags, setTags,
        uploaodWallpaperErrors,
        handleDrop,
        handleChangeCategory,
        handleAddTag,
        handleRemoveTag,
        handleClear,
        handleUploadWallpaper,
        getCategoriesQuery,
        getCategoryTagsQuery,
        uploadWallpaperMutation
    };
    
    return (
        <UploadContext.Provider value={value}>
            {children}
        </UploadContext.Provider>
    );
};

export default UploadProvider;