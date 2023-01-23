import { Button } from '@components/rhf'
import React from 'react'
export const SubmitButtons = ({
                                  handleSubmit,
                                  next,
                                  nextText = 'Next',
                                  onSubmit,
                                  submitting,
                                  className
                              }) => {
    return (
        <div className="flex justify-center  submit-buttons">
            <div className="flex" />
            <div className="flex">
                <Button
                    disabled={submitting}
                    loading={submitting}
                    onClick={handleSubmit((data) => {
                        onSubmit(data)
                    })}
                    text={nextText}
                    type="submit"
                />
            </div>
        </div>
    )
}
