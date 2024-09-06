import { cookies } from "next/headers";

export async function POST(req:Request, res:Response) {
    // Get the existing cookie value
    const consent = cookies().get('consent');
  
    // Set a new cookie value
    cookies().set('consent', 'true', { path: '/' });
  
    // Return the cookie value   
    return Response.json({ consent });
  }