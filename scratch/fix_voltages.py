import json
import os

path = 'public/products.json'

with open(path, 'r', encoding='utf-8') as f:
    products = json.load(f)

updated_count = 0
for p in products:
    new_voltajes = []
    changed = False
    for v in p.get('voltaje', []):
        v_str = str(v).strip()
        if v_str and not v_str.upper().endswith('V'):
            new_v = v_str + 'V'
            new_voltajes.append(new_v)
            changed = True
        else:
            new_voltajes.append(v_str)
    
    if changed:
        p['voltaje'] = new_voltajes
        updated_count += 1

if updated_count > 0:
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(products, f, indent=2, ensure_ascii=False)
    print(f'Updated {updated_count} products.')
else:
    print('No products needed update.')
