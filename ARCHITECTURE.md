# Architecture

The application follows [Feature-Sliced Design](https://feature-sliced.design/).
Next.js App Router entry points stay in `src/app`, while FSD's conflicting
layers use the `_app` and `_pages` names recommended by the FSD Next.js guide.

## Layers

- `src/app`: thin Next.js route adapters and framework-required entry points
- `src/_app`: application-wide providers, metadata, and global styles
- `src/_pages`: complete screens ready to be rendered by the router
- `src/widgets`: large, independent page sections and shared site blocks
- `src/features`: user interactions that provide business value
- `src/entities`: domain data, types, and reusable domain UI
- `src/shared`: framework integrations, configuration, generic libraries, and UI

Dependencies point down the list. A slice must not import another slice from
the same layer. Cross-slice imports use the slice's public `index.ts` API.
Server-only exports use `index.server.ts` so they cannot leak into a client
bundle.

The localized landing page is the `home` page slice. Portfolio projects are a
domain entity presented by the home page and by the `case-study` page slice.
