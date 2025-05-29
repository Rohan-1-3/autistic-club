import React from 'react';

function ErrorsComponent({ errors }) {
   return (
    <div className=''>
        <ul>
            {errors.map((element, index) => (
                    <li key={index} className='text-red-600'>{element.msg}</li>
            ))}
        </ul>
     
    </div>
   )
}

export default ErrorsComponent;