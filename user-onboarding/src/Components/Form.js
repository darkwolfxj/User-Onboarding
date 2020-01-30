import React, {useState} from 'react';
import {Formik, Form, Field} from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import styled from 'styled-components';


const P = styled.p`
    color: red;
`

const validationSchema= yup.object().shape({
    name: yup
        .string().required('Name is a required field.')
        .min(3, 'Enter a longer name.'),
    password: yup
        .string().required('Password is required.')
        .min(6, 'Enter a longer password.')
        .max(12, 'Password exceeds character limit') 
    });

const MyForm = () => {
    const [users, setUsers] = useState([])
    const handleSubmit = (values, tools) => {
        tools.resetForm()
        axios
            .post('https://reqres.in/api/users', values)
            .then(res => {
                setUsers(res.data.name)
            })
            .catch(err => console.log(err))
    }
    return (
        <div>
            <Formik 
                initialValues={{name:'', password:'', email:'', checkbox: false, role: 'Choose a role.'}}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
                render = {props => (
                <Form>
                    <div><Field placeholder='name' name='name' type='text' /></div>
                    <P>{props.errors.name}</P>
                    <div><Field placeholder='password' name='password' type='password' /></div>
                    <P>{props.errors.password}</P>
                    <div><Field placeholder='email' name='email' type='email' /></div>
                    <div><label htmlFor='checkbox'><Field name='checkbox' type='checkbox' required />Accept Terms of Service</label></div>
                    <select>
                        <option value='' disabled>Choose a role.</option>
                        <option value='it'>IT</option>
                        <option value='webdev'>WebDev</option>
                        <option value='BackEnd'>BackEnd</option>
                    </select>
                    <button type='submit'>Submit</button>
                </Form>
            )}
            />
            <p>Users:{users}</p>
        </div>
    )
}

export default MyForm