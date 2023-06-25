'use server'
import { NextResponse } from "next/server";
import data, { dataType } from "../data/datas";
import {generateId,getDataById,getValuable, putHandler} from "./handler"

export async function GET(req : Request){
   const url = new URL(req.url)
   const jenis = url.searchParams.get('jenis')
   const minimal = url.searchParams.get('min')
   const maximal = url.searchParams.get('max')
   const kelas = url.searchParams.get('kelas')
   const kurikulum = url.searchParams.get('kurikulum')
   const pelajaran = url.searchParams.get('pelajaran')
   const show = Number(url.searchParams.get('show')) || 20
   const length = Number(url.searchParams.get('length'))
   if(length){
      return NextResponse.json({
         length : data.length
      },{status : 200})
   }
   
   const modifyData = (jenis || (minimal && maximal) || kelas || kurikulum ) ? (data.filter((item) => {
         const jenisMatch = jenis ? item.jenis == jenis : true
         const average = minimal && maximal ? item.harga_rata >= Number(minimal) && item.harga_rata <= Number(maximal) : true
         const kelasMatch = kelas ? item.kelas == Number(kelas) : true
         const kurikulumMatch = kurikulum ? item.kurikulum == kurikulum : true
         const pelajaranMatch = pelajaran ? item.pelajaran == pelajaran : true
         return jenisMatch && average && kelasMatch && kurikulumMatch && pelajaranMatch
      })) : data.slice(0,10)

   if(modifyData.length == 0){
      return NextResponse.json({
         message : 'Gagal mendapatkan data'
      },{status : 400,statusText : 'Bad Request'})
   }
   return NextResponse.json({
      count : modifyData.length,
      data : {...modifyData.slice(0,show)}
   },{status: 200})
}

export async function POST(req:Request) {
   const RequestData = await req.json()
   const {harga_rata,kelas,jenis,harga_zona,book_name,kurikulum,pelajaran} : dataType = RequestData
   if(!(harga_rata && jenis)){
      return NextResponse.json({
         message : 'data yang dibutuhkan kurang'
      },{status : 400, statusText : 'Bad Request'})
   }
   switch (jenis){
      case "fiksi":
      case "majalah":{
         if(!(book_name && jenis && harga_rata)){
            return NextResponse.json({
               message : 'data yang dibutuhkan kurang'
            },{status : 400, statusText : 'Bad Request'})
         }
         const newId = generateId()
         data.push({
            jenis,
            id : newId,
            harga_rata,
            book_name,
         })
         const isMatch = getDataById(newId)
         if(!isMatch){
            return NextResponse.json({
               message : 'data gagal ditambahkan'
            },{status : 400, statusText : 'Bad Request'})
         }
         return NextResponse.json({
            message : 'data berhasil ditambahkan',
            data : {...isMatch}
         },{status : 201, statusText : 'Created'})}
      case "paket":{
         if(!(harga_rata && kelas && jenis && harga_zona && kurikulum)){
            return NextResponse.json({
               message : 'data yang dibutuhkan kurang'
            },{status : 400, statusText : 'Bad Request'})
         }
         const newId = generateId()
         data.push({
            jenis,
            id : newId,
            harga_rata,
            kelas,
            harga_zona,
            kurikulum,
            pelajaran
         })
         const isMatch = getDataById(newId)
         if(!isMatch){
            return NextResponse.json({
               message : 'data gagal ditambahkan'
            },{status : 400, statusText : 'Bad Request'})
         }
         return NextResponse.json({
            message : 'data berhasil ditambahkan',
            data : {...isMatch}
         },{status : 201, statusText : 'Created'})}
      default: {
         const newId = generateId();
         const newData  = {
            jenis,
            id: newId,
            harga_rata,
            book_name,
            kelas,
            harga_zona,
            kurikulum,
            pelajaran
         };
         data.push(getValuable(newData));
         const isMatch = getDataById(newId);
         if (!isMatch) {
            return NextResponse.json({
               message: 'data gagal ditambahkan'
            }, { status: 400, statusText: 'Bad Request' });
         }
         return NextResponse.json({
            message: 'data berhasil ditambahkan',
            data: {...isMatch}
         }, { status: 201, statusText: 'Created' });
      }
   }
}

export async function PUT(req: Request) {
   const requestData = await req.json();
   const { id, harga_rata, kelas, jenis, harga_zona, book_name, kurikulum, pelajaran }: dataType = requestData;
   if (!id) {
      return NextResponse.json({
         message: 'data yang dibutuhkan kurang',
      }, { status: 400, statusText: 'Bad Request' });
   }
   const findIndex = data.findIndex(item => item.id === Number(id));
   putHandler({harga_rata, kelas, jenis, harga_zona, book_name, kurikulum, pelajaran,id : Number(id) },findIndex)
   return NextResponse.json({
      message: 'data berhasil diubah',
      data: { ...data[findIndex] },
   }, { status: 201, statusText: 'Updated' });
}
