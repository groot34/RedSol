import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/userModel'
import { NextRequest,NextResponse } from "next/server";

connect();

export async function POST(request:NextRequest){
    try{
        const reqBody = await request.json();
        const {name,phone,email,hobby} = reqBody;
        console.log(reqBody)

        const user = await User.findOne({phone})

        if(user){
            return NextResponse.json({error:"User alreay exist!"},{status:400})
        }
        const newUser = new User({
            name,
            phone,
            email,
            hobby,
          });

          const savedUser = await newUser.save();
          console.log(savedUser)

          return NextResponse.json({
            message: "User registered Sucessfully ",
            success:true,
            savedUser
        })

    }catch(error:any){
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}