# Ready2Travel

Web application to help users prepare their trips by organizing travel checklists.

## Tech Stack

- **Framework**: Angular 16
- **UI Library**: Angular Material 16
- **Backend**: Firebase Realtime Database
- **Package Manager**: Yarn
- **Testing**: Karma + Jasmine

## Project Structure

```
src/app/
├── app.module.ts          # Main module with Firebase setup
├── app-routing.module.ts  # Application routes
├── material.module.ts     # Angular Material imports
└── views/
    ├── main-menu/         # Main navigation menu
    ├── lists/             # Lists overview (travel lists)
    ├── list/              # Single list view with items
    └── agroupation/       # Item groupings within lists
```

## Commands

```bash
yarn install      # Install dependencies
yarn start        # Start dev server (ng serve)
yarn build        # Build for development
yarn build:prod   # Build for production
yarn test         # Run tests
yarn test:prod    # Run tests headless with coverage
```

## Key Patterns

- Components follow Angular standalone pattern with `.component.ts`, `.component.html`, `.component.scss`, `.component.spec.ts`
- Services are provided at component level or in `app.module.ts`
- Firebase configuration is in `src/environments/environment.ts`
- Dialog components are nested within their parent view folders (e.g., `dialog-add-list/`)

## Development Notes

- Uses SCSS for styling with a custom theme in `src/theme.scss`
- Drag and drop functionality via `@angular/cdk/drag-drop`
- Mock data available in `.mock.ts` files for testing/development

## Firebase Authentication - Implementation Complete

### New Files Created

- `src/app/services/auth.service.ts` - Auth logic (login, register, Google sign-in, logout)
- `src/app/guards/auth.guard.ts` - Route protection
- `src/app/views/login/login.component.ts` - Login UI component
- `src/app/views/login/login.component.html` - Login template
- `src/app/views/login/login.component.scss` - Login styles
- `src/app/views/login/login.component.spec.ts` - Tests

### Modified Files

- `src/app/app.module.ts` - Added `provideAuth()` and `BrowserAnimationsModule`
- `src/app/material.module.ts` - Added form field modules
- `src/app/app-routing.module.ts` - Added AuthGuard to all routes, login route
- `src/app/views/main-menu/main-menu.component.ts` - Added logout
- `src/app/views/main-menu/main-menu.component.html` - Added user header with logout
- `src/app/views/main-menu/main-menu.component.scss` - Added user header styles

### To Test

```bash
npm install   # or yarn install
npm start     # or yarn start
```

Then navigate to `http://localhost:4200` - you should be redirected to `/login`.
