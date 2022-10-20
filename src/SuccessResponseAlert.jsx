import React from 'react'

const SuccessResponseAlert = ({response}) => {

    console.log(response)
  return (
    <div className='container-fluid'>
    <div className="alert alert-success alert-dismissible" role="alert">
    <button type="button" onClick={()=>response.setApiSuccessResponse(null)} className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    <strong>Congratulations!</strong> You successfully tied your shoelace!
    </div>
    </div>
  )
}

export default SuccessResponseAlert