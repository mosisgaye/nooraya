# Guide d'intégration des améliorations d'accessibilité

## 1. Importation des styles d'accessibilité

Ajoutez l'import du fichier CSS d'accessibilité dans votre fichier `globals.css` ou `_app.tsx` :

```css
@import './styles/accessibility.css';
```

## 2. Intégration du SkipLink

Ajoutez le composant SkipLink au début de votre layout principal :

```tsx
import SkipLink from './components/ui/SkipLink';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <SkipLink />
        <main id="main-content">
          {children}
        </main>
      </body>
    </html>
  );
}
```

## 3. Utilisation des hooks d'accessibilité

### useAccessibilityPreferences

```tsx
import useAccessibilityPreferences from '@/hooks/useAccessibilityPreferences';

function MyComponent() {
  const { preferences, updatePreference } = useAccessibilityPreferences();
  
  return (
    <div>
      <button onClick={() => updatePreference('reducedMotion', !preferences.reducedMotion)}>
        {preferences.reducedMotion ? 'Activer' : 'Désactiver'} les animations
      </button>
    </div>
  );
}
```

### useAnnouncement

```tsx
import useAnnouncement from '@/hooks/useAnnouncement';

function SearchComponent() {
  const { announce } = useAnnouncement();
  
  const handleSearch = () => {
    // Perform search
    announce('Recherche terminée, 15 résultats trouvés');
  };
  
  return (
    <button onClick={handleSearch}>
      Rechercher
    </button>
  );
}
```

## 4. Utilisation du FocusTrap

```tsx
import FocusTrap from '@/components/ui/FocusTrap';

function Modal({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div className="modal-overlay">
          <FocusTrap isActive={isOpen} onEscape={onClose}>
            <div className="modal-content">
              <h2>Titre du modal</h2>
              <p>Contenu du modal</p>
              <button onClick={onClose}>Fermer</button>
            </div>
          </FocusTrap>
        </div>
      )}
    </>
  );
}
```

## 5. Utilisation de ScreenReaderOnly

```tsx
import ScreenReaderOnly from '@/components/ui/ScreenReaderOnly';

function PriceDisplay({ price }) {
  return (
    <div>
      <span className="text-2xl font-bold">{price}€</span>
      <ScreenReaderOnly>
        prix en euros
      </ScreenReaderOnly>
    </div>
  );
}
```

## 6. Configuration Tailwind pour l'accessibilité

Ajoutez ces classes personnalisées à votre configuration Tailwind :

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      // Couleurs avec contraste amélioré
      colors: {
        'blue-accessible': '#0066cc',
        'green-accessible': '#006600',
        'red-accessible': '#cc0000',
      },
      // Tailles minimales pour les éléments interactifs
      minHeight: {
        '44': '44px',
      },
      minWidth: {
        '44': '44px',
      }
    }
  },
  plugins: [
    // Plugin pour les états de focus
    function({ addUtilities }) {
      addUtilities({
        '.focus-visible': {
          '&:focus-visible': {
            outline: '2px solid #3b82f6',
            'outline-offset': '2px'
          }
        }
      })
    }
  ]
}
```

## 7. Tests d'accessibilité

### Tests automatisés avec Jest

```tsx
// __tests__/accessibility.test.tsx
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Header from '@/components/layout/Header';

expect.extend(toHaveNoViolations);

test('Header should not have accessibility violations', async () => {
  const { container } = render(<Header />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### Tests avec React Testing Library

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('Search form should be accessible', async () => {
  render(<SearchForm />);
  
  // Vérifier les labels
  expect(screen.getByLabelText('Départ de')).toBeInTheDocument();
  expect(screen.getByLabelText('Destination')).toBeInTheDocument();
  
  // Vérifier la navigation au clavier
  const user = userEvent.setup();
  await user.tab();
  expect(screen.getByLabelText('Départ de')).toHaveFocus();
});
```

## 8. Checklist d'accessibilité

### ✅ Complété
- [x] Boutons avec aria-label appropriés
- [x] Liens avec descriptions accessibles
- [x] Contraste amélioré (minimum 4.5:1)
- [x] Labels sur tous les formulaires
- [x] Navigation clavier fonctionnelle
- [x] Support des lecteurs d'écran
- [x] Attributs ARIA corrects
- [x] Structure sémantique HTML5
- [x] Gestion des erreurs accessibles
- [x] Focus visible amélioré
- [x] Support des préférences utilisateur

### 🔄 À vérifier régulièrement
- [ ] Tests avec lecteurs d'écran (NVDA, JAWS, VoiceOver)
- [ ] Tests de navigation au clavier uniquement
- [ ] Tests avec zoom à 200%
- [ ] Tests en mode contraste élevé
- [ ] Tests avec animations désactivées

## 9. Outils recommandés

### Extensions navigateur
- axe DevTools
- WAVE Web Accessibility Evaluator
- Lighthouse

### Outils de test
- Pa11y pour les tests en ligne de commande
- Storybook avec addon-a11y
- Jest-axe pour les tests unitaires

## 10. Ressources supplémentaires

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Screen Reader Testing](https://webaim.org/articles/screenreader_testing/)
- [Inclusive Design Patterns](https://inclusive-design-patterns.com/)

## 11. Maintenance continue

### Processus de révision
1. Tester chaque nouvelle fonctionnalité avec les outils d'accessibilité
2. Vérifier la navigation au clavier
3. Tester avec un lecteur d'écran
4. Valider le contraste des couleurs
5. Effectuer des tests utilisateur avec des personnes en situation de handicap

### Métriques à surveiller
- Score Lighthouse Accessibility (objectif : 100)
- Nombre de violations axe (objectif : 0)
- Temps de navigation au clavier
- Feedback utilisateur sur l'accessibilité