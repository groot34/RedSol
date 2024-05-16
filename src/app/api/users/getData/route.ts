import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/userModel'
import { NextRequest,NextResponse } from "next/server";


export async function GET(){
    await connect();
    try{
        const records = await User.find({});
        return NextResponse.json(records);
    }catch(error){
        console.error(error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}