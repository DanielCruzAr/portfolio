import React from 'react'

function Quoter() {
  return (
    <div className='px-4 sm:px-6 lg:px-8 pt-12'>
        <h1 className='text-4xl font-bold text-center'>Open Quoter V1</h1>
        {/* Quoter Section */}
        <section className='min-h-screen max-w-7xl mx-auto mt-32 mb-10 px-4 sm:px-6 lg:px-8'>
           <iframe 
            src="https://racksvision.com/serve?clientId=user_31eW9HPgkJOzXzDFz0FMvEM1kwB" 
            width="100%" 
            height="600" 
            title="RacksVision Quoter">
            </iframe>
        </section>
    </div>
  )
}

export default Quoter