# Beacon Smart Store Backend

## Rest API
### /api/products
- return the information of all products in json format
- return format
```
[{
    '_id': MongodbObjectId,
    'name': string,
    'price': integer,
    'expiration': date,
    'beacon_uuid': string
}]
```

### /api/products/:uuid
- return the information of the product using uuid query
- return format
```
{
  '_id': MongodbObjectId,
  'name': string,
  'price': integer,
  'expiration': date,
  'beacon_uuid': string
}
```

### /api/promotions
- return format
```
[{
  '_id': MongodbObjectId
  'type': integer,
  'product1_name': string,
  'product2_name': string,
  'discount': float
}]
```
- field *type* only has four possible value
  - 0:  Buy one get one free
  - 1:  Discount price
  - 2:  Promotion combination
  - 3:  Second discount


## Python API
### getProductInfo(uuid_list: list): list
- give an array of uuids as the parameter
- return product list in json format
- example
```python
uuid_list = []
uuid_list.append('123')
uuid_list.append('456')

product_list = getProductInfo(uuid_list)
for product in product_list:
  print(product['name'])
  print(product['price'])
  print(product['beacon_uuid'])
```

### getAllPromotionsInfo(): list
- return format
```
[{
  '_id': MongodbObjectId
  'type': integer,
  'product1_name': string,
  'product2_name': string,
  'discount': float
}]
```

### getProuctPromotion(product_name: string): list
- give a product name, return all promotions relate to this product

- return format
```
[{
  '_id': MongodbObjectId
  'type': integer,
  'product1_name': string,
  'product2_name': string,
  'discount': float
}]
```
