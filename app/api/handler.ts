import { NextResponse } from "next/server";
import data, { dataType, jenisType, kurikulumtype } from "../data/datas";

export const generateId = () => {
   return Number(String(Date.now()) + String(Math.floor(Math.random() * 1000)))
}

type Valuable<T> = { [K in keyof T as T[K] extends null | undefined ? never : K]: T[K] };

export function getValuable<
   T extends {},
   V = Valuable<T>,
   >(obj: T): V {
   return Object.fromEntries(
      Object.entries(obj).filter(
         ([, v]) =>!((typeof v === 'string' && !v.length) || v === null || typeof v === 'undefined'),
      ),
   ) as V;
}

export const getDataById = (id: number) => {
   return data.find(d => d.id === id)
}

export const putHandler = ({harga_rata, kelas, jenis, harga_zona, book_name, kurikulum, pelajaran } : dataType, index : number) => {

   if (index === -1) {
      return NextResponse.json({
         message: 'data tidak ditemukan',
      }, { status: 400, statusText: 'Bad Request' });
   }
   const updatedData: Partial<dataType> = {};
   if (harga_rata) {
      updatedData.harga_rata = harga_rata;
   }
   if (kelas) {
      updatedData.kelas = kelas;
   }
   if (book_name) {
      updatedData.book_name = book_name;
   }
   if (kurikulum) {
      updatedData.kurikulum = kurikulum;
   }
   if (pelajaran) {
      updatedData.pelajaran = pelajaran;
   }
   data[index] = {
      ...data[index],
      ...updatedData,
   };
}