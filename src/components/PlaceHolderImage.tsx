import cycleBuddy from '../assets/images/cycleBuddy.svg';

const PlaceHolderImage = () => {
  return (
    <div className='justify-center flex-1 hidden md:flex'>
      <img src={cycleBuddy} className='w-3/5 h-auto opacity-60' />
    </div>
  );
};

export default PlaceHolderImage;
