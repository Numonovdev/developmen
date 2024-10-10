import { useEffect, useState } from 'react';
import loadingg from './assets/gif.gif';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function App() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [savePages, setSavePages] = useState(0);
  const [valibtnless, setValiBtnLess] = useState(false);
  const [span, setSpan] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const skip = (page - 1) * limit;
    setLoading(true);
    fetch(`https://json-api.uz/api/project/11-dars/developers?skip=${skip}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        setPages((borPages) => birlashtirishPages(borPages, data.data));
        setSavePages(data.total);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page]);

  const btnMore = () => {
    if (pages.length < savePages) {
      setPage((prevPage) => prevPage + 1);
    } else {
      setValiBtnLess(true);
    }
  };

  const btnLess = () => {
    setPages(pages.slice(0, limit));
    setPage(1);
    setValiBtnLess(false);
  };

  function birlashtirishPages(borPages, yangiPges) {
    return [...borPages, ...yangiPges];
  }

  function handleSpan(e) {
    // e.preventDefault();
    window.scrollTo(0, 0);
  }

  return (
    <div className='mt-10 pb-20 text-white'>
      <div className='mb-10 w-full max-w-7xl mx-auto flex flex-col items-center gap-10'>
        <h2>Document:</h2>
        <div className='w-full flex gap-10 flex-wrap justify-center'>
          {loading ? (
            <div className='mx-auto w-full flex flex-col items-center'>
              <img className='w-1/4' src={loadingg} alt="loading" />
            </div>
          ) : pages.length > 0 && (
            pages.map((coment) => (
              <div key={coment.id} className='flex bg-gray-700 hover:bg-gray-800 cursor-pointer flex-col text-base w-1/4 py-2.5 px-3 rounded-xl'>
                <h1 className='text-base'><span className='text-red-400'>Name:</span> {coment.fullName}</h1>
                <h1 className='text-base'><span className='text-red-400'>Major:</span> {coment.major}</h1>
                <h1 className='text-base'><span className='text-red-400'>Jins:</span> {coment.gender}</h1>
                <h1 className='text-base'><span className='text-red-400'>Yosh:</span> {coment.age}</h1>
              </div>
            ))
          )}
        </div>
        {!valibtnless ? (
          <div className='flex gap-5 items-center'>
            <button className='bg-blue-500 text-white py-2 px-4 rounded' onClick={btnMore}>Show more 10</button> 
            <span className='text-gray-400 hover:text-gray-300 cursor-pointer' onClick={handleSpan}>Tepaga chiqish^</span>
          </div>
        ) : (
          <button className='bg-red-500 text-white py-2 px-4 rounded' onClick={btnLess}>Show less</button>
        )}
      </div>
      <div className='mx-auto w-full flex justify-center'>NumonovDev © 2024</div>
    </div>
  );
}

export default App;
 