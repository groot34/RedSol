import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/userModel'
import { NextRequest,NextResponse } from "next/server";
connect();

export async function DELETE(request:NextRequest){
    try{
        const reqBody = await request.json();
        const {_id} = reqBody;
        console.log(_id)
        if(!_id){
            return NextResponse.json({ error: 'Missing _id parameter' }, { status: 400 });
        }
        console.log(_id)

        const user = await User.findOne({_id:_id})
        console.log(user)
       await User.deleteOne({_id});
       return NextResponse.json({ message: `User with ID-${_id} deleted Successfully` }, { status: 200 });
    }catch(error){
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}