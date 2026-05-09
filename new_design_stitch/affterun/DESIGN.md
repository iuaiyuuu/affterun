---
name: Affterun
colors:
  surface: '#141313'
  surface-dim: '#141313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2b2a2a'
  surface-container-highest: '#353434'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c4c7c7'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8e9192'
  outline-variant: '#444748'
  surface-tint: '#c8c6c5'
  primary: '#c8c6c5'
  on-primary: '#313030'
  primary-container: '#1a1a1a'
  on-primary-container: '#848282'
  inverse-primary: '#5f5e5e'
  secondary: '#c8c6c2'
  on-secondary: '#30312e'
  secondary-container: '#494946'
  on-secondary-container: '#b9b8b4'
  tertiary: '#ffb59d'
  on-tertiary: '#5a1b04'
  tertiary-container: '#370b00'
  on-tertiary-container: '#c36b4d'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474746'
  secondary-fixed: '#e4e2dd'
  secondary-fixed-dim: '#c8c6c2'
  on-secondary-fixed: '#1b1c19'
  on-secondary-fixed-variant: '#474744'
  tertiary-fixed: '#ffdbd0'
  tertiary-fixed-dim: '#ffb59d'
  on-tertiary-fixed: '#390c00'
  on-tertiary-fixed-variant: '#783118'
  background: '#141313'
  on-background: '#e5e2e1'
  surface-variant: '#353434'
typography:
  headline-xl:
    fontFamily: Libre Caslon Text
    fontSize: 48px
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: 0.05em
  headline-lg:
    fontFamily: Libre Caslon Text
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.2'
    letterSpacing: 0.03em
  headline-lg-mobile:
    fontFamily: Libre Caslon Text
    fontSize: 28px
    fontWeight: '400'
    lineHeight: '1.2'
    letterSpacing: 0.02em
  body-lg:
    fontFamily: DM Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: -0.01em
  body-md:
    fontFamily: DM Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  container-padding-desktop: 64px
  container-padding-mobile: 24px
  gutter: 24px
  section-gap: 80px
---

## Brand & Style

The design system is rooted in the quiet introspection of a post-run glow. It eschews the aggressive, high-energy aesthetics of typical sports brands in favor of a **Cinematic Editorial** style. Drawing inspiration from the visual language of indie film studios like A24 and the meticulous layout of Japanese design magazines (such as *Popeye* or *Casa BRUTUS*), the system prioritizes storytelling over performance metrics.

The atmosphere is "Quietly Premium." It treats every run as a narrative arc, using analog film photography textures and generous whitespace to create an emotional connection between the athlete and their journey. The interface acts as a minimalist creative tool—unobtrusive, respectful of content, and deeply tactile.

## Colors

The palette is designed to feel like a high-end print publication. The foundation is a **Dark Charcoal (#1A1A1A)**, providing a deep, cinematic backdrop that makes photography and typography "pop" without the harshness of pure black.

**Off-White (#F9F7F2)** serves as the primary surface color for cards and interactive elements, mimicking the texture of uncoated paper stock. The accent colors are earth-toned and muted: **Terracotta (#C36B4D)** for primary actions, **Muted Gold (#D4AF37)** for highlights or premium tiers, and **Deep Sage (#6B7D6A)** for success states or nature-themed data. These colors should feel organic, never synthetic.

## Typography

The typographic system utilizes a high-contrast pairing to achieve an editorial feel. **Libre Caslon Text** is used for headlines; it should always be slightly tracked out to enhance its sophisticated, cinematic character. It feels literary and timeless.

**DM Sans** provides a clean, low-contrast counterpoint for body copy, ensuring legibility without distracting from the visual content. For UI controls, metadata, and technical labels, **Geist** is employed for its precise, monospaced-adjacent feel, suggesting the utility of a creative professional's toolkit. All labels should be set in uppercase with generous letter spacing to evoke the look of film credits or magazine captions.

## Layout & Spacing

The layout philosophy follows a **Fixed Grid** model on desktop to mimic the structured columns of a magazine, transitioning to a fluid single-column layout on mobile. 

A 12-column grid is used for the editor view, with content typically occupying a central 8-column "stage" while controls reside in flanking sidebars. Whitespace is used aggressively; it is considered a functional element of the design to create a sense of "calm." Elements should breathe, with section gaps rarely falling below 64px. Margins are wide, ensuring the interface feels centered and intentional rather than crowded.

## Elevation & Depth

Depth is achieved through **Tonal Layers** and subtle, diffused shadows rather than heavy gradients. The background is always the darkest layer (#1A1A1A). 

Cards and surfaces sit just above this layer, using the off-white paper color to create immediate separation. To add a cinematic feel, a **Slight Film Grain Texture** (an SVG noise filter at roughly 3-5% opacity) should be applied globally across all surfaces. Shadows should be barely perceptible—extra-diffused with a large blur radius and low opacity (e.g., `box-shadow: 0 10px 30px rgba(0,0,0,0.1)`), suggesting that the "paper" is resting lightly on a dark table.

## Shapes

The design system utilizes **Rounded** shapes to soften the technical nature of running data. Containers and primary UI cards use a 16px to 24px radius (`rounded-xl`), creating a friendly, approachable frame for the content. 

Small interactive elements like input fields and buttons follow a 0.5rem base (`rounded-md`), ensuring they feel tactile and "touchable." This curvature should be consistent; avoid sharp 90-degree angles to maintain the "emotional and lightweight" brand promise.

## Components

**Buttons:** Primary buttons use the Terracotta accent with Off-White text. They are large (48px height) with generous horizontal padding. Secondary buttons are "ghost" style with a thin 1px Off-White border.

**Cards:** The primary container for running data. These should look like physical prints or polaroids, featuring a slight grain and thin borders.

**Inputs & Sliders:** Creative tools (like crop or color adjustments) should use minimalist sliders with thin tracks and circular "grainy" knobs. Labels always sit above the input in the tracked-out Label-SM style.

**Poster Canvas:** The central component of the app. It should feature a subtle inner shadow to look inset, like a piece of paper in a frame.

**Chips/Tags:** Used for run metrics (e.g., "5.2 mi", "Sunset"). These use the Deep Sage or Muted Gold colors with 50% opacity backgrounds and 100% opacity text to feel integrated into the editorial layout.