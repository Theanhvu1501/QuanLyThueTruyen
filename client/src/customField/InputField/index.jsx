import React, { forwardRef } from 'react'
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap'
export const InputField = forwardRef((props, ref) => {
    const { label, name, placeholder, type, invalid, helperText, onChange } = props
    return (
        <>
            <FormGroup>
                <Label for={name}>{label}</Label>
                <Input
                    innerRef={ref}
                    autoComplete="on"
                    placeholder={placeholder}
                    type={type}
                    invalid={invalid}
                    name={name}
                    onChange={onChange}
                />
                <FormFeedback >
                    {helperText}
                </FormFeedback>
            </FormGroup>
        </>
    )
})

