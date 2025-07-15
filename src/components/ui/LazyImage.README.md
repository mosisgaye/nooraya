# LazyImage - Composant d'Image Optimisé

## Description

Le composant `LazyImage` est une version optimisée du composant `Image` de Next.js avec des fonctionnalités avancées de lazy loading, gestion d'erreurs, et placeholders.

## Fonctionnalités

### 1. Lazy Loading avec Intersection Observer
- Utilise l'API native `IntersectionObserver` pour charger les images uniquement quand elles sont visibles
- Configurable via les props `threshold` et `rootMargin`
- Possibilité de désactiver le lazy loading avec `priority={true}`

### 2. Placeholder et Skeleton
- Skeleton animé avec effet shimmer pendant le chargement
- Placeholder personnalisable avec `placeholder` et `blurDataURL`
- Icône de caméra par défaut avant que l'image soit visible

### 3. Gestion d'erreurs
- Fallback automatique en cas d'échec de chargement
- Callbacks `onError` et `onLoad` pour gérer les événements
- Interface utilisateur claire pour les erreurs

### 4. Optimisations Next.js Image
- Tailles responsives automatiques avec `sizes`
- Qualité d'image configurable
- Support des formats modernes (WebP, AVIF)
- Optimisation des performances avec `priority`

### 5. Accessibilité
- Alt texts obligatoires et bien structurés
- Support des technologies d'assistance
- Transitions fluides pour une meilleure UX

## Utilisation

### Basique
```tsx
import LazyImage from '@/components/ui/LazyImage';

<LazyImage
  src="/image.jpg"
  alt="Description de l'image"
  width={400}
  height={300}
/>
```

### Avec fill
```tsx
<div className="relative w-full h-64">
  <LazyImage
    src="/image.jpg"
    alt="Description de l'image"
    fill
    sizes="(max-width: 768px) 100vw, 50vw"
    className="object-cover"
  />
</div>
```

### Avec priorité (pour images above-the-fold)
```tsx
<LazyImage
  src="/hero-image.jpg"
  alt="Image principale"
  fill
  priority
  quality={90}
  sizes="100vw"
/>
```

### Avec placeholder blur
```tsx
<LazyImage
  src="/image.jpg"
  alt="Description de l'image"
  width={400}
  height={300}
  placeholder="blur"
  blurDataURL="data:image/base64,..."
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | - | URL de l'image (requis) |
| `alt` | `string` | - | Texte alternatif (requis) |
| `width` | `number` | - | Largeur de l'image |
| `height` | `number` | - | Hauteur de l'image |
| `fill` | `boolean` | `false` | Remplit le conteneur parent |
| `priority` | `boolean` | `false` | Charge l'image immédiatement |
| `quality` | `number` | `75` | Qualité de l'image (1-100) |
| `sizes` | `string` | Auto | Tailles responsives |
| `placeholder` | `'blur' \| 'empty'` | `'empty'` | Type de placeholder |
| `blurDataURL` | `string` | - | URL du placeholder blur |
| `showSkeleton` | `boolean` | `true` | Afficher le skeleton |
| `onLoad` | `() => void` | - | Callback au chargement |
| `onError` | `() => void` | - | Callback en cas d'erreur |
| `objectFit` | `'cover' \| 'contain' \| ...` | `'cover'` | Ajustement de l'image |
| `threshold` | `number` | `0.1` | Seuil d'intersection |
| `rootMargin` | `string` | `'50px'` | Marge du root |
| `className` | `string` | `''` | Classes CSS |

## Optimisations intégrées

### Performance
- Lazy loading avec Intersection Observer
- Préchargement intelligent des images critiques
- Optimisation des tailles responsives automatique
- Gestion mémoire efficace

### UX
- Skeleton animé pendant le chargement
- Transitions fluides
- Gestion d'erreurs gracieuse
- Accessibilité optimisée

### SEO
- Alt texts appropriés
- Chargement progressif
- Formats d'image modernes
- Optimisation LCP (Largest Contentful Paint)

## Bonnes pratiques

1. **Alt texts descriptifs** : Toujours fournir un alt text détaillé
2. **Sizes appropriées** : Utiliser les bonnes tailles pour le responsive
3. **Priority pour les images critiques** : Utiliser `priority={true}` pour les images above-the-fold
4. **Qualité adaptée** : Ajuster la qualité selon l'usage (75-90 généralement)
5. **Placeholder blur** : Utiliser pour une meilleure UX de chargement

## Exemples d'utilisation dans l'application

Le composant est utilisé dans tous les composants de l'application :

- **Hero.tsx** : Images de fond avec priority
- **HotelCard.tsx** : Images d'hôtels avec lazy loading
- **SpecialOffers.tsx** : Images d'offres optimisées
- **PopularDestinations.tsx** : Images de destinations
- **FlightCard.tsx** : Logos de compagnies aériennes
- **ComparisonPanel.tsx** : Images de comparaison
- **InteractiveMap.tsx** : Images de lieux
- **FlexibleSearch.tsx** : Images de destinations

## CSS associé

Le composant utilise des classes CSS personnalisées :
- `animate-shimmer` : Animation du skeleton
- `gpu-accelerated` : Optimisation GPU
- `will-change-transform` : Optimisation des transitions

Ces classes sont définies dans `/src/app/globals.css`.