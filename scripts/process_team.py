import os
import sys
import csv
import json
import re
from PIL import Image, ImageOps
import pillow_heif

# Reconfigure stdout for Windows console
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

# Register HEIF opener with Pillow
pillow_heif.register_heif_opener()

BASE_DIR = r"c:\Users\akere\Downloads\kuybim-web"
DATA_DIR = os.path.join(BASE_DIR, "data")
OUTPUT_IMG_DIR = os.path.join(BASE_DIR, "public", "img", "team")
OUTPUT_JSON = os.path.join(DATA_DIR, "team.json")

os.makedirs(OUTPUT_IMG_DIR, exist_ok=True)

TR_MAP = {
    'ı': 'i', 'ğ': 'g', 'ü': 'u', 'ş': 's', 'ö': 'o', 'ç': 'c',
    'İ': 'i', 'Ğ': 'g', 'Ü': 'u', 'Ş': 's', 'Ö': 'o', 'Ç': 'c',
    'I': 'i'
}

def clean_tr(text):
    for k, v in TR_MAP.items():
        text = text.replace(k, v)
    return text

def normalize_text(text):
    text = clean_tr(text.lower())
    return re.sub(r'[^a-z0-9]', '', text)

def slugify(text):
    text = clean_tr(text.lower())
    text = re.sub(r'[^\w\s-]', '', text).strip()
    return re.sub(r'[-\s]+', '-', text)

# Find all photo files recursively in DATA_DIR
image_extensions = ('.jpg', '.jpeg', '.png', '.heic', '.webp')
all_photo_paths = []
for root, dirs, files in os.walk(DATA_DIR):
    for f in files:
        if f.lower().endswith(image_extensions):
            all_photo_paths.append(os.path.join(root, f))

# Find CSV file
csv_file = None
for f in os.listdir(DATA_DIR):
    if f.endswith('.csv'):
        csv_file = os.path.join(DATA_DIR, f)
        break

with open(csv_file, 'r', encoding='utf-8-sig', errors='replace') as f:
    reader = csv.DictReader(f)
    rows = list(reader)

# Known High School students based on user request & bios
HIGH_SCHOOL_NAMES = [
    "hande neslisah uzun",
    "ela nazli akcesme",
    "leyla erturk",
    "melek asya tekelioglu",
    "yakamoz pinar"
]

members = []

for row in rows:
    name = row.get("Name Surname", "").strip()
    raw_position = row.get("Position", "").strip()
    photo_url = row.get("Your Photo", "").strip()
    bio = row.get("Biography", "").strip()
    timestamp = row.get("Zaman damgası", "").strip()
    
    if not name:
        continue
    
    # Remove zero-width characters and strip
    bio = bio.replace('\u200b', '').replace('\ufeff', '').strip()

    # Fix casing if all uppercase (e.g. "Beyda EREN" -> "Beyda Eren")
    name_parts = name.split()
    formatted_name_parts = []
    for part in name_parts:
        if part.isupper() and len(part) > 1:
            formatted_name_parts.append(part.capitalize())
        else:
            formatted_name_parts.append(part)
    formatted_name = " ".join(formatted_name_parts)

    slug = slugify(formatted_name)
    norm_name = normalize_text(formatted_name)
    
    # Try to match photo across all found photos
    matched_photo_path = None
    for ppath in all_photo_paths:
        pfilename = os.path.basename(ppath)
        norm_pfile = normalize_text(pfilename)
        parts = [normalize_text(p) for p in formatted_name.split() if len(p) > 2]
        
        # Check if first name or last name or combinations are in filename
        if all(part in norm_pfile for part in parts) or any(part in norm_pfile for part in parts[-2:]) or (parts and parts[0] in norm_pfile and len(parts[0]) >= 5):
            matched_photo_path = ppath
            break
        # Special check for Balahun
        if "balahun" in norm_pfile and "balahun" in norm_name:
            matched_photo_path = ppath
            break

    image_web_path = None
    if matched_photo_path:
        dest_filename = f"{slug}.webp"
        dest_path = os.path.join(OUTPUT_IMG_DIR, dest_filename)
        
        try:
            with Image.open(matched_photo_path) as img:
                img = ImageOps.exif_transpose(img)
                if img.mode in ("RGBA", "P"):
                    img = img.convert("RGB")
                elif img.mode != "RGB":
                    img = img.convert("RGB")
                
                # Resize keeping aspect ratio, max 1000px
                max_size = 1000
                if max(img.size) > max_size:
                    img.thumbnail((max_size, max_size), Image.Resampling.LANCZOS)
                
                img.save(dest_path, "WEBP", quality=88)
                image_web_path = f"/img/team/{dest_filename}"
        except Exception as e:
            print(f"Error processing image {matched_photo_path} for {name}: {e}")

    # Standardize position and category as requested:
    # 1. PhD Student -> PhD Students
    # 2. Master Student & MSc Student -> MSc Students (position: MSc Student)
    # 3. High School Intern -> High School Interns (position: High School Intern)
    # 4. Researcher Intern -> Researcher Interns (position: Researcher Intern)
    pos_lower = raw_position.lower()
    
    if "phd" in pos_lower or "doktora" in pos_lower:
        position = "PhD Student"
        category = "PhD Students"
        order = 3
    elif "msc" in pos_lower or "master" in pos_lower or "yüksek lisans" in pos_lower:
        position = "MSc Student"
        category = "MSc Students"
        order = 4
    elif any(hs in norm_name for hs in [normalize_text(h) for h in HIGH_SCHOOL_NAMES]) or "high school" in pos_lower:
        position = "High School Intern"
        category = "High School Interns"
        order = 6
    else:
        position = "Researcher Intern"
        category = "Researcher Interns"
        order = 5

    # Update any references of "Prof. Dr. Hasan Demirci" or "Prof. Hasan Demirci" to "Dr. Hasan Demirci"
    bio = re.sub(r'Prof\.\s*(?:Dr\.)?\s*Hasan\s*DeMirci', 'Dr. Hasan DeMirci', bio, flags=re.IGNORECASE)
    bio = re.sub(r'Prof\.\s*(?:Dr\.)?\s*Hasan\s*Demirci', 'Dr. Hasan Demirci', bio, flags=re.IGNORECASE)

    members.append({
        "id": slug,
        "name": formatted_name,
        "position": position,
        "category": category,
        "order": order,
        "bio": bio,
        "image": image_web_path,
        "timestamp": timestamp
    })

# Sort members purely in alphabetical order (A-Z)
members.sort(key=lambda x: clean_tr(x["name"].lower()))

with open(OUTPUT_JSON, 'w', encoding='utf-8') as f:
    json.dump(members, f, ensure_ascii=False, indent=2)

print(f"Successfully processed {len(members)} members and saved to {OUTPUT_JSON}")
