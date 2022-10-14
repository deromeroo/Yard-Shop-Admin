import React, {useState} from 'react';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/solid';

const Pagination = ({setOffset, ProductLimit, totalProducts}) => {

  const pivot = 3;
  const itemsArray = []; 
  const [current, setCurrent] = useState(1); 
  const totalNumberPages = Math.ceil(totalProducts / ProductLimit);
  const final = Math.min(Math.max(pivot * 2 + 2, pivot + current + 1), totalNumberPages + 1);
  const initial = Math.min(Math.max(final - (pivot * 2 + 1), 1), Math.max(current - pivot, 1));


  const getShade = (i) => {
    return (
      i === current 
        ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' 
        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
    )
  }

  for (let i = initial; i < final; i++) {
    itemsArray.push(
      <a
        key={`Page-${i}`}
        onClick={() => {
          setCurrent(i);
          setOffset((i - 1) * ProductLimit);
        }}
        href="#"
        aria-current="page"
        className={`${getShade(i)} relative inline-flex items-center px-4 py-2 border text-sm font-medium`} >
        {i}
      </a>
    );
  }

  const prevButton = () => {
    if (current > 1) {
      setCurrent(current - 1);
      setOffset((current - 2) * ProductLimit);
    }
  };

  const nextButton = () => {
    if (current < totalNumberPages) {
      setCurrent(current + 1);
      setOffset(current * ProductLimit);
    }
  };


  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 items-center justify-between">

      <div>
          <p className="text-sm text-gray-700">
            Showing &nbsp;
            <span className="font-medium">
              {ProductLimit * (current - 1) + 1}&nbsp;
            </span>
              to{' '}&nbsp;
            <span className="font-medium">
              {current * ProductLimit < totalProducts ? current * ProductLimit : totalProducts}&nbsp;
            </span>
            of &nbsp;
            <span className="font-medium">
            {totalProducts}&nbsp;
            </span>
            results.
          </p>
        </div>

        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <a 
              onClick={prevButton}
              href="#" 
              className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
                
              <ChevronLeftIcon className='h-4 w-4'  aria-hidden='true'/>
            </a>
            {itemsArray}
            <a 
              onClick={nextButton}
              href="#" 
              className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
              <ChevronRightIcon className='h-4 w-4' aria-hidden='true'/>
            </a>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Pagination