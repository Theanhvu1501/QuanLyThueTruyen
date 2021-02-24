import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Button, Form, FormGroup } from 'reactstrap'
import { Link } from 'react-router-dom'
import * as yup from 'yup'
import { InputField } from '../../customField/InputField'
import './Register.scss'
import axios from 'axios'


const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().required(),
});


export default function Register() {
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema)
    })
    const onSubmit = async (data) => {
        try {
            await axios.post('user/register', data)

            localStorage.setItem('firstLogin', true)

            window.location.href = '/'

        } catch (error) {
            alert(error.response.data.msg)
        }
    }

    return (
        <section className="login">
            <div className="login__form">
                <h1>Register</h1>
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
                        placeholder='Woo ...'
                        type='password'
                        name='password'
                        invalid={!!errors.password}
                        helperText={errors?.password?.message}
                    />

                    <FormGroup>
                        <Button type='submit'>Submit</Button>
                        <Link to='/login' className="btn-link">Login</Link>
                    </FormGroup>
                </Form>
            </div>
        </section>
    )
}
