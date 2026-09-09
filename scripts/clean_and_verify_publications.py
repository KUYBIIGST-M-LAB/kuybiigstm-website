import json
import sys
import re
from rapidfuzz import fuzz

sys.stdout.reconfigure(encoding='utf-8')

with open('scholar_all_pubs.json', 'r', encoding='utf-8') as f:
    scholar = json.load(f)

with open('data/publications.json', 'r', encoding='utf-8') as f:
    local_pubs = json.load(f)

def clean_text(s):
    if not s:
        return ""
    s = s.lower()
    s = re.sub(r'<[^>]+>', '', s)
    s = re.sub(r'[^a-z0-9 ]', ' ', s)
    return ' '.join(s.split())

scholar_cleaned = [{'orig': s, 'clean': clean_text(s['title'])} for s in scholar]

# Explicit blacklist of IDs or PMIDs that belong to other Hasan Demircis
blacklist_pmids = {
    '41337853', '41701400', '41857671', '41621151', '42264459', '42400335',
    '39819235', '40069720', '41013806', '39948289', '40611799', '40816788',
    '40471686', '40512333', '38560001', '38884453', '38238903', '39680459',
    '38933481', '36773385', '37057037', '36622839', '34854583', '34105151',
    '34033878', '33036490', '32320499', '30269222', '35661917'
}

# Duplicate or unindexed drafts to remove
duplicate_draft_titles = [
    'withdrawn:',
    'structural characterization of traf6 n-terminal for therapeutic uses',
    'crystal structure of 4-hydroxybutyryl-coa synthetase (adp-forming): a key enzyme',
    'ambient temperature crystal structure of escherichia coli cyay protein displays alternate conformation',
    'structural and dynamic characterization of candida boidinii formate dehydrogenase by high-resolution x-ray crystallography',
    'response surface methodology-based high-throughput biolector fermentation screening'
]

verified_list = []
removed_list = []

for p in local_pubs:
    title = p.get('title', '').strip()
    pmid = str(p.get('pmid', '')).strip()
    t_clean = clean_text(title)
    
    # 1. Check blacklist PMID
    if pmid in blacklist_pmids:
        removed_list.append((p, f"Blacklisted PMID: {pmid} (Wrong author)"))
        continue
        
    # 2. Check withdrawn or duplicate draft
    if any(title.lower().startswith(prefix) for prefix in duplicate_draft_titles):
        removed_list.append((p, f"Withdrawn or duplicate draft title: {title[:50]}"))
        continue

    # 3. Match against Scholar
    best_score = 0
    best_match = None
    for sc in scholar_cleaned:
        score1 = fuzz.ratio(t_clean, sc['clean'])
        score2 = fuzz.token_sort_ratio(t_clean, sc['clean'])
        score = max(score1, score2)
        if score > best_score:
            best_score = score
            best_match = sc

    # Must match Google Scholar profile with score >= 78%
    if best_score >= 78:
        # Also double check authors/topic doesn't contain unrelated fields
        full_text = f"{title} {p.get('abstract', '')} {p.get('journal', '')}".lower()
        if any(unrelated in full_text for unrelated in [
            'epilepsy', 'trichotillomania', 'misophonia', 'nephrotoxicity',
            'distal convoluted', 'uromodulin', 'diabetic kidney', 'alexithymia',
            'calcineurin inhibitor'
        ]):
            removed_list.append((p, f"Contained unrelated medical field keyword: {title[:50]}"))
            continue

        verified_list.append(p)
    else:
        removed_list.append((p, f"Not found on Google Scholar profile (best score: {best_score:.1f}% to '{best_match['orig']['title'] if best_match else ''}')"))

print(f"Original publications count: {len(local_pubs)}")
print(f"Verified publications count: {len(verified_list)}")
print(f"Removed publications count: {len(removed_list)}")

# Sort verified_list by year descending
def get_year_int(item):
    try:
        return int(item.get('year', 0))
    except:
        return 0

verified_list.sort(key=lambda x: (get_year_int(x), x.get('title', '')), reverse=True)

# Write backup of original
with open('data/publications.original.json', 'w', encoding='utf-8') as f:
    json.dump(local_pubs, f, ensure_ascii=False, indent=2)

# Write verified list to data/publications.json
with open('data/publications.json', 'w', encoding='utf-8') as f:
    json.dump(verified_list, f, ensure_ascii=False, indent=2)

print("\nSuccessfully updated data/publications.json!")
print("Saved original backup to data/publications.original.json")

print("\n--- ALL REMOVED PAPERS ---")
for p, reason in removed_list:
    print(f"[{p.get('year')}] {p.get('title')[:70]}")
    print(f"   Reason: {reason}")
