import data, { dataType } from "@/app/data/datas";
import { NextResponse } from "next/server";
import { getDataById, putHandler } from "../handler";

export function GET(_ : any,{params} : {params : {id : string}}){
   const isMatch = getDataById(Number(params.id));
   if(!isMatch){
      return NextResponse.json({
         message : "id not found",
      },{status : 404, statusText : "Not Found"})
   }
   return NextResponse.json({
      data : isMatch,
   },{status : 200, statusText : "OK"})
}

export async function PUT(req : Request,{params} : {params : {id : string}}){
   const requestData = await req.json();
   const {id} = params
   const {harga_rata, kelas, jenis, harga_zona, book_name, kurikulum, pelajaran }: dataType = requestData;
   if (!id) {
      return NextResponse.json({
         message: 'data yang dibutuhkan kurang',
      }, { status: 400, statusText: 'Bad Request' });
   }
   const findIndex = data.findIndex(item => item.id === Number(id))
   putHandler({harga_rata, kelas, jenis, harga_zona, book_name, kurikulum, pelajaran,id : Number(id)},findIndex)
   return NextResponse.json({
      message: 'data berhasil diubah',
      data: { ...data[findIndex] },
   }, { status: 201, statusText: 'Updated' });
}

export function DELETE(_: any, { params }: { params: { id: string } }) {
   try{
      const index = data.findIndex(item => item.id === Number(params.id));
      if (index === -1) {
         return NextResponse.json({
            message: "id not found",
         }, { status: 404, statusText: "Not Found" });
      }
      data.splice(index, 1);
      const isFinding = getDataById(Number(params.id))
      if(isFinding){
         DELETE(_, { params: { id: (params.id)}})
      }
      return NextResponse.json({
         message: "data berhasil dihapus",
      }, { status: 200, statusText: "OK" });
   }catch {
      return NextResponse.json({
         message: "ERROR",
      }, { status: 500, statusText: "Internal Server Error" });
   }
}
