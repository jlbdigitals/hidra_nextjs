---
name: Industrial Vitality
colors:
  surface: '#f7f9ff'
  surface-dim: '#d6dae1'
  surface-bright: '#f7f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f4fb'
  surface-container: '#eaeef5'
  surface-container-high: '#e4e8f0'
  surface-container-highest: '#dee3ea'
  on-surface: '#171c21'
  on-surface-variant: '#3f4a3b'
  inverse-surface: '#2c3136'
  inverse-on-surface: '#edf1f8'
  outline: '#6f7a6a'
  outline-variant: '#becab7'
  surface-tint: '#006e0c'
  primary: '#006e0c'
  on-primary: '#ffffff'
  primary-container: '#53b94a'
  on-primary-container: '#004505'
  inverse-primary: '#76dd69'
  secondary: '#4059aa'
  on-secondary: '#ffffff'
  secondary-container: '#8fa7fe'
  on-secondary-container: '#1d3989'
  tertiary: '#5a605c'
  on-tertiary: '#ffffff'
  tertiary-container: '#a0a5a1'
  on-tertiary-container: '#363b38'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#91fa82'
  primary-fixed-dim: '#76dd69'
  on-primary-fixed: '#002201'
  on-primary-fixed-variant: '#005307'
  secondary-fixed: '#dce1ff'
  secondary-fixed-dim: '#b6c4ff'
  on-secondary-fixed: '#00164e'
  on-secondary-fixed-variant: '#264191'
  tertiary-fixed: '#dfe4df'
  tertiary-fixed-dim: '#c2c8c3'
  on-tertiary-fixed: '#171d1a'
  on-tertiary-fixed-variant: '#424845'
  background: '#f7f9ff'
  on-background: '#171c21'
  surface-variant: '#dee3ea'
typography:
  headline-xl:
    fontFamily: Manrope
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-lg:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin: 32px
---

## Brand & Style

The design system is engineered to bridge the gap between rugged industrial utility and modern agricultural technology. It targets professionals who value efficiency, reliability, and precision. The aesthetic is categorized as **Corporate / Modern** with a strong influence from **Minimalism**, prioritizing clarity and high-quality product presentation over decorative elements.

The UI should evoke a sense of "Advanced Growth"—combining the organic nature of agriculture with the structural integrity of industrial engineering. By utilizing generous whitespace and a structured grid, this design system transforms a complex catalog into a streamlined, professional experience that builds trust through technical excellence.

## Colors

The palette is anchored by the brand's signature **Growth Green**, used strategically for primary actions and success states. To ground the identity in an industrial context, a deep **Industrial Blue** is introduced as the secondary color, providing a professional weight to navigation and headers.

**Neutral Grays** are utilized for typography and UI borders to maintain a clean, high-contrast environment. The **Pale Mint** (#F3F8F3) serves as a subtle background wash to differentiate content sections without the harshness of pure white, while pure white is reserved for cards and interactive surfaces to maximize clarity and product focus.

## Typography

This design system utilizes **Manrope** for all type levels. Chosen for its geometric precision and modern proportions, Manrope provides the "technical" feel required for industrial specs while remaining highly legible in dense e-commerce layouts.

Headlines use heavy weights and tight letter-spacing to create a commanding presence. Body text is set with generous line heights to ensure readability during prolonged technical research. Labels utilize semi-bold weights and slight tracking for categorization and metadata, ensuring a clear information hierarchy in product specifications.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy for desktop environments, centering content within a 1280px container to maintain an organized, catalog-like structure. A 12-column system is used, allowing for flexible arrangements of product imagery and technical data.

A strict 8px spacing scale ensures rhythmic consistency across the interface. Large vertical gaps (48px to 80px) are used between major sections to emphasize the "generous whitespace" required for a contemporary, premium feel. Small increments (4px, 12px) are reserved for internal component padding to keep related information clusters tight and logical.

## Elevation & Depth

To maintain a professional and clean aesthetic, this design system uses **Ambient Shadows** and **Tonal Layers**. Depth is used sparingly to signify interactivity rather than to simulate physical environments.

- **Surface 0:** The main background, using the Pale Mint (#F3F8F3).
- **Surface 1:** Pure White cards and containers, appearing "raised" through very soft, extra-diffused shadows (0px 4px 20px rgba(0,0,0,0.04)).
- **Interactions:** On hover, cards transition to a slightly deeper shadow (0px 8px 30px rgba(0,0,0,0.08)) to provide tactile feedback without visual clutter.
- **Overlays:** Modals and dropdowns use a crisp, low-contrast outline (1px solid #E2E8F0) in addition to a more pronounced shadow to ensure separation from the content beneath.

## Shapes

The design system adopts a **Rounded** shape language. Elements like buttons and product cards utilize a 0.5rem (8px) base radius. This specific level of roundedness is "soft enough" to feel modern and accessible, but "sharp enough" to maintain the structural, engineering-focused tone of the brand.

Large containers and promotional banners may scale up to a 1.5rem (24px) radius to create a more inviting, contemporary look in marketing sections. Icons and small decorative accents follow the same rounded logic, avoiding sharp 90-degree angles entirely to differentiate from older, legacy industrial software.

## Components

### Buttons
Primary buttons use the Brand Green (#53B94A) with white Manrope Bold text. Secondary buttons use the Industrial Blue (#1E3A8A) or a ghost style with a 1px border. All buttons feature a subtle 300ms transition on hover and 8px border-radius.

### Product Cards
The centerpiece of the system. Cards feature a pure white background, a light 1px border (#F1F5F9), and a soft shadow. Product images should be high-resolution on transparent or neutral backgrounds. Typography inside the card is strictly hierarchical: Category (Label-sm), Name (Headline-md), and Price (Headline-sm/Primary Green).

### Input Fields & Search
Inputs use a high-contrast white background with a light gray border. On focus, the border transitions to Industrial Blue with a subtle blue outer glow. Clear, utilitarian icons are used within the search bar to facilitate rapid part-number or product lookups.

### Chips & Badges
Used for stock status (e.g., "In Stock" in Green) or technical categories. These arepill-shaped with semi-transparent backgrounds of their respective status colors to keep the UI light and non-distracting.

### Technical Data Tables
For industrial specs, tables use a clean, row-based layout with alternating "zebra" stripes in Pale Mint. Headings are bold and condensed to allow for maximum data density without sacrificing clarity.