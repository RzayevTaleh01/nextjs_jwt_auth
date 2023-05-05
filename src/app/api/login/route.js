import { getJwtSecretKey } from "@/app/libs/auth";
import { SignJWT } from "jose";

export async function POST(request){
    const body = await request.json();

    if(body.username === 'admin' && body.password ==='admin'){
        //generate token 

        const token  = await new SignJWT({
            username: body.username,
            role: 'admin'
        }).setProtectedHeader({
            alg: 'HS256'
        }).setIssuedAt()
        .setExpirationTime('30s')
        .sign(getJwtSecretKey());
        console.log(token);

        //set a cookie

        //return the response
    }
}