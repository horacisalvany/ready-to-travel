# TripReady

Web application to help you prepare your trips by organizing travel checklists into lists and groups.

## Tech Stack

- **Framework**: Angular 16
- **UI**: Angular Material 16 + CDK (drag & drop)
- **Backend**: Firebase Realtime Database
- **Auth**: Firebase Authentication (email/password + Google)
- **Package Manager**: Yarn
- **Testing**: Karma + Jasmine

## Features

- User authentication (login, register, Google sign-in)
- Create and manage travel lists
- Organize list items into groups
- Drag and drop items between groups
- Data scoped per authenticated user

## Project Structure

```
src/app/
├── guards/            # Auth route guard
├── services/          # Auth service
└── views/
    ├── login/         # Login/register page
    ├── main-menu/     # Home screen with navigation
    ├── lists/         # Travel lists overview
    ├── list/          # Single list with groups
    └── group/         # Group management with drag & drop
```

## Getting Started

```bash
yarn install    # Install dependencies
yarn start      # Start dev server at http://localhost:4200
```

Firebase config goes in `src/environments/environment.ts`.

## Commands

```bash
yarn start        # Dev server
yarn build        # Development build
yarn build:prod   # Production build
yarn test         # Run tests (Karma)
yarn test:prod    # Headless tests with coverage
```

## Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
