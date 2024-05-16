import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/userModel'
import { NextRequest,NextResponse } from "next/server";
 connect();

export async function GET(){
    try{
        const records = await User.find({});
        console.log(records)
        return NextResponse.json(records);
    }catch(error){
        console.error(error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}