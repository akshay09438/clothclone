name: nano-banana-fashion-prompt
description: >
  Use this skill whenever the user provides a raw cloth image (salwar suit,
  anarkali, kurta set, lehenga, or any Indian ethnic wear) and wants a
  NanoBanana/AI image generation prompt created for it. Trigger when the user
  says "generate prompt", "create NanoBanana prompt", "write a prompt for this
  cloth", "make an AI fashion photo prompt", or uploads a garment image
  expecting a ready-to-paste prompt. Also trigger for any automated pipeline
  where a cloth image comes in and a generation prompt should come out.
  This skill produces a complete, structured, copy-paste-ready NanoBanana
  prompt that will generate a hyper-realistic Indian fashion model photo with
  the exact outfit from the cloth image — no explanation, just the prompt.
---


# NanoBanana Fashion Prompt Generator


Generates a complete, ready-to-paste NanoBanana prompt from a raw cloth image.
**Output = the prompt only. No explanation, no commentary, no preamble.**


---


## ⚠️ RULE #1 — READ THIS BEFORE ANYTHING ELSE


**NEVER generate a prompt where the model is standing stiff, straight, or army-like.**


This is the most common failure in AI fashion photography. Every prompt you write MUST include a specific natural human pose from the pose library below. The pose must describe:
- Which leg carries the weight
- What each arm/hand is doing (NOT "arms at sides")
- Head position (slight tilt, turned slightly, etc.)
- A specific human action (holding dupatta, leaning on pillar, mid-walk, hand on hip)


A model standing straight with both arms dead at her sides = WRONG. Always.
If you are unsure which pose to pick, default to **Pose 3** (one hand on dupatta, one relaxed).


---


---


## Before You Write Anything — Study the Image


Extract these details from the cloth image first:


| What to Find | What to Note |
|---|---|
| **Outfit type** | Salwar suit / Anarkali / Palazzo set / Kurta-pant / Lehenga |
| **Primary color** | Exact shade — not "purple" → "deep wine-purple" |
| **Print/pattern** | Floral print, ajrak, block print, geometric, solid, etc. |
| **Neckline** | Round / V-neck / Keyhole / Sweetheart / Mandarin collar |
| **Embroidery** | Thread color, style (zari/chikankari/mirror/resham), exact placement |
| **Chest motif** | Central motif on chest? Describe exactly — flowers, paisley, panel |
| **Sleeves** | Length (3/4 / full / sleeveless), cuff style, border detail |
| **Hem border** | Embroidery or border at kurta bottom — color, pattern |
| **Dupatta** | Color, print, border, which shoulder it drapes on |
| **Bottom** | Churidar / straight pant / palazzo / sharara / pant — color |
| **Fabric feel** | Cotton / rayon / georgette / silk / crepe (if visible) |


If any element is not clearly visible, **do not guess** — skip that element.


---


## Step 1 — Identify Outfit Type and Complexity


### Outfit Type Lookup


| What You See | Name It As |
|---|---|
| Fitted kurta + straight/churidar pant + dupatta | salwar suit — NOT a saree or gown |
| Flared/gathered long kurta + pant + dupatta | anarkali suit — NOT a gown |
| Kurta + wide-leg pant | palazzo set |
| Heavily flared skirt + choli + dupatta | lehenga — NOT a gown |
| Short/mid-length kurta + pant | kurta set |


Always explicitly name the outfit type in the prompt AND add "NOT a saree or gown" for anything that could be confused.


### Complexity Check — Does This Need Bullet-Point Detail?


| Use bullet-point outfit description when: | Use paragraph when: |
|---|---|
| Complex embroidery with multiple placements | Simple printed fabric, minimal embroidery |
| Chest motif that must be preserved exactly | Solid or all-over printed outfit |
| Multiple distinct embroidery zones | Anarkali with simple border |
| Risk of AI confusing garment type | Clearly distinct silhouette |


---


## Step 2 — Choose Background Based on Outfit Color + Style


**Golden Rule: Background must always CONTRAST with outfit. Never use the same color family.**


---


### Full Color → Background Lookup Table


Find the outfit's primary color below. Use the assigned background option and aperture exactly.


---


#### 🟣 PURPLE FAMILY


| Exact Shade | Background | Aperture | Why It Works |
|---|---|---|---|
| Soft lavender / lilac | Haveli courtyard (sandstone) | f/8 sharp | Warm golden stone pops cool purple |
| Medium purple / violet | Haveli courtyard (sandstone) | f/8 sharp | Classic warm-cool contrast |
| Deep wine-purple / plum | Haveli courtyard (sandstone) | f/8 sharp | Rich stone amplifies depth of color |
| Mauve / dusty purple | Garden pathway (sharp) | f/8 sharp | Greens complement muted purple, full environment visible |


---


#### 🔴 RED & MAROON FAMILY


| Exact Shade | Background | Aperture | Why It Works |
|---|---|---|---|
| Bright red / cherry red | Lush green garden (sharp) | f/8 sharp | Green is complementary to red — maximum pop |
| Crimson / deep red | Green garden OR haveli courtyard | f/8 sharp | Both work; full environment visible |
| Maroon / dark red | Haveli courtyard (sandstone) | f/8 sharp | Warm stone brings out richness |
| Burgundy / deep wine | Haveli courtyard (sandstone) | f/8 sharp | Golden stone makes burgundy glow |
| Rust / brick red | Palace archway (frescoed walls) | f/8 sharp | Earth tones rhyme but contrasting value |
| Coral / tomato red | Green garden (sharp) | f/8 sharp | Fresh green makes coral sing, full scene visible |


---


#### 🟠 ORANGE & SAFFRON FAMILY


| Exact Shade | Background | Aperture | Why It Works |
|---|---|---|---|
| Bright orange / tangerine | Lush green garden (sharp) | f/8 sharp | Strongest complementary contrast, full environment |
| Saffron / deep orange | Green garden OR white marble steps | f/8 sharp | Green or white both contrast well |
| Burnt orange / terracotta | Palace archway (frescoed walls) | f/8 sharp | Earthy tones, architectural depth |
| Peach-orange / apricot | Green garden (sharp) | f/8 sharp | Greens complement, full garden environment visible |


---


#### 🟡 YELLOW & MUSTARD FAMILY


| Exact Shade | Background | Aperture | Why It Works |
|---|---|---|---|
| Bright yellow / lemon | Blue-sky garden (sharp) | f/8 sharp | Blue sky is direct complement, full scene visible |
| Golden yellow / turmeric | Palace archway (frescoed walls) | f/8 sharp | Warm tones, architectural contrast in value |
| Deep mustard / amber | Palace archway OR haveli courtyard | f/8 sharp | Stone provides rich contrast against mustard |
| Pale yellow / butter | Green garden (sharp) | f/8 sharp | Greens complement soft yellows, environment visible |


---


#### 🟢 GREEN FAMILY


| Exact Shade | Background | Aperture | Why It Works |
|---|---|---|---|
| Bright green / parrot green | Haveli courtyard (sandstone) | f/8 sharp | Warm sandstone is opposite of cool green |
| Olive / khaki / army green | Haveli courtyard (sandstone) | f/8 sharp | Golden stone separates earthy greens |
| Mint / pastel green | Sandstone garden steps | f/8 sharp | Warm stone contrasts soft cool mint, full scene |
| Bottle green / dark green | Haveli courtyard (golden hour) | f/8 sharp | Golden warm light pops dark green |
| Teal / peacock green | Haveli courtyard OR terracotta wall | f/8 sharp | Warm earth tones are opposite of teal |


---


#### 🔵 BLUE FAMILY


| Exact Shade | Background | Aperture | Why It Works |
|---|---|---|---|
| Sky blue / powder blue | Haveli courtyard (sandstone) | f/8 sharp | Warm stone is direct contrast to cool blue |
| Royal blue / cobalt | Haveli courtyard (golden hour light) | f/8 sharp | Golden light on stone amplifies deep blue |
| Navy / dark blue / indigo | Haveli courtyard (strong golden light) | f/8 sharp | Maximum warm-cool contrast |
| Turquoise / aqua | Terracotta rustic wall | f/8 sharp | Warm earth tones complement aqua |
| Denim blue / slate | Garden pathway (sharp) | f/8 sharp | Green contrasts casual denim, full scene visible |


---


#### 🩷 PINK FAMILY


| Exact Shade | Background | Aperture | Why It Works |
|---|---|---|---|
| Hot pink / magenta | Green garden (sharp) | f/8 sharp | Green is complementary to magenta, full scene |
| Bright pink / fuchsia | Green garden OR sandstone | f/8 sharp | Either contrasts the brightness, background visible |
| Baby pink / blush | Garden pathway (sharp) | f/8 sharp | Greens make blush look fresh, environment in focus |
| Dusty rose / old rose | Haveli courtyard (sandstone) | f/8 sharp | Warm stone complements muted rose |
| Deep pink / rani pink | Haveli courtyard (sandstone) | f/8 sharp | Golden stone amplifies saturated pink |


---


#### 🟤 EARTHY & NEUTRAL FAMILY


| Exact Shade | Background | Aperture | Why It Works |
|---|---|---|---|
| Beige / nude / sand | Green garden (sharp) | f/8 sharp | Greens provide the only contrast for neutrals |
| Brown / chocolate | Green garden OR haveli (golden hour) | f/8 sharp | Green freshens brown; golden haveli deepens it |
| Camel / tan | Blue-sky garden OR green garden | f/8 sharp | Sky or greens contrast warm neutrals, full scene |
| Ivory / off-white / cream | Garden greenery (sharp) | f/8 sharp | Lush green is only strong contrast, environment visible |


---


#### ⚪ WHITE & LIGHT FAMILY


| Exact Shade | Background | Aperture | Why It Works |
|---|---|---|---|
| Pure white | Garden greenery (sharp) OR terracotta wall | f/8 sharp | Green or warm earth — both contrast white, full scene |
| Cream / ivory | Garden greenery (sharp) | f/8 sharp | Green makes cream look rich, environment fully visible |
| Silver-white / pearl | Haveli courtyard (golden hour) | f/8 sharp | Golden warm light makes white shimmer |


---


#### ⚫ DARK & RICH FAMILY


| Exact Shade | Background | Aperture | Why It Works |
|---|---|---|---|
| Black | Haveli courtyard (strong golden hour light) | f/8 sharp | Warm golden light is only contrast for black |
| Charcoal / dark grey | Haveli courtyard (golden hour) | f/8 sharp | Golden stone and light lift dark greys |
| Dark brown / espresso | Green garden (sharp) | f/8 sharp | Fresh green is the only contrast, full garden visible |


---


#### 🌈 MULTI-COLOR & PRINTED


| Pattern Type | Background | Aperture | Logic |
|---|---|---|---|
| Ajrak / block print (earthy tones) | Terracotta rustic wall | f/8 sharp | Earthy background honors the craft |
| Floral print (dominant warm color) | Match dominant color's rule above | f/8 sharp | Treat as dominant color |
| Geometric / abstract print | Haveli courtyard (neutral sandstone) | f/8 sharp | Neutral stone doesn't compete with busy print |
| Pastel multi-color | Garden pathway (sharp) | f/8 sharp | Greens let pastel prints breathe, full scene visible |
| Dark multi-color (maroon + navy etc.) | Haveli courtyard (sandstone) | f/8 sharp | Warm stone separates dark complex prints |


---


### Background Environment Options — Full Prompt Text with Variants


**BACKGROUND RULE — ALWAYS SHARP:**
Every background must be sharp and fully visible. Never use bokeh, never blur the background.
Always use: `deep depth of field, f/8, everything in sharp focus from model to background`


**VARIETY RULE:**
Each background type has 4 distinct variants (V1–V4). Never default to V1 every time.
Pick a variant based on the outfit's style personality:
- Casual / everyday print → V1 or V2
- Semi-formal / festive → V2 or V3
- Rich / heavily embroidered / occasion wear → V3 or V4
- Very dark / dramatic outfit → V4


If generating multiple prompts in a session, cycle through variants so no two prompts use the same scene.


---


**Option A — Haveli Courtyard (f/8, sharp)**


A-V1: Pillared courtyard with bougainvillea
```
ancient Rajasthani haveli courtyard, carved sandstone pillars
fully visible and sharp, warm beige stone floor, pink and orange
bougainvillea flowers cascading over walls, warm afternoon
directional sunlight from upper-right at 45-degree angle,
long soft shadows falling left across stone floor,
deep depth of field, f/8, ISO 200,
everything sharp from model to back wall
```


A-V2: Haveli entrance with brass doors
```
grand Rajasthani haveli entrance, ornate carved brass double
doors partially open behind model, intricate floral stone
carvings on facade, warm sandstone arch overhead,
afternoon sunlight at 30-degree angle from upper-right
falling diagonally on carved stone, terracotta pots with
marigolds flanking doorway, deep depth of field, f/8, ISO 200,
sharp stone carving detail throughout
```


A-V3: Inner courtyard with central garden
```
haveli inner courtyard, geometric stone-edged flower bed
with marigolds and roses, carved stone pillars on all sides,
open sky above, warm afternoon overhead light at 60 degrees
flooding courtyard evenly, long shadows on stone tile floor,
deep depth of field, f/8, ISO 200,
all pillars and garden detail in sharp focus
```


A-V4: Haveli rooftop terrace
```
Rajasthani haveli rooftop terrace, carved stone parapet
with jaali lattice railing in sharp detail, distant Jaipur
cityscape visible on horizon, terracotta urns with flowering
plants, warm golden late-afternoon sunlight from upper-right
at 40-degree angle, long shadows on stone floor,
deep depth of field, f/8, ISO 200,
sharp from model to cityscape horizon
```


---


**Option B — Lush Green Garden (f/8, sharp)**


B-V1: Tree-lined garden pathway
```
outdoor Indian garden, lush green trees fully visible
and in sharp detail behind model, stone-paved pathway,
soft afternoon sunlight from upper-left at 45 degrees,
even warm natural illumination, gentle shadows on pathway,
no blurred background, deep depth of field, f/8, ISO 200,
trees and garden path sharp throughout
```


B-V2: Marigold and flower garden
```
Indian garden pathway lined with marigold and jasmine flowers
fully in sharp focus, lush green plants on both sides,
stone-paved path, warm afternoon sunlight from upper-left
at 45-degree angle, even golden light on model and garden,
deep depth of field, f/8, ISO 200,
every flower and leaf in sharp detail
```


B-V3: Garden archway with flowering vines
```
stone garden archway fully in sharp detail, covered in
pink bougainvillea and white jasmine vines, lush green
lawn beyond archway in sharp focus, warm afternoon sunlight
from upper-right at 40-degree angle, even natural light
on model and archway, deep depth of field, f/8, ISO 200,
archway and garden beyond both sharp
```


B-V4: Garden at warm late afternoon
```
outdoor Indian garden at late afternoon, lush green trees
in full sharp detail, marigold flower beds visible,
stone pathway, warm low-angle sunlight from upper-right
at 30-degree angle, long golden shadows across garden,
deep depth of field, f/8, ISO 200,
full garden environment sharp and detailed
```


---


**Option C — Palace Archway (f/8, sharp)**


C-V1: Frescoed Mughal archway
```
painted Mughal palace archway fully in sharp focus,
frescoed walls with geometric red and cream floral patterns
in sharp detail, worn sandstone pillars, soft afternoon
sunlight from upper-right at 45 degrees streaming through
archway, warm directional glow on model,
deep depth of field, f/8, ISO 200,
all architectural detail sharp
```


C-V2: Amber Fort style corridor
```
Amber Fort style arched corridor in full sharp focus,
series of yellow sandstone arches receding into background
all sharp and detailed, intricate carved stone borders
on each arch, warm afternoon sunlight entering from
upper-right at 35 degrees, long rectangular light beams
and shadows on stone floor, deep depth of field, f/8, ISO 200
```


C-V3: Jali lattice window alcove
```
Rajasthani palace jali lattice stone window fully in
sharp detail, intricate geometric carved stone screen
behind model sharp and crisp, filtered afternoon sunlight
from upper-right at 40 degrees casting geometric shadow
patterns on floor and wall, deep depth of field, f/8, ISO 200,
every lattice carving sharp
```


C-V4: Garden-facing palace veranda
```
ornate palace veranda, carved sandstone columns in full
sharp detail, lush green garden beyond columns also sharp,
afternoon sunlight from garden side at 45 degrees
illuminating model and columns, carved stone floor
with geometric inlay pattern in sharp focus,
deep depth of field, f/8, ISO 200
```


---


**Option D — Terracotta Rustic Wall (f/8, sharp)**


D-V1: Plain aged stone wall
```
ancient textured terracotta and sandstone wall in full
sharp detail, warm aged patina with natural wear marks
visible, carved stone niches sharp, soft natural directional
sunlight from upper-left at 45 degrees,
long warm shadows on wall texture,
deep depth of field, f/8, ISO 200, sharp throughout
```


D-V2: Indigo-washed haveli wall
```
indigo blue lime-washed old haveli wall fully in sharp focus,
faded geometric painted border at bottom in detail,
small stone window niche sharp, terracotta pot with
flowering plant to one side, warm afternoon sunlight
from upper-left at 40 degrees,
deep depth of field, f/8, ISO 200
```


D-V3: Rustic wall with climbing plants
```
worn sandstone heritage wall with green climbing ivy
and flowering creeper vines all in sharp detail,
aged wooden window shutter to one side crisp and visible,
warm golden afternoon sunlight from upper-left at 45 degrees,
deep depth of field, f/8, ISO 200, wall texture sharp
```


D-V4: Bazaar wall with tiles
```
old Indian bazaar exterior wall in sharp detail,
vintage hand-painted blue and white tile panel inset
sharp and vivid, weathered plaster around it visible,
warm midday sunlight from directly above at 70 degrees,
even natural illumination, deep depth of field,
f/8, ISO 200, all tile detail sharp
```


---


**Option E — Blue-Sky Garden (f/8, sharp)**


E-V1: Open lawn with sky
```
open outdoor garden, bright natural blue sky fully visible
and sharp above, lush green grass and garden plants
in sharp focus, warm midday sunlight from directly
above-right at 60 degrees, even bright natural illumination,
deep depth of field, f/8, ISO 200,
sky and garden both sharp
```


E-V2: Garden staircase with sky view
```
outdoor stone garden staircase, wide stone steps with
potted plants on sides all in sharp detail, open blue sky
sharp behind and above, lush green hedge on one side
in focus, bright warm natural sunlight from upper-right
at 50 degrees, deep depth of field, f/8, ISO 200
```


E-V3: Terrace garden with sky
```
rooftop terrace garden, potted plants and flowering shrubs
all in sharp detail, open blue sky with light clouds
sharp above, warm natural afternoon sunlight from
upper-right at 45 degrees, deep depth of field,
f/8, ISO 200, sky and all plants sharp
```


---


**Option F — Golden Hour Haveli (f/8, sharp)**


F-V1: Haveli exterior at golden hour
```
ancient Rajasthani haveli exterior fully in sharp detail,
strong warm golden hour sunlight from upper-right at
20-degree low angle, dramatic long deep shadows across
stone facade, deep amber and orange light wash
on sandstone walls and model, deep depth of field,
f/8, ISO 200, all haveli architecture sharp
```


F-V2: Sunset haveli steps
```
haveli front steps at golden sunset, warm deep orange
low-angle sunlight from upper-right at 15 degrees washing
across carved stone facade, long dramatic shadows on stone
steps, terracotta urns with marigolds in sharp focus,
rich amber glow on everything, deep depth of field,
f/8, ISO 200, steps and facade fully sharp
```


F-V3: Sunset palace corridor
```
palace corridor at golden sunset, series of arches
all in sharp detail, strong low-angle golden sunlight
from upper-right at 20 degrees, deep amber light
streaming through arches, dramatic high-contrast
warm light and shadow play on columns,
deep depth of field, f/8, ISO 200, all arches sharp
```


---


## Step 3 — Decide Negative Prompt Inclusion


**Always include negative prompt when:**
- Complex embroidery with specific motifs (AI will hallucinate if not protected)
- Outfit type could be confused (anarkali mistaken for gown, suit for saree)
- Specific neckline that must not change


**Can skip negative prompt when:**
- Simple printed kurta with no embroidery
- Solid color outfit with minimal detail


---


## Step 4 — Assemble the Final Prompt


Build in this exact order. Never reorder layers.


---


### OPENING LINE
```
Using image 1 as the exact outfit reference and image 2
as the face and model reference:
Generate a full body front-facing fashion photograph of the
woman from image 2 wearing the exact [COLOR + OUTFIT TYPE]
from image 1.
Preserve every outfit detail precisely:
```


---


### OUTFIT BLOCK


For complex embroidery — use bullet points:
```
- [Exact color] [fabric] kurta
- [Neckline type] with [embroidery description and placement]
- [Chest motif — describe flowers/paisley/panel exactly]
- [Sleeve length] with [cuff/border detail]
- [Hem border — color, pattern, style]
- [Dupatta — color, print, border, which shoulder]
- [Bottom — churidar/palazzo/pant, color]
This is a [OUTFIT TYPE] — NOT a saree or gown.
[If 3-piece: Three piece set: kurta, [bottom type], dupatta.]
```


For simple printed outfit — use paragraph:
```
[Color] [fabric] [outfit type] with [print description]
all-over print, [neckline], [sleeve length] sleeves,
[dupatta description] draped over [shoulder],
[bottom type] in matching/contrasting [color].
This is a [OUTFIT TYPE] — NOT a saree or gown.
```


---


### MODEL BLOCK (standard — use every time)
```
real Indian woman photographed on camera, 23-27 years old,
natural wheatish-fair skin with clearly visible open pores,
fine uneven skin texture, subtle natural blemishes,
faint natural under-eye shadows, skin tone variation
across cheeks and nose — NOT airbrushed, NOT filtered,
genuinely asymmetrical face — one eye slightly different
from the other, natural uneven lip line,
warm dark brown eyes with single real light catchpoint,
natural lash line without extensions,
naturally wavy dark brown hair — loose strands falling
across forehead and cheeks, visible flyaways catching
light, slight hair volume inconsistency,
subtle kajal smudged naturally on lower eyelids,
natural bare lip color — no gloss, no liner,
small red bindi on forehead,
gold jhumka earrings, thin delicate gold chain necklace.
```
*For occasion wear: replace necklace with polki choker, add maang tikka and gold bangles*
*For casual: replace jhumkas with small gold studs*


**Critical realism notes:**
- "clearly visible open pores" beats "visible pores" — be specific
- "NOT airbrushed, NOT filtered" directly fights AI smoothing
- Asymmetry language is the single biggest fix for AI doll faces
- Under-eye shadows = human, no under-eye shadows = AI render


---


### POSE BLOCK — MANDATORY, NEVER SKIP


> **HARD RULE: Every single prompt must use one of the 6 poses below.**
> Do NOT write "arms relaxed at sides", "standing straight", or any variation of stiff upright posture.
> These produce stiff, robotic, AI-looking results every time.
> Pick ONE named pose. Copy its text exactly. No exceptions.


Rotate through poses across a session — never use the same pose twice in a row.
Choose based on setting:


---


**Pose 1 — Relaxed Weight Shift with Dupatta Hold** *(garden / casual)*
```
standing with natural weight shifted onto left leg,
right knee slightly bent, left hand loosely holding
dupatta end at waist level, right arm relaxed at side,
head with a gentle natural tilt to the right,
soft warm candid smile, full body head to toe visible
```


**Pose 2 — Hands Loosely Clasped, Hip Shifted** *(haveli / architectural)*
```
standing naturally facing camera, both hands loosely
clasped together in front at waist level,
weight shifted clearly onto left leg with right knee
slightly relaxed, left hip pushed out slightly,
one shoulder marginally lower than the other,
gentle natural smile, full body head to toe visible
```


**Pose 3 — One Hand on Dupatta, One Relaxed** *(garden / movement — DEFAULT)*
```
standing with weight on left leg, right hand
gently gathering dupatta fabric across front,
left arm relaxed at side with fingers loosely open,
slight natural hip shift to the left,
head with very slight tilt, genuine warm smile
as if mid-conversation, full body head to toe visible
```


**Pose 4 — Leaning Lightly Against Pillar** *(haveli / archway)*
```
standing leaning very lightly with left shoulder
against sandstone pillar, left arm relaxed along
pillar, right arm hanging naturally at side with
fingers slightly open, weight on left leg,
head turned very slightly toward camera,
natural relaxed expression, soft smile,
full body head to toe visible
```


**Pose 5 — Mid-Walk Candid Toward Camera** *(garden pathway / outdoor)*
```
natural candid walking pose toward camera,
left foot slightly forward, right arm swinging
gently forward, left hand lightly holding
dupatta so it flows naturally behind,
slight movement visible in dupatta fabric,
warm natural smile, head level,
full body head to toe visible
```


**Pose 6 — One Hand on Hip, 3/4 Turn** *(editorial / occasion wear)*
```
standing with right hand lightly resting on hip,
left arm relaxed at side, weight shifted
naturally onto right leg, body at slight 3/4 angle
toward camera, head facing camera directly
with confident warm smile,
full body head to toe visible
```


**Pose Selection Guide:**


| Setting | Use These Poses |
|---|---|
| Haveli courtyard | Pose 2, Pose 4 |
| Garden pathway | Pose 1, Pose 3, Pose 5 |
| Palace archway | Pose 2, Pose 4, Pose 6 |
| Rustic wall | Pose 1, Pose 4 |
| Blue-sky garden | Pose 3, Pose 5 |
| Golden hour haveli | Pose 6, Pose 4 |


---


### BACKGROUND BLOCK
Paste the full background text from Step 2 based on outfit color.


---


### LIGHTING BLOCK


Match lighting to the background option chosen:


- **Option A (Haveli Courtyard)** → `warm afternoon directional sunlight from upper-right at 45-degree angle, long soft shadows falling left across stone floor, golden amber glow on skin and embroidery, no studio lighting, no ring light, no artificial flash`
- **Option B (Green Garden)** → `warm afternoon sunlight from upper-left at 45-degree angle, even natural illumination on face and outfit, gentle shadows on garden pathway, no harsh shadows, no studio lighting, no ring light`
- **Option C (Palace Archway)** → `afternoon sunlight from upper-right at 40-degree angle streaming through archway, warm directional light beam on model, soft shadows on carved stone floor, no studio lighting, no ring light`
- **Option D (Terracotta Wall)** → `warm natural directional sunlight from upper-left at 45-degree angle, long shadows on wall texture, golden light on model's face and outfit, no studio lighting, no ring light`
- **Option E (Blue-Sky Garden)** → `bright midday sunlight from directly above at 60-degree angle, even warm natural illumination, soft short shadows, no studio lighting, no ring light`
- **Option F (Golden Hour Haveli)** → `low-angle golden hour sunlight from upper-right at 15-20 degree angle, dramatic long shadows across stone, deep amber wash on walls and model, high contrast warm light, no studio lighting, no ring light`


Always end lighting block with: `no studio lighting, no ring light, no artificial flash, no overexposure.`


---


### CAMERA BLOCK


**Camera (always f/8 sharp — use for every prompt):**
```
hyper-realistic editorial fashion photography,
film photograph aesthetic, natural skin texture,
clearly visible facial pores, real hair texture
with natural flyaways, subtle natural film grain,
shot on Canon EOS R5, 50mm f/8, ISO 400,
natural outdoor daylight, deep depth of field,
sharp focus on model AND background throughout,
no motion blur, no digital smoothing,
no beauty filter applied, photorealistic, 8K resolution.
```


---


### NEGATIVE PROMPT BLOCK (if needed per Step 3)


Always include person + lighting negatives. Add outfit negatives based on type.


**Person + pose + lighting (always):**
```
plastic skin, AI face, AI generated face, CGI face,
smooth porcelain skin, airbrushed skin, filtered skin,
perfect symmetry, perfectly symmetrical face,
heavy contouring, beauty filter, Facetune,
fake eyelashes, overdone makeup, lip filler look,
doll-like appearance, rendered face, digital model,
extra fingers, distorted hands, missing fingers, six fingers,
stiff pose, military stance, arms pinned straight to sides,
rigid posture, mannequin pose, statue-like standing,
robot posture, unnatural stiff arms,
blurred background, bokeh background, shallow depth of field,
soft focus background, out of focus environment,
studio flash, ring light, neon lights, white plain background,
grey backdrop, overexposed, HDR processing, Instagram filter
```


**Outfit-specific (add based on type):**
- Salwar suit: `saree drape, anarkali gown, changed neckline, missing chest motif, altered embroidery, faded embroidery, different fabric color, wrong sleeve length`
- Anarkali: `salwar suit cut, saree drape, missing waistband, changed flare, different hem border`
- Printed kurta: `altered print color, changed print pattern, missing border`


Full negative line format:
```
Negative: [person negatives], [outfit negatives], [lighting negatives], cropped body.
```


---


## The 6 Non-Negotiables — Breaking Any of These Will Ruin the Image


1. **POSE — Most Important:** Always use one of the 6 named natural poses. NEVER write "arms at sides", "standing straight", or any variation of stiff upright posture. If the pose isn't human and specific, the model will look like a mannequin.
2. Always declare what each reference image is for (opening line)
3. Always name the outfit type + "NOT a saree or gown"
4. Always include "NOT airbrushed, NOT filtered, clearly visible open pores, asymmetrical face" in model block
5. Always use f/8, deep depth of field — never f/1.8, never bokeh
6. Always include the full negative prompt — especially: `stiff pose, military stance, arms pinned straight to sides, rigid posture, mannequin pose, blurred background`


---


## Reference Files


- `references/examples.md` — Two complete working prompts with annotations. Read when you need to calibrate tone or structure.
- `references/prompting-guide.md` — Full detailed guide with all layer explanations, extended background descriptions, and advanced tips.
