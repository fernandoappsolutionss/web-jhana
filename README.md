# web-jhana

Landing editorial en español para **Jhana El Aridi** — coach de mentalidad de abundancia.
Tema: relación con el dinero y abundancia. Paleta verde bosque + blanco cálido.

## Stack

Sitio estático. Un único archivo `index.html` con CSS y JS inline.
No requiere build.

## Estructura

```
.
├── index.html       # Página completa
├── vercel.json      # Config Vercel (cleanUrls)
└── README.md
```

## Secciones

1. Hero editorial con retrato abstracto
2. Ticker animado
3. Manifiesto
4. Quién soy (bio + stats + timeline)
5. Diagnóstico interactivo (quiz 6 preguntas → 3 resultados)
6. Barreras invisibles
7. Servicios
8. Programa **Expansión** (con formulario de lista de espera)
9. CTA grande
10. FAQ
11. Footer

## Desarrollo local

```bash
# Abrir directamente en el navegador
open index.html

# O servir con cualquier servidor estático
python3 -m http.server 8000
# → http://localhost:8000
```

## Deploy

Desplegado en Vercel. Cualquier push a `main` actualiza producción.
