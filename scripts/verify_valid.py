import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('scripts/classification_results.json', encoding='utf-8') as f:
    res = json.load(f)

print(f"=== {len(res['valid'])} VALID PUBLICATIONS FOR HASAN DEMIRCI ===")
for i, item in enumerate(res['valid']):
    year = item.get('year')
    j = item.get('journal', '')
    title = item.get('title')
    reason = item.get('reason')
    print(f"{i+1:2d}. [{year}] {title[:75]} | J: {j[:30]}")
