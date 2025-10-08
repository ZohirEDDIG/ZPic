import { Xmark } from '../../icons';
import { useUpload } from '../../contexts';

const Wallpaper = () => {
    const { wallpaper, handleClear } = useUpload();
    
    return (
        <div>

            <button type='button' onClick={handleClear} className='w-fit text-gray-600 text-2xl ml-auto mb-2 block cursor-pointer select-none xl:hidden'>
                
                <Xmark />
            
            </button>

            <img src={wallpaper.preview} alt='Wallpaper' className='select-none' />

        </div>
    );
};

export default Wallpaper; 