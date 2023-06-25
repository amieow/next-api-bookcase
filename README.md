
# NEXT API Bookcase 

#### Data type 

| data | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `number` | **required** |
| `jenis` | `'paket' or 'majalah' or 'fiksi' or 'unknown'` | **required** |
| `harga_rata` | `number` | **required** |
| `book_name` | `string` | Optional |
| `kelas` | `number` | Optional |
| `pelajaran` | `number` | Optional |
| `harga_zona` | `array number` | Optional |
| `kurikulum` | `"2004" or "2006" or "2013" or"Kurikulum Merdeka"` | Optional |



## API Reference

#### 

#### Get book

```http
  GET /api
```

| QueryParams | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Jenis` | `string` | `filter by jenis` |
| `min` | `string` | `(Required max) filter by average price` |
| `max` | `string` | `(Required min) filter by average price` |
| `kurikulum` | `string` | `filter by kurikulum` |
| `pelajaran` | `string` | `filter by pelajaran` |
| `show` | `number` | `showing a data max is 50 default 20` |
| `length` | `boolean` | `showing all data length` |

#### post book
```http
  POST /api
```
request body parameter
| parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `jenis` | `'paket' or 'majalah' or 'fiksi' or 'unknown'` | **required** |
| `harga_rata` | `number` | **required** |
| `book_name` | `string` | Optional |
| `kelas` | `number` | Optional |
| `pelajaran` | `number` | Optional |
| `harga_zona` | `array number` | Optional |
| `kurikulum` | `"2004" or "2006" or "2013" or"Kurikulum Merdeka"` | Optional |

#### Get item

```http
  GET /api/${id}
```

| parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**.` Id of item to fetch` |

#### update book
```http
  PUT /api/${id}
```
request body parameter

| parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. Id of item to fetch |
| `harga_rata` | `number` | `Optional` |
| `book_name` | `string` | `Optional` |
| `kelas` | `number` | `Optional` |
| `pelajaran` | `number` | `Optional` |
| `harga_zona` | `array number` | `Optional` |
| `kurikulum` | `"2004" or "2006" or "2013" or"Kurikulum Merdeka"` | `Optional` |

#### DELETE item

```http
  DELETE /api/${id}
```

| parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**.` Id of item to fetch` |



## made by

- [@amieow](https://www.github.com/amieow)

