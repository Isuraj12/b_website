import os
from PIL import Image, ImageDraw, ImageFont

os.makedirs("public/images/memories", exist_ok=True)

cards = [
    {
        "filename": "memory-01.jpg",
        "title": "Photo Slot 01",
        "subtitle": "Golden Hour Glow",
        "tag": "Replace with your photo in /public/images/memories/memory-01.jpg",
        "c1": (255, 233, 168), # Butter yellow
        "c2": (248, 221, 227), # Soft blush
        "symbol": "✦",
    },
    {
        "filename": "memory-02.jpg",
        "title": "Photo Slot 02",
        "subtitle": "Weekend Escapes",
        "tag": "Replace with your photo in /public/images/memories/memory-02.jpg",
        "c1": (232, 226, 247), # Muted lavender
        "c2": (200, 225, 255), # Sky
        "symbol": "☀",
    },
    {
        "filename": "memory-03.jpg",
        "title": "Photo Slot 03",
        "subtitle": "Spontaneous Roadtrip",
        "tag": "Replace with your photo in /public/images/memories/memory-03.jpg",
        "c1": (221, 233, 215), # Muted sage
        "c2": (255, 249, 242), # Warm ivory
        "symbol": "◎",
    },
    {
        "filename": "memory-04.jpg",
        "title": "Photo Slot 04",
        "subtitle": "Coffee & Long Talks",
        "tag": "Replace with your photo in /public/images/memories/memory-04.jpg",
        "c1": (255, 216, 194), # Soft peach
        "c2": (255, 233, 168), # Butter
        "symbol": "☕",
    },
    {
        "filename": "memory-05.jpg",
        "title": "Photo Slot 05",
        "subtitle": "Starlight City",
        "tag": "Replace with your photo in /public/images/memories/memory-05.jpg",
        "c1": (139, 120, 214), # Soft violet
        "c2": (232, 226, 247), # Muted lavender
        "symbol": "★",
    },
    {
        "filename": "memory-06.jpg",
        "title": "Photo Slot 06",
        "subtitle": "Celebration Eve",
        "tag": "Replace with your photo in /public/images/memories/memory-06.jpg",
        "c1": (248, 221, 227), # Soft blush
        "c2": (255, 216, 194), # Soft peach
        "symbol": "✧",
    },
]

W, H = 800, 1000

for item in cards:
    img = Image.new("RGB", (W, H), (255, 255, 255))
    draw = ImageDraw.Draw(img)

    # 1. Background gradient (polaroid photo area)
    c1 = item["c1"]
    c2 = item["c2"]
    
    # Outer polaroid card background (warm ivory)
    draw.rectangle([0, 0, W, H], fill=(255, 250, 244))
    
    # Polaroid inner photo frame
    margin = 50
    photo_bottom = 760
    
    for y in range(margin, photo_bottom):
        factor = (y - margin) / (photo_bottom - margin)
        r = int(c1[0] * (1 - factor) + c2[0] * factor)
        g = int(c1[1] * (1 - factor) + c2[1] * factor)
        b = int(c1[2] * (1 - factor) + c2[2] * factor)
        draw.line([(margin, y), (W - margin, y)], fill=(r, g, b))

    # Inner subtle border around photo area
    draw.rectangle([margin, margin, W - margin, photo_bottom], outline=(230, 220, 215), width=2)
    
    # Elegant decorative badge in center of photo area
    badge_cx = W // 2
    badge_cy = (margin + photo_bottom) // 2 - 20
    draw.ellipse([badge_cx - 90, badge_cy - 90, badge_cx + 90, badge_cy + 90], fill=(255, 255, 255, 180), outline=(240, 230, 220), width=3)
    
    # Draw text annotations
    try:
        font_large = ImageFont.truetype("arial.ttf", 36)
        font_mid = ImageFont.truetype("arial.ttf", 26)
        font_small = ImageFont.truetype("arial.ttf", 20)
        font_icon = ImageFont.truetype("arial.ttf", 52)
    except:
        font_large = ImageFont.load_default()
        font_mid = ImageFont.load_default()
        font_small = ImageFont.load_default()
        font_icon = ImageFont.load_default()

    # Center symbol
    draw.text((badge_cx, badge_cy - 10), item["symbol"], fill=(56, 44, 67), font=font_icon, anchor="mm")

    # Photo inner text
    draw.text((badge_cx, badge_cy + 130), item["title"], fill=(56, 44, 67), font=font_large, anchor="mm")
    draw.text((badge_cx, badge_cy + 180), f"“{item['subtitle']}”", fill=(90, 80, 100), font=font_mid, anchor="mm")
    draw.text((badge_cx, badge_cy + 225), "— Memory Placeholder Card —", fill=(130, 120, 140), font=font_small, anchor="mm")

    # Bottom caption area on the polaroid margin
    draw.text((badge_cx, 830), item["subtitle"], fill=(56, 44, 67), font=font_large, anchor="mm")
    draw.text((badge_cx, 890), item["tag"], fill=(150, 140, 160), font=font_small, anchor="mm")
    draw.text((badge_cx, 930), "Supports portrait, landscape, or square photos", fill=(170, 160, 180), font=font_small, anchor="mm")

    # Polaroid outer subtle border
    draw.rectangle([0, 0, W - 1, H - 1], outline=(235, 225, 220), width=2)

    out_path = os.path.join("public", "images", "memories", item["filename"])
    img.save(out_path, quality=92)
    print(f"Generated {out_path}")

print("All placeholder memory cards generated successfully.")
