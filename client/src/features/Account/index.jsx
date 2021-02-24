import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Button, Form, FormGroup, Spinner } from 'reactstrap'
import { useSetRecoilState } from 'recoil'
import * as yup from 'yup'
import authAPI from '../../api/authAPI'
import { InputField } from '../../customField/InputField'
import { isLoggedState } from '../../recoilState/authState'
import './Account.scss'


const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required().email(),
    newPassword: yup.string().required(),
    confirmPassword: yup.string().required(),
});


export default function Account() {
    const { register, handleSubmit, errors, formState } = useForm({
        resolver: yupResolver(schema)
    })
    const { isSubmitting } = formState
    const setIsLogged = useSetRecoilState(isLoggedState)
    const onSubmit = async (data) => {
        try {
            console.log(data)
        } catch (error) {

        }
    }
    const logout = async () => {
        try {
            await authAPI.logout()
            localStorage.clear()
            setIsLogged(false)
            window.location.href = '/'
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <section className="login">
            <div className="login__form">
                <h1>Account</h1>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <InputField
                        ref={register}
                        label="Name"
                        placeholder='Woo ...'
                        type='text'
                        name='name'
                        invalid={!!errors.name}
                        helperText={errors?.name?.message}
                    />
                    <InputField
                        ref={register}
                        label="Email"
                        placeholder='Woo ...'
                        type='text'
                        name='email'
                        invalid={!!errors.email}
                        helperText={errors?.email?.message}
                    />
                    <InputField
                        ref={register}
                        label="Password"
                        placeholder='New Password'
                        type='password'
                        name='password'
                        invalid={!!errors.password}
                        helperText={errors?.password?.message}
                    />
                    <InputField
                        ref={register}
                        label="confirmPassword"
                        placeholder='Confirm Password'
                        type='password'
                        name='confirmPassword'
                        invalid={!!errors.confirmPassword}
                        helperText={errors?.confirmPassword?.message}
                    />
                    <FormGroup>
                        <Button type='submit'>Submit</Button>
                        <Button onClick={logout}>
                            {isSubmitting ? <Spinner size='sm' /> : null}
                            Logout
                        </Button>
                    </FormGroup>
                </Form>
            </div>
        </section>
    )
}
