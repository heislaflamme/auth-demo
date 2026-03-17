import { createMiddleware } from "@tanstack/react-start";
import { auth } from "#/lib/auth.server";
import { redirect } from "@tanstack/react-router";


export const authMiddleWare = createMiddleware().server(
    async({next, request}) => {
        const session = await auth.api.getSession({headers: request.headers});

        if (!session){
            throw redirect({ to: "/"})
        }

        return await next()
    }
)