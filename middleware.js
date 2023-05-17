import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(

    function middleware(req) {

        console.log('middle')
        if (!req.nextauth.token)
            return NextResponse.redirect(new URL('/registration', req.nextUrl.origin));

        if (
            req.nextUrl.pathname === '/admin' &&
            req.nextauth.token.user.role !== 'admin'
        ) {
            return new NextResponse("You are not authorized")
        }
    },
    {
        callbacks: {
            authorized: (params) => {

                return NextResponse.redirect(new URL('/registration', params.req.nextUrl.origin));
            }
        }
    }
)

export const config = { matcher: ["/", "/admin"] }