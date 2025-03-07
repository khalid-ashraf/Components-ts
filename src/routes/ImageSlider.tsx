import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

type TImage = {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
};

type CircleIndicatorProps = {
  images: TImage[] | null;
  currentImage: number;
  handleCircleClick: (id: number) => void;
};

type SliderProps = {
  setCurrentImage: React.Dispatch<React.SetStateAction<number>>;
} & Omit<CircleIndicatorProps, "handleCircleClick">;

const limit = 5;
const URL = `https://picsum.photos/v2/list?page=1&limit=${limit}`;

const ImageSlider: React.FC = () => {
  const { data, isLoading } = useFetch<TImage[]>(URL);
  const [currentImage, setCurrentImage] = useState(0);

  // useEffect to run the interval based on the images loading and if the user manually changes clearInterval.
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => {
        return data && prev === data.length - 1 ? 0 : prev + 1;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [data, currentImage]);

  return (
    <div className='flex flex-col gap-10 items-center'>
      <h2 className='heading-2'>Image Slider</h2>

      {/* Check for loading state, if the images are loaded display the image slider */}
      {isLoading ? (
        <Loading />
      ) : (
        <Slider images={data} currentImage={currentImage} setCurrentImage={setCurrentImage} />
      )}
    </div>
  );
};
export default ImageSlider;

// Loading Component
const Loading = () => {
  return <h3 className='text-xl font-semibold'>Loading...</h3>;
};

// Slider sub-component.
const Slider: React.FC<SliderProps> = ({ images, currentImage, setCurrentImage }) => {
  if (!images || images === null || images.length === 0)
    return <h3 className='text-xl font-semibold'>No Images</h3>;

  // Function to handle click based on the circle user clicks. Passed down to the circle indiators component.
  const handleCircleClick = (id: number) => {
    setCurrentImage(id);
  };

  return (
    <>
      <div className='w-96 flex gap-5 justify-center items-center'>
        <button
          onClick={() =>
            setCurrentImage((prev) => {
              return prev === 0 ? images.length - 1 : prev - 1;
            })
          }
        >
          <i className='fa-solid fa-arrow-left' />
        </button>

        {images?.map((image) => {
          const isCurrentImage = currentImage === Number(image.id);

          return (
            isCurrentImage && (
              <img key={image.id} className='' src={image.download_url} alt={image.author} />
            )
          );
        })}

        <button
          onClick={() =>
            setCurrentImage((prev) => {
              return prev === images.length - 1 ? 0 : prev + 1;
            })
          }
        >
          <i className='fa-solid fa-arrow-right' />
        </button>
      </div>

      <CircleIndicators
        images={images}
        currentImage={currentImage}
        handleCircleClick={handleCircleClick}
      />
    </>
  );
};

// Circle Indicator Subcomponent
const CircleIndicators: React.FC<CircleIndicatorProps> = ({
  images,
  currentImage,
  handleCircleClick,
}) => {
  return (
    <div className='flex gap-2 justify-center'>
      {images?.map((image) => {
        const isActive = Number(image.id) === currentImage;

        return (
          <button key={image.id} onClick={() => handleCircleClick(Number(image.id))}>
            <i className={`fa-${isActive ? "solid" : "regular"} fa-circle`} />
          </button>
        );
      })}
    </div>
  );
};
