import requests
from collections import Counter

SERVER_URL = 'http://192.168.43.228:3000/api'

PROMOTION_TYPE = [
    'Buy one get one free',
    'Discount price',
    'Promotion combination',
    'Second discount'
]

def getProductInfo(uuid_list):
    res = requests.get(SERVER_URL + '/products').json()
    product_list = []
    name_list = []
    for r in res:
        if r['beacon_uuid'] in uuid_list:
            if r['name'] not in name_list:
                product_list.append(r)
            name_list.append(r['name'])

    product_count = Counter(name_list)
    for i in range(len(product_list)):
        product_list[i]['count'] = product_count[product_list[i]['name']]

    return product_list

def getAllPromotionsInfo():
    res = requests.get(SERVER_URL + '/promotions').json()
    return res

def getProuctPromotion(product_name):
    res = requests.get(SERVER_URL + '/promotions').json()

    promotions = []
    for promotion in res:
        if promotion['product1_name'] == product_name or promotion['product2_name'] == product_name:
            promotions.append(promotion)

    return promotions

if __name__ == "__main__":
    # uuid_list = []
    # uuid_list.append('15345164-67ab-3e49-f9d6-e29000000008')
    # pro = getProductInfo(uuid_list)
    # print(pro[0]['name'])

    promotions = getProuctPromotion('Cola')
    for p in promotions:
        print(PROMOTION_TYPE[p['type']])
        print(p['product1_name'])
        print(p['product2_name'])
        print(p['discount'])
        print('--------------')
