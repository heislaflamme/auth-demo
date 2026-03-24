import { createServerFn } from "@tanstack/react-start";
import VerifyEmail from "#/emails/verifyEmail";
import { Resend } from "resend";
import z from "zod";
import ResetEmail from "#/emails/resetPassword";

const resend = new Resend(process.env.RESEND_API_KEY!);

export const sendVerificationEmail = createServerFn({ method: "POST" }).
inputValidator(z.object({ url: z.url(), email: z.email(), name: z.string()}))
.handler( async ({data}) => {

    try{
        await resend.emails.send({
        from: "verify@chidubem.name.ng",
        to: data.email,
        subject: "Verify your email for Dubem's Auth Demo",
        react: VerifyEmail({ url: data.url, name: data.name })
    })

     return {success: true}
    }
    catch(err){
        return {success: false, error: (err as Error).message}
    }
    
});

export const sendPasswordResetEmail = createServerFn({ method: "POST" }).
inputValidator(z.object({ url: z.url(), email: z.email(), name: z.string()}))
.handler( async ({data}) => {

    try{
        await resend.emails.send({
        from: "reset@chidubem.name.ng",
        to: data.email,
        subject: "Reset your password for Dubem's Auth Demo",
        react: ResetEmail({ url: data.url, name: data.name })
    })

     return {success: true}
    }
    catch(err){
        return {success: false, error: (err as Error).message}
    }
    
});