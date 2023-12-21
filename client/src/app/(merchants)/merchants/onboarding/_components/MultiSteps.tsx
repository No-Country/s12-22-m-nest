'use client'
import { ShopForm } from '@/components'
import { useState, type FunctionComponent } from 'react'

const MultiSteps: FunctionComponent = () => {
  const arraySteps = [1, 2]
  const [currentStep, setCurrentStep] = useState(1)

  const handleNextStep = async (): Promise<void> => {
    (currentStep !== 0 && currentStep < arraySteps.length) && setCurrentStep(currentStep + 1)
  }

  const handlePreviousStep = async (): Promise<void> => {
    (currentStep > 0) && setCurrentStep(currentStep - 1)
  }

  return (
    <div className='w-3/5 mx-auto'>
      <div className='flex justify-center gap-5 pb-3'>
        {
            arraySteps.map((step, index) => (
              <button key={index}
              className={`w-[30px] h-[30px] rounded-full ${currentStep === step && 'bg-green-800 text-white'}`}>
                    {step}
                </button>
            ))
        }
      </div>
      <ShopForm step={currentStep} nextStep={handleNextStep} previousStep={handlePreviousStep}/>
    </div>
  )
}

export default MultiSteps
