const kurikulum = ["2004","2006","2013","Kurikulum Merdeka"] as const

export type jenisType = 'paket' | 'majalah' | 'fiksi' | 'unknown'
export type kurikulumtype = typeof kurikulum[number]
export type dataType = {
   jenis : jenisType,
   book_name? : string | undefined
   kelas? : number | undefined
   id : number
   pelajaran? : string | undefined,
   harga_zona? : number[] | undefined
   harga_rata : number 
   kurikulum? : kurikulumtype
}

const data : dataType[]  = [
   {
   jenis : "paket",
   kelas : 10,
   id : 1687498930314769,
   pelajaran : "agama",
   harga_zona : [20000,20500,21000,22000,23000],
   harga_rata : 21000,
   kurikulum : "2013"
   },
   {
   jenis : "majalah",
   id : 1687498930314768,
   book_name : 'petualangan yang menarik',
   harga_rata : 21000,
   }
]

export default data