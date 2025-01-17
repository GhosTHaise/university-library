"use client"

import AuthForm from '@/components/authForm'
import {signUpSchema } from '@/lib/validation'
import React from 'react'

const Page = () => {
  return (
    <div>
        <AuthForm
            type="SIGN_UP"
            schema={signUpSchema}
            defaultValues={{
                email: "",
                password: "",
                fullname : "",
                universityId : 0,
                universityCard : "",
            }}
            onSubmit={() => {}}
        />
    </div>
  )
}

export default Page
