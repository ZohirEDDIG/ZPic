import { useUpload } from '../../contexts';

const Wallpaper = () => {
    const { wallpaper } = useUpload();
    
    return (
        <div>

            <img src={wallpaper.preview} alt='Wallpaper' className='select-none' />

        </div>
    );
};

export default Wallpaper; 