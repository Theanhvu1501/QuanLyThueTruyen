import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Button, Form, FormGroup, Spinner } from 'reactstrap'
import { useRecoilValue } from 'recoil'
import * as yup from 'yup'
import { InputField } from '../../customField/InputField'
import { isLoggedState } from '../../recoilState/authState'
import Account from '../Account'
import './Login.scss'


const schema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required(),
});


export default function Login() {
    const { register, handleSubmit, errors, formState } = useForm({
        resolver: yupResolver(schema)
    })
    const { isSubmitting } = formState
    const onSubmit = async (data) => {
        try {
            await axios.post('user/login', data)

            localStorage.setItem('firstLogin', true)

            window.location.href = '/'

        } catch (error) {
            alert(error.response.data.msg)
        }
    }

    const isLogged = useRecoilValue(isLoggedState)
    const [isRegister, setIsRegister] = useState(false)
    return (
        <section className="login">
            {isLogged ? <Account /> :
                <div className="login__form">
                    <h1>{isRegister ? 'Register' : 'Login'}</h1>
                    <Form onSubmit={handleSubmit(onSubmit)}>
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
                            placeholder='Woo ...'
                            type='password'
                            name='password'
                            invalid={!!errors.password}
                            helperText={errors?.password?.message}
                        />

                        <FormGroup>
                            <Button type='submit'>
                                {isSubmitting ? <Spinner size='sm' /> : null}
                                submit

                            </Button>
                            <Link to='/register' className="btn-link">Register</Link>
                        </FormGroup>
                    </Form>
                </div>
            }
        </section>

    )
}
