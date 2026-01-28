# Specification: Fix TypeScript Build Errors

## Overview
The current build is failing due to strict TypeScript checks. These errors arose after refactoring the application to "Demo Mode," which left behind unused imports (`ApiKeyModal`, `storage` services) and caused a type mismatch for the `apiKey` prop. This track will resolve these issues to restore a successful build pipeline.

## Functional Requirements

### 1. Resolve Unused Code Errors
*   **Action:** The following unused imports and components MUST be **commented out** (not deleted) in `client/src/App.tsx`:
    *   `import ApiKeyModal ...`
    *   `import { getStoredApiKey, setStoredApiKey } ...`
    *   Any usage of these functions or components within the file.
*   **Goal:** Eliminate "declared but never read" and "unused import" errors while preserving the code for potential future use.

### 2. Fix Type Mismatch Error
*   **Action:** The `apiKey` state in `client/src/App.tsx` MUST remain typed as `string | null` to minimize changes to the existing state logic.
*   **Resolution:** When passing `apiKey` to the `ChatWindow` component, use a **Non-Null Assertion Operator** (`!`) (e.g., `apiKey={apiKey!}`) to satisfy the strict `string` requirement of the child component.

## Non-Functional Requirements
*   **Build Success:** The `npm run build` command (which runs `tsc -b && vite build`) MUST execute without any errors after these changes.
