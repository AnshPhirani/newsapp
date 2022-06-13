import React from 'react'

import loading from './loading.gif'

function Spinner(){
    return (
      <div className='text-center my-4'>
          <img src={loading} alt="Loading..." className="src" />
      </div>
    )
}

export default Spinner;