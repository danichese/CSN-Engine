# Plan: Fix TypeScript Build Errors

This plan resolves the TypeScript compilation errors in `client/src/App.tsx` that are blocking the GitHub Actions deployment.

## Phase 1: Build Error Resolution

The goal is to satisfy the TypeScript compiler by commenting out unused imports and resolving type mismatches without removing the underlying logic.

- [x] Task: Comment out unused imports and components in `client/src/App.tsx`. 7d5862b
    - [x] Comment out `ApiKeyModal` import and usage.
    - [x] Comment out `getStoredApiKey` and `setStoredApiKey` imports.
- [x] Task: Resolve the `apiKey` type mismatch. 7d5862b
    - [x] Apply the non-null assertion operator (`!`) to the `apiKey` prop passed to `ChatWindow`.
- [x] Task: Verify the fix with a local build. 7d5862b
    - [x] Run `npm run build` in the `client` directory and ensure it exits with code 0.
- [x] Task: Conductor - User Manual Verification 'Phase 1: Build Error Resolution' (Protocol in workflow.md)
